import { get_rule } from './automata';

window.onload = function() {
  const width = 1000;
  const height = 500;

  const cells_across = 200;
  const cell_scale = width / cells_across;
  const cells_down = height / cell_scale;

  const rule = get_rule(30);

  const canvas = setup_canvas(document, width, height);
  document.body.appendChild(canvas);

  const context = canvas.getContext('2d');
  draw_rule(context, rule, cell_scale, cells_across, cells_down);
};

function draw_rule(ctx, rule, scale, width, height) {
  let row = initial_row(width);
  for (let i = 0; i < height; i++) {
    draw_row(ctx, row, scale);
    s;
    row = next_row(row, rule);
  }
}
/*
function draw_rule(ctx, rule) {
  make_grid(rule).forEach(r => draw_row(ctx, r));
}

function make_grid(rule, height) {
  return [...Array(height)].reduce(
    (acc, _) => [...acc, next_row(acc[acc.length - 1], rule)],
    [initial_row()]
  );
}
*/

function draw_row(ctx, row, scale) {
  ctx.save();
  row.forEach(cell => {
    ctx.fillStyle = cell === 1 ? '#000' : '#fff';
    ctx.fillRect(0, 0, scale, scale);
    ctx.translate(scale, 0);
  });
  ctx.restore();
  ctx.translate(0, scale);
}

function next_row(old, rule) {
  return old.map((_, i) => rule(old[i - 1], old[i], old[i + 1]));
}

function initial_row(width) {
  const initial_row = Array(width).fill(0);
  initial_row[Math.floor(width / 2)] = 1;

  return initial_row;
}

function initial_random_row(width) {
  return Array.from(Array(width), _ => Math.floor(Math.random() * 2));
}

function setup_canvas(document, width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  return canvas;
}
