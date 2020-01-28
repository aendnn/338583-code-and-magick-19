'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_OFFSET = 10;
var COL_WIDTH = 40;
var COL_MAX_HEIGHT = 150;
var COL_X = 140;
var MARGIN_COLS = 50;
var FONT = '16px PT Mono';
var FONT_COLOR = 'rgb(0, 0, 0)';
var colY = CLOUD_HEIGHT - CLOUD_OFFSET - 20;
var nameY = CLOUD_HEIGHT - CLOUD_OFFSET;

// отрисовка облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  return ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// поиск максимального элемента в массиве
var getMaxElement = function (array) {
  var maxElement = 0;
  var currentElement = 0;

  if (array.length > 0) {
    maxElement = array[0];

    for (var i = 0; i < array.length; i++) {
      currentElement = array[i];

      if (currentElement > maxElement) {
        maxElement = currentElement;
      }
    }
  }
  return maxElement;
};

// функция получения случайного числа(нужно для hsl)
var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // формула определения, возвращает случайное число от min до max
};

// удаление элементов массивов разной длины
var deleteElements = function (firstArray, secondArray) {
  var difference = firstArray.length - secondArray.length;
  firstArray.splice(firstArray.length - difference, difference);
};

// отрисовка статистики
window.renderStatistics = function (ctx, names, times) {
  var maxTime = Math.round(getMaxElement(times));
  var heightCol = 0;

  renderCloud(ctx, CLOUD_X + CLOUD_OFFSET, CLOUD_Y + CLOUD_OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');

  ctx.font = FONT;
  ctx.fillStyle = FONT_COLOR;
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_OFFSET, 40);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_OFFSET, 60);

  if (names.length !== times.length) {
    if (names.length > times.length) {
      deleteElements(names, times);
    } else {
      deleteElements(times, names);
    }
  }

  for (var i = 0; i < names.length; i++) {
    heightCol = COL_MAX_HEIGHT * times[i] / maxTime; // вычисление высоты диаграммы

    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(names[i], COL_X + (COL_WIDTH + MARGIN_COLS) * i, nameY); // COL_X + (COL_WIDTH + MARGIN_COLS) * i - к начальной координате x на каждой итерации добавляем ширину колонки и отступы, умножаем на индекс каждой итерации, так как кол-во диаграмм и отступы увеличиваются
    ctx.fillText(Math.round(times[i]), COL_X + (COL_WIDTH + MARGIN_COLS) * i, (colY - heightCol - CLOUD_OFFSET));

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + getRandomInt(0, 101) + '%, 50%)'; // генерируется hsl-цвет со случайным значением насыщенности от 0 до 100, 0 - минимальное, 101 - максимальное(1 исключается)
    }

    // (COL_MAX_HEIGHT * times[i] / maxTime) - максимально возможную высоту колонки умножаем на время текущего игрока и делим на максимальное время, получаем высоту колонки
    // * -1 - рисует диаграммы снизу
    ctx.fillRect(COL_X + (COL_WIDTH + MARGIN_COLS) * i, colY, COL_WIDTH, heightCol * -1);
  }
};
