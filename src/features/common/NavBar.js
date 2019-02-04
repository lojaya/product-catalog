import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

export class NavBar extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <header className="common-nav-bar">
        <MDBNavbar className="navbar-color" dark expand="sm" scrolling fixed="top">
          <MDBNavbarBrand href="/" className={'d-none'}>
            <strong>SORABEL</strong>
          </MDBNavbarBrand>
          <MDBNavbarNav left>
            <MDBNavItem className={this.props.common.navTitle ? '' : 'd-none'}>
              <MDBNavLink to="history(-1)">&larr;</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className={this.props.common.navTitle ? '' : 'd-none'}>
              <div className="main-title">{this.props.common.navTitle}</div>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="#">
                <MDBIcon icon="search" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#">
                <MDBIcon far icon="heart" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#">
                <MDBIcon icon="shopping-bag" />
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>
      </header>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
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
)(NavBar);
