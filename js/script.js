'use strict';

const SETTINGS = {
  email: {
    regExps: [],
  },

  nickname: {
    minLength: 3,
    maxLength: 40,
    regExps: [],
  },

  password: {
    minLength: 6,
    maxLength: 32,
    regExps: [],
  },

  repeat: {
    match: password,
  }
};

const form = document.querySelector(`.main-form`);
const inputs = form.querySelectorAll(`.main-form__input`);

const isLengthValid = (evt, length) => {
  const isValid = true;

  if (evt.target.value.length < length.min || evt.target.value.length > length.max) {
    isValid = false;
    return isValid;
  }

  return isValid;
};

const checkValidity = (evt) => {

};

inputs.forEach((it) => {
  it.addEventListener(`change`, checkValidity);
});
