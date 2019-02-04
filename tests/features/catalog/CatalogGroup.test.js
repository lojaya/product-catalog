import React from 'react';
import { shallow } from 'enzyme';
import { CatalogGroup } from '../../../src/features/catalog';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CatalogGroup />);
  expect(renderedComponent.find('.catalog-catalog-group').length).toBe(1);
});
