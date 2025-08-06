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
          li.innerHTML = `<b>${trackName}</b> by <i>${artistName}</i>`;
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

// ==========================================================================
// Theme Toggle Functionality
// ==========================================================================

function initializeThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const html = document.documentElement;

  if (!themeToggle || !themeIcon) return;

  // Update icon based on current theme
  function updateThemeIcon() {
    const currentTheme = html.getAttribute('data-theme');
    themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }

  // Initialize icon
  updateThemeIcon();

  // Theme toggle handler
  themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      updateThemeIcon();
    }
  });
}

// ==========================================================================
// Copy Functionality for Code Blocks
// ==========================================================================

function initializeCopyFunctionality() {
  // Convert Rouge-generated code blocks to work with copy functionality
  document.querySelectorAll('.highlight pre').forEach(function(pre) {
    var parent = pre.parentElement;

    // Add language classes for better styling
    pre.classList.add('language-ruby'); // Default to ruby since most code is ruby

    // Check if parent has specific language class
    if (parent.classList.contains('language-bash')) {
      pre.classList.remove('language-ruby');
      pre.classList.add('language-bash');
    } else if (parent.classList.contains('language-javascript')) {
      pre.classList.remove('language-ruby');
      pre.classList.add('language-javascript');
    }

    // Create wrapper for toolbar
    var wrapper = document.createElement('div');
    wrapper.className = 'code-toolbar';

    // Insert wrapper
    parent.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    // Create and style copy button
    var toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    var toolbarItem = document.createElement('div');
    toolbarItem.className = 'toolbar-item';

    var button = document.createElement('button');
    button.textContent = 'Copy';
    button.className = 'copy-to-clipboard-button';
    button.style.cssText = `
      background: linear-gradient(135deg, #2d5f6f 0%, #5b4b7c 100%);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      cursor: pointer;
      transition: all 0.2s ease;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      opacity: 0;
      z-index: 10;
    `;

    // Add hover effects
    wrapper.style.position = 'relative';

    wrapper.addEventListener('mouseenter', function() {
      button.style.opacity = '1';
    });

    wrapper.addEventListener('mouseleave', function() {
      button.style.opacity = '0';
    });

    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });

    // Add copy functionality
    button.addEventListener('click', function() {
      var code = pre.querySelector('code').textContent;

      // Use modern clipboard API if available
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code).then(function() {
          showCopySuccess(button);
        }).catch(function() {
          fallbackCopy(code, button);
        });
      } else {
        fallbackCopy(code, button);
      }
    });

    // Add button to toolbar
    toolbarItem.appendChild(button);
    toolbar.appendChild(toolbarItem);
    wrapper.appendChild(toolbar);
  });
}

// Fallback copy method
function fallbackCopy(text, button) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-999999px';
  textarea.style.top = '-999999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand('copy');
    showCopySuccess(button);
  } catch (err) {
    console.error('Copy failed:', err);
  }

  document.body.removeChild(textarea);
}

// Show copy success feedback
function showCopySuccess(button) {
  var originalText = button.textContent;
  button.textContent = 'Copied!';
  button.style.background = '#28a745';
  setTimeout(function() {
    button.textContent = originalText;
    button.style.background = 'linear-gradient(135deg, #2d5f6f 0%, #5b4b7c 100%)';
  }, 2000);
}

// ==========================================================================
// Initialize Everything
// ==========================================================================

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initializeThemeToggle();
  initializeCopyFunctionality();
});

// Initialize Last.fm widget on page load
window.addEventListener('load', function() {
  addLastFmWidgetToDiv('#lastfm-widget', 'BeEkkoDoCrimes', '421d1d180d48e1c30fcb3ec771bba221'); // please don't abuse my API key
});