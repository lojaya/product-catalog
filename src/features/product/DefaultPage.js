import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { FirestoreDocument } from 'react-firestore';

import { MDBRow, MDBCol, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from 'mdbreact';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export class DefaultPage extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    common: PropTypes.object.isRequired,
  };

  render() {
    const { productId } = this.props.match.params;

    return (
      <div className="product-default-page">
        <FirestoreDocument
          path={`products/${productId}`}
          render={({ isLoading, data }) => {
            if (isLoading) {
              return 'loading';
            } else {
              console.log(this.props.common.navTitle = "dataaa");
              return (
                <div>
                  <MDBCarousel
                    activeItem={1}
                    length={4}
                    showControls={true}
                    showIndicators={true}
                    className="z-depth-0"
                  >
                    <MDBCarouselInner>
                      {data.images.map((image, key) => {
                        return (
                          <MDBCarouselItem itemId={key} key={key}>
                            <MDBView>
                              <img className="d-block w-100" src={image} alt="First slide" />
                            </MDBView>
                          </MDBCarouselItem>
                        );
                      })}
                    </MDBCarouselInner>
                  </MDBCarousel>

                  <MDBRow className="p-2">
                    <MDBCol size="8">
                      <span className="float-left">
                        <h5>
                          <strong>{data.name}</strong>
                        </h5>
                      </span>
                    </MDBCol>
                    <MDBCol size="4">
                      <span className="float-right">
                        <strong>RP {data.price}</strong>
                      </span>
                    </MDBCol>
                  </MDBRow>

                  <div className="product-tabs p-3">
                    <Tabs>
                      <TabList>
                        <Tab>Detail</Tab>
                        <Tab>Ukuran</Tab>
                      </TabList>

                      <TabPanel>{data.detail}</TabPanel>
                      <TabPanel>
                        {data.sizeGuide.split('\n').map((item, key) => {
                          return (
                            <React.Fragment key={key}>
                              {item}
                              <br />
                            </React.Fragment>
                          );
                        })}
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              );
            }
          }}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    product: state.product,
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultPage);
