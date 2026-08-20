document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.bounce');

  const items = Array.from(elements).map((el, i) => {
    const item = {
      el: el,
      x: 50 + i * 40,
      y: 50 + i * 40,
      dx: (Math.random() < 0.5 ? 1 : -1) * (0.75 + Math.random() * 1.5), /* adjust these values for speed!*/
      dy: (Math.random() < 0.5 ? 1 : -1) * (0.75 + Math.random() * 1.5),
      isHovered: false
    };

    el.addEventListener('mouseenter', () => {
      item.isHovered = true;
    });

    el.addEventListener('mouseleave', () => {
      item.isHovered = false;
    });

    return item;
  });

  function update() {
    items.forEach(item => {
      if (item.isHovered) return;

      const maxW = window.innerWidth - item.el.clientWidth;
      const maxH = window.innerHeight - item.el.clientHeight;

      item.x += item.dx;
      item.y += item.dy;

      if (item.x <= 0) {
        item.x = 0;
        item.dx = Math.abs(item.dx);
      } else if (item.x >= maxW) {
        item.x = maxW;
        item.dx = -Math.abs(item.dx);
      }

      if (item.y <= 0) {
        item.y = 0;
        item.dy = Math.abs(item.dy);
      } else if (item.y >= maxH) {
        item.y = maxH;
        item.dy = -Math.abs(item.dy);
      }

      item.el.style.left = item.x + 'px';
      item.el.style.top = item.y + 'px';
    });

    requestAnimationFrame(update);
  }

  update();
});