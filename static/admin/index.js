window.addEventListener("load", main);

function main() {
  getActive().then((active) => {
    fetch("/api/schedule")
      .then((resp) => resp.json())
      .then((data) => {
        let changeBy = genChangeBy(data.length);

        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<div class="dot" style="background: rgb(${toRgb(
          applyRgbChange(colors[0], changeBy, active)
        )});border: 3px solid rgb(${toRgb(
          lightenRgb(applyRgbChange(colors[0], changeBy, active), 60)
        )});"></div>`;
        document.querySelector("#event").appendChild(newDiv);
      });
  });
}

function getActive() {
  return new Promise((resolve, reject) =>
    fetch("/api/active")
      .then((resp) => resp.json())
      .then((data) => {
        const active = data.active;
        resolve(active);
      })
      .catch(reject)
  );
}
