export const TIME = 30;
export const state = {
  lives: 3,
  scores: 0,
  play: false,
  time: TIME,
  clicked: false,
};

export const resetGame = function () {
  this.state = {
    lives: 3,
    scores: 0,
    play: false,
    time: TIME,
    clicked: false,
  };
};

export const startGame = function () {
  this.state.play = true;
};

export const addScore = function () {
  this.state.scores++;
};

export const reduceLives = function () {
  this.state.lives--;
};

export const reduceTime = function () {
  this.state.time--;
};
