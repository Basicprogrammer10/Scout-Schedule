let data = null;
let pass = null;

window.addEventListener("load", main);

document.querySelector("#next").addEventListener("click", () => {
  if (data.id + 1 >= data.data.length) return;
  getPass();
  fetch(`/api/admin?pass=${pass}&id=${data.id + 1}`, { method: "post" })
    .then((resp) => resp.text())
    .then((data) => {
      if (data.indexOf("Ok!") == -1) alert("Error!");
      main();
    });
});

document.querySelector("#back").addEventListener("click", () => {
  if (data.id - 1 < 0) return;
  getPass();
  fetch(`/api/admin?pass=${pass}&id=${data.id - 1}`, { method: "post" })
    .then((resp) => resp.text())
    .then((data) => {
      if (data.indexOf("Ok!") == -1) alert("Error!");
      main();
    });
});

function main() {
  fetch("/api/schedule")
    .then((resp) => resp.json())
    .then((d) => {
      data = d;
      let changeBy = genChangeBy(data.data.length);

      let newDiv = document.createElement("div");
      if (document.querySelector("#content") !== null) {
        newDiv = document.querySelector("#content");
      }

      newDiv.id = "content";
      newDiv.innerHTML = `<div class="dot" style="background: rgb(${toRgb(
        applyRgbChange(colors[0], changeBy, data.id)
      )});border: 3px solid rgb(${toRgb(
        lightenRgb(applyRgbChange(colors[0], changeBy, data.id), 60)
      )});filter: grayscale(0%);"></div>`;
      document.querySelector("#event").appendChild(newDiv);
      document.querySelector("#disc").innerHTML = data.data[data.id].name;
    });
}

function getPass() {
  if (pass == null) {
    pass = window.prompt("Password");
  }
}
