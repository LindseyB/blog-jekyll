var grid = document.querySelector('.grid');

if (grid) {
  var msnry = new Masonry( grid, {
    itemSelector: '.grid-item',
    columnWidth: 50,
    fitWidth: true,
    gutter: 3,
    stagger: 30,
  });
}

function addMoonAPIWidget() {
  var btn = document.createElement('button');
  btn.innerText = '🌓'; // Moon Icon
  btn.title = 'Check the Moon Phase';
  btn.style.position = 'fixed';
  btn.style.bottom = '80px';
  btn.style.right = '80px';
  btn.style.zIndex = '9999';
  btn.style.background = '#ffffff';
  btn.style.color = '#f8f8f2';
  btn.style.borderRadius = '50%';
  btn.style.width = '48px';
  btn.style.height = '48px';
  btn.style.fontSize = '24px';
  btn.style.cursor = 'pointer';
  btn.style.display = 'flex';
  btn.style.alignItems = 'center';
  btn.style.justifyContent = 'center';
  btn.style.border = 'none';
  btn.addEventListener('click', function() {
    window.open('https://moon-api.co/', '_blank'); // Open in new tab
  });
  document.body.appendChild(btn);
}

window.addEventListener('load', addMoonAPIWidget);