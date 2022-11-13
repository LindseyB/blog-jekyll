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