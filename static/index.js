function updateEvents() {
  // Get Schedule
  fetch("/api/schedule")
    .then((resp) => resp.json())
    .then((data) => {
      let changeBy = genChangeBy(data.length);

      // Create the dots
      data.forEach((i, index) => {
        let jsTime = new Date(i.time * 1000);
        let time = `${jsTime.getHours()}:${jsTime.getMinutes()}`;

        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<div class="event"><span class="time">${time}</span><div class="dot" style="background: rgb(${toRgb(
          applyRgbChange(colors[0], changeBy, index)
        )});border: 3px solid rgb(${toRgb(
          lightenRgb(applyRgbChange(colors[0], changeBy, index), 60)
        )});"></div>${i.name}</div>`;
        document.querySelector("#container").appendChild(newDiv);
      });

      // Size the back line for the dots
      let size = document.querySelector('#container').clientHeight - 24;
      document.querySelector('#line').style.height = `${size}px`

      // Show the back line
      document.querySelector('#line').style.display = 'block';
    });
}

window.addEventListener("load", updateEvents);
