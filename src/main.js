import { keys, keyboard } from './config';

const language = 'en';
let shift = '';

function generateTextArea() {
  const element = document.createElement('textarea');
  element.classList.add('textarea');
  element.setAttribute('rows', 10);
  return element;
}

function generateKeyButton(keyCode) {
  const element = document.createElement('div');
  element.dataset.code = keyCode;
  if (keys[keyCode].name) {
    if (shift === keyCode) {
      element.classList.add('key_pressed');
    }
    element.textContent = keys[keyCode].name;
  } else if (shift !== '') {
    element.textContent = keys[keyCode][language].shift;
  } else {
    element.textContent = keys[keyCode][language].char;
  }

  element.classList.add('key');
  return element;
}

function generateKeyboardRow(rowKeys) {
  const element = document.createElement('div');
  element.classList.add('keyboard__row');

  for (let i = 0; i < rowKeys.length; i += 1) {
    element.append(generateKeyButton(rowKeys[i]));
  }

  return element;
}

function generateKeyboard() {
  const element = document.createElement('div');
  element.classList.add('keyboard');

  for (let i = 0; i < keyboard.length; i += 1) {
    element.append(generateKeyboardRow(keyboard[i]));
  }

  return element;
}

function regenerateKeyboard() {
  document
    .querySelector('.wrapper')
    .replaceChild(generateKeyboard(), document.querySelector('.keyboard'));
}

function init() {
  const element = document.createElement('div');
  element.classList.add('wrapper');
  element.append(generateTextArea());
  element.append(generateKeyboard());
  document.body.append(element);
}

init();

function updateTextArea(keyCode) {
  const textArea = document.querySelector('textarea');
  if (shift !== '') {
    textArea.value += keys[keyCode][language].shift;
  } else {
    textArea.value += keys[keyCode][language].char;
  }
}

window.addEventListener('keydown', (event) => {
  const { keyCode, location } = event;
  const id = location === 0 ? keyCode : `${keyCode}-${location}`;
  const button = document.querySelector(`[data-code="${id}"]`);

  if (button) {
    if (keyCode === 16) {
      shift = id;
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

    button.classList.remove('key_pressed');
  }
});

document.querySelector('.wrapper').addEventListener('click', (event) => {
  if (event.target.classList.contains('key')) {
    event.target.classList.add('key_pressed');
    updateTextArea(event.target.dataset.code);
    setTimeout(() => event.target.classList.remove('key_pressed'), 300);
  }
});
