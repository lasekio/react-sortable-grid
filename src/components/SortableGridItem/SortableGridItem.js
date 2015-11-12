import React, { Component } from 'react';

export default class SortableGridItem extends Component {
    render() {
        return this.props.children;
    }
}

SortableGridItem.propTypes = {
    position: React.PropTypes.number.isRequired,
    itemKey: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
};
