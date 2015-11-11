import React, { Component } from 'react';
import SortableGridItem from '../SortableGridItem/SortableGridItem';
var blockId = 0;

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
            blocks: this._generateBlocks(props),
            draggingBlock: null,
            dragStartCursorPosition: null,
            lastDraggingBlock: null,
        };

        this._touchStartTimeout = null;
    }

    dragStart(block, event) {
        if (event.preventDefault) {
            event.preventDefault();
        }

        if (this.props.children && block.position >= this.props.children.length) {
            return false;
        }

        this.setState({
            draggingBlock: block,
            draggingBlockDragStartPosition: block.position,
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

        if (this.state.draggingBlock !== null) {
            event.preventDefault();

            return this.dragHandle(touch);
        } else if (this._touchStartTimeout !== null) {
            clearTimeout(this._touchStartTimeout);
            this._touchStartTimeout = null;
        }
    }

    dragHandle(event) {
        var triggerRelativeMatch = 0.25;

        if (this.state.draggingBlock === null) {
            return;
        }

        var diff = {
            x: (event.clientX - this.state.dragStartCursorPosition.x) / this.refs.container.offsetWidth * 100,
            y: (event.clientY - this.state.dragStartCursorPosition.y) / this.refs.container.offsetHeight * 100,
        };

        var newState = {
            dragCursorDiffPosition: {
                x: diff.x,
                y: (event.clientY - this.state.dragStartCursorPosition.y) / this.refs.container.offsetWidth * 100,
            },
        };

        var draggingBlockOffset = this._getOffestForPosition(this.state.draggingBlockDragStartPosition);

        draggingBlockOffset.x += diff.x / 100 * this.props.columns;
        draggingBlockOffset.y += diff.y / 100 * this.props.rows;

        let matchBlock = this.state.blocks.filter((block) => {
            if (this.state.draggingBlock && block.id === this.state.draggingBlock.id) {
                return false;
            }

            if (block.position >= this.props.children.length) {
                return false;
            }

            let offset = this._getOffestForPosition(block.position);

            return Math.abs(offset.x - draggingBlockOffset.x) < triggerRelativeMatch &&
                Math.abs(offset.y - draggingBlockOffset.y) < triggerRelativeMatch;
        })[0];

        if (matchBlock !== undefined) {
            var oldPosition = this.state.draggingBlock.position;
            var newPosition = matchBlock.position;
            var positionMap = {};

            newState.blocks = this.state.blocks.map((block) => {
                block.previousPosition = block.position;

                if (block.position > oldPosition && block.position <= matchBlock.position) {
                    block.position--;
                } else if (block.position <= oldPosition && block.position >= matchBlock.position) {
                    block.position++;
                }

                if (block.id === this.state.draggingBlock.id) {
                    block.position = newPosition;
                }

                positionMap[block.previousPosition] = block.position;

                return block;
            });

            this.props.onReorder(positionMap);
        }

        this.setState(newState);
    }

    stopDrag() {
        this.setState({
            draggingBlock: null,
            draggingBlockDragStartPosition: null,
            lastDraggingBlock: this.state.draggingBlock,
        });
    }

    /*
     * @inheirtdocs
     * @returns {div} component
     */
    render() {
        const blockWidth = 100 / this.props.columns;
        const blockHeight = 100 / this.props.rows;
        let blocks = this.state.blocks;

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

            {blocks.map((block, index) => {
                var position = block.position;
                var style = {};
                const item = this._findItem(position);

                if (this.state.draggingBlock && this.state.draggingBlock.id === block.id) {
                    style = {
                        marginTop: this.state.dragCursorDiffPosition.y + '%',
                        marginLeft: this.state.dragCursorDiffPosition.x + '%',
                        zIndex: 3,
                        transition: 'none',
                    };

                    position = this.state.draggingBlockDragStartPosition;
                }

                if (block.position !== block.previousPosition && this._isEdgePositon(block.position) && this._isEdgePositon(block.previousPosition)) {
                    style = {zIndex: 1, ...style};
                }

                if (this.state.draggingBlock === null && this.state.lastDraggingBlock && this.state.lastDraggingBlock.id === block.id) {
                    style = {zIndex: 2, ...style};
                }

                var {x: leftPosition, y: topPosition} = this._getOffestForPosition(position);

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
                    key={block.id}
                    onTouchStart={this.handleTouchStart.bind(this, block)}
                    onMouseDown={this.dragStart.bind(this, block)}>
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
        var offset = position % this.props.columns;

        return offset === 0 || offset === this.props.columns - 1;
    }

    _generateBlocks(props) {
        const targetLength = props.columns * props.rows;
        let blocks = [];

        for (var index = 0; index < targetLength; index++) {
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

SortableGrid.SortableGridItem = SortableGridItem;
