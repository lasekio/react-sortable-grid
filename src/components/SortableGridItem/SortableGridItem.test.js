import SortableGridItem from './SortableGridItem';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import {expect} from 'chai';

describe('SortableGridItem component', () => {
    it('renders only children', () => {
        const children = <div />;
        const shallowRenderer = ReactTestUtils.createRenderer();

        shallowRenderer.render(<SortableGridItem>{children}</SortableGridItem>);

        expect(shallowRenderer.getRenderOutput()).to.eq(children);
    });
});
