var _dec, _class;

import { inject } from 'aurelia-dependency-injection';
import { Authentication } from './authentication';
import { BaseConfig } from './baseConfig';
import { OAuth1 } from './oAuth1';
import { OAuth2 } from './oAuth2';
import { authUtils } from './authUtils';

export let AuthService = (_dec = inject(Authentication, OAuth1, OAuth2, BaseConfig), _dec(_class = class AuthService {
  constructor(auth, oAuth1, oAuth2, config) {
    this.auth = auth;
    this.oAuth1 = oAuth1;
    this.oAuth2 = oAuth2;
    this.config = config.current;
    this.client = this.config.client;
    this.isRefreshing = false;
  }

  getMe(criteria) {
    if (typeof criteria === 'string' || typeof criteria === 'number') {
      criteria = { id: criteria };
    }
    return this.client.find(this.auth.getProfileUrl(), criteria);
  }

  getCurrentToken() {
    return this.auth.getToken();
  }

  getRefreshToken() {
    return this.auth.getRefreshToken();
  }

  updateMe(body, criteria) {
    if (typeof criteria === 'string' || typeof criteria === 'number') {
      criteria = { id: criteria };
    }
    return this.client.update(this.auth.getProfileUrl(), criteria, body);
  }

  isAuthenticated() {
    let isExpired = this.auth.isTokenExpired();
    if (isExpired && this.config.autoUpdateToken) {
      if (this.isRefreshing) {
        return true;
      }
      this.updateToken();
    }
    return this.auth.isAuthenticated();
  }

  isTokenExpired() {
    return this.auth.isTokenExpired();
  }

  getTokenPayload() {
    return this.auth.getPayload();
  }

  signup(displayName, email, password) {
    let signupUrl = this.auth.getSignupUrl();
    let content;
    if (typeof arguments[0] === 'object') {
      content = arguments[0];
    } else {
      content = {
        'displayName': displayName,
        'email': email,
        'password': password
      };
    }
    return this.client.post(signupUrl, content).then(response => {
      if (this.config.loginOnSignup) {
        this.auth.setTokenFromResponse(response);
      } else if (this.config.signupRedirect) {
        window.location.href = this.config.signupRedirect;
      }

      return response;
    });
  }

  login(email, password) {
    let loginUrl = this.auth.getLoginUrl();
    let config = this.config;
    let clientId = this.config.clientId;
    let content = {};
    if (typeof arguments[1] !== 'string') {
      content = arguments[0];
    } else {
      content = { email: email, password: password };
      if (clientId) {
        content.client_id = clientId;
      }
    }

    return this.client.post(loginUrl, content).then(response => {
      this.auth.setTokenFromResponse(response);
      if (config.useRefreshToken) {
        this.auth.setRefreshTokenFromResponse(response);
      }

      return response;
    });
  }
  logout(redirectUri) {
    return this.auth.logout(redirectUri);
  }

  updateToken() {
    this.isRefreshing = true;
    let loginUrl = this.auth.getLoginUrl();
    let refreshToken = this.auth.getRefreshToken();
    let clientId = this.config.clientId;
    let content = {};
    if (refreshToken) {
      content = { grant_type: 'refresh_token', refresh_token: refreshToken };
      if (clientId) {
        content.client_id = clientId;
      }

      return this.client.post(loginUrl, content).then(response => {
        this.auth.setRefreshToken(response);
        this.auth.setToken(response);
        this.isRefreshing = false;

        return response;
      }).catch(err => {
        this.auth.removeToken();
        this.auth.removeRefreshToken();
        this.isRefreshing = false;

        throw err;
      });
    }
  }

  authenticate(name, redirect, userData) {
    let provider = this.oAuth2;
    if (this.config.providers[name].type === '1.0') {
      provider = this.oAuth1;
    }

    return provider.open(this.config.providers[name], userData || {}).then(response => {
      this.auth.setTokenFromResponse(response, redirect);
      return response;
    });
  }

  unlink(provider) {
    let unlinkUrl = this.config.baseUrl ? authUtils.joinUrl(this.config.baseUrl, this.config.unlinkUrl) : this.config.unlinkUrl;

    if (this.config.unlinkMethod === 'get') {
      return this.client.find(unlinkUrl + provider);
    } else if (this.config.unlinkMethod === 'post') {
      return this.client.post(unlinkUrl, provider);
    }
  }
}) || _class);