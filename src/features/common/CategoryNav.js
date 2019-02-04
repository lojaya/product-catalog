import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { firestore } from '../../firebase';

import { FirestoreCollection } from 'react-firestore';

export class CategoryNav extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.setState((state, props) => {
      return { queryParams: new URLSearchParams(props.router.location.search) };
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  scrollToCategory(e) {
    const getSiblings = function(elem) {
      let sibling = elem.parentNode.firstChild;
      let totalLength = 0;
      while (sibling !== elem) {
        totalLength += sibling.offsetWidth;
        sibling = sibling.nextSibling;
      }
      return totalLength;
    };

    const innerContent = e.target.offsetWidth;
    const innerSublingContent = getSiblings(e.target);
    const scrollY = innerSublingContent + innerContent / 2;
    e.target.parentNode.scrollTo({ left: scrollY, behavior: 'smooth' });
    Array.from(e.target.parentNode.children).forEach(el => (el.className = ''));
    e.target.className = 'active';
  }

  activeCategory(category) {
    return () => category && this.state.queryParams.get('category') === category.id;
  }

  render() {
    const catalogId = this.props.catalogId;

    const categoryCollection = ({ isLoading, data }) => {
      return isLoading
        ? 'loading'
        : data.map(category => (
            <NavLink
              key={category.id}
              to={{
                pathname: this.props.router.pathname,
                search: `?category=${category.id}`,
              }}
              isActive={this.activeCategory(category)}
              onClick={this.scrollToCategory}
            >
              {category.name}
            </NavLink>
          ));
    };

    return (
      <div className="common-category-nav">
        <div className="scroll-category-menu">
          <NavLink
            to={{ pathname: this.props.router.pathname }}
            isActive={() => !this.state.queryParams.get('category')}
            onClick={this.scrollToCategory}
          >
            Semua
          </NavLink>
          <FirestoreCollection
            path="category"
            filter={['catalog', '==', firestore.collection('catalog').doc(catalogId)]}
            render={categoryCollection}
          />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
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
)(CategoryNav);
