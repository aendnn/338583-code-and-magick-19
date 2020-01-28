'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var similarList = document.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var getRandomElement = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var wizards = [
  {
    name: WIZARD_NAMES[getRandomElement(0, WIZARD_NAMES.length)],
    surname: WIZARD_SURNAMES[getRandomElement(0, WIZARD_SURNAMES.length)],
    coatColor: WIZARD_COAT_COLORS[getRandomElement(0, WIZARD_COAT_COLORS.length)],
    eyesColor: WIZARD_EYES_COLORS[getRandomElement(0, WIZARD_EYES_COLORS.length)]
  },
  {
    name: WIZARD_NAMES[getRandomElement(0, WIZARD_NAMES.length)],
    surname: WIZARD_SURNAMES[getRandomElement(0, WIZARD_SURNAMES.length)],
    coatColor: WIZARD_COAT_COLORS[getRandomElement(0, WIZARD_COAT_COLORS.length)],
    eyesColor: WIZARD_EYES_COLORS[getRandomElement(0, WIZARD_EYES_COLORS.length)]
  },
  {
    name: WIZARD_NAMES[getRandomElement(0, WIZARD_NAMES.length)],
    surname: WIZARD_SURNAMES[getRandomElement(0, WIZARD_SURNAMES.length)],
    coatColor: WIZARD_COAT_COLORS[getRandomElement(0, WIZARD_COAT_COLORS.length)],
    eyesColor: WIZARD_EYES_COLORS[getRandomElement(0, WIZARD_EYES_COLORS.length)]
  },
  {
    name: WIZARD_NAMES[getRandomElement(0, WIZARD_NAMES.length)],
    surname: WIZARD_SURNAMES[getRandomElement(0, WIZARD_SURNAMES.length)],
    coatColor: WIZARD_COAT_COLORS[getRandomElement(0, WIZARD_COAT_COLORS.length)],
    eyesColor: WIZARD_EYES_COLORS[getRandomElement(0, WIZARD_EYES_COLORS.length)]
  }
];

document.querySelector('.setup').classList.remove('hidden');

var renderWizard = function (wizard) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarList.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
