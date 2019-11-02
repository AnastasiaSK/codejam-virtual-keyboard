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
