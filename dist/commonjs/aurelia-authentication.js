'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authUtils = exports.AuthorizeStep = exports.AuthService = exports.FetchConfig = exports.configure = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _aureliaFetchClient = require('aurelia-fetch-client');

var _aureliaApi = require('spoonx/aurelia-api');

var _authService = require('./authService');

var _authorizeStep = require('./authorizeStep');

var _baseConfig = require('./baseConfig');

var _appFetchHttpClient = require('./app.fetch-httpClient.config');

var _authUtils = require('./authUtils');

require('./authFilter');

function configure(aurelia, config) {
  aurelia.globalResources('./authFilter');

  var baseConfig = aurelia.container.get(_baseConfig.BaseConfig);

  if (typeof config === 'function') {
    config(baseConfig);
  } else if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
    baseConfig.configure(config);
  }

  var fetchConfig = aurelia.container.get(_appFetchHttpClient.FetchConfig);
  var clientConfig = aurelia.container.get(_aureliaApi.Config);

  if (Array.isArray(baseConfig.current.configureEndpoints)) {
    baseConfig.current.configureEndpoints.forEach(function (endpointToPatch) {
      fetchConfig.configure(endpointToPatch);
    });
  }

  var client = void 0;

  if (baseConfig.current.endpoint !== null) {
    client = clientConfig.getEndpoint(baseConfig.current.endpoint);
    if (!client) {
      throw new Error('There is no \'' + (baseConfig.current.endpoint || 'default') + '\' endpoint registered.');
    }
  }

  if (!(client instanceof _aureliaApi.Rest)) {
    client = new _aureliaApi.Rest(aurelia.container.get(_aureliaFetchClient.HttpClient));
  }

  baseConfig.current.client = client;
}

exports.configure = configure;
exports.FetchConfig = _appFetchHttpClient.FetchConfig;
exports.AuthService = _authService.AuthService;
exports.AuthorizeStep = _authorizeStep.AuthorizeStep;
exports.authUtils = _authUtils.authUtils;