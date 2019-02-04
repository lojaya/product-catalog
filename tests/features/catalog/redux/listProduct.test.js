import {
  CATALOG_LIST_PRODUCT,
} from '../../../../src/features/catalog/redux/constants';

import {
  listProduct,
  reducer,
} from '../../../../src/features/catalog/redux/listProduct';

describe('catalog/redux/listProduct', () => {
  it('returns correct action by listProduct', () => {
    expect(listProduct()).toHaveProperty('type', CATALOG_LIST_PRODUCT);
  });

  it('handles action type CATALOG_LIST_PRODUCT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CATALOG_LIST_PRODUCT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
