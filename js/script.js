function burger() {
  var menu = document.getElementById('menu-box');
  var burger = document.getElementById('burger-menu');
  var checkbox = document.getElementById('checkbox');
  if (checkbox.checked) {
    menu.style.display = 'block';
    burger.classList.toggle("change");
  }
  else {
    menu.style.display = 'none';
    burger.classList.toggle("change");
  }
}
const mediaQuery1 = window.matchMedia('(min-width: 768px)')
function block(e) {
  let a = document.getElementById('menu-box');
  let b = document.getElementById('checkbox');
  if (e.matches && a.style.display == 'none') {
    a.style.display = 'block';
  }
  else {
    if (b.checked) {
      a.style.display = 'block';
    }
    else {
      a.style.display = 'none';
    }
  }
}
mediaQuery1.addListener(block);
block(mediaQuery1);