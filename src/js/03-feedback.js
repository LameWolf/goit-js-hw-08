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

const checkSavedData = () => {
  const savedData = JSON.parse(getSavedData);
  if (savedData) {
    data = savedData;
    refs.email.value = savedData.email || '';
    refs.message.value = savedData.message || '';
  }
};

checkSavedData();

const updateFormData = () => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
};

const onFormInput = evt => {
  data[evt.target.name] = evt.target.value;
  updateFormData();
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

refs.form.addEventListener('submit', sendMessage);
refs.form.addEventListener('input', throttle(onFormInput, 500));
