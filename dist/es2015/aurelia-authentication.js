import { HttpClient } from 'aurelia-fetch-client';
import { Config, Rest } from 'spoonx/aurelia-api';

import { AuthService } from './authService';
import { AuthorizeStep } from './authorizeStep';
import { BaseConfig } from './baseConfig';
import { FetchConfig } from './app.fetch-httpClient.config';
import { authUtils } from './authUtils';
import './authFilter';

function configure(aurelia, config) {
  aurelia.globalResources('./authFilter');

  let baseConfig = aurelia.container.get(BaseConfig);

  if (typeof config === 'function') {
    config(baseConfig);
  } else if (typeof config === 'object') {
    baseConfig.configure(config);
  }

  let fetchConfig = aurelia.container.get(FetchConfig);
  let clientConfig = aurelia.container.get(Config);

  if (Array.isArray(baseConfig.current.configureEndpoints)) {
    baseConfig.current.configureEndpoints.forEach(endpointToPatch => {
      fetchConfig.configure(endpointToPatch);
    });
  }

  let client;

  if (baseConfig.current.endpoint !== null) {
    client = clientConfig.getEndpoint(baseConfig.current.endpoint);
    if (!client) {
      throw new Error(`There is no '${ baseConfig.current.endpoint || 'default' }' endpoint registered.`);
    }
  }

  if (!(client instanceof Rest)) {
    client = new Rest(aurelia.container.get(HttpClient));
  }

  baseConfig.current.client = client;
}

export { configure, FetchConfig, AuthService, AuthorizeStep, authUtils };