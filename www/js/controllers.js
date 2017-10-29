
/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.isExpanded = false;
  $scope.hasHeaderFabLeft = false;
  $scope.hasHeaderFabRight = false;

  var navIcons = document.getElementsByClassName('ion-navicon');
  for (var i = 0; i < navIcons.length; i++) {
    navIcons.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  }

  ////////////////////////////////////////
  // Layout Methods
  ////////////////////////////////////////

  $scope.hideNavBar = function() {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
  };

  $scope.showNavBar = function() {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
  };

  $scope.noHeader = function() {
    var content = document.getElementsByTagName('ion-content');
    for (var i = 0; i < content.length; i++) {
      if (content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }
  };

  $scope.setExpanded = function(bool) {
    $scope.isExpanded = bool;
  };

  $scope.setHeaderFab = function(location) {
    var hasHeaderFabLeft = false;
    var hasHeaderFabRight = false;

    switch (location) {
      case 'left':
      hasHeaderFabLeft = true;
      break;
      case 'right':
      hasHeaderFabRight = true;
      break;
    }

    $scope.hasHeaderFabLeft = hasHeaderFabLeft;
    $scope.hasHeaderFabRight = hasHeaderFabRight;
  };

  $scope.hasHeader = function() {
    var content = document.getElementsByTagName('ion-content');
    for (var i = 0; i < content.length; i++) {
      if (!content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }

  };

  $scope.hideHeader = function() {
    $scope.hideNavBar();
    $scope.noHeader();
  };

  $scope.showHeader = function() {
    $scope.showNavBar();
    $scope.hasHeader();
  };

  $scope.clearFabs = function() {
    var fabs = document.getElementsByClassName('button-fab');
    if (fabs.length && fabs.length > 1) {
      fabs[0].remove();
    }
  };
})

.controller('LoginCtrl', function($scope, $http, $rootScope, $timeout, $location, $stateParams, ionicMaterialInk, $ionicPopup, Hostname, $ionicLoading, AuthService) {
  $scope.$parent.clearFabs();
  $timeout(function() {
    $scope.$parent.hideHeader();
  }, 0);
  ionicMaterialInk.displayEffect();
  $scope.show = function() {
    $ionicLoading.show({
      template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.login = function (usuario){
    $scope.show($ionicLoading);
    $http.post(Hostname.url+'/api/login',{data : usuario},{headers: {'Content-Type': 'application/json'}})
    .success(function(data) {
      AuthService.setToken(data.token)
      $location.path("/app/inicio");
      $rootScope.usuario = data;
    })
    .error(function() {
      $ionicPopup.alert({
        title: 'Falha no Login',
        template: 'Usuário ou senha incorretos.'
      });
    })
    .finally(function($ionicLoading) {
      // On both cases hide the loading
      $scope.hide($ionicLoading);
    });
  }
})

.controller('CadastroCtrl', function($scope, $http, $timeout, $location, $stateParams, ionicMaterialInk,  $ionicPopup,Hostname, $ionicLoading) {
  $scope.$parent.clearFabs();
  $timeout(function() {
    $scope.$parent.hideHeader();
  }, 0);
  ionicMaterialInk.displayEffect();

  $scope.show = function() {
    $ionicLoading.show({
      template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };


  $scope.salvaUsuario = function (usuario){
    $scope.show($ionicLoading);
    if(usuario.senha === usuario.confSenha){
      delete usuario.confSenha;
      $http.post(Hostname.url+'/api/usuario',{data : usuario},{headers: {'Content-Type': 'application/json'}})
      .success(function() {
        $ionicPopup.alert({
          title: 'SUCESSO',
          template: 'Usuário cadastrado com sucesso.'
        });
        $location.path("/login");
      })
      .error(function() {
        $ionicPopup.alert({
          title: 'ERRO',
          template: 'Alguma coisa está errada. Refaça a operação!'
        });
      })
      .finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });
    }else{
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'ERRO',
        template: 'As senhas não conferem. Favor corrigir.'
      });
    }
  }
})

.controller('VideosCtrl', function($scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,  $sce, Hostname) {
  // Set Header
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

  // Set Motion
  $timeout(function() {
    ionicMaterialMotion.slideUp({
      selector: '.slide-up'
    });
  }, 300);

  $timeout(function() {
    ionicMaterialMotion.fadeSlideInRight({
      startVelocity: 3000
    });
  }, 700);

  // Set Ink
  ionicMaterialInk.displayEffect();

  var idconteudo = $stateParams.id;

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.videos = [];

  $http.get(Hostname.url+"/api/conteudo/"+idconteudo+"/video")
  .then(function(response) {
    $scope.videos = response.data.videos;
  });

})

.controller('InicioCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
  // Set Header
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

  // Set Motion
  $timeout(function() {
    ionicMaterialMotion.slideUp({
      selector: '.slide-up'
    });
  }, 300);

  $timeout(function() {
    ionicMaterialMotion.fadeSlideInRight({
      startVelocity: 3000
    });
  }, 700);

  // Set Ink
  ionicMaterialInk.displayEffect();
})

.controller('QuizCtrl', function($scope, $http, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPopup, $location, Hostname) {
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab('right');

  $timeout(function() {
    ionicMaterialMotion.fadeSlideIn({
      selector: '.animate-fade-slide-in .item'
    });
  }, 200);

  // Activate ink for controller
  ionicMaterialInk.displayEffect();

  var idconteudo = $stateParams.id;
  var idusuario = $rootScope.usuario._id;

  $scope.pergunta ={
    qtdacertos:0,
    qtdperguntas:0
  }
  buscaPergunta();
  $scope.data = {
    respostaUsuario: 'ng'
  };

  function buscaPergunta(){
    $http.get(Hostname.url+"/api/usuario/"+idusuario+"/conteudo/"+ idconteudo)
    .then(function(response) {
      $scope.pergunta = response.data;
    });
  }

  $scope.envia = function (result){
    $scope.data.idpergunta = $scope.pergunta._id;
    $scope.data.idconteudo =  idconteudo;
    $scope.data.acertou = $scope.pergunta.respostaCerta == $scope.data.respostaUsuario;
    $scope.data.idusuario = idusuario;
    var dados = $scope.data;
    $http.post(Hostname.url+'/api/resposta',{data : dados},{headers: {'Content-Type': 'application/json'}})
    .then(function mySuccess(response) {
      if($scope.pergunta.respostaCerta == $scope.data.respostaUsuario){
        $ionicPopup.alert({
          title: 'SUCESSO',
          template: 'Parabéns. Resposta Certa.'
        });
        $timeout(function() {
          ionicMaterialInk.displayEffect();
        }, 0);
        buscaPergunta();
      }
      else{
        $ionicPopup.alert({
          title: 'ERRADA',
          template: 'Desta vez você errou. Tente Novamente.'
        });
        $timeout(function() {
          ionicMaterialInk.displayEffect();
        }, 0);
        buscaPergunta();
      }
    }, function myError(response) {
      $ionicPopup.alert({
        title: 'ERRO',
        template: 'Problema de Conexão. Tente mais tarde.'
      });
      $timeout(function() {
        ionicMaterialInk.displayEffect();
      }, 0);
    });
  }
  $scope.refazer = function (){
    $http.delete(Hostname.url + '/api/usuario/' + idusuario + "/conteudo/" + idconteudo)
    .then(function mySuccess() {
      $ionicPopup.alert({
        title: 'SUCESSO',
        template: 'Vocẽ irá começar o quiz novamente!'
      });
      $timeout(function() {
        ionicMaterialInk.displayEffect();
      }, 0);
      $location.path("/app/conteudosquiz");
    })
  }

})

.controller('ConteudoCtrl', function($scope, $http, $location, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, Hostname) {
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab(false);

  // Activate ink for controller
  ionicMaterialInk.displayEffect();

  ionicMaterialMotion.pushDown({
    selector: '.push-down'
  });
  ionicMaterialMotion.fadeSlideInRight({
    selector: '.animate-fade-slide-in .item'
  });

  $scope.conteudos = [];

  $http.get(Hostname.url+"/api/conteudo")
  .then(function(response) {
    $scope.conteudos = response.data;
  });

  $scope.chamaVideos = function (id){
    $location.path("/app/videos/" + id);
  }
})

.controller('ConteudoQuizCtrl', function($scope, $rootScope, $http, $location, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, Hostname) {
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab(false);

  // Activate ink for controller
  ionicMaterialInk.displayEffect();

  ionicMaterialMotion.pushDown({
    selector: '.push-down'
  });
  ionicMaterialMotion.fadeSlideInRight({
    selector: '.animate-fade-slide-in .item'
  });

  $scope.conteudos = [];

  var idusuario = $rootScope.usuario._id;

  $http.get(Hostname.url+"/api/conteudo-usuario/"+idusuario)
  .then(function(response) {
    $scope.conteudos = response.data;
  });

  $scope.chamaQuiz = function (id){
    $location.path("/app/quiz/"+id);
  }
})

.controller('SobreCtrl', function($scope, $http, $location, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab(false);

  // Activate ink for controller
  ionicMaterialInk.displayEffect();

  ionicMaterialMotion.pushDown({
    selector: '.push-down'
  });
  ionicMaterialMotion.fadeSlideInRight({
    selector: '.animate-fade-slide-in .item'
  });
})
.controller('LogoutCtrl', function($scope, $http, $location, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, AuthService) {
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab(false);

  // Activate ink for controller
  ionicMaterialInk.displayEffect();

  ionicMaterialMotion.pushDown({
    selector: '.push-down'
  });
  ionicMaterialMotion.fadeSlideInRight({
    selector: '.animate-fade-slide-in .item'
  });
  logout();

  function logout () {
    delete window.localStorage.token
    $location.path("/app/login");
  }
})
.service('Hostname', function() {
  return {url : 'http://172.19.0.2:8000'};
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
    }
  }
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor')
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
