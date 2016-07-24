import React, { Component } from 'react';
import SortableGridItem from '../SortableGridItem/SortableGridItem';
let blockId = 0;

/**
 * @class SortableGrid
 * @extends {React.Component}
 * @attr {String} grid - Grid in 2x2 style
 * @desc
 * Sortable grid generates grid for given `grid` prop.
 *
 * # Props
 *
 * ## _{Number}_ `columns` - width of grid
 * ## _{Number}_ `rows` - height of grid
 */
export default class SortableGrid extends Component {
    constructor(props) {
        super();

        this.state = {
            draggingItemKey: null,
            dragStartCursorPosition: null,
            lastDraggingItemKey: null,
        };

        this._touchStartTimeout = null;

        this._itemsKeyToBlockMap = {};
        this._previousPositionMap = {};
    }

    dragStart(item, event) {
        if (event.preventDefault) {
            event.preventDefault();
        }

        this.setState({
            draggingItemKey: item.props.itemKey,
            draggingItemPosition: item.props.position,
            draggingBlockDragStartPosition: item.props.position,
            dragStartCursorPosition: {
                x: event.clientX,
                y: event.clientY,
            },
            dragCursorDiffPosition: {
                x: 0,
                y: 0,
            },
        });
    }

    handleTouchStart(block, event) {
        if (event.touches.length === 1) {
            const touch = event.touches[0];

            this._touchStartTimeout = setTimeout(() => {
                return this.dragStart(block, touch);
            }, 500);
        }
    }

    handleTouchMove(event) {
        const touch = event.touches[0];

        if (this.state.draggingItemKey !== null) {
            event.preventDefault();

            return this.dragHandle(touch);
        } else if (this._touchStartTimeout !== null) {
            clearTimeout(this._touchStartTimeout);
            this._touchStartTimeout = null;
        }
    }

    dragHandle(event) {
        let triggerRelativeMatch = 0.25;

        if (this.state.draggingItemKey === null) {
            return;
        }

        let diff = {
            x: (event.clientX - this.state.dragStartCursorPosition.x) / this.refs.container.offsetWidth * 100,
            y: (event.clientY - this.state.dragStartCursorPosition.y) / this.refs.container.offsetHeight * 100,
        };

        let newState = {
            dragCursorDiffPosition: {
                x: diff.x,
                y: (event.clientY - this.state.dragStartCursorPosition.y) / this.refs.container.offsetWidth * 100,
            },
        };

        let draggingBlockOffset = this._getOffestForPosition(this.state.draggingBlockDragStartPosition);

        draggingBlockOffset.x += diff.x / 100 * this.props.columns;
        draggingBlockOffset.y += diff.y / 100 * this.props.rows;

        let matchItem = React.Children.map(this.props.children, item => item).filter((item) => {
            if (item.props.itemKey === this.state.draggingItemKey) {
                return false;
            }

            let offset = this._getOffestForPosition(item.props.position);

            return Math.abs(offset.x - draggingBlockOffset.x) < triggerRelativeMatch &&
                Math.abs(offset.y - draggingBlockOffset.y) < triggerRelativeMatch;
        })[0];

        if (matchItem !== undefined) {
            let oldPosition = this.state.draggingItemPosition;
            let newPosition = matchItem.props.position;
            let positionMap = {};
            React.Children.map(this.props.children, (item) => {
                // block.previousPosition = block.position;

                let position = item.props.position;
                this._previousPositionMap[item.props.itemKey] = position;

                if (position > oldPosition && position <= matchItem.props.position) {
                    position--;
                } else if (position <= oldPosition && position >= matchItem.props.position) {
                    position++;
                }

                if (item.props.itemKey === this.state.draggingItemKey) {
                    position = newPosition;
                }

                positionMap[item.props.itemKey] = position;

                return item;
            });

            newState.draggingItemPosition = newPosition;

            this.props.onReorder(positionMap);
        }

        this.setState(newState);
    }

    stopDrag() {
        this.setState({
            draggingItemKey: null,
            draggingBlockDragStartPosition: null,
            lastDraggingItemKey: this.state.draggingItemKey,
        });
    }

    /*
     * @inheirtdocs
     * @returns {div} component
     */
    render() {
        const blockWidth = 100 / this.props.columns;
        const blockHeight = 100 / this.props.rows;

        return (<div onMouseMove={this.dragHandle.bind(this)}
            onTouchMove={this.handleTouchMove.bind(this)}
            onTouchEnd={this.stopDrag.bind(this)}
            onMouseUp={this.stopDrag.bind(this)}
            onMouseLeave={this.stopDrag.bind(this)}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}
            ref="container">

            {React.Children.map(this.props.children, (item, index) => {
                let position = item.props.position;
                let style = {};

                if (this.state.draggingItemKey !== null && this.state.draggingItemKey === item.props.itemKey) {
                    style = {
                        marginTop: this.state.dragCursorDiffPosition.y + '%',
                        marginLeft: this.state.dragCursorDiffPosition.x + '%',
                        zIndex: 3,
                        transition: 'none',
                    };

                    position = this.state.draggingBlockDragStartPosition;
                }

                const previousPosition =  this._previousPositionMap[item.props.itemKey];

                if (previousPosition !== undefined &&
                    item.position !== previousPosition &&
                    this._isEdgePositon(previousPosition) && this._isEdgePositon(previousPosition)) {
                    style = {zIndex: 1, ...style};
                }

                if (this.state.draggingItemKey === null &&
                    this.state.lastDraggingItemKey !== null &&
                    this.state.lastDraggingItemKey === item.props.itemKey) {
                    style = {zIndex: 2, ...style};
                }

                let {x: leftPosition, y: topPosition} = this._getOffestForPosition(position);

                style = {
                    top: blockHeight * topPosition + '%',
                    left: blockWidth * leftPosition + '%',
                    zIndex: 0,
                    width: blockWidth + '%',
                    height: blockHeight + '%',
                    marginTop: '0%',
                    marginLeft: '0%',
                    position: 'absolute',
                    borderSizing: 'border-box',
                    transition: 'top 500ms ease, left 500ms ease, margin 500ms ease',
                    ...style,
                };

                return <div style={{marginTop: 1, ...style}}
                    onMouseDown={this.dragStart.bind(this, item)}
                    onTouchStart={this.handleTouchStart.bind(this, item)}
                    key={item.props.key}>
                        {item}
                </div>;
            })}
        </div>);
    }

    _findItem(position) {
        if (!this.props.children) {
            return null;
        }

        const childs = this.props.children.filter ? this.props.children : [this.props.children];

        return childs.filter(child => {
            return child.props.position === position;
        })[0];
    }

    _isEdgePositon(position) {
        let offset = position % this.props.columns;

        return offset === 0 || offset === this.props.columns - 1;
    }

    _generateBlocks(props) {
        const targetLength = props.columns * props.rows;
        let blocks = [];

        for (let index = 0; index < targetLength; index++) {
            blocks.push({
                id: blockId++,
                position: index,
                previousPosition: index,
            });
        }

        return blocks;
    }

    _getOffestForPosition(position) {
        return {
            x: position % this.props.columns,
            y: Math.floor(position / this.props.columns),
        };
    }
}


SortableGrid.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(SortableGridItem),
        SortableGridItem,
    ]).isRequired,
    columns: React.PropTypes.number.isRequired,
    rows: React.PropTypes.number.isRequired,
};

SortableGrid.SortableGridItem = SortableGridItem;
