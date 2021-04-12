class HeaderView {
  _lives = document.querySelector(".lives");
  _scores = document.querySelector(".scores");
  _time = document.querySelector(".timer");

  render(data) {
    const { lives, scores, time } = data;
    this._lives.textContent = lives;
    this._scores.textContent = scores;
    this._time.textContent = time;
  }

  updateLives(data) {
    this._lives.textContent = data;
  }

  updateScores(data) {
    this._scores.textContent = data;
  }

  updateTime(data) {
    this._time.textContent = data;
  }
}

export default new HeaderView();
