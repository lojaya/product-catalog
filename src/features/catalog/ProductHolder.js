import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { firestore } from '../../firebase';
import { MDBRow } from 'mdbreact';
import ProductPreview from './ProductPreview';

export class ProductHolder extends Component {
  static propTypes = {
    catalog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
    this.fetchData('first');
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.location.search !== prevProps.router.location.search) {
      this.fetchData('first');
    }
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.props.catalog.products.length &&
      !this.state.loading
    ) {
      this.fetchData('next');
    }
  };

  async fetchData(param) {
    this.setState(() => ({ loading: true }));

    const queryParams = new URLSearchParams(this.props.router.location.search);
    const catalogId = this.props.catalogId;
    const categoryId = queryParams.get('category');
    const { itemsPerPage } = this.props.catalog;
    let query = firestore.collection('products');
    if (categoryId) {
      query = query.where('category', '==', firestore.collection('category').doc(categoryId));
    } else if (catalogId) {
      query = query.where('catalog', '==', firestore.collection('catalog').doc(catalogId));
    }
    query = query.orderBy('created');
    if (param === 'first') {
      query = query.limit(itemsPerPage);
    } else {
      if (!this.props.catalog.lastVisible) return;
      query = query.startAfter(this.props.catalog.lastVisible).limit(itemsPerPage);
    }
    const snapshot = await query.get();
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const products = snapshot.docs.map(doc => Object.assign({}, doc.data(), { id: doc.id }));
    this.props.actions.listProduct({ products, lastVisible });

    this.setState(() => ({ loading: false }));
  }

  render() {
    return (
      <MDBRow className="products">
        {this.props.catalog.products.map(product => (
          <ProductPreview key={product.id} product={product} />
        ))}
      </MDBRow>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    catalog: state.catalog,
    router: state.router,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductHolder);
