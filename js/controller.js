"use strict";
import * as model from "./model.js";
import gameView from "./views/gameView";
import headerView from "./views/headerView.js";
import { drawNumber } from "./helpers";
import { HOW_MANY_SQUARES, DELAY, DRAW_INTERVAL } from "./config.js";

let drawIntervalId;

const startTimer = function () {
  const tick = () => {
    if (isEndOfGame()) {
      clearInterval(drawIntervalId);
      clearInterval(timer);
      return;
    } else {
      headerView.updateTime(model.state.time);
      model.reduceTime();
    }
  };

  tick();
  const timer = setInterval(tick, 1000);
};

const drawGreenSquare = function () {
  if (isEndOfGame()) return;

  model.state.clicked = false;

  const greenNumber = drawNumber(HOW_MANY_SQUARES);

  setTimeout(removeActiveClass, DELAY, greenNumber);

  gameView.addActiveClass(greenNumber);
};

const removeActiveClass = function (el) {
  if (!model.state.clicked && !isEndOfGame()) decreaseLives();
  gameView.removeActiveClass(el);
};

const checkSquare = function (el) {
  if (isEndOfGame()) return;

  model.state.clicked = true;

  if (el.target.classList.contains("active--square")) {
    gameView.removeActiveClass(el.target);
    model.addScore();
    headerView.updateScores(model.state.scores);
  } else {
    if (isEndOfGame()) return;
    decreaseLives();
  }
};

const decreaseLives = function () {
  model.reduceLives();
  headerView.render(model.state);
};

const isEndOfGame = function () {
  const { play, lives, time } = model.state;
  if (lives == 0 || play == false || time == 0) {
    console.log(model.state.play);
    if (gameView.checkDisabled()) gameView.showEndMessage();
    return true;
  } else return false;
};

const startGame = function () {
  gameView.deactivateStartButton();

  gameView.showWelcomeMessage();

  model.startGame();

  startTimer();

  drawIntervalId = setInterval(drawGreenSquare, DRAW_INTERVAL);
};

const init = function () {
  clearInterval(drawIntervalId);

  model.resetGame();

  gameView.addHandlerStartClick(startGame);

  gameView.addHandlerResetClick(init);

  gameView.activateStartButton();

  headerView.render(model.state);
};

init();
gameView.addHandlerSquareClick(checkSquare);
gameView.showSquares(HOW_MANY_SQUARES);
