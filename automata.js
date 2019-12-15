// Get bit at pos(ition) for num(ber)
const get_bit = (num, pos) => (num >> pos) & 1;

// Combines 3 bits into an integer between 0 and 7
const get_int = (b1, b2, b3) => (b1 << 2) + (b2 << 1) + b3;

// Get random integer between 0 and max, not including max.
const random_int = max => Math.floor(Math.random() * max);

// Returns given number in the form of a tertiary function (a rule)
export const get_rule = num => (n1, n2, n3) => get_bit(num, get_int(n1, n2, n3));

// Returns a random rule.
export const get_random_rule = () => get_rule(random_int(256));
