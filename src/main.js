import { keys, keyboard } from './config';

function generateKeyButton(keyCode) {
  const element = document.createElement('div');
  element.dataset.code = keyCode;
  if (keys[keyCode].name) {
    element.textContent = keys[keyCode].name;
  } else {
    element.textContent = keys[keyCode].en.char;
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

document.body.append(generateKeyboard());

window.addEventListener('keydown', (event) => {
  const { keyCode, location } = event;
  const id = location === 0 ? keyCode : `${keyCode}-${location}`;
  const button = document.querySelector(`[data-code="${id}"]`);
  if (button) {
    button.classList.add('key_pressed');
  }
  event.preventDefault();
});
window.addEventListener('keyup', (event) => {
  const { keyCode, location } = event;
  const id = location === 0 ? keyCode : `${keyCode}-${location}`;
  const button = document.querySelector(`[data-code="${id}"]`);
  if (button) {
    button.classList.remove('key_pressed');
  }
});

document.querySelector('.keyboard').addEventListener('click', (event) => {
  if (event.target.classList.contains('key')) {
    event.target.classList.add('key_pressed');
    setTimeout(() => event.target.classList.remove('key_pressed'), 500);
  }
});
