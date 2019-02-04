import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBTooltip } from 'mdbreact';

export class ProductPreview extends Component {
  static propTypes = {
    catalog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <MDBCol className="catalog-product-preview" sm="6">
        <MDBCard>
          <Link to={{pathname: `/products/${this.props.product.id}`}}>
            <MDBCardImage className="img-fluid" src={this.props.product.images[0]} />
            <MDBCardBody className="text-center">
              <MDBRow>
                <MDBCol size="6">
                  <span className="float-left">
                    <strong style={{ color: 'red' }}>{this.props.product.price}</strong>
                  </span>
                </MDBCol>
                <MDBCol size="6">
                  <span className="float-right">
                    <MDBTooltip
                      placement="top"
                      component="i"
                      componentClass="fa fa-heart ml-3"
                      tooltipContent="Add to watchlist"
                    />
                    <MDBTooltip
                      placement="top"
                      component="i"
                      componentClass="fa fa-shopping-cart grey-text ml-3"
                      tooltipContent="Add to cart"
                    />
                  </span>
                </MDBCol>
              </MDBRow>
              <span className="text-left grey-text">
                <h6>{this.props.product.name}</h6>
              </span>
            </MDBCardBody>
          </Link>
        </MDBCard>
      </MDBCol>
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
)(ProductPreview);
