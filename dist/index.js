/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var XHRUploader = function (_React$Component) {
	  _inherits(XHRUploader, _React$Component);
	
	  _createClass(XHRUploader, null, [{
	    key: 'propTypes',
	    get: function get() {
	      return {
	        url: _react2.default.PropTypes.string.isRequired,
	        fieldName: _react2.default.PropTypes.string,
	        buttonLabel: _react2.default.PropTypes.string,
	        accept: _react2.default.PropTypes.string,
	        chunks: _react2.default.PropTypes.bool,
	        chunkSize: _react2.default.PropTypes.number
	      };
	    }
	  }, {
	    key: 'defaultProps',
	    get: function get() {
	      return {
	        fieldName: 'datafile',
	        buttonLabel: 'Upload',
	        accept: 'image/*',
	        chunks: false,
	        chunkSize: 512 * 1024
	      };
	    }
	  }]);
	
	  function XHRUploader(props) {
	    _classCallCheck(this, XHRUploader);
	
	    var _this = _possibleConstructorReturn(this, (XHRUploader.__proto__ || Object.getPrototypeOf(XHRUploader)).call(this, props));
	
	    _this.state = { items: [] };
	    _this.xhrs = [];
	    return _this;
	  }
	
	  _createClass(XHRUploader, [{
	    key: 'onClick',
	    value: function onClick() {
	      this.refs.fileInput.click();
	    }
	  }, {
	    key: 'onFileSelect',
	    value: function onFileSelect() {
	      var _this2 = this;
	
	      var items = this.filesToItems(this.refs.fileInput.files);
	      this.setState({ items: items }, function () {
	        _this2.upload();
	      });
	    }
	  }, {
	    key: 'upload',
	    value: function upload() {
	      var _this3 = this;
	
	      var items = this.state.items;
	      if (items) {
	        items.filter(function (item) {
	          return !item.cancelled;
	        }).forEach(function (item) {
	          _this3.uploadItem(item);
	        });
	      }
	    }
	  }, {
	    key: 'uploadItem',
	    value: function uploadItem(item) {
	      if (this.props.chunks) {
	        var BYTES_PER_CHUNK = this.props.chunkSize;
	        var SIZE = item.file.size;
	
	        var start = 0;
	        var end = BYTES_PER_CHUNK;
	
	        var chunkIndex = 0;
	        while (start < SIZE) {
	          this.uploadChunk(item.file.slice(start, end), chunkIndex++, item.file.name);
	          start = end;
	          end = start + BYTES_PER_CHUNK;
	        }
	      } else {
	        this.uploadFile(item.file);
	      }
	    }
	  }, {
	    key: 'uploadChunk',
	    value: function uploadChunk(blob, chunkIndex, fileName) {
	      if (blob) {
	        var formData = new FormData();
	        var xhr = new XMLHttpRequest();
	
	        formData.append(this.props.fieldName, blob, fileName + '-chunk' + chunkIndex);
	
	        xhr.open('POST', this.props.url, true);
	        xhr.send(formData);
	      }
	    }
	  }, {
	    key: 'uploadFile',
	    value: function uploadFile(file) {
	      if (file) {
	        var formData = new FormData();
	        var xhr = new XMLHttpRequest();
	
	        formData.append(this.props.fieldName, file, file.name);
	
	        xhr.open('POST', this.props.url, true);
	        xhr.send(formData);
	        this.xhrs[file.index] = xhr;
	      }
	    }
	  }, {
	    key: 'filesToItems',
	    value: function filesToItems(files) {
	      var _this4 = this;
	
	      var fileItems = Array.prototype.slice.call(files).slice(0, this.props.maxFiles);
	      var items = fileItems.map(function (f, i) {
	        if (_this4.props.chunks) {
	          var chunkProgress = [];
	          for (var j = 0; j <= f.size / _this4.props.chunkSize; j++) {
	            chunkProgress.push(0);
	          }
	          return { file: f, index: i, progress: 0, cancelled: false, chunkProgress: chunkProgress };
	        }
	        return { file: f, index: i, progress: 0, cancelled: false };
	      });
	      return items;
	    }
	  }, {
	    key: 'renderButton',
	    value: function renderButton() {
	      var _this5 = this;
	
	      return _react2.default.createElement(
	        'button',
	        { onClick: function onClick() {
	            return _this5.onClick();
	          } },
	        this.props.buttonLabel
	      );
	    }
	  }, {
	    key: 'renderInput',
	    value: function renderInput() {
	      var _this6 = this;
	
	      return _react2.default.createElement('input', { style: { display: 'none' }, accept: this.props.accept, type: 'file', ref: 'fileInput', onChange: function onChange() {
	          return _this6.onFileSelect();
	        } });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.renderButton(),
	        this.renderInput()
	      );
	    }
	  }]);
	
	  return XHRUploader;
	}(_react2.default.Component);
	
	exports.default = XHRUploader;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = undefined;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map