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