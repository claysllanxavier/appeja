/* global angular, document, window */
'use strict';

angular.module('starter.services', [])


.factory('Hostname', function() {
  return {url : 'http://172.19.0.3:8000'};
})
.factory('AuthService', function ($q) {
  return {
    getToken: function () {
      return window.localStorage.token
    },
    setToken: function (token) {
      window.localStorage.token = token
    },
    logout: function () {
      delete window.localStorage.token
      $q.when()
    },
    isLoggedIn: function () {
      return window.localStorage.token ? true : false;
    },
    getUser: function () {
      return JSON.parse(window.localStorage.user)
    },
    setUser: function (user) {
      window.localStorage.user = JSON.stringify(user)
    }

  }
})
.factory('AuthInterceptor', function ($location, AuthService, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {}

      if (AuthService.getToken()) {
        config.headers['x-access-token'] = AuthService.getToken()
      }

      return config
    },
    responseError: function (response) {
      return $q.reject(response)
    }
  }
})
