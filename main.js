const products = [
  { id: 1, cat: '衣服', name: 'Soft Breeze 襯衫', en: 'COTTON OVERSIZED SHIRT', price: 1480, color: '#d9c6b6', image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=700&q=85' },
  { id: 2, cat: '褲子', name: 'Everyday 寬版西褲', en: 'TAILORED WIDE TROUSERS', price: 1680, color: '#807b77', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=85' },
  { id: 3, cat: '飾品', name: 'Muse 水滴耳環', en: 'SCULPTURAL EARRINGS', price: 680, color: '#d2b48c', image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=700&q=85' },
  { id: 4, cat: '裙子', name: 'Serein 緞面長裙', en: 'SATIN BIAS MIDI SKIRT', price: 1580, color: '#b8a99a', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85' },
  { id: 5, cat: '包包', name: 'Daylight 半月包', en: 'SOFT LEATHER SHOULDER BAG', price: 2180, color: '#6b5848', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85' },
  { id: 6, cat: '衣服', name: 'Cloud Knit 開襟衫', en: 'LIGHTWEIGHT KNIT CARDIGAN', price: 1380, color: '#ddd9d0', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=85' }
];
let cart = JSON.parse(localStorage.getItem('seoul-muse-cart') || '[]');
let active = '全部';
const money = n => new Intl.NumberFormat('zh-TW').format(n);

function render() {
  const filtered = active === '全部' ? products : products.filter(p => p.cat === active);
  document.querySelector('#app').innerHTML = `
    <div class="announcement">FREE SHIPPING ON ORDERS OVER NT$2,000 <span>✦</span> 新會員首購 9 折</div>
    <header>
      <button class="mobile-menu" aria-label="開啟選單">☰</button>
      <a class="logo" href="#top" onclick="window.scrollTo(0,0)">SEOUL <em>MUSE</em></a>
      <nav><a href="#shop">商店</a><a href="#story">關於我們</a><a href="#service">客戶服務</a></nav>
      <div class="header-actions"><button onclick="openModal('auth')">登入</button><button class="bag" onclick="openCart()">購物袋 <b>${cart.reduce((s,i)=>s+i.qty,0)}</b></button></div>
    </header>
    <main id="top">
      <section class="hero"><div class="hero-copy"><p class="eyebrow">2025 FALL COLLECTION</p><h1>Made for<br><i>your</i> quiet days.</h1><p class="hero-text">用簡約剪裁，盛裝每一個自在而堅定的妳。<br>來自首爾的日常靈感選品。</p><a href="#shop" class="button">探索系列 <span>→</span></a></div><div class="hero-image"><img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1600&q=90" alt="韓式極簡穿搭"><span class="circle-note">NEW<br>SEASON</span></div></section>
      <section class="intro"><p class="eyebrow">OUR POINT OF VIEW</p><h2>衣服不只是穿著，<br>是妳與世界相遇的方式。</h2><p>我們相信真正的風格，是舒適地成為自己。</p></section>
      <section class="shop section" id="shop"><div class="section-head"><div><p class="eyebrow">CURATED FOR YOU</p><h2>本季選品</h2></div><a href="#shop">查看全部商品 →</a></div><div class="filters">${['全部','衣服','褲子','飾品','裙子','包包'].map(c=>`<button class="${c===active?'active':''}" onclick="filterProducts('${c}')">${c}</button>`).join('')}</div><div class="products">${filtered.map(productCard).join('')}</div></section>
      <section class="story" id="story"><div class="story-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85" alt="Seoul Muse 品牌故事"></div><div class="story-copy"><p class="eyebrow">THE SEOUL MUSE STORY</p><h2>為日常，<br>留下美好的餘白。</h2><p>SEOUL MUSE 誕生於首爾巷弄裡那些低調卻令人駐足的片刻。我們挑選耐穿、好搭、能陪伴妳很久的單品，讓每一次打開衣櫃都輕鬆而篤定。</p><p>我們的目標很簡單：讓質感設計不再遙遠，讓每位女性都能穿出屬於自己的節奏。</p><a href="#shop" class="text-link">認識我們的理念 →</a></div></section>
      <section class="benefits"><div><span>01</span><h3>精選設計</h3><p>來自韓國與亞洲獨立品牌的細緻選品。</p></div><div><span>02</span><h3>安心購物</h3><p>7 日鑑賞期與透明的退換貨服務。</p></div><div><span>03</span><h3>貼心客服</h3><p>週一至週五，真人客服陪你找到心儀單品。</p></div></section>
      <section class="newsletter" id="service"><p class="eyebrow">STAY IN THE LOOP</p><h2>訂閱 MUSE LETTER</h2><p>搶先收到新品、穿搭靈感與會員限定優惠。</p><form onsubmit="subscribe(event)"><input type="email" placeholder="你的電子信箱" required><button>訂閱</button></form><button class="chat-button" onclick="openModal('chat')">☻ 線上客服</button></section>
    </main>
    <footer><a class="logo" href="#top">SEOUL <em>MUSE</em></a><p>© 2025 SEOUL MUSE. ALL RIGHTS RESERVED.</p><div><a href="#service">購物說明</a><a href="#service">退換貨政策</a><a href="#service">Instagram</a></div></footer>
    <div class="overlay" id="overlay" onclick="closePanels(event)"></div><aside class="cart-panel" id="cartPanel"><button class="close" onclick="closeCart()">×</button><p class="eyebrow">YOUR SELECTION</p><h2>購物袋 (${cart.reduce((s,i)=>s+i.qty,0)})</h2><div class="cart-items">${cart.length ? cart.map(cartItem).join('') : '<div class="empty">購物袋還是空的。<br><a href="#shop" onclick="closeCart()">開始選購 →</a></div>'}</div>${cart.length?`<div class="cart-bottom"><div><span>小計</span><strong>NT$ ${money(cart.reduce((s,i)=>s+i.price*i.qty,0))}</strong></div><button class="checkout" onclick="checkout()">前往結帳 →</button></div>`:''}</aside>
    <div class="modal" id="authModal"><button class="close" onclick="closeModal('auth')">×</button><p class="eyebrow">WELCOME TO SEOUL MUSE</p><h2>登入 / 註冊</h2><p class="modal-copy">登入後可追蹤訂單、收藏商品與享受會員優惠。</p><form onsubmit="auth(event)"><label>電子信箱<input type="email" required placeholder="hello@example.com"></label><label>密碼<input type="password" required placeholder="至少 6 個字元" minlength="6"></label><button class="checkout">登入</button></form><p class="small">還沒有帳號？ <a href="#" onclick="auth(event)">立即註冊</a></p></div>
    <div class="modal chat-modal" id="chatModal"><button class="close" onclick="closeModal('chat')">×</button><p class="eyebrow">MUSE CARE</p><h2>嗨，需要幫忙嗎？</h2><p class="modal-copy">客服時間：週一至週五 10:00–18:00<br>通常於一個工作天內回覆。</p><div class="quick"><button onclick="chatReply('如何查詢訂單？')">如何查詢訂單？</button><button onclick="chatReply('退換貨怎麼辦理？')">退換貨怎麼辦理？</button></div><div class="reply" id="reply"></div><a class="checkout email" href="mailto:hello@seoulmuse.tw">寄信給客服</a></div>
    <div id="toast"></div>`;
}
function productCard(p) { return `<article class="product"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><button class="add" onclick="addToCart(${p.id})">加入購物袋 <span>+</span></button></div><div class="product-info"><p>${p.en}</p><h3>${p.name}</h3><strong>NT$ ${money(p.price)}</strong></div></article>`; }
function cartItem(i) { const p=products.find(p=>p.id===i.id); return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><p>NT$ ${money(p.price)}</p><div class="quantity"><button onclick="changeQty(${p.id},-1)">−</button><span>${i.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><button class="remove" onclick="removeItem(${p.id})">×</button></div>`; }
window.filterProducts=c=>{active=c;render()};
window.addToCart=id=>{const item=cart.find(i=>i.id===id); item?item.qty++:cart.push({id,qty:1,price:products.find(p=>p.id===id).price}); save(); toast('已加入購物袋');};
window.changeQty=(id,n)=>{const item=cart.find(i=>i.id===id); item.qty+=n;if(item.qty<1)cart=cart.filter(i=>i.id!==id);save();render();openCart()};
window.removeItem=id=>{cart=cart.filter(i=>i.id!==id);save();render();openCart()};
function save(){localStorage.setItem('seoul-muse-cart',JSON.stringify(cart));render()}
window.openCart=()=>{document.querySelector('#overlay').classList.add('show');document.querySelector('#cartPanel').classList.add('show')};window.closeCart=()=>{document.querySelector('#overlay').classList.remove('show');document.querySelector('#cartPanel').classList.remove('show')};
window.openModal=n=>{document.querySelector('#overlay').classList.add('show');document.querySelector(`#${n}Modal`).classList.add('show')};window.closeModal=n=>{document.querySelector('#overlay').classList.remove('show');document.querySelector(`#${n}Modal`).classList.remove('show')};
window.closePanels=e=>{if(e.target.id==='overlay'){closeCart();document.querySelectorAll('.modal').forEach(x=>x.classList.remove('show'))}};
window.subscribe=e=>{e.preventDefault();e.target.reset();toast('謝謝訂閱，優惠已寄到你的信箱！')};window.auth=e=>{e.preventDefault();closeModal('auth');toast('歡迎加入 SEOUL MUSE！')};window.checkout=()=>toast('結帳功能已準備好，可串接金流服務。');window.chatReply=q=>document.querySelector('#reply').textContent=q.includes('訂單')?'請提供訂單編號，我們會立即協助你查詢。':'商品於收到後 7 日內可申請退換貨，請保持商品完整。';
function toast(msg){const el=document.querySelector('#toast');if(!el)return;el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2600)}
render();
