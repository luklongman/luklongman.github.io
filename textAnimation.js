document.addEventListener("DOMContentLoaded", () => {
  const texts = document.querySelectorAll('.prompt');
  let delay = 3000; // Start animation at 3rd second

  texts.forEach((text, index) => {
    setTimeout(() => {
      text.style.opacity = 1;
      setTimeout(() => {
        text.style.opacity = 0;
      }, 2250); // 750ms fade in + 1500ms show
    }, delay + index * 3000); // 3000ms total for each text (750ms fade in + 1500ms show + 750ms fade out)
  });
});
