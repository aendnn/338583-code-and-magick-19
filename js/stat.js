'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_OFFSET = 10;
var COL_WIDTH = 40;
var COL_MAX_HEIGHT = 150;
var COL_X = 140;
var COL_Y = CLOUD_HEIGHT - CLOUD_OFFSET - 20;
var NAME_Y = CLOUD_HEIGHT - CLOUD_OFFSET;
var MARGIN_COLS = 50;
var FONT = '16px PT Mono';
var FONT_COLOR = 'rgb(0, 0, 0)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  return ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (array) {
  if (array.length > 0) {
    var maxElement = array[0];

    for (var i = 0; i <= array.length - 1; i++) {
      var currentElement = array[i];

      if (currentElement > maxElement) {
        maxElement = currentElement;
      }
    }
  }
  return maxElement;
};

var deleteElements = function (firstArray, secondArray) {
  var difference = firstArray.length - secondArray.length;
  return firstArray.splice(firstArray.length - difference, difference);
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = Math.round(getMaxElement(times));

  renderCloud(ctx, CLOUD_X + CLOUD_OFFSET, CLOUD_Y + CLOUD_OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');
  ctx.font = FONT;
  ctx.fillStyle = FONT_COLOR;

  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_OFFSET, 50);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_OFFSET, 70);

  if (names.length !== times.length) {
    if (names.length > times.length) {
      deleteElements(names, times);
    } else {
      deleteElements(times, names);
    }
  }

  for (var i = 0; i <= names.length - 1; i++) {
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(names[i], COL_X + (COL_WIDTH + MARGIN_COLS) * i, NAME_Y);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsla(240, 100%, 50%, ' + this.Math.random() + ')';
    }
    ctx.fillRect(COL_X + (COL_WIDTH + MARGIN_COLS) * i, COL_Y, COL_WIDTH, (COL_MAX_HEIGHT * times[i] / maxTime) * -1);
  }
};
