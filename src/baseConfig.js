import {authUtils} from './authUtils';

export class BaseConfig {
  configure(incomingConfig) {
    authUtils.merge(this._current, incomingConfig);
  }

  get current() {
    return this._current;
  }

  constructor() {
    this._current = {
      // Used internally. The used Rest instance; set during configuration (see index.js)
      client: null,

      // If using aurelia-api:
      // =====================

      // This is the name of the endpoint used for any requests made in relation to authentication (login, logout, etc.). An empty string selects the default endpoint of aurelia-api.
      endpoint: null,
      // When authenticated, these endpoints will have the token added to the header of any requests (for authorization). Accepts an array of endpoint names. An empty string selects the default endpoint of aurelia-api.
      configureEndpoints: null,


      // SPA related options
      // ===================

      // The SPA url to which the user is redirected after a successful login
      loginRedirect: '#/customer',
      // The SPA url to which the user is redirected after a successful logout
      logoutRedirect: '#/',
      // The SPA route used when an unauthenticated user tries to access an SPA page that requires authentication
      loginRoute: '/login',
      // Whether or not an authentication token is provided in the response to a successful signup
      loginOnSignup: true,
      // If loginOnSignup == false: The SPA url to which the user is redirected after a successful signup (else loginRedirect is used)
      signupRedirect: '#/login',


      // API related options
      // ===================

      // The base url used for all authentication related requests, including provider.url below.
      // This appends to the httpClient/endpoint base url, it does not override it.
      baseUrl: '',
      // The API endpoint to which login requests are sent
      loginUrl: '/auth/login',
      // The API endpoint to which signup requests are sent
      signupUrl: '/auth/signup',
      // The API endpoint used in profile requests (inc. `find/get` and `update`)
      profileUrl: '/auth/me',
      // The API endpoint used with oAuth to unlink authentication
      unlinkUrl: '/auth/unlink/',
      // The HTTP method used for 'unlink' requests (Options: 'get' or 'post')
      unlinkMethod: 'get',

      // Refresh Token Options
      // =====================

      // Option to turn refresh tokens On/Off
      useRefreshToken: false,
      // The option to enable/disable the automatic refresh of Auth tokens using Refresh Tokens
      autoUpdateToken: true,
      // This allows the refresh token to be a further object deeper `{ "responseTokenProp": { "refreshTokenRoot" : { "tokenName" : '...' } } }`
      refreshTokenRoot: false,
      // This is the property from which to get the token `{ "responseTokenProp": { "refreshTokenName" : '...' } }`
      refreshTokenName: 'refresh_token',
      // Prepended to the `refreshTokenName` when kept in storage (nothing to do with)
      refreshTokenPrefix: 'aurelia',
      // Oauth Client Id
      clientId: false,

      // Token Related options
      // =====================

      // The header property used to contain the authToken in the header of API requests that require authentication
      authHeader: 'Authorization',
      // The token name used in the header of API requests that require authentication
      authToken: 'Bearer',
      // The the property from which to get the authentication token after a successful login or signup
      responseTokenProp: 'access_token',

      // If the property defined by `responseTokenProp` is an object:
      // ------------------------------------------------------------

      //This is the property from which to get the token `{ "responseTokenProp": { "tokenName" : '...' } }`
      tokenName: 'token',
      // This allows the token to be a further object deeper `{ "responseTokenProp": { "tokenRoot" : { "tokenName" : '...' } } }`
      tokenRoot: false,


      // Miscellaneous Options
      // =====================

      // Whether to enable the fetch interceptor which automatically adds the authentication headers
      // (or not... e.g. if using a session based API or you want to override the default behaviour)
      httpInterceptor: true,
      // For OAuth only: Tell the API whether or not to include token cookies in the response (for session based APIs)
      withCredentials: true,
      // Controls how the popup is shown for different devices (Options: 'browser' or 'mobile')
      platform: 'browser',
      // Determines the `window` property name upon which aurelia-auth data is stored (Default: `window.localStorage`)
      storage: 'localStorage',
      // Prepended to the `tokenName` when kept in storage (nothing to do with)
      tokenPrefix: 'aurelia',


      //OAuth provider specific related configuration
      // ============================================
      providers: {
        google: {
          name: 'google',
          url: '/auth/google',
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['profile', 'email'],
          scopePrefix: 'openid',
          scopeDelimiter: ' ',
          requiredUrlParams: ['scope'],
          optionalUrlParams: ['display'],
          display: 'popup',
          type: '2.0',
          /*clientId: '239531826023-ibk10mb9p7ull54j55a61og5lvnjrff6.apps.googleusercontent.com',*/
          popupOptions: {
            width: 452,
            height: 633
          }
        },
        facebook: {
          name: 'facebook',
          url: '/auth/facebook',
          authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
          redirectUri: window.location.origin + '/' || window.location.protocol + '//' + window.location.host + '/',
          scope: ['email'],
          scopeDelimiter: ',',
          nonce: function() {
            return Math.random();
          },
          requiredUrlParams: ['nonce', 'display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: {
            width: 580,
            height: 400
          }
        },
        linkedin: {
          name: 'linkedin',
          url: '/auth/linkedin',
          authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          requiredUrlParams: ['state'],
          scope: ['r_emailaddress'],
          scopeDelimiter: ' ',
          state: 'STATE',
          type: '2.0',
          popupOptions: {
            width: 527,
            height: 582
          }
        },
        github: {
          name: 'github',
          url: '/auth/github',
          authorizationEndpoint: 'https://github.com/login/oauth/authorize',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          optionalUrlParams: ['scope'],
          scope: ['user:email'],
          scopeDelimiter: ' ',
          type: '2.0',
          popupOptions: {
            width: 1020,
            height: 618
          }
        },
        yahoo: {
          name: 'yahoo',
          url: '/auth/yahoo',
          authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: [],
          scopeDelimiter: ',',
          type: '2.0',
          popupOptions: {
            width: 559,
            height: 519
          }
        },
        twitter: {
          name: 'twitter',
          url: '/auth/twitter',
          authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
          type: '1.0',
          popupOptions: {
            width: 495,
            height: 645
          }
        },
        live: {
          name: 'live',
          url: '/auth/live',
          authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['wl.emails'],
          scopeDelimiter: ' ',
          requiredUrlParams: ['display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: {
            width: 500,
            height: 560
          }
        },
        instagram: {
          name: 'instagram',
          url: '/auth/instagram',
          authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          requiredUrlParams: ['scope'],
          scope: ['basic'],
          scopeDelimiter: '+',
          display: 'popup',
          type: '2.0',
          popupOptions: {
            width: 550,
            height: 369
          }
        }
      }
    };
  }
}
