import React from 'react';
import { shallow } from 'enzyme';
import { ProductHolder } from '../../../src/features/catalog/ProductHolder';

describe('catalog/ProductHolder', () => {
  it('renders node with correct class name', () => {
    const props = {
      catalog: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ProductHolder {...props} />
    );

    expect(
      renderedComponent.find('.catalog-product-holder').length
    ).toBe(1);
  });
});
