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
var renderCloud = function (ctx, x, y, color) { // принимает аргументы контекса отрисовки, координат по горизонтали/вертикали и цвет облака
  ctx.fillStyle = color; // передает цвет в контекст отрисовки
  return ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT); // возвращает облако установленной высоты и ширины
};

// поиск максимального элемента в массиве
var getMaxElement = function (array) { // принимает массив
  var maxElement = 0; // объявляет и инициализирует переменные
  var currentElement = 0;

  if (array.length > 0) { // проверяет, что массив не пустой, если пустой, то нет смысла выполнять дальнейшие действия
    maxElement = array[0]; // записывает в переменную первый элемент массива(с ним будут сравниваться все остальные)

    for (var i = 0; i < array.length; i++) { // проход по массиву
      currentElement = array[i]; // текущий элемент массива записывает в переменную для удобочитаемости

      if (currentElement > maxElement) { // если текущий элемент больше, чем первый, перезаписывает переменную
        maxElement = currentElement;
      }
    }
  }
  return maxElement; // возвращает максимальный элемент массива
};

// функция получения случайного числа(нужно для hsl)
var getRandomInt = function (min, max) { // принимает минимальное и максимальное числа
  min = Math.ceil(min); // округляет до ближайшего большего целого
  max = Math.floor(max); // округляет до ближайшего меньшего целого
  return Math.floor(Math.random() * (max - min)) + min; // формула определения, возвращает случайное число от min до max
};

// удаление лишних элементов одного из массивов, если их длины не совпадают
var deleteElements = function (firstArray, secondArray) { // принимает два массива для сравнения
  var difference = firstArray.length - secondArray.length; // от длины одного массива вычитает длину второго, получает разницу
  return firstArray.splice(firstArray.length - difference, difference); // удаляет количество элементов разницы с конца массива
};

// отрисовка статистики
window.renderStatistics = function (ctx, names, times) { // принимает контекст отрисовки, массивы с именами и счетом игроков
  var maxTime = Math.round(getMaxElement(times)); // максимальное значение массива времени игроков
  var heightCol = 0; // высота диаграммы
  ctx.font = FONT; // шрифт по умолчанию

  renderCloud(ctx, CLOUD_X + CLOUD_OFFSET, CLOUD_Y + CLOUD_OFFSET, 'rgba(0, 0, 0, 0.7)'); // рисует тень
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)'); // рисует облако

  ctx.fillStyle = FONT_COLOR; // цвет шрифта
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_OFFSET, 40); // рисует текст на первой строке
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_OFFSET, 60); // сдвигает текст на 20 пикселей по вертикали из-за невозможности автоматического переноса

  if (names.length !== times.length) { // условие проверки совпадения длин массивов
    if (names.length > times.length) { // если длина массива имен больше, удаляет в нем лишние элементы
      deleteElements(names, times);
    } else {
      deleteElements(times, names); // то же самое, только меняет массивы местами
    }
  }

  for (var i = 0; i < names.length; i++) { // обход массива names, длина массива times = names, поэтому внутри так же используются его индексы times[i]
    heightCol = COL_MAX_HEIGHT * times[i] / maxTime; // вычисление высоты диаграммы

    // names[i] - на каждой итерации по индексу элемента получаем его значение(имя игрока)
    // COL_X + (COL_WIDTH + MARGIN_COLS) * i - к начальной координате x на каждой итерации добавляем ширину колонки и отступы, умножаем на индекс каждой итерации, так как кол-во диаграмм и отступы увеличиваются
    // например, на первой итерации не нужны отступы и ширина колонки, поэтому умножаем на 0, далее на 1, 2 и т.д
    // последнее значение - положение по вертикали
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(names[i], COL_X + (COL_WIDTH + MARGIN_COLS) * i, nameY);
    ctx.fillText(Math.round(times[i]), COL_X + (COL_WIDTH + MARGIN_COLS) * i, (colY - heightCol - CLOUD_OFFSET));

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)'; // элемент со строкой 'Вы' отличается цветом
    } else {
      ctx.fillStyle = 'hsl(240, ' + this.getRandomInt(0, 101) + '%, 50%)'; // в остальных случаях генерируется hsl-цвет со случайным значением насыщенности от 0 до 100, 0 - минимальное, 101 - максимальное(1 исключается)
    }

    // отрисовка диаграмм
    // идентично именам на каждой итерации прибавляются отступы и ширина диаграмм,
    // colY - положение по вертикали
    // COL_WIDTH - ширина диаграммы
    // (COL_MAX_HEIGHT * times[i] / maxTime) - максимально возможную высоту колонки умножаем на время текущего игрока и делим на максимальное время, получаем высоту колонки
    // * -1 - рисует диаграммы снизу
    ctx.fillRect(COL_X + (COL_WIDTH + MARGIN_COLS) * i, colY, COL_WIDTH, heightCol * -1);
  }
};
