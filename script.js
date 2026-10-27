const products = [
  {id:1,name:"Skilabs Phantom",category:"black",label:"BEST-SELLER",price:229.99,tag:"DARK SERIES",desc:"Un look sombre et affirmé pour ton espace gaming.",image:"https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Skilabs Nova",category:"color",label:"NOUVEAU",price:189.99,tag:"NEON SERIES",desc:"Une silhouette moderne pour réveiller ton setup.",image:"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Skilabs Eclipse",category:"black",label:"ÉDITION PRO",price:279.99,tag:"DARK SERIES",desc:"Une présence premium pour tes longues sessions.",image:"https://images.unsplash.com/photo-1612372606404-0ab33e7188e7?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Skilabs Pulse",category:"color",label:"STYLE UNIQUE",price:159.99,tag:"NEON SERIES",desc:"Un design dynamique pour un espace à ton image.",image:"https://images.unsplash.com/photo-1616627451515-cbc80e9ece35?auto=format&fit=crop&w=700&q=80"}
];
const euro = value => new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(value);
let cart = [];
let activeFilter = "all";
const grid = document.querySelector("#productGrid");
const cartDrawer = document.querySelector("#cartDrawer");
const backdrop = document.querySelector("#cartBackdrop");
const toast = document.querySelector("#toast");
let toastTimer;

function renderProducts(){
  let shown = products.filter(p => activeFilter === "all" || p.category === activeFilter);
  const sort = document.querySelector("#sortSelect").value;
  if(sort === "low") shown.sort((a,b)=>a.price-b.price);
  if(sort === "high") shown.sort((a,b)=>b.price-a.price);
  grid.innerHTML = shown.map((p,i)=>`<article class="product-card" style="animation-delay:${i*70}ms">
    <div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-badge">${p.label}</span></div>
    <div class="product-body"><span class="product-category">${p.tag}</span><h3>${p.name}</h3><p class="product-desc">${p.desc}</p>
    <div class="product-bottom"><span class="product-price">${euro(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Ajouter ${p.name} au panier">+</button></div></div></article>`).join("");
}
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2500)}
function openCart(){cartDrawer.classList.add("open");backdrop.classList.add("open");document.body.classList.add("cart-open");cartDrawer.setAttribute("aria-hidden","false")}
function closeCart(){cartDrawer.classList.remove("open");backdrop.classList.remove("open");document.body.classList.remove("cart-open");cartDrawer.setAttribute("aria-hidden","true")}
function renderCart(){
  const count=cart.reduce((sum,item)=>sum+item.qty,0);
  const total=cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0);
  document.querySelector("#cartCount").textContent=count;
  document.querySelector("#cartTotal").textContent=euro(total);
  document.querySelector("#cartEmpty").classList.toggle("visible",cart.length===0);
  document.querySelector("#cartFooter").classList.toggle("hidden",cart.length===0);
  document.querySelector("#cartItems").innerHTML=cart.map(item=>{
    const p=products.find(x=>x.id===item.id);
    return `<article class="cart-line"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><span class="line-price">${euro(p.price)}</span><div class="quantity-controls"><button data-qty="${p.id}" data-change="-1" aria-label="Retirer une unité">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Ajouter une unité">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Supprimer ${p.name}">✕</button></article>`;
  }).join("");
}
grid.addEventListener("click",e=>{const btn=e.target.closest("[data-add]");if(!btn)return;const id=Number(btn.dataset.add);const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});renderCart();showToast(products.find(p=>p.id===id).name+" ajouté au panier")});
document.querySelector("#cartItems").addEventListener("click",e=>{
  const qty=e.target.closest("[data-qty]"),remove=e.target.closest("[data-remove]");
  if(remove)cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));
  if(qty){const id=Number(qty.dataset.qty),item=cart.find(x=>x.id===id);item.qty+=Number(qty.dataset.change);if(item.qty<=0)cart=cart.filter(x=>x.id!==id)}
  renderCart();
});
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");activeFilter=btn.dataset.filter;renderProducts()}));
document.querySelector("#sortSelect").addEventListener("change",renderProducts);
document.querySelector("#openCart").addEventListener("click",openCart);
document.querySelector("#closeCart").addEventListener("click",closeCart);
backdrop.addEventListener("click",closeCart);
document.querySelector("#continueShopping").addEventListener("click",closeCart);
document.querySelector("#checkoutButton").addEventListener("click",()=>showToast("Démo : connecte un paiement sécurisé pour activer les commandes."));
document.querySelector("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.querySelector("#formMessage").textContent="Merci ! Le formulaire est une démo et n'envoie pas ton adresse.";e.target.reset()});
const menuToggle=document.querySelector("#menuToggle"),nav=document.querySelector("#nav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Fermer le menu":"Ouvrir le menu")});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));
document.querySelector("#year").textContent=new Date().getFullYear();
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
renderProducts();renderCart();
if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el))}else{document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"))}
