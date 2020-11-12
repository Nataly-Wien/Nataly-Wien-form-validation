'use strict';

const SETTINGS = {
  email: [
    {
      regExp: /^[^@]+@[^@.]+\.[^@]+$/,
      isValidityChecked: false,
    },
  ],

  nickname: [
    {
      regExp: /^[a-zA-Z][a-zA-Z0-9_;]{2,39}$/,
      isValidityChecked: false,
    },
  ],

  password: [
    {
      regExp: /^.{6,32}$/,
      isValidityChecked: false,
    },
    {
      regExp: /\d/,
      isValidityChecked: false,
    },
    {
      regExp: /(?=.*[a-z])(?=.*[A-Z])/,
      isValidityChecked: false,
    },
  ],
  repeat: [
    {
      match: password,
      isValidityChecked: false,
    }
  ]
};

const button = document.querySelector(`.main-button`);
const modal = document.querySelector(`.modal`);
const closeButton = document.querySelector(`.modal__close-button`);

const form = document.querySelector(`.form`);
const inputs = form.querySelectorAll(`.form__input`);
const submitButton = form.querySelector(`.form__button`);
const pass = form.querySelector(`#password`);
const repeatPass = form.querySelector(`#repeat`);
const agreementCheckbox = form.querySelector(`.form__agreement-checkbox`);

const isFieldValid = (field, index) => SETTINGS[field.name][index].regExp.test(field.value);
const isFieldMatch = (field) => field.value === SETTINGS[field.name][0].match.value;

const setValidityMessages = (field, messages) => {
  for (let i = 0; i < messages.length; i++) {
    if (SETTINGS[field.name][i].regExp && isFieldValid(field, i) || SETTINGS[field.name][i].match && isFieldMatch(field)) {
      if (field.classList.contains(`form__input--invalid`)) {
        field.classList.remove(`form__input--invalid`);
      };
      if (messages.length > 1) {
        SETTINGS[field.name][i].isValidityChecked = true;
      };
      if (messages[i].classList[messages[i].classList.length - 1].includes(`--invalid`)) {
        messages[i].classList.remove(`${messages[i].classList[messages[i].classList.length - 2]}--invalid`);
      }
      if (!messages[i].classList[messages[i].classList.length - 1].includes(`--valid`)) {
        messages[i].classList.add(`${messages[i].classList[messages[i].classList.length - 1]}--valid`);
      }
    } else if (SETTINGS[field.name][i].isValidityChecked) {
      if (!field.classList.contains(`form__input--invalid`)) {
        field.classList.add(`form__input--invalid`);
      };
      if (messages[i].classList[messages[i].classList.length - 1].includes(`--valid`)) {
        messages[i].classList.remove(`${messages[i].classList[messages[i].classList.length - 2]}--valid`);
      }
      if (!messages[i].classList[messages[i].classList.length - 1].includes(`--invalid`)) {
        messages[i].classList.add(`${messages[i].classList[messages[i].classList.length - 1]}--invalid`);
      }
    }
  }
};

const isAllFieldsValid = () => {
  let isValid = true;
  inputs.forEach((it) => {
    if (it.classList.contains(`form__input--invalid`) || !it.value) {
      isValid = false;
    }
  });

  return isValid;
};

const onFieldChange = (evt) => {
  const field = evt.target;
  const messages = field.closest(`.form__field-wrapper`).querySelectorAll(`.form__message`);

  for (let i = 0; i < messages.length; i++) {
    SETTINGS[field.name][i].isValidityChecked = true;
  }

  setValidityMessages(field, messages);
  if (isAllFieldsValid() && agreementCheckbox.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

const onFieldInput = (evt) => {
  const field = evt.target;
  const messages = field.closest(`.form__field-wrapper`).querySelectorAll(`.form__message`);

  setValidityMessages(field, messages);
};

const matchPass = () => {
  if (repeatPass.value && !pass.classList.contains(`form__input--invalid`) && pass.value !== repeatPass.value) {
    if (!repeatPass.classList.contains(`form__input--invalid`)) {
      repeatPass.classList.add(`form__input--invalid`);
    };

    const list = repeatPass.closest(`.form__field-wrapper`).querySelector(`.form__message`).classList;

    if (list[list.length - 1].includes(`--valid`)) {
      list.remove(`${list[list.length - 2]}--valid`);
    }
    if (!list[list.length - 1].includes(`--invalid`)) {
      list.add(`${list[list.length - 1]}--invalid`);
    }
  };
};

const openForm = () => {
  modal.classList.add(`modal--show`);
  submitButton.disabled = true;
};

const closeForm = () => {
  form.reset();

  inputs.forEach((it) => {
    if (it.classList.contains(`form__input--invalid`)) {
      it.classList.remove(`form__input--invalid`);
    }
  });

  form.querySelectorAll(`.form__message`).forEach((it) => {
    if (it.classList[it.classList.length - 1].includes(`--invalid`)) {
      it.classList.remove(`${it.classList[it.classList.length - 2]}--invalid`);
    }
  });

  modal.classList.remove(`modal--show`);
};

const submitForm = (evt) => {
  evt.preventDefault();

  const data = new FormData(form);
  let dataString = ``;

  for (let [name, value] of data) {
    dataString += `${name}: ${value};  `;
  }
  console.log(dataString);

  for (let key in SETTINGS) {
    SETTINGS[key].forEach((it) => {
      it.isValidityChecked = false;
    });
  }

  form.reset();
  closeForm();
};

submitButton.addEventListener(`click`, submitForm);
button.addEventListener(`click`, openForm);
closeButton.addEventListener(`click`, closeForm);
pass.addEventListener(`input`, matchPass);

agreementCheckbox.addEventListener('change', (evt) => {
  if (evt.target.checked && isAllFieldsValid()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  };
});

inputs.forEach((it) => {
  it.addEventListener(`change`, onFieldChange);
  it.addEventListener(`input`, onFieldInput);
});
