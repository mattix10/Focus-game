class gameView {
  _btnStart = document.querySelector(".btn--start");
  _btnReset = document.querySelector(".btn--reset");
  _squareContainer = document.querySelector(".square__container");
  _squares = this._squareContainer.children;
  _infoDiv = document.querySelector("#info");
  _activeClassName = "active--square";

  addHandlerStartClick(handler) {
    this._btnStart.addEventListener("click", handler);
  }

  addHandlerResetClick(handler) {
    this._btnReset.addEventListener("click", handler);
  }

  addHandlerSquareClick(handler) {
    this._squareContainer.addEventListener("click", handler.bind(this));
  }

  deactivateStartButton() {
    this._btnStart.setAttribute("disabled", "");
    this._btnStart.classList.remove("btn--start");
    this._btnStart.classList.add("btn--disabled");
  }

  activateStartButton() {
    this._btnStart.removeAttribute("disabled");
    this._btnStart.classList.remove("btn--disabled");
    this._btnStart.classList.add("btn--start");
  }

  checkDisabled() {
    return this._btnStart.hasAttribute("disabled") ? true : false;
  }

  addActiveClass(number) {
    if (!number) return;
    this._squareContainer.children[number].classList.add(this._activeClassName);
  }

  removeActiveClass = function (param) {
    if (!param) return;
    if (typeof param === "object")
      param.classList.remove(this._activeClassName);
    if (typeof param === "number")
      this._squareContainer.children[param].classList.remove(
        this._activeClassName
      );
  };

  createSquare = function () {
    const square = document.createElement("div");
    square.classList.add("square");
    return square;
  };

  showSquares = function (number) {
    for (let i = 0; i < number; i++) {
      let square = this.createSquare();
      this._squareContainer.appendChild(square);
    }
    return this._squareContainer;
  };

  showEndMessage() {
    this._infoDiv.innerHTML = `<p class="info--end">Koniec gry!</p> <p class="info">Kliknij przycisk <span class="info--reset">"Reset"</span>, a następnie <span class="info--start">Start"</span>, aby ponownie rozpocząć.</p>`;
  }

  showWelcomeMessage() {
    this._infoDiv.innerHTML = `<p class="start--message">Kliknij w <span class="info--green">zielony </span>kwadrat, aby zdobyć punkt.</p>`;
  }
}

export default new gameView();
