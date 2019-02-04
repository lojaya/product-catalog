import React from 'react';
import { shallow } from 'enzyme';
import { CategoryNav } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CategoryNav />);
  expect(renderedComponent.find('.common-category-nav').length).toBe(1);
});
