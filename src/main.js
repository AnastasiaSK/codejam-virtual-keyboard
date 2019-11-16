import { keys, keyboard } from './config';

let language = window.localStorage.getItem('language') || 'en';
let shift = '';
let isCaps = false;

const generateTextArea = () => {
  const element = document.createElement('textarea');
  element.classList.add('textarea');
  element.setAttribute('rows', 10);
  return element;
};

const generateKeyButton = (keyCode) => {
  const element = document.createElement('div');
  element.dataset.code = keyCode;
  const key = keys[keyCode];
  const lang = key[language];
  if (key.name) {
    if (shift === keyCode) {
      element.classList.add('key_pressed');
    }
    if (keyCode === '20' && isCaps) {
      element.classList.add('key_pressed');
    }
    element.textContent = key.name;
  } else if (shift !== '') {
    if (isCaps) {
      element.textContent = lang.shift.toLowerCase();
    } else {
      element.textContent = lang.shift;
    }
  } else if (isCaps) {
    element.textContent = lang.char.toUpperCase();
  } else {
    element.textContent = lang.char;
  }

  element.classList.add('key');
  if (key.width) {
    element.style.width = `${key.width}px`;
  }

  return element;
};

const generateKeyboardRow = (rowKeys) => {
  const element = document.createElement('div');
  element.classList.add('keyboard__row');

  for (let i = 0; i < rowKeys.length; i += 1) {
    element.append(generateKeyButton(rowKeys[i]));
  }

  return element;
};

const generateKeyboard = () => {
  const element = document.createElement('div');
  element.classList.add('keyboard');

  for (let i = 0; i < keyboard.length; i += 1) {
    element.append(generateKeyboardRow(keyboard[i]));
  }

  return element;
};

const regenerateKeyboard = () => {
  document
    .querySelector('.wrapper')
    .replaceChild(generateKeyboard(), document.querySelector('.keyboard'));
};

const init = () => {
  const element = document.createElement('div');
  element.classList.add('wrapper');
  element.append(generateTextArea());
  element.append(generateKeyboard());
  document.body.append(element);
};

init();

const updateTextArea = (keyCode) => {
  const textArea = document.querySelector('textarea');
  let s = '';

  const key = keys[keyCode][language];

  if (shift !== '') {
    s = key.shift;
  } else {
    s = key.char;
  }
  if (isCaps && shift !== '') {
    s = s.toLowerCase();
  } else if (isCaps) {
    s = s.toUpperCase();
  }
  textArea.value += s;
  if (keyCode === '8') {
    textArea.value = textArea.value.slice(0, -1);
  }
};
const changeLanguage = () => {
  if (language === 'en') {
    language = 'ru';
  } else {
    language = 'en';
  }
  localStorage.setItem('language', language);
};

window.addEventListener('keydown', (event) => {
  const { keyCode, location } = event;
  const id = location === 0 ? `${keyCode}` : `${keyCode}-${location}`;
  const button = document.querySelector(`[data-code="${id}"]`);

  if (event.altKey && event.shiftKey) {
    changeLanguage();
    regenerateKeyboard();
    document.querySelector(`[data-code="${id}"]`).classList.add('key_pressed');
  }

  if (button) {
    if (keyCode === 16) {
      shift = id;
      regenerateKeyboard();
    }
    if (keyCode === 20) {
      isCaps = !isCaps;
      regenerateKeyboard();
    }

    button.classList.add('key_pressed');
    updateTextArea(id);
  }
  event.preventDefault();
});

window.addEventListener('keyup', (event) => {
  const { keyCode, location } = event;
  const id = location === 0 ? keyCode : `${keyCode}-${location}`;
  const button = document.querySelector(`[data-code="${id}"]`);
  if (button) {
    if (keyCode === 16) {
      shift = '';
      regenerateKeyboard();
    }

    if (keyCode !== 20) {
      button.classList.remove('key_pressed');
    }
  }
});

document.querySelector('.wrapper').addEventListener('click', (event) => {
  if (event.target.classList.contains('key')) {
    event.target.classList.add('key_pressed');
    const keyCode = event.target.dataset.code;
    updateTextArea(keyCode);
    let isUnPress = true;

    if (keyCode === '20') {
      isCaps = !isCaps;
      isUnPress = !isCaps;
      regenerateKeyboard();
    }

    if (keyCode === '16-1' || keyCode === '16-2') {
      if (shift === '') {
        shift = keyCode;
        isUnPress = false;
      } else {
        shift = '';
      }
      regenerateKeyboard();
    }
    if (shift !== '' && (keyCode === '18-1' || keyCode === '18-2')) {
      changeLanguage();
      shift = '';
      regenerateKeyboard();
      document
        .querySelector(`[data-code="${keyCode}"]`)
        .classList.add('key_pressed');
    }

    if (isUnPress) {
      setTimeout(() => {
        document
          .querySelector(`[data-code="${keyCode}"]`)
          .classList.remove('key_pressed');
      }, 300);
    }
  }
});
