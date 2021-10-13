// TODO: Gen colors with Item Index

// Colors
// [Body Color, Border Color]
const colors = [
  ["#835D90", "#AD93B5"],
  ["#945B7B", "#D092B3"],
  ["#BB5969", "#E68BA5"],
  ["#D4635C", "#E99897"],
  ["#E09951", "#E8D3AC"],
  ["#DBD154", "#FFFEF3"],
  ["#AADB54", "#CFED9B"],
  ["#67DB54", "#B4EEAA"],
];

function updateEvents() {
  fetch('/schedule').then(resp => resp.json()).then(data => {
    data.forEach((i, index) => {
      let newDiv = document.createElement("div");
      newDiv.innerHTML = `<div class="event"><div class="dot" style="background: ${colors[index][0]};border: 3px solid ${colors[index][1]};"></div>${i.name}</div>`;
      document.querySelector("#container").appendChild(newDiv);
    });
  });
}

window.addEventListener("load", () => {
  updateEvents();
});
