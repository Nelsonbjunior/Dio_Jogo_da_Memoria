$(document).ready(function() {
    //Condição para o Safari, pois não suporta VH
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
      $(".game").height( $(window).height() * 0.9 );
    }
      
      var cartas = ['piggy-bank', 'shoe', 'plane', 'suitcase', 'robot', 'ring', 'palm-tree', 'mp3'];
      var pares = cartas.concat(cartas);//criar pares de cartas
      var cartasEscondidas = [];
      var cartasParaVirar = [];
      
      var iniciarJogo = false;
      var jogando = false;
      var acabouTempo = false;
      var contRegIniciada = false;
      var win = false;
      var parCont = 0;
      var time = 30;
      
      shuffleArray(pares);//embaralhar cartas
      
      $('.back').each(function(i, element) {
          $(this).attr('id', pares[i]);//definir id no DOM para cartas, estilo de acesso via CSS
      });
      
      $('.flip-container').click(function(){
          
          if (!acabouTempo) {
          
              if (!iniciarJogo && !jogando){//Antes do jogo começar, mostrar as cartas para o jogador memorizar ao máximo.
                  
                  jogando = true;
                  
                  $('.flip-container').each(function() {
                      $(this).toggleClass('flip');
                  });
                  
                  setTimeout(function() {
                      
                      $('.flip-container').each(function() {
                          $(this).toggleClass('flip');
                      });
                      
                      iniciarJogo = true;
                      jogando = false;
                      
                  }, 2000);
              }
      
              else if ($(this).find('.back').attr('id') == cartasEscondidas[0] && cartasEscondidas[1] == null && $(this).hasClass('flip') && !jogando) {
                  
                  jogando = true;
                  
                  cartasEscondidas[0] = null;//Se um cartão foi escolhido e clicado novamente, vire devolta
                  $(this).toggleClass('flip');
                  
                  jogando = false;
                  
              }
              
              else if ($(this).hasClass('flip')) {
                          
                  return;//Se o cartão clicado já estiver virado, volte a posição inicial
                  
              }
          
              else if (cartasEscondidas[0] == null && cartasEscondidas[1] == null && !$(this).hasClass('flip') && !jogando) {
                  
                  if (!contRegIniciada) {
                      countdown();
                  }
                  
                  jogando = true;
                  
                  cartasEscondidas[0] = $(this).find('.back').attr('id');//Se nenhuma carta tiver sido escolhida, armazene as cartas escolhidas em cartasEscondidas[0]
                  $(this).toggleClass('flip');
                  
                  jogando = false;
                  
              }
          
              
              else if (cartasEscondidas[0] != null && cartasEscondidas[1] == null && !$(this).hasClass('flip') && !jogando) {
                  
                  jogando = true;
                  
                  cartasEscondidas[1] = $(this).find('.back').attr('id');//se nenhuma segunda carta tiver sido virada, armazene a foto da carta escolhida em cartasEscondidas [1] e vire-a
                  $(this).toggleClass('flip');
          
                  if (cartasEscondidas[0] == cartasEscondidas[1]) {
                      
                      cartasEscondidas[0] = null;
                      cartasEscondidas[1] = null;
                      
                      parCont++;
                      
                      if (parCont == cartas.length) {
                          win = true;
                          alert("you win :D");
                      }
                      
                      jogando = false;
                      
                  }
          
                  else {//se as fotos não corresponderem - esvazie as cartasEscondidas e inverta as cartas
                      
                      cartasParaVirar[0] = cartasEscondidas[0];
                      cartasParaVirar[1] = cartasEscondidas[1];
                      
                      cartasEscondidas[0] = null;
                      cartasEscondidas[1] = null;
                      
                      setTimeout(function(){//inverter as cartas escolhidas que não correspondem
          
                          $('*[id*=' + cartasParaVirar[0] + ']').each(function() {
                              $(this).closest('.flip').toggleClass('flip');
                          });
                          $('*[id*=' + cartasParaVirar[1] + ']').each(function() {
                              $(this).closest('.flip').toggleClass('flip');
                          });
                          
                          jogando = false;
                          
                      }, 800);
                  }
                  
              }
                  
          } else {
              alert("Tempo Esgostado :(");
          };
          
      });
      
      function shuffleArray(array) {
          for (var i = array.length - 1; i > 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = array[i];
              array[i] = array[j];
              array[j] = temp;
          }
          return array;
      }
      
      function countdown () {
          
          contRegIniciada = true;
      
          var timeStart = +new Date;
          var timer = setInterval( function() {
              
              var timeNow = +new Date;
              var difference = ( timeNow - timeStart ) / 1000; 
              
              if (time > 0 && !win) {// se ainda houver tempo restante e o jogo não for ganho, reduza o tempo
                  
                  time = 30;
                  time = Math.floor( time - difference );
                  $('.timer').text( time );
                  
              } else if (win) {//para o cronômetro quando o jogo for ganho
                  
                  clearInterval(timer);
                  
              } else {//para o cronômetro quando o tempo acabar
                  
                  acabouTempo = true;
                  alert("Tempo Esgotado :(");
                  
                  clearInterval(timer);
                  
              } 
              
          }, 250 );
          
      };
  
  });