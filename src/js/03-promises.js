import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function handleForm(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const { delay, step, amount } = Object.fromEntries(formData);

  for (let i = 0; i < amount; i++) {
    const delayAmount = Number(delay) + Number(step) * i;
    setTimeout(() => {
      createPromise(i + 1, delayAmount)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delayAmount);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

form.addEventListener('submit', handleForm);
