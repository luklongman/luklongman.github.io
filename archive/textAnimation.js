document.addEventListener("DOMContentLoaded", () => {
  const texts = document.querySelectorAll('.prompt');
  let delay = 5000;

  texts.forEach((text, index) => {
    let displayTime = 1500; // 1500ms show time for each text
    if (index === texts.length - 1) {
      displayTime *= 2; // Double the display time for the last text
    }

    setTimeout(() => {
      text.style.opacity = 1;
      setTimeout(() => {
        text.style.opacity = 0;
      }, 750 + displayTime); // 750ms fade in + displayTime
    }, delay + index * 3000); // 3000ms total for each text (750ms fade in + 1500ms show + 750ms fade out)
  });
});
