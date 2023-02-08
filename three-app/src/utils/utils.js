const DIGITS = '0123456789';

function generateOTP() {
  return Array.from({ length: 4 })
    .map(() => DIGITS[Math.floor(Math.random() * DIGITS.length)])
    .join('');
}

export { generateOTP }