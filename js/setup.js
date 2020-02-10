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
  document.removeEventListener('keydown', onEscKeydownClick);
};

// открытие окна
var onSetupOpenClick = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydownClick);
};

// при клике на esc вызывается ф-ция закрытия окна
var onEscKeydownClick = function (evt) {
  if (evt.key === ESC_KEY && document.activeElement !== userNameField) {
    onSetupCloseClick();
  }
};

// при клике на enter окно закрывается либо открывается
var onEnterKeydownClick = function (evt) {
  if (evt.key === ENTER_KEY) {
    if (setup.classList.contains('hidden')) {
      onSetupOpenClick();
    } else {
      onSetupCloseClick();
    }
  }
};

setupOpen.addEventListener('click', onSetupOpenClick);
setupOpen.addEventListener('keydown', onEnterKeydownClick);
setupClose.addEventListener('click', onSetupCloseClick);
setupClose.addEventListener('keydown', onEnterKeydownClick);

// проверка валидации формы
var onUserNameInputInvalid = function (evt) {
  var target = evt.target;

  if (target.value.length < MIN_NAME_LENGTH || target.validity.tooShort) {
    target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов');
  } else if (target.value.length > MAX_NAME_LENGTH || target.validity.tooLong) {
    target.setCustomValidity('Имя должно состоять максимум из ' + MAX_NAME_LENGTH + '-х символов');
  } else if (target.validity.valueMissing) {
    target.setCustomValidity('Обязательное поле');
  } else {
    target.setCustomValidity('');
  }
};

userNameField.addEventListener('invalid', onUserNameInputInvalid);
userNameField.addEventListener('input', onUserNameInputInvalid);

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

wizardCoat.addEventListener('click', function () {
  changeWizard(coatColorField, wizardCoat, WIZARD_COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  changeWizard(eyesColorField, wizardEyes, WIZARD_EYES_COLORS);
});

wizardFireball.addEventListener('click', function () {
  changeWizard(fireballColorField, wizardFireball, WIZARD_FIREBALL_COLORS);
});

document.querySelector('.setup-similar').classList.remove('hidden');
