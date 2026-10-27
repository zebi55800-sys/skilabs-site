
const products = {
  free: [
    {
      icon: "⚡",
      name: "FPS Monitor",
      description: "Consulte les FPS et les performances de ton PC.",
      price: "GRATUIT",
      tag: "FREE",
      action: "En savoir plus",
      url: "#"
    },
    {
      icon: "🎮",
      name: "Gaming Toolkit",
      description: "Des utilitaires pour organiser ta configuration gaming.",
      price: "GRATUIT",
      tag: "FREE",
      action: "En savoir plus",
      url: "#"
    }
  ],

  premium: [
    {
      icon: "💎",
      name: "SKILABS PRO",
      description: "Une sélection premium d'outils gaming.",
      price: "9,99 €",
      tag: "PREMIUM",
      action: "Bientôt disponible",
      url: "#"
    },
    {
      icon: "🚀",
      name: "Performance Pack",
      description: "Des outils de suivi et de réglage des performances PC.",
      price: "4,99 €",
      tag: "PREMIUM",
      action: "Bientôt disponible",
      url: "#"
    }
  ]
};

const productsContainer = document.getElementById("products");
const sectionTitle = document.getElementById("section-title");
const count = document.getElementById("count");
const tabs = document.querySelectorAll(".tab");

function renderProducts(type) {
  const list = products[type];

  sectionTitle.textContent =
    type === "free" ? "Produits gratuits" : "Produits premium";

  count.textContent =
    String(list.length).padStart(2, "0") + " PRODUITS";

  productsContainer.innerHTML = list.map(product => `
    <article class="product">
      <div class="product-icon">${product.icon}</div>
      <span class="tag">${product.tag}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price">${product.price}</div>
      <a class="action" href="${product.url}">
        ${product.action}
      </a>
    </article>
  `).join("");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    renderProducts(tab.dataset.tab);
  });
});

renderProducts("free");
