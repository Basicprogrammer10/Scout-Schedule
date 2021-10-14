// TODO: Gen colors with Item Index

// Colors
// [ START COLOR END COLOR ]
const colors = [
  [7, 142, 112],
  [59, 12, 139],
];

function updateEvents() {
  fetch("/schedule")
    .then((resp) => resp.json())
    .then((data) => {
      let changeBy = [
        (colors[1][0] - colors[0][0]) / (data.length - 1),
        (colors[1][1] - colors[0][1]) / (data.length - 1),
        (colors[1][2] - colors[0][2]) / (data.length - 1),
      ];

      data.forEach((i, index) => {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<div class="event"><div class="dot" style="background: rgb(${toRgb(
          applyRgbChange(colors[0], changeBy, index)
        )});border: 3px solid rgb(${toRgb(
          lightenRgb(applyRgbChange(colors[0], changeBy, index), 60)
        )});"></div>${i.name}</div>`;
        document.querySelector("#container").appendChild(newDiv);
      });
    });
}

window.addEventListener("load", updateEvents);

function toRgb(n) {
  return `${n[0]},${n[1]},${n[2]}`;
}

function lightenRgb(rgb, light) {
  return [
    Math.min(rgb[0] + light, 255),
    Math.min(rgb[1] + light, 255),
    Math.min(rgb[2] + light, 255),
  ];
}

function applyRgbChange(rgb, change, i) {
  return [
    rgb[0] + change[0] * i,
    rgb[1] + change[1] * i,
    rgb[2] + change[2] * i,
  ];
}
