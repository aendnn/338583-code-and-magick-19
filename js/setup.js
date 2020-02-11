'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var TOTAL_WIZARDS = 4;
var wizards = [];

var similarList = document.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var userNameField = setup.querySelector('.setup-user-name');
var coatColorField = setup.querySelector('input[name=coat-color]');
var eyesColorField = setup.querySelector('input[name=eyes-color]');
var fireballColorField = setup.querySelector('input[name=fireball-color]');

var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

// закрытие окна
var onSetupCloseClick = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// открытие окна
var onSetupOpenClick = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

// при клике на esc вызывается ф-ция закрытия окна
var onDocumentKeydown = function (evt) {
  if (evt.key === ESC_KEY && document.activeElement !== userNameField) {
    onSetupCloseClick();
  }
};

// при клике на enter окно закрывается либо открывается
var onSetupOpenKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    onSetupOpenClick();
  }
};

// при клике на enter окно закрывается либо открывается
var onSetupCloseKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    onSetupCloseClick();
  }
};

var validateField = function (input) {
  if (input.value.length < MIN_NAME_LENGTH || input.validity.tooShort) {
    input.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов');
  } else if (input.value.length > MAX_NAME_LENGTH || input.validity.tooLong) {
    input.setCustomValidity('Имя должно состоять максимум из ' + MAX_NAME_LENGTH + '-х символов');
  } else if (input.validity.valueMissing) {
    input.setCustomValidity('Обязательное поле');
  } else {
    input.setCustomValidity('');
  }
};

// проверка валидации формы
var onUserNameFieldInvalid = function (evt) {
  var target = evt.target;

  validateField(target);
};

// получение случайного индекса элемента
var getRandomIndex = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// возвращает случайный элемент массива
var getRandomThing = function (array) {
  return array[getRandomIndex(0, array.length)];
};

// добавляет магов в массив
var getWizards = function (array, quantity) {
  for (var i = 0; i < quantity; i++) {
    var wizardNew = {
      name: getRandomThing(WIZARD_NAMES) + ' ' + getRandomThing(WIZARD_SURNAMES),
      coatColor: getRandomThing(WIZARD_COAT_COLORS),
      eyesColor: getRandomThing(WIZARD_EYES_COLORS)
    };
    array.push(wizardNew);
  }
  return array;
};

// отрисовка мага
var renderWizard = function (wizard) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};

// складывает элементы во фрагмент для быстродействия
var generateWizards = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderWizard(array[i]));
  }

  similarList.appendChild(fragment);
};

getWizards(wizards, TOTAL_WIZARDS);
generateWizards(wizards);

// изменяет цвет элементов мага по клику
var changeWizard = function (input, element, array) {
  var randomColor = getRandomThing(array);

  if (element === wizardFireball) {
    element.style.backgroundColor = randomColor;
  } else {
    element.style.fill = randomColor;
  }

  input.value = randomColor;
};

// смена цвета по клику на пальто
var onWizardCoatClick = function () {
  changeWizard(coatColorField, wizardCoat, WIZARD_COAT_COLORS);
};

// смена цвета глаз по клику
var onWizardEyesClick = function () {
  changeWizard(eyesColorField, wizardEyes, WIZARD_EYES_COLORS);
};

// смена цвета фаерболла по клику
var onWizardFireballClick = function () {
  changeWizard(fireballColorField, wizardFireball, WIZARD_FIREBALL_COLORS);
};

wizardCoat.addEventListener('click', onWizardCoatClick);
wizardEyes.addEventListener('click', onWizardEyesClick);
wizardFireball.addEventListener('click', onWizardFireballClick);

setupOpen.addEventListener('click', onSetupOpenClick);
setupOpen.addEventListener('keydown', onSetupOpenKeydown);
setupClose.addEventListener('click', onSetupCloseClick);
setupClose.addEventListener('keydown', onSetupCloseKeydown);
userNameField.addEventListener('invalid', onUserNameFieldInvalid);
userNameField.addEventListener('input', onUserNameFieldInvalid);

document.querySelector('.setup-similar').classList.remove('hidden');
