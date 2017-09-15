
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

.controller('LoginCtrl', function($scope, $http, $rootScope, $timeout, $location, $stateParams, ionicMaterialInk, $ionicPopup, Hostname, $ionicLoading) {
  $scope.$parent.clearFabs();
  $timeout(function() {
    $scope.$parent.hideHeader();
  }, 0);
  ionicMaterialInk.displayEffect();
  $scope.login = function (usuario){
    $ionicLoading.show({
           template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
       });
    if(angular.isObject(usuario) && !angular.isUndefined(usuario.email) && !angular.isUndefined(usuario.senha)){
      $http.post(Hostname.url+'/api/usuario',{data : usuario},{headers: {'Content-Type': 'application/json'}})
      .then(function mySuccess(data) {
        $location.path("/app/inicio");
        $rootScope.usuario = data;
        $ionicLoading.hide();
      }, function myError(response) {
        $ionicPopup.alert({
          title: 'ERRO',
          template: 'Usuário ou senha incorretos.'
        });
        $timeout(function() {
          ionicMaterialInk.displayEffect();
        }, 0);
      });
      $ionicLoading.hide();
    }
    else{
      $ionicPopup.alert({
        title: 'ERRO',
        template: 'Alguma coisa está errada. Refaça a operação!'
      });
      $timeout(function() {
        ionicMaterialInk.displayEffect();
      }, 0);
      $ionicLoading.hide();
    }
  }
})

.controller('CadastroCtrl', function($scope, $http, $timeout, $location, $stateParams, ionicMaterialInk,  $ionicPopup,Hostname, $ionicLoading) {
  $scope.$parent.clearFabs();
  $timeout(function() {
    $scope.$parent.hideHeader();
  }, 0);
  ionicMaterialInk.displayEffect();

  $scope.salvaUsuario = function (usuario){
    if(angular.isObject(usuario) && !angular.isUndefined(usuario.nome) && !angular.isUndefined(usuario.email)&& !angular.isUndefined(usuario.escola)&& !angular.isUndefined(usuario.senha)){
      if(usuario.senha === usuario.confSenha){
        delete usuario.confSenha;
        $ionicLoading.show({
           template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
       });
        $http.post(Hostname.url+'/api/usuarios',{data : usuario},{headers: {'Content-Type': 'application/json'}})
        .then(function mySuccess(response) {
          $ionicPopup.alert({
            title: 'SUCESSO',
            template: 'Usuário cadastrado com sucesso.'
          });
          $timeout(function() {
            ionicMaterialInk.displayEffect();
          }, 0);
          $ionicLoading.hide();
          $location.path("/login");
        }, function myError(response) {
          $ionicPopup.alert({
            title: 'ERRO',
            template: 'Alguma coisa está errada. Refaça a operação!'
          });
          $timeout(function() {
            ionicMaterialInk.displayEffect();
          }, 0);
          $ionicLoading.hide();
        });
      }else{
        $ionicPopup.alert({
          title: 'ERRO',
          template: 'As senhas não conferem. Favor corrigir.'
        });
        $timeout(function() {
          ionicMaterialInk.displayEffect();
        }, 0);
        $ionicLoading.hide();
      }
    }else{
      $ionicPopup.alert({
        title: 'ERRO',
        template: 'Alguma coisa está errada. Refaça a operação!'
      });
      $timeout(function() {
        ionicMaterialInk.displayEffect();
      }, 0);
      $ionicLoading.hide();
    }
  }
})

.controller('VideosCtrl', function($scope, $http, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, videoServico, $sce, Hostname) {
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

  var idconteudo = videoServico.get();

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.videos = [];

  $http.get(Hostname.url+"/api/conteudo/videos/"+idconteudo)
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

.controller('QuizCtrl', function($scope, $http, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPopup, $location, Hostname, quizServico) {
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

  var idconteudo = quizServico.get();
  var idusuario = $rootScope.usuario.data._id;

  buscaPergunta();
  $scope.perguntas = {};
  $scope.data = {
    respostaUsuario: 'ng'
  };

  function buscaPergunta(){
    $http.get(Hostname.url+"/api/conteudo/"+idconteudo+"/pergunta/"+idusuario)
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
    $http.post(Hostname.url+'/api/pergunta',{data : dados},{headers: {'Content-Type': 'application/json'}})
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
      $scope.count++;
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

.controller('ConteudoCtrl', function($scope, $http, $location, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, videoServico, Hostname) {
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

  $http.get(Hostname.url+"/api/conteudos")
  .then(function(response) {
    $scope.conteudos = response.data;
  });

  $scope.chamaVideos = function (id){
    videoServico.set(id);
    $location.path("/app/videos");
  }
})

.controller('ConteudoQuizCtrl', function($scope, $rootScope, $http, $location, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, quizServico, Hostname) {
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

  var idusuario = $rootScope.usuario.data._id;

  $http.get(Hostname.url+"/api/conteudo/"+idusuario)
  .then(function(response) {
    $scope.conteudos = response.data;
  });

  $scope.chamaQuiz = function (id){
    quizServico.set(id);
    $location.path("/app/quiz");
  }
})

.controller('SobreCtrl', function($scope, $http, $location, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, videoServico) {
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
.service('videoServico', function() {
  var savedData = {}
  function set(data) {
    savedData = data;
  }
  function get() {
    return savedData;
  }
  return {
    set: set,
    get: get
  }
})
.service('quizServico', function() {
  var savedData = {}
  function set(data) {
    savedData = data;
  }
  function get() {
    return savedData;
  }
  return {
    set: set,
    get: get
  }
})
.service('Hostname', function() {
  return {url : 'https://apieja.azurewebsites.net'};
})


;
