const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function handleStartClick() {
  timer = setInterval(changeColor, 1000);
  startButton.toggleAttribute('disabled');
  stopButton.removeAttribute('disabled', true);
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
  startButton.setAttribute('disabled', true);

}
function handleStopClick() {
  clearInterval(timer);
  startButton.removeAttribute('disabled');
  stopButton.toggleAttribute('disabled');
}
startButton.addEventListener('click', handleStartClick);
stopButton.addEventListener('click', handleStopClick);
