///////////////////////////////////////////////
// Elements

const mainBtn = document.querySelector(".main-btn");
const inputContainer = document.querySelector(".input-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const endBtn = document.querySelector(".end-btn");
const nextBtn = document.querySelector(".next-btn");
const phoneIn = document.querySelector("#phone-in");
const codeIn = document.querySelector("#code-in");
const timerLabel = document.querySelector(".timer");
const validPhone = document.querySelector(".valid-phone");
const validCode = document.querySelector(".valid-code");

let timer, operationTime;

//////////////////////////////////////////////////
// Functions

const showModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");

  phoneIn.value = "";
  codeIn.value = "";

  showValidInfo(validPhone);
  showValidInfo(validCode);
};

const openForm = function () {
  inputContainer.classList.remove("hidden");
  mainBtn.textContent = "Odbierz paczkę";

  phoneIn.value = "";
  codeIn.value = "";
};

const restart = function () {
  closeModal();
  inputContainer.classList.add("hidden");
  mainBtn.textContent = "START";
  showValidInfo(validPhone);
  showValidInfo(validCode);
};

const startTimer = function () {
  const tick = function () {
    time++;
    operationTime = time;
  };
  let time = 0;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const showValidInfo = function (info) {
  info.style.opacity = 1;
};

const hideValidInfo = function (info) {
  info.style.opacity = 0;
};

const checkValid = function (input, info, len) {
  if (input.value.length === len) {
    hideValidInfo(info);
  } else {
    showValidInfo(info);
  }
};

const stateHandle = function () {
  if (phoneIn.value.length === 9 && codeIn.value.length === 4) {
    mainBtn.disabled = false;
  } else {
    mainBtn.disabled = true;
  }
  checkValid(phoneIn, validPhone, 9);
  checkValid(codeIn, validCode, 4);
};

// Event handlers
mainBtn.addEventListener("click", function () {
  if (mainBtn.textContent === "START") {
    openForm();
    timer = startTimer();
    mainBtn.disabled = true;
  } else if (mainBtn.textContent === "Odbierz paczkę") {
    showModal();
    timerLabel.textContent = operationTime;
    clearInterval(timer);
  }
});

endBtn.addEventListener("click", restart);

nextBtn.addEventListener("click", function () {
  mainBtn.disabled = true;
  closeModal();
  timer = startTimer();
});

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", stateHandle);
});
