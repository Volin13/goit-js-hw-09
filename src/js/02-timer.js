import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysCount = document.querySelector('[data-days]');
const hoursCount = document.querySelector('[data-hours]');
const minutesCount = document.querySelector('[data-minutes]');
const secondsCount = document.querySelector('[data-seconds]');

const currentDate = new Date();
let timer = null;
let timeGap = 0;

Notiflix.Notify.info('Please choose a date');
  startButton.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setTime(days,hours,minutes,seconds){
    daysCount.textContent = addZero(String(days));
    hoursCount.textContent = addZero(String(hours));
    minutesCount.textContent = addZero(String(minutes));
    secondsCount.textContent = addZero(String(seconds));
}

function reduceTime() {
  timeGap -= 1000;
  const GapObj = convertMs(timeGap);
  const { days, hours, minutes, seconds } = GapObj;
//   daysCount.textContent = addZero(String(days));
//   hoursCount.textContent = addZero(String(hours));
//   minutesCount.textContent = addZero(String(minutes));
//   secondsCount.textContent = addZero(String(seconds));
setTime(days,hours,minutes,seconds)
  console.log(GapObj);
  if (timeGap < 1000) {
    clearInterval(timer);
    Notiflix.Notify.warning('Time is over!');
  }
}

function handleStartButton() {
  Notiflix.Notify.info('Time is running!');
  timer = setInterval(reduceTime, 1000);
  startButton.removeEventListener('click', handleStartButton);
  startButton.disabled = true;
}
function addZero(value) {
  return value.padStart(2, 0);
}
function closeCalendar(selectedData) {
  timeGap = selectedData[0] - currentDate;
  const GapObj = convertMs(timeGap);
  const { days, hours, minutes, seconds } = GapObj;
  setTime(days,hours,minutes,seconds)
  if (timeGap < 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    startButton.disabled = true;
    clearInterval(timer);
    daysCount.textContent = addZero('0');
    hoursCount.textContent = addZero('0');
    minutesCount.textContent = addZero('0');
    secondsCount.textContent = addZero('0');
  } else {
    Notiflix.Notify.success('You choosed date');
    startButton.disabled = false;
    startButton.addEventListener('click', handleStartButton);
  }
}

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedData) {
    closeCalendar(selectedData);
  },
//   onChange(selectedData){
//     closeCalendar(selectedData);
//   },
});
