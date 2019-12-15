import { get_rule } from './automata';

const canvas_width = 1000;
const canvas_height = 500;
const grid_dim = 100; // Number of cells in the dimension of the grid.

const cell_scale = canvas_width / grid_dim;
const iterations = canvas_height / cell_scale;

window.onload = function() {
  const canvas = setup_canvas(document);
  document.body.appendChild(canvas);

  draw_rule(canvas.getContext('2d'), get_rule(30));
};

function draw_rule(ctx, rule) {
  let row = initial_row();
  for (let i = 0; i < iterations; i++) {
    draw_row(ctx, row);
    row = next_row(row, rule);
  }
}

function draw_row(ctx, row) {
  ctx.save();
  row.forEach(cell => {
    ctx.fillStyle = cell == 1 ? '#000' : '#fff';
    ctx.fillRect(0, 0, cell_scale, cell_scale);
    ctx.translate(cell_scale, 0);
  });
  ctx.restore();
  ctx.translate(0, cell_scale);
}

function next_row(old, rule) {
  return old.map((_, i) => rule(old[i - 1], old[i], old[i + 1]));
}

function initial_row() {
  const initial_row = Array(grid_dim).fill(0);
  initial_row[Math.floor(grid_dim / 2)] = 1;

  return initial_row;
}

function setup_canvas(document) {
  var canvas = document.createElement('canvas');
  canvas.width = canvas_width;
  canvas.height = canvas_height;

  return canvas;
}
