import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdbreact';
import { firestore } from '../../firebase';
import { FirestoreCollection } from 'react-firestore';

export default class CatalogGroup extends Component {
  static propTypes = {};

  render() {
    const catalogCollection = ({ isLoading, data }) => {
      return isLoading
        ? 'loading'
        : data.map(catalog => (
            <MDBCol middle size="6" key={catalog.id}>
              <Link to={'/catalog/' + catalog.id}>
                <strong>{catalog.name}</strong>
              </Link>
            </MDBCol>
          ));
    };

    const groupCollection = ({ isLoading, data }) => {
      return isLoading ? (
        'loading'
      ) : (
        <div className="group-list pt-3">
          <h5>Catalog</h5>
          <MDBRow>
            {data.map(group => (
              <MDBCol size="12" key={group.id}>
                <MDBRow className={'catalog-group ' + group.id}>
                  <MDBCol middle size="6">
                    <strong className="ml-3 group-title">{group.name}</strong>
                  </MDBCol>
                  <MDBCol middle size="6">
                    <img className="float-right" src={group.background} alt={group.name} />
                  </MDBCol>
                </MDBRow>
                <MDBRow className={'single-catalog ' + group.id}>
                  <FirestoreCollection
                    path="catalog"
                    filter={['group', '==', firestore.collection('groups').doc(group.id)]}
                    render={catalogCollection}
                  />
                </MDBRow>
              </MDBCol>
            ))}
          </MDBRow>
        </div>
      );
    };

    return (
      <div className="catalog-group-wrapper">
        <FirestoreCollection path="groups" sort="name" render={groupCollection} />
      </div>
    );
  }
}
