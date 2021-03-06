'use strict';

System.register([], function (_export, _context) {
  var _typeof, _class, _temp, slice, authUtils;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function setHashKey(obj, h) {
    if (h) {
      obj.$$hashKey = h;
    } else {
      delete obj.$$hashKey;
    }
  }

  function baseExtend(dst, objs, deep) {
    var h = dst.$$hashKey;

    for (var i = 0, ii = objs.length; i < ii; ++i) {
      var obj = objs[i];
      if (!authUtils.isObject(obj) && !authUtils.isFunction(obj)) {
        continue;
      }
      var keys = Object.keys(obj);
      for (var j = 0, jj = keys.length; j < jj; j++) {
        var key = keys[j];
        var src = obj[key];

        if (deep && authUtils.isObject(src)) {
          if (!authUtils.isObject(dst[key])) {
            dst[key] = authUtils.isArray(src) ? [] : {};
          }
          baseExtend(dst[key], [src], true);
        } else {
          dst[key] = src;
        }
      }
    }

    setHashKey(dst, h);
    return dst;
  }

  return {
    setters: [],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      slice = [].slice;

      _export('authUtils', authUtils = (_temp = _class = function () {
        function authUtils() {
          _classCallCheck(this, authUtils);
        }

        authUtils.isDefined = function isDefined(value) {
          return typeof value !== 'undefined';
        };

        authUtils.camelCase = function camelCase(name) {
          return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
          });
        };

        authUtils.parseQueryString = function parseQueryString(keyValue) {
          var obj = {};
          var key = void 0;
          var value = void 0;

          authUtils.forEach((keyValue || '').split('&'), function (keyValuePair) {
            if (keyValuePair) {
              value = keyValuePair.split('=');
              key = decodeURIComponent(value[0]);
              obj[key] = authUtils.isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
            }
          });
          return obj;
        };

        authUtils.isString = function isString(value) {
          return typeof value === 'string';
        };

        authUtils.isObject = function isObject(value) {
          return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
        };

        authUtils.isFunction = function isFunction(value) {
          return typeof value === 'function';
        };

        authUtils.joinUrl = function joinUrl(baseUrl, url) {
          if (/^(?:[a-z]+:)?\/\//i.test(url)) {
            return url;
          }

          var joined = [baseUrl, url].join('/');

          var normalize = function normalize(str) {
            return str.replace(/[\/]+/g, '/').replace(/\/\?/g, '?').replace(/\/\#/g, '#').replace(/\:\//g, '://');
          };

          return normalize(joined);
        };

        authUtils.isBlankObject = function isBlankObject(value) {
          return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Object.getPrototypeOf(value);
        };

        authUtils.isArrayLike = function isArrayLike(obj) {
          if (obj === null || authUtils.isWindow(obj)) {
            return false;
          }
        };

        authUtils.isWindow = function isWindow(obj) {
          return obj && obj.window === obj;
        };

        authUtils.extend = function extend(dst) {
          return baseExtend(dst, slice.call(arguments, 1), false);
        };

        authUtils.merge = function merge(dst) {
          return baseExtend(dst, slice.call(arguments, 1), true);
        };

        authUtils.forEach = function (_forEach) {
          function forEach(_x, _x2, _x3) {
            return _forEach.apply(this, arguments);
          }

          forEach.toString = function () {
            return _forEach.toString();
          };

          return forEach;
        }(function (obj, iterator, context) {
          var key = void 0;
          var length = void 0;

          if (!obj) {
            return obj;
          }

          if (authUtils.isFunction(obj)) {
            for (key in obj) {
              if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                iterator.call(context, obj[key], key, obj);
              }
            }
          } else if (authUtils.isArray(obj) || authUtils.isArrayLike(obj)) {
            var isPrimitive = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object';
            for (key = 0, length = obj.length; key < length; key++) {
              if (isPrimitive || key in obj) {
                iterator.call(context, obj[key], key, obj);
              }
            }
          } else if (obj.forEach && obj.forEach !== forEach) {
            obj.forEach(iterator, context, obj);
          } else if (authUtils.isBlankObject(obj)) {
            for (key in obj) {
              iterator.call(context, obj[key], key, obj);
            }
          } else if (typeof obj.hasOwnProperty === 'function') {
            for (key in obj) {
              if (obj.hasOwnProperty(key)) {
                iterator.call(context, obj[key], key, obj);
              }
            }
          } else {
            for (key in obj) {
              if (hasOwnProperty.call(obj, key)) {
                iterator.call(context, obj[key], key, obj);
              }
            }
          }
        });

        return authUtils;
      }(), _class.isArray = Array.isArray, _temp));

      _export('authUtils', authUtils);
    }
  };
});