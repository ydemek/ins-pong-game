(function () {
  var CSS = {
    arena: {
      width: 900,
      height: 600,
      background: '#62247B',
      position: 'fixed',
      top: '50%',
      left: '50%',
      zIndex: '999',
      transform: 'translate(-50%, -50%)',
    },
    ball: {
      width: 15,
      height: 15,
      position: 'absolute',
      top: 0,
      left: 350,
      borderRadius: 50,
      background: '#C6A62F',
    },
    line: {
      width: 0,
      height: 600,
      borderLeft: '2px dashed #C6A62F',
      position: 'absolute',
      top: 0,
      left: '50%',
    },
    stick: {
      width: 12,
      height: 85,
      position: 'absolute',
      background: '#C6A62F',
    },
    stick1: {
      left: 0,
      top: 150, //515,
    },
    stick2: {
      right: 0,
      top: 150,
    },
    scoreboard: {
      width: '200',
      height: '10%',
      margin: '10px',
      border: '2px solid #C6A62F',
      //position: 'absolute',
    },

    score1: {
      color: '#b25b00',
      fontFamily: 'sans-serif',
      fontSize: '400%',
    },
    score2: {
      color: '#b25b00',
      fontFamily: 'sans-serif',
      fontSize: '400%',
    },
    score1: {
      float: 'left',
    },
    score2: {
      float: 'right',
    },
  };

  var CONSTS = {
    gameSpeed: 15,
    score1: 0,
    score2: 0,
    stick1Speed: 0,
    stick2Speed: 0,
    ballTopSpeed: 0,
    ballLeftSpeed: 0,
  };

  function start() {
    draw();
    setEvents();
    roll();
    loop();
  }

  function draw() {
    $('<div/>', {
      id: 'pong-game',
    })
      .css(CSS.arena)
      .appendTo('body');
    $('<div/>', {
      id: 'pong-line',
    })
      .css(CSS.line)
      .appendTo('#pong-game');
    $('<div/>', {
      id: 'pong-ball',
    })
      .css(CSS.ball)
      .appendTo('#pong-game');
    $('<div/>', {
      id: 'stick-1',
    })
      .css($.extend(CSS.stick1, CSS.stick))
      .appendTo('#pong-game');
    $('<div/>', {
      id: 'stick-2',
    })
      .css($.extend(CSS.stick2, CSS.stick))
      .appendTo('#pong-game');
    $('<div/>', {
      id: 'score-1',
    })
      .css($.extend(CSS.score1, CSS.scoreboard))
      .text(CONSTS.score1)
      .appendTo('#pong-game');
    $('<div/>', {
      id: 'score-2',
    })
      .css($.extend(CSS.score2, CSS.scoreboard))
      .text(CONSTS.score1)
      .appendTo('#pong-game');
  }

  function setEvents() {
    $(document).on('keydown', function (e) {
      if (e.keyCode == 87 && CSS.stick1.top > 0) {
        CONSTS.stick1Speed = -10;
      } else if (e.keyCode == 83 && CSS.stick1.top < 550) {
        CONSTS.stick1Speed = 10;
      } else if (e.keyCode == 38 && CSS.stick2.top > 0) {
        CONSTS.stick2Speed = -10;
      } else if (e.keyCode == 40 && CSS.stick2.top < 550) {
        CONSTS.stick2Speed = 10;
      }

      if (CSS.stick1.top <= 10) {
        CSS.stick1.top = 0;
      }
      if (CSS.stick1.top >= 570 /* CSS.arena.height - CSS.stick.height */) {
        CSS.stick1.top = 515 /* CSS.arena.height - CSS.stick.height */;
      }
      if (CSS.stick2.top <= 10) {
        CSS.stick2.top = 0;
      }
      if (CSS.stick2.top >= 570) {
        CSS.stick2.top = 515;
      }
    });

    $(document).on('keyup', function (e) {
      if (e.keyCode == 87) {
        CONSTS.stick1Speed = 0;
      }
      if (e.keyCode == 83) {
        CONSTS.stick1Speed = 0;
      }
      if (e.keyCode == 38) {
        CONSTS.stick2Speed = 0;
      }
      if (e.keyCode == 40) {
        CONSTS.stick2Speed = 0;
      }
    });
  }

  function loop() {
    window.pongLoop = setInterval(function () {
      CSS.stick1.top += CONSTS.stick1Speed;
      $('#stick-1').css('top', CSS.stick1.top);
      CSS.stick2.top += CONSTS.stick2Speed;
      $('#stick-2').css('top', CSS.stick2.top);

      CSS.ball.top += CONSTS.ballTopSpeed;
      CSS.ball.left += CONSTS.ballLeftSpeed;

      if (
        CSS.ball.top <= 0 ||
        CSS.ball.top >= CSS.arena.height - CSS.ball.height
      ) {
        CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
      }

      $('#pong-ball').css({
        top: CSS.ball.top,
        left: CSS.ball.left,
      });

      if (CSS.ball.left <= CSS.stick.width) {
        (CSS.ball.top > CSS.stick1.top &&
          CSS.ball.top < CSS.stick1.top + CSS.stick.height &&
          (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1)) ||
          roll();
      }
      if (CSS.ball.left >= CSS.arena.width - CSS.stick.width) {
        (CSS.ball.top > CSS.stick2.top &&
          CSS.ball.top < CSS.stick2.top + CSS.stick.height &&
          (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1)) ||
          roll();
      }

      if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
        //console.log('score1-->' + CONSTS.score1)
        CONSTS.score1++;
        roll();
      }
      if (CSS.ball.left <= CSS.stick.width + 1) {
        console.log('soll');
        /* CONSTS.score1++;
                        roll(); */
      }
    }, CONSTS.gameSpeed);
  }

  function roll() {
    CSS.ball.top = CSS.arena.height / 2;
    CSS.ball.left = CSS.arena.width / 2;
    var side = 1;

    if (Math.random() < 0.5) {
      //side = 1;
    }

    CONSTS.ballTopSpeed = Math.random() * -2 - 3;
    CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
  }

  start();
})();
