// menu.js
let selectedLocationId = null;
let menuCat = 'all';

function renderSidebar() {
  const list = document.getElementById('locationList');
  if (!list) return;
  fetch(`${API_BASE}/locations`)
    .then(r => r.json())
    .then(locs => buildSidebar(list, locs))
    .catch(() => buildSidebar(list, LOCATIONS));
}

function buildSidebar(list, locs) {
  list.innerHTML = locs.map(loc => `
    <button class="sidebar-location-btn ${selectedLocationId === loc.id ? 'active' : ''}" onclick="selectLocation(${loc.id}, '${loc.name}', ${loc.open || loc.isOpen || false})">
      <span class="sidebar-dot ${(loc.open || loc.isOpen) ? '' : 'closed'}"></span>
      <span class="sidebar-loc-info">
        <span class="sidebar-loc-name">${loc.name}</span>
        <span class="sidebar-loc-floor">${loc.floor || loc.floorDetails || ''}</span>
      </span>
    </button>
  `).join('');
}

function selectLocation(id, name, isOpen) {
  selectedLocationId = id;
  document.getElementById('selectedLocationName').textContent = name;
  const statusEl = document.getElementById('selectedLocationStatus');
  statusEl.textContent = isOpen ? '● Open' : '● Closed';
  statusEl.className = `location-status ${isOpen ? 'status-open' : 'status-closed'}`;
  renderSidebar();
  loadMenu(id);
}

function loadMenu(locationId) {
  fetch(`${API_BASE}/locations/${locationId}/menu`)
    .then(r => r.json())
    .then(items => renderMenuGrid(items))
    .catch(() => renderMenuGrid(MENU_ITEMS));
}

function renderMenuGrid(items) {
  const grid = document.getElementById('fullMenuGrid');
  if (!grid) return;
  const filtered = menuCat === 'all' ? items : items.filter(i => i.category === menuCat);
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-light);">No items in this category</div>`;
    return;
  }
  grid.innerHTML = filtered.map(item => `
    <div class="menu-item fade-up">
      <div class="menu-item-img">
        <img src="${item.img || item.imageUrl || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=70'}" alt="${item.name}" loading="lazy">
      </div>
      <div class="menu-item-body">
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-cat">${item.category}</div>
        <div class="menu-item-footer">
          <span class="menu-item-price">₹${item.price}</span>
          <button class="add-cart-btn" onclick='addToCart(${JSON.stringify(item)})'>+ Add</button>
        </div>
      </div>
    </div>
  `).join('');
  updateFloatingCart();
  observeFadeElements();
}

function updateFloatingCart() {
  const fc = document.getElementById('floatingCart');
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (count > 0) {
    fc.style.display = 'flex';
    document.getElementById('fcItems').textContent = count;
    document.getElementById('fcTotal').textContent = `₹${total}`;
  } else {
    fc.style.display = 'none';
  }
}

function initCatTabs() {
  document.querySelectorAll('#menuCatTabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#menuCatTabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      menuCat = tab.dataset.cat;
      if (selectedLocationId) loadMenu(selectedLocationId);
      else renderMenuGrid(MENU_ITEMS);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  initCatTabs();
  // check URL param
  const params = new URLSearchParams(window.location.search);
  const locId = parseInt(params.get('location'));
  if (locId) {
    const loc = LOCATIONS.find(l => l.id === locId);
    if (loc) selectLocation(loc.id, loc.name, loc.open);
  } else {
    renderMenuGrid(MENU_ITEMS);
  }
  // override addToCart to also update floating cart
  const origAdd = window.addToCart;
  window.addToCart = function(item) { origAdd(item); updateFloatingCart(); };
});
