const CONTROL_MAP = new Map([
  ['Closed_Fist', 'backward'],
  ['Open_Palm', 'forward'],
  ['Pointing_Up', 'up'],
  ['Victory', 'down'],
  ['Thumb_Up', 'left'],
  ['Thumb_Down', 'right'],
  ['None', 'none']
]);

const EMOJI_MAP = new Map([
  ['Closed_Fist', '✊'],
  ['Open_Palm', '🖐️'],
  ['Pointing_Up', '☝️'],
  ['Thumb_Down', '👎'],
  ['Thumb_Up', '👍'],
  ['Victory', '✌️']
]);

const VID_DIMENSIONS = {
  WIDTH: 1280,
  HEIGHT: 720
};

export { CONTROL_MAP, EMOJI_MAP, VID_DIMENSIONS };
