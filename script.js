document.addEventListener('DOMContentLoaded', () => {
  var count = 0;

  var counter = document.getElementById("counter");
  var instructions = document.getElementById("instructions");

  var star = document.getElementById("star");

  const elements = document.querySelectorAll('.bounce');
  const color_lib = ['darkolivegreen', 'darkslategray', 'darkseagreen', 'darkorchid', 'darkturquoise'];

  const items = Array.from(elements).map((el, i) => {
    const item = {
      el: el,
      x: 50 + i * 40,
      y: 50 + i * 40,
      dx: (Math.random() < 0.5 ? 1 : -1) * (0.75 + Math.random() * 1.5),
      dy: (Math.random() < 0.5 ? 1 : -1) * (0.75 + Math.random() * 1.5),
      isHovered: false,
      hovered_on_before: false
    };

    el.addEventListener('mouseenter', () => {
      item.isHovered = true;
      if (!item.hovered_on_before && item.el.nodeName == "IMG") {
        item.hovered_on_before = true;

        count++;

        counter.innerHTML = "HOVER COUNT: " + count.toString();

        if (count >= 6) {
          instructions.innerHTML = "CONGRATS! YOU GOT THEM ALL!!! HAVE A GOLD STAR";  
          star.style.visibility = "visible";
        }
      }

      if (item.el.id == "reverse") {
        item.el.style.transform = 'rotate(160deg)';
      }
      if (item.el.id == "small") {
        item.el.style.maxWidth = '10vw';
      }
      if (item.el.id == "big") {
        item.el.style.maxWidth = '30vw';
      }
      if (item.el.id == "border_color") {
        item.el.style.borderColor = 'red';
      }
      if (item.el.id == "hide") {
        item.el.style.opacity = 0.5;
      }
    });

    el.addEventListener('mouseleave', () => {
      item.isHovered = false;

      if (item.el.id == "reverse") {
        item.el.style.transform = 'rotate(0deg)';
      }    
      if (item.el.id == "small" || item.el.id == "big") {
        item.el.style.maxWidth = '15vw';
      }      
      if (item.el.id == "border_color") {
        item.el.style.borderColor = 'white';
      }
      if (item.el.id == "hide") {
        item.el.style.opacity = 1.0;
      }
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

        if (item.el.nodeName == "H1" || item.el.nodeName == "P") {
          let i = Math.floor(Math.random() * color_lib.length);
          let r = color_lib[i];
          item.el.style.color = r;
        }
          
      } else if (item.x >= maxW) {
         if (item.el.nodeName == "H1" || item.el.nodeName == "P") {
          let i = Math.floor(Math.random() * color_lib.length);
          let r = color_lib[i];
          item.el.style.color = r;
        }
        item.x = maxW;
        item.dx = -Math.abs(item.dx);
      }

      if (item.y <= 0) {
        if (item.el.nodeName == "H1" || item.el.nodeName == "P") {
          let i = Math.floor(Math.random() * color_lib.length);
          let r = color_lib[i];
          item.el.style.color = r;
        }
        item.y = 0;
        item.dy = Math.abs(item.dy);
      } else if (item.y >= maxH) {
        if (item.el.nodeName == "H1" || item.el.nodeName == "P") {
          let i = Math.floor(Math.random() * color_lib.length);
          let r = color_lib[i];
          item.el.style.color = r;
        }
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