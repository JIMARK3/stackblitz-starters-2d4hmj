data = [
  [0, 0, 0, 2],
  [0, 0, 0, 2],
  [0, 0, 0, 2],
  [0, 0, 0, 2],
];

_position = {
  up: 0,
  down: 1,
  left: 2,
  right: 3,
};
Object.freeze(_position);

function mix(position) {
  if (position == _position.up) {
    return mixUp();
  }
  if (position == _position.down) {
    return mixDown();
  }
  if (position == _position.left) {
    return mixLeft();
  }
  if (position == _position.right) {
    return mixRight();
  }
}

function mixUp() {
  for (let i = 0; i < 4; i++) {
    mixColUp(i);
  }
}

function mixColUp(colIndex) {
  for (let i = 1; i < 4; i++) {
    if (data[i][colIndex] == data[i - 1][colIndex]) {
      showMovementPath(i, colIndex, i-1, colIndex, data[i][colIndex]);
      data[i - 1][colIndex] *= 2;
      data[i][colIndex] = 0;
      showMergeEffect(i-1, colIndex);
      return;
    }
  }
}

function mixDown() {
  for (let i = 0; i < 4; i++) {
    mixColDown(i);
  }
}

function mixColDown(colIndex) {
  for (let i = 2; i >= 0; i--) {
    if (data[i][colIndex] == data[i + 1][colIndex]) {
      showMovementPath(i, colIndex, i+1, colIndex, data[i][colIndex]);
      data[i + 1][colIndex] *= 2;
      data[i][colIndex] = 0;
      showMergeEffect(i+1, colIndex);
      return;
    }
  }
}

function mixLeft() {
  for (let i = 0; i < 4; i++) {
    mixRowLeft(i);
  }
}

function mixRowLeft(rowIndex) {
  for (let i = 1; i < 4; i++) {
    if (data[rowIndex][i] == data[rowIndex][i - 1]) {
      showMovementPath(rowIndex, i, rowIndex, i-1, data[rowIndex][i]);
      data[rowIndex][i - 1] *= 2;
      data[rowIndex][i] = 0;
      showMergeEffect(rowIndex, i-1);
      return;
    }
  }
}

function mixRight() {
  for (let i = 0; i < 4; i++) {
    mixRowRight(i);
  }
}

function mixRowRight(rowIndex) {
  for (let i = 2; i >= 0; i--) {
    if (data[rowIndex][i] == data[rowIndex][i + 1]) {
      showMovementPath(rowIndex, i, rowIndex, i+1, data[rowIndex][i]);
      data[rowIndex][i + 1] *= 2;
      data[rowIndex][i] = 0;
      showMergeEffect(rowIndex, i+1);
      return;
    }
  }
}

function move(position) {
  if (position == _position.up) {
    for (let i = 0; i < 4; i++) {
      moveColUp(i);
    }
    return;
  }
  if (position == _position.down) {
    for (let i = 0; i < 4; i++) {
      moveColDown(i);
    }
    return;
  }
  if (position == _position.left) {
    for (let i = 0; i < 4; i++) {
      moveRowLeft(i);
    }
    return;
  }
  if (position == _position.right) {
    for (let i = 0; i < 4; i++) {
      moveRowRight(i);
    }
    return;
  }
}

function moveRowLeft(rowIndex) {
  for (let i = 0; i < 4; i++) {
    moveItemLeft(rowIndex, i);
  }
}

function moveRowRight(rowIndex) {
  for (let i = 3; i >= 0; i--) {
    moveItemRight(rowIndex, i);
  }
}

function moveColUp(colindex) {
  for (let i = 0; i < 4; i++) {
    moveItemUp(i, colindex);
  }
}

function moveColDown(colindex) {
  for (let i = 3; i >= 0; i--) {
    moveItemDown(i, colindex);
  }
}

function moveItemUp(rowIndex, colindex) {
  if (rowIndex == 0) return;
  if (data[rowIndex - 1][colindex] == 0) {
    showMovementPath(rowIndex, colindex, rowIndex-1, colindex, data[rowIndex][colindex]);
    data[rowIndex - 1][colindex] = data[rowIndex][colindex];
    data[rowIndex][colindex] = 0;
  }
}

function moveItemDown(rowIndex, colindex) {
  if (rowIndex == 3) return;
  if (data[rowIndex + 1][colindex] == 0) {
    showMovementPath(rowIndex, colindex, rowIndex+1, colindex, data[rowIndex][colindex]);
    data[rowIndex + 1][colindex] = data[rowIndex][colindex];
    data[rowIndex][colindex] = 0;
  }
}

function moveItemRight(rowIndex, colindex) {
  if (colindex == 3) return;
  if (data[rowIndex][colindex + 1] == 0) {
    showMovementPath(rowIndex, colindex, rowIndex, colindex+1, data[rowIndex][colindex]);
    data[rowIndex][colindex + 1] = data[rowIndex][colindex];
    data[rowIndex][colindex] = 0;
  }
}

function moveItemLeft(rowIndex, colindex) {
  if (colindex == 0) return;
  if (data[rowIndex][colindex - 1] == 0) {
    showMovementPath(rowIndex, colindex, rowIndex, colindex-1, data[rowIndex][colindex]);
    data[rowIndex][colindex - 1] = data[rowIndex][colindex];
    data[rowIndex][colindex] = 0;
  }
}

function play(position) {
  backup = data.toString();
  move(position);
  while (backup != data.toString()) {
    backup = data.toString();
    move(position);
  }
  mix(position);
  if (backup != data.toString()) {
    play(position);
  }
}

function twoOrFour() {
  let random = Math.floor(Math.random() * 2);
  if (random == 0) return 2;
  if (random == 1) return 4;
}

function generateRandom() {
  let random = Math.floor(Math.random() * 4);
  let random2 = Math.floor(Math.random() * 4);
  if (data[random][random2] == 0) {
    data[random][random2] = twoOrFour();
    return;
  }
  generateRandom();
}

function game(position) {
  play(position);
  generateRandom();
}

function getColorForNumber(number) {
  const colors = {
    2: '#eee4da33',
    4: '#ede0c833',
    8: '#f2b17933',
    16: '#f5956333',
    32: '#f67c5f33',
    64: '#f65e3b33',
    128: '#edcf7233',
    256: '#edcc6133',
    512: '#edc85033',
    1024: '#edc53f33',
    2048: '#edc22e33'
  };
  return colors[number] || colors[2];
}

function showMovementPath(fromRow, fromCol, toRow, toCol, number) {
  const items = document.querySelectorAll('.item');
  const path = [];
  const color = getColorForNumber(number);
  
  if (fromRow === toRow) {
    const step = fromCol < toCol ? 1 : -1;
    for (let col = fromCol; col !== toCol + step; col += step) {
      path.push(fromRow * 4 + col);
    }
  } else {
    const step = fromRow < toRow ? 1 : -1;
    for (let row = fromRow; row !== toRow + step; row += step) {
      path.push(row * 4 + fromCol);
    }
  }
  
  path.forEach(index => {
    const item = items[index];
    item.style.backgroundColor = color;
    setTimeout(() => item.style.backgroundColor = '', 150);
  });
}

function showMergeEffect(row, col) {
  const index = row * 4 + col;
  const item = document.querySelectorAll('.item')[index];
  item.classList.add('merge');
  setTimeout(() => item.classList.remove('merge'), 300);
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'w') {
    game(_position.up);
    setTimeout(updateInners, 150);
    return;
  }
  if (event.key === 's') {
    game(_position.down);
    setTimeout(updateInners, 150);
    return;
  }
  if (event.key === 'a') {
    game(_position.left);
    setTimeout(updateInners, 150);
    return;
  }
  if (event.key === 'd') {
    game(_position.right);
    setTimeout(updateInners, 150);
    return;
  }
});

function updateInners() {
  inners = document.querySelectorAll('.inner');
  for (let i = 0; i < 16; i++) {
    row = Math.floor(i / 4);
    col = i % 4;
    if (data[row][col] == 0) {
      inners[i].innerText = '';
      inners[i].removeAttribute('data-value');
      continue;
    }
    inners[i].innerText = data[row][col];
    inners[i].setAttribute('data-value', data[row][col]);
  }
}
updateInners();