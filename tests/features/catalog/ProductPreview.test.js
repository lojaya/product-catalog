import React from 'react';
import { shallow } from 'enzyme';
import { ProductPreview } from '../../../src/features/catalog/ProductPreview';

describe('catalog/ProductPreview', () => {
  it('renders node with correct class name', () => {
    const props = {
      catalog: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ProductPreview {...props} />
    );

    expect(
      renderedComponent.find('.catalog-product-preview').length
    ).toBe(1);
  });
});
