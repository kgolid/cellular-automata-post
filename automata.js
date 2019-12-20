// Get bit at pos(ition) for num(ber)
const get_bit = (num, pos) => (num >> pos) & 1;

// Combines 3 bits into an integer between 0 and 7
const combine = (b1, b2, b3) => (b1 << 2) + (b2 << 1) + (b3 << 0);

// Returns given number in the form of a tertiary function (a rule)
export const get_rule = num => (b1, b2, b3) => get_bit(num, combine(b1, b2, b3));
