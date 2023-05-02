import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name="message"]'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';
const getSavedData = localStorage.getItem(LOCALSTORAGE_KEY);

const data = {
  email: '',
  message: '',
};

const onFormInput = evt => {
  data[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
};

const sendMessage = evt => {
  evt.preventDefault();

  if (refs.email.value === '' || refs.message.value.trim() === '') {
    alert('Заповніть будь-ласка всі поля!!!');
  } else {
    evt.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log(data);
  }
};

const checkSavedData = () => {
  const parseData = JSON.parse(getSavedData);
  if (parseData) {
    refs.email.value = parseData.email || '';
    refs.message.value = parseData.message || '';
  }
};

checkSavedData();

refs.form.addEventListener('submit', sendMessage);
refs.form.addEventListener('input', throttle(onFormInput, 500));
