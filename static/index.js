function updateEvents() {
  // Get Schedule
  fetch("/api/schedule")
    .then((resp) => resp.json())
    .then((data) => {
      let changeBy = genChangeBy(data.data.length);

      // Remove Any Old Dots
      document.querySelectorAll(".item").forEach((i) => i.remove());

      // Create the dots
      data.data.forEach((i, index) => {
        let jsTime = new Date(i.time * 1000);
        let time = `${jsTime.getHours()}:${jsTime.getMinutes()}`;

        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        let gray = "";
        if (data.id >= index) gray = "filter: grayscale(0%);";

        newDiv.innerHTML = `<div class="event"><span class="time">${time}</span><div class="dot" style="background: rgb(${toRgb(
          applyRgbChange(colors[0], changeBy, index)
        )});border: 3px solid rgb(${toRgb(
          lightenRgb(applyRgbChange(colors[0], changeBy, index), 60)
        )});${gray}"></div>${i.name}</div>`;
        document.querySelector("#container").appendChild(newDiv);
      });

      // Size the back line for the dots
      // Sub atleast 20
      let size =
        document
          .querySelectorAll(".dot")
          [data.data.length - 1].getBoundingClientRect().y -
        document.querySelectorAll(".dot")[0].getBoundingClientRect().y;
      document.querySelector("#line").style.height = `${size}px`;

      // Show the back line
      document.querySelector("#line").style.display = "block";

      setTimeout(updateEvents, 1000);
    });
}

window.addEventListener("load", updateEvents);
