(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-sortable-grid"] = factory(require("react"));
	else
		root["react-sortable-grid"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _srcComponentsSortableGridSortableGrid = __webpack_require__(1);

	var _srcComponentsSortableGridSortableGrid2 = _interopRequireDefault(_srcComponentsSortableGridSortableGrid);

	exports['default'] = _srcComponentsSortableGridSortableGrid2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _SortableGridItemSortableGridItem = __webpack_require__(3);

	var _SortableGridItemSortableGridItem2 = _interopRequireDefault(_SortableGridItemSortableGridItem);

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

	var SortableGrid = (function (_Component) {
	    _inherits(SortableGrid, _Component);

	    function SortableGrid(props) {
	        _classCallCheck(this, SortableGrid);

	        _get(Object.getPrototypeOf(SortableGrid.prototype), 'constructor', this).call(this);

	        this.state = {
	            blocks: this._generateBlocks(props),
	            draggingBlock: null,
	            dragStartCursorPosition: null,
	            lastDraggingBlock: null
	        };
	    }

	    _createClass(SortableGrid, [{
	        key: 'dragStart',
	        value: function dragStart(block, event) {
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
	                    y: event.clientY
	                },
	                dragCursorDiffPosition: {
	                    x: 0,
	                    y: 0
	                }
	            });
	        }
	    }, {
	        key: 'dragHandle',
	        value: function dragHandle(event) {
	            var _this = this;

	            var triggerRelativeMatch = 0.25;

	            if (this.state.draggingBlock === null) {
	                return;
	            }

	            var diff = {
	                x: (event.clientX - this.state.dragStartCursorPosition.x) / this.refs.container.offsetWidth * 100,
	                y: (event.clientY - this.state.dragStartCursorPosition.y) / this.refs.container.offsetHeight * 100
	            };

	            var newState = {
	                dragCursorDiffPosition: {
	                    x: diff.x,
	                    y: (event.clientY - this.state.dragStartCursorPosition.y) / this.refs.container.offsetWidth * 100
	                }
	            };

	            var draggingBlockOffset = this._getOffestForPosition(this.state.draggingBlockDragStartPosition);

	            draggingBlockOffset.x += diff.x / 100 * this.props.columns;
	            draggingBlockOffset.y += diff.y / 100 * this.props.rows;

	            var matchBlock = this.state.blocks.filter(function (block) {
	                if (_this.state.draggingBlock && block.id === _this.state.draggingBlock.id) {
	                    return false;
	                }

	                if (block.position >= _this.props.children.length) {
	                    return false;
	                }

	                var offset = _this._getOffestForPosition(block.position);

	                return Math.abs(offset.x - draggingBlockOffset.x) < triggerRelativeMatch && Math.abs(offset.y - draggingBlockOffset.y) < triggerRelativeMatch;
	            })[0];

	            if (matchBlock !== undefined) {
	                var oldPosition = this.state.draggingBlock.position;
	                var newPosition = matchBlock.position;
	                var positionMap = {};

	                newState.blocks = this.state.blocks.map(function (block) {
	                    block.previousPosition = block.position;

	                    if (block.position > oldPosition && block.position <= matchBlock.position) {
	                        block.position--;
	                    } else if (block.position <= oldPosition && block.position >= matchBlock.position) {
	                        block.position++;
	                    }

	                    if (block.id === _this.state.draggingBlock.id) {
	                        block.position = newPosition;
	                    }

	                    positionMap[block.previousPosition] = block.position;

	                    return block;
	                });

	                this.props.onReorder(positionMap);
	            }

	            this.setState(newState);
	        }
	    }, {
	        key: 'stopDrag',
	        value: function stopDrag() {
	            this.setState({
	                draggingBlock: null,
	                draggingBlockDragStartPosition: null,
	                lastDraggingBlock: this.state.draggingBlock
	            });
	        }

	        /*
	         * @inheirtdocs
	         * @returns {div} component
	         */
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var blockWidth = 100 / this.props.columns;
	            var blockHeight = 100 / this.props.rows;
	            var blocks = this.state.blocks;

	            return _react2['default'].createElement(
	                'div',
	                { onMouseMove: this.dragHandle.bind(this),
	                    onMouseUp: this.stopDrag.bind(this),
	                    onMouseLeave: this.stopDrag.bind(this),
	                    style: {
	                        width: '100%',
	                        height: '100%',
	                        position: 'relative'
	                    },
	                    ref: 'container' },
	                blocks.map(function (block, index) {
	                    var position = block.position;
	                    var style = {};
	                    var item = _this2._findItem(position);

	                    if (_this2.state.draggingBlock && _this2.state.draggingBlock.id === block.id) {
	                        style = {
	                            marginTop: _this2.state.dragCursorDiffPosition.y + '%',
	                            marginLeft: _this2.state.dragCursorDiffPosition.x + '%',
	                            zIndex: 3,
	                            transition: 'none'
	                        };

	                        position = _this2.state.draggingBlockDragStartPosition;
	                    }

	                    if (block.position !== block.previousPosition && _this2._isEdgePositon(block.position) && _this2._isEdgePositon(block.previousPosition)) {
	                        style = _extends({ zIndex: 1 }, style);
	                    }

	                    if (_this2.state.draggingBlock === null && _this2.state.lastDraggingBlock && _this2.state.lastDraggingBlock.id === block.id) {
	                        style = _extends({ zIndex: 2 }, style);
	                    }

	                    var _getOffestForPosition2 = _this2._getOffestForPosition(position);

	                    var leftPosition = _getOffestForPosition2.x;
	                    var topPosition = _getOffestForPosition2.y;

	                    style = _extends({
	                        top: blockHeight * topPosition + '%',
	                        left: blockWidth * leftPosition + '%',
	                        zIndex: 0,
	                        width: blockWidth + '%',
	                        height: blockHeight + '%',
	                        marginTop: '0%',
	                        marginLeft: '0%',
	                        position: 'absolute',
	                        borderSizing: 'border-box',
	                        transition: 'top 500ms ease, left 500ms ease, margin 500ms ease'
	                    }, style);

	                    return _react2['default'].createElement(
	                        'div',
	                        { style: _extends({ marginTop: 1 }, style),
	                            key: block.id,
	                            onMouseDown: _this2.dragStart.bind(_this2, block) },
	                        item
	                    );
	                })
	            );
	        }
	    }, {
	        key: '_findItem',
	        value: function _findItem(position) {
	            if (!this.props.children) {
	                return null;
	            }

	            var childs = this.props.children.filter ? this.props.children : [this.props.children];

	            return childs.filter(function (child) {
	                return child.props.position === position;
	            })[0];
	        }
	    }, {
	        key: '_isEdgePositon',
	        value: function _isEdgePositon(position) {
	            var offset = position % this.props.columns;

	            return offset === 0 || offset === this.props.columns - 1;
	        }
	    }, {
	        key: '_generateBlocks',
	        value: function _generateBlocks(props) {
	            var targetLength = props.columns * props.rows;
	            var blocks = [];

	            for (var index = 0; index < targetLength; index++) {
	                blocks.push({
	                    id: blockId++,
	                    position: index,
	                    previousPosition: index
	                });
	            }

	            return blocks;
	        }
	    }, {
	        key: '_getOffestForPosition',
	        value: function _getOffestForPosition(position) {
	            return {
	                x: position % this.props.columns,
	                y: Math.floor(position / this.props.columns)
	            };
	        }
	    }]);

	    return SortableGrid;
	})(_react.Component);

	exports['default'] = SortableGrid;

	SortableGrid.SortableGridItem = _SortableGridItemSortableGridItem2['default'];
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var SortableGridItem = (function (_Component) {
	    _inherits(SortableGridItem, _Component);

	    function SortableGridItem() {
	        _classCallCheck(this, SortableGridItem);

	        _get(Object.getPrototypeOf(SortableGridItem.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(SortableGridItem, [{
	        key: 'render',
	        value: function render() {
	            return this.props.children;
	        }
	    }]);

	    return SortableGridItem;
	})(_react.Component);

	exports['default'] = SortableGridItem;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;