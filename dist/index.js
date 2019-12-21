(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  // Get bit at pos(ition) for num(ber)
  const get_bit = (num, pos) => (num >> pos) & 1;

  // Combines 3 bits into an integer between 0 and 7
  const combine = (b1, b2, b3) => (b1 << 2) + (b2 << 1) + (b3 << 0);

  // Returns given number in the form of a tertiary function (a rule)
  const get_rule = num => (b1, b2, b3) => get_bit(num, combine(b1, b2, b3));

  window.onload = function() {
    const width = 1000; // Width of the canvas
    const height = 500; // Height of the canvas

    const cells_across = 180; // Number of cells horizontally in the grid
    const cell_scale = width / cells_across; // Size of each cell
    const cells_down = height / cell_scale; // Number of cells vertically in the grid

    const rule = get_rule(30); // The rule to display

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    document.body.appendChild(canvas);

    const context = canvas.getContext('2d');
    draw_rule(context, rule, cell_scale, cells_across, cells_down);
  };

  function draw_rule(ctx, rule, scale, width, height) {
    let row = initial_row(width);
    for (let i = 0; i < height; i++) {
      draw_row(ctx, row, scale);
      row = next_row(row, rule);
    }
  }

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

}));
