const showTime = false;

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
        let gray =
          data.id >= index
            ? ""
            : "filter: drop-shadow(0 0 7px black) grayscale(100%);";

        newDiv.innerHTML = `<div class="event">${
          showTime ? `<span class="time">${time}</span>` : ""
        }<div class="dot" style="background: rgb(${toRgb(
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
      document.querySelector("#line").style.transform = showTime
        ? "translate(0, -50%) translate(63px, -10px)"
        : "translate(0, -50%) translate(13px, -10px)";

      // Show the back line
      document.querySelector("#line").style.display = "block";

      setTimeout(updateEvents, 10000);
    });
}

window.addEventListener("load", updateEvents);
