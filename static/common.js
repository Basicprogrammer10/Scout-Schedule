// Colors StartColor -> End Color
const colors = [
  [7, 142, 112],
  [59, 12, 139],
];

// Convert an array of R, G, B to a string
function toRgb(n) {
  return `${n[0]},${n[1]},${n[2]}`;
}

// Add a value to the R, G and B channel
function lightenRgb(rgb, light) {
  return [
    Math.min(rgb[0] + light, 255),
    Math.min(rgb[1] + light, 255),
    Math.min(rgb[2] + light, 255),
  ];
}

// Apply the ChangeBy values for each itaration
function applyRgbChange(rgb, change, i) {
  return [
    rgb[0] + change[0] * i,
    rgb[1] + change[1] * i,
    rgb[2] + change[2] * i,
  ];
}

// Gen the change by array
function genChangeBy(len) {
  // Find how much to change the R, G, and B channel for each dot
  // to make a gradent between color 0 and color 1
  return [
    (colors[1][0] - colors[0][0]) / (len - 1),
    (colors[1][1] - colors[0][1]) / (len - 1),
    (colors[1][2] - colors[0][2]) / (len - 1),
  ];
}
