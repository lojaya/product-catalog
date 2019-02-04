// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CATALOG_LIST_PRODUCT,
} from './constants';

export function listProduct(payload) {
  return {
    type: CATALOG_LIST_PRODUCT,
    payload
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CATALOG_LIST_PRODUCT:
      const { products, lastVisible } = action.payload;
      return {
        ...state,
        products: [...state.products, ...products],
        lastVisible: lastVisible
      };

    default:
      return state;
  }
}
