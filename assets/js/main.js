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


function addLastFmWidgetToDiv(divSelector, username, apiKey) {
  var targetDiv = document.querySelector(divSelector);
  if (!targetDiv) return;

  var container = document.createElement('div');
  container.style.paddingBottom = '32px';

  var title = document.createElement('div');
  title.innerText = '🎵 Last.fm Weekly Top Tracks';
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '8px';
  container.appendChild(title);

  var list = document.createElement('ol');
  list.style.margin = '0';
  list.style.padding = '0 0 0 18px';
  list.style.listStyle = 'decimal inside';
  container.appendChild(list);

  var loading = document.createElement('div');
  loading.innerText = 'Loading...';
  container.appendChild(loading);

  fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${encodeURIComponent(username)}&api_key=${encodeURIComponent(apiKey)}&format=json`)
    .then(res => res.json())
    .then(data => {
      loading.remove();
      if (data.weeklytrackchart && data.weeklytrackchart.track && data.weeklytrackchart.track.length > 0) {
        data.weeklytrackchart.track.slice(0, 10).forEach(function(track) {
          var li = document.createElement('li');
          li.style.marginBottom = '4px';
          var trackName = track.name || 'Unknown';
          var artistName = (track.artist && track.artist['#text']) || 'Unknown';
          li.innerHTML = `<span style="font-weight:500; color:#ffb86c">${trackName}</span> <span style="color:#f1fa8c">by</span> <span style="color:#ff79c6">${artistName}</span>`;
          list.appendChild(li);
        });
      } else {
        var empty = document.createElement('div');
        empty.innerText = 'No data found.';
        container.appendChild(empty);
      }
    })
    .catch(() => {
      loading.innerText = 'Failed to load tracks.';
    });

  targetDiv.appendChild(container);
}

window.addEventListener('load', function() {
  addLastFmWidgetToDiv('#lastfm-widget', 'BeEkkoDoCrimes', '421d1d180d48e1c30fcb3ec771bba221'); // please don't abuse my API key
});

window.addEventListener('load', addMoonAPIWidget);