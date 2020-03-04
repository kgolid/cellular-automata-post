// Get bit at pos(ition) for num(ber)
const get_bit = (num, base, size, pos) => {
  return parseInt(
    Number(num)
      .toString(base)
      .padStart(Math.pow(base, size), 0)
      .split('')
      .reverse()
      .join('')
      .charAt(pos)
  );
};

const combine = (bs, base) => {
  return parseInt(bs.join(''), base);
};

// Returns given number in the form of a tertiary function (a rule)
export const get_rule = (base, num) => (...bs) =>
  get_bit(num, base, bs.length, combine(bs, base));

export const get_random_rule = (base, arity) =>
  get_rule(base, Math.floor(Math.random() * Math.pow(base, Math.pow(base, arity))));
