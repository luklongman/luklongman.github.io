document.addEventListener("DOMContentLoaded", () => {
  const texts = document.querySelectorAll('.prompt');
  let delay = 5000;

  texts.forEach((text, index) => {
    setTimeout(() => {
      text.style.transition = 'opacity 500ms';
      text.style.opacity = 1;
      setTimeout(() => {
        text.style.opacity = 0;
      }, index === texts.length - 1 ? 4500 : 2000); // 500ms fade in + 4000ms show for last text, 500ms fade in + 1500ms show for others
    }, delay + index * 3000); // 3000ms total for each text (500ms fade in + 1500ms show + 1000ms fade out)
  });
});
