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
.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'Sem conexão com a internet',
          content: 'Desculpe, nenhuma conexão foi indentificada. Por favor reconecte seu celular e tente novamente.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Turn off caching for demo simplicity's sake
  $ionicConfigProvider.views.maxCache(5);

  // Enable Native Scrolling on Android
  $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);


  /*
  // Turn off back button text
  $ionicConfigProvider.backButton.previousTitleText(false);
  */

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('cadastro', {
    url: '/cadastro',
    templateUrl: 'templates/cadastro.html',
    controller: 'CadastroCtrl'
  })


  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.quiz', {
    url: '/quiz/:id',
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
    },
    onEnter: function($state, AuthService){
      if(!AuthService.isLoggedIn()){
        $state.go('login');
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
    url: '/videos/:id',
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
  .state('app.logout', {
    url: '/logout',
    views: {
      'menuContent': {
        template: '',
        controller: 'LogoutCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicio');
});
