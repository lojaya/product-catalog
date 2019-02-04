import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { MDBContainer } from 'mdbreact';
import CatalogGroup from './CatalogGroup';
import CategoryNav from '../common/CategoryNav';
import ProductHolder from './ProductHolder';

export class DefaultPage extends Component {
  static propTypes = {
    catalog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const catalogId = this.props.match.params.catalogId;

    return (
      <div className="catalog-default-page">
        {!catalogId ? (
          <CatalogGroup />
        ) : (
          <div>
            <CategoryNav
              route={{
                match: this.props.match,
                location: this.props.location,
              }}
              catalogId={catalogId}
            />
            <MDBContainer className="text-center catalog-container mt-2 pt-2">
              <ProductHolder catalogId={catalogId} />
            </MDBContainer>
          </div>
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    catalog: state.catalog,
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
)(DefaultPage);
