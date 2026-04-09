// ===========================
// ENCAVE CAFÉ — MAIN APP JS
// ===========================

const API_BASE = 'http://localhost:8080/api';

// ---- DATA (used until backend is connected) ----
const LOCATIONS = [
  { id: 1, name: 'Design Building', floor: 'Ground Floor', open: true,  timing: '8:00 AM – 9:00 PM', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=70' },
  { id: 2, name: 'Sarasvati Building', floor: '1st Floor', open: true,  timing: '8:00 AM – 8:00 PM', img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&q=70' },
  { id: 3, name: 'Vivekanand Building', floor: 'Ground Floor', open: false, timing: '9:00 AM – 7:00 PM', img: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=400&q=70' },
  { id: 4, name: 'Maitrey Building', floor: '2nd Floor', open: true,  timing: '8:30 AM – 8:30 PM', img: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&q=70' },
  { id: 5, name: 'Dhruv Building', floor: 'Ground Floor', open: true,  timing: '8:00 AM – 9:00 PM', img: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&q=70' },
  { id: 6, name: 'Vyas Building', floor: '5th Floor', open: true,  timing: '8:00 AM – 8:00 PM', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=70' },
];

const MENU_ITEMS = [
  // BREAKFAST
  { id:1,  name:'Poha',            category:'breakfast', price:35, img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=70' },
  { id:2,  name:'Upma',            category:'breakfast', price:35, img:'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=300&q=70' },
  { id:3,  name:'Plain Dosa',      category:'breakfast', price:50, img:'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&q=70' },
  { id:4,  name:'Masala Dosa',     category:'breakfast', price:65, img:'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&q=70' },
  { id:5,  name:'Idli Sambhar',    category:'breakfast', price:50, img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=70' },
  { id:6,  name:'Aloo Paratha',    category:'breakfast', price:60, img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=70' },
  // SANDWICHES
  { id:7,  name:'Veg Grilled Sub', category:'sandwiches', price:80, img:'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=300&q=70' },
  { id:8,  name:'Paneer Panini',   category:'sandwiches', price:90, img:'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=300&q=70' },
  { id:9,  name:'Bombay Sandwich', category:'sandwiches', price:70, img:'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&q=70' },
  { id:10, name:'Pesto Sub',       category:'sandwiches', price:90, img:'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=300&q=70' },
  { id:11, name:'Focaccia',        category:'sandwiches', price:95, img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=70' },
  // PASTA
  { id:12, name:'Arrabbiata Pasta',   category:'pasta', price:85, img:'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=300&q=70' },
  { id:13, name:'Alfredo Pasta',      category:'pasta', price:90, img:'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&q=70' },
  { id:14, name:'Pink Sauce Pasta',   category:'pasta', price:95, img:'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&q=70' },
  { id:15, name:'Pesto Pasta',        category:'pasta', price:95, img:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&q=70' },
  // RICE
  { id:16, name:'Veg Dum Biryani',  category:'rice', price:90, img:'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&q=70' },
  { id:17, name:'Dal Khichadi',     category:'rice', price:60, img:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=70' },
  { id:18, name:'Pulav',            category:'rice', price:70, img:'https://images.unsplash.com/photo-1601050690117-94f5f7a1b0b0?w=300&q=70' },
  { id:19, name:'Rajma Chawal',     category:'rice', price:75, img:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=70' },
  // MAGGI
  { id:20, name:'Plain Maggi',      category:'maggi', price:30, img:'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&q=70' },
  { id:21, name:'Masala Maggi',     category:'maggi', price:40, img:'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&q=70' },
  { id:22, name:'Veg Maggi',        category:'maggi', price:45, img:'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&q=70' },
  { id:23, name:'Cheese Maggi',     category:'maggi', price:55, img:'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&q=70' },
  // SIDES
  { id:24, name:'Plain Fries',      category:'sides', price:50, img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&q=70' },
  { id:25, name:'Peri Peri Fries',  category:'sides', price:60, img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&q=70' },
  // BEVERAGES
  { id:26, name:'Cold Coffee',     category:'beverages', price:60, img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=70' },
  { id:27, name:'Hot Coffee',      category:'beverages', price:40, img:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&q=70' },
  { id:28, name:'Chai',            category:'beverages', price:20, img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&q=70' },
  { id:29, name:'Masala Chai',     category:'beverages', price:25, img:'https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?w=300&q=70' },
  { id:30, name:'Buttermilk',      category:'beverages', price:25, img:'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=300&q=70' },
  { id:31, name:'Lemonade',        category:'beverages', price:35, img:'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&q=70' },
];

// ---- CART ----
let cart = JSON.parse(localStorage.getItem('encave_cart') || '[]');

function saveCart() {
  localStorage.setItem('encave_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart();
  showToast(`🛒 ${item.name} added to cart!`);
}

// ---- TOAST ----
function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ---- LOCATION CARDS ----
function renderLocations() {
  const grid = document.getElementById('locationsGrid');
  if (!grid) return;

  // Try backend first
  fetch(`${API_BASE}/locations`)
    .then(r => r.json())
    .then(data => buildLocationCards(grid, data))
    .catch(() => buildLocationCards(grid, LOCATIONS));
}

function buildLocationCards(grid, locations) {
  grid.innerHTML = locations.map(loc => `
    <div class="location-card fade-up" onclick="goToMenu(${loc.id})">
      <div class="location-img">
        <img src="${loc.img || loc.imageUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=70'}" alt="${loc.name}" loading="lazy">
        <span class="location-status ${loc.open || loc.isOpen ? 'status-open' : 'status-closed'}">
          ${loc.open || loc.isOpen ? '● Open' : '● Closed'}
        </span>
      </div>
      <div class="location-body">
        <div class="location-name">${loc.name}</div>
        <div class="location-floor">${loc.floor || loc.floorDetails || ''}</div>
        <div class="location-time">${loc.timing || loc.openingTime + ' – ' + loc.closingTime || '8:00 AM – 9:00 PM'}</div>
        <button class="location-menu-btn">View Menu & Order →</button>
      </div>
    </div>
  `).join('');
  observeFadeElements();
}

function goToMenu(locationId) {
  window.location.href = `menu.html?location=${locationId}`;
}

// ---- MENU PREVIEW ----
let activeMenuCat = 'all';

function renderMenuPreview() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  const items = activeMenuCat === 'all' ? MENU_ITEMS.slice(0, 8) : MENU_ITEMS.filter(i => i.category === activeMenuCat).slice(0, 8);
  grid.innerHTML = items.map(item => `
    <div class="menu-item fade-up">
      <div class="menu-item-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy">
      </div>
      <div class="menu-item-body">
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-cat">${item.category}</div>
        <div class="menu-item-footer">
          <span class="menu-item-price">₹${item.price}</span>
          <button class="add-cart-btn" onclick="addToCart(${JSON.stringify(item).replace(/"/g,"'")})">+ Add</button>
        </div>
      </div>
    </div>
  `).join('');
  observeFadeElements();
}

function initMenuTabs() {
  const tabs = document.querySelectorAll('#menuTabs .tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeMenuCat = tab.dataset.cat;
      renderMenuPreview();
    });
  });
}

// ---- NAVBAR SCROLL ----
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }
}

// ---- SCROLL ANIMATIONS ----
function observeFadeElements() {
  const els = document.querySelectorAll('.fade-up, .fade-right');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  updateCartCount();
  renderLocations();
  renderMenuPreview();
  initMenuTabs();
  observeFadeElements();
});
