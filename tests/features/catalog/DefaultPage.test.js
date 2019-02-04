import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/catalog/DefaultPage';

describe('catalog/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      catalog: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.catalog-default-page').length
    ).toBe(1);
  });
});
