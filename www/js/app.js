// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Turn off caching for demo simplicity's sake
  $ionicConfigProvider.views.maxCache(0);

  /*
  // Turn off back button text
  $ionicConfigProvider.backButton.previousTitleText(false);
  */

  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.quiz', {
    url: '/quiz',
    views: {
      'menuContent': {
        templateUrl: 'templates/quiz.html',
        controller: 'QuizCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })

  .state('app.conteudos', {
    url: '/conteudos',
    views: {
      'menuContent': {
        templateUrl: 'templates/conteudos.html',
        controller: 'ConteudoCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })

  .state('app.conteudosquiz', {
    url: '/conteudosquiz',
    views: {
      'menuContent': {
        templateUrl: 'templates/conteudosQuiz.html',
        controller: 'ConteudoQuizCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })

  .state('app.cadastro', {
    url: '/cadastro',
    views: {
      'menuContent': {
        templateUrl: 'templates/cadastro.html',
        controller: 'CadastroCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })

  .state('app.inicio', {
    url: '/inicio',
    views: {
      'menuContent': {
        templateUrl: 'templates/inicio.html',
        controller: 'InicioCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })

  .state('app.sobre', {
    url: '/sobre',
    views: {
      'menuContent': {
        templateUrl: 'templates/sobre.html',
        controller: 'SobreCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })
  
  .state('app.videos', {
    url: '/videos',
    views: {
      'menuContent': {
        templateUrl: 'templates/videos.html',
        controller: 'VideosCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
