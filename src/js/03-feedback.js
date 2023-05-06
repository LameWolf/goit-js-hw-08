import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name="message"]'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';
const getSavedData = localStorage.getItem(LOCALSTORAGE_KEY);

const onFormInput = () => {
  const data = {
    email: refs.email.value,
    message: refs.message.value,
  };

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
};

const restoreFormState = () => {
  const feedbackState = JSON.parse(getSavedData);

  if (feedbackState) {
    refs.email.value = feedbackState.email || '';
    refs.message.value = feedbackState.message || '';
  }
};

restoreFormState();

const clearFormState = () => {
  refs.email.value = '';
  refs.message.value = '';
  localStorage.removeItem(LOCALSTORAGE_KEY);
};

const onFormSubmit = evt => {
  evt.preventDefault();
  const data = {
    email: refs.email.value,
    message: refs.message.value,
  };
  console.log(data);
  clearFormState();
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
