const DIR = {
  title: {
    kbd: "SHOT 01 · TITLE",
    title: "Титульная карточка",
    body: "Город ещё не виден. Только имя и обещание: одно блюдо, без шума меню.",
    notes: [
      "Камера статична, как плакат в витрине.",
      "Тишина → затем лёгкий уличный шум Везеля.",
      "Цвет: ночной асаи, вспышка манго в кернинге.",
    ],
  },
  arrival: {
    kbd: "SHOT 02 · ARRIVAL",
    title: "Приход на Viehtor",
    body: "Герой — не бренд, а улица. Витрина как портал: тёплое окно в фиолетовой ночи.",
    notes: [
      "Средний план фасада, затем наезд на вывеску MONO.",
      "Текст слева читается как диктор за кадром.",
      "Адрес и часы — титры, не меню.",
    ],
  },
  product: {
    kbd: "SHOT 03 · HERO",
    title: "Крупный план чаши",
    body: "Продукт занимает весь кадр. Топпинги — планеты на орбите, не каталог.",
    notes: [
      "Макро: зернистость пюре важнее логотипа.",
      "Медленное вращение, без сток-фото улыбок.",
      "Звук: лёд, ложка, короткое дыхание.",
    ],
  },
  ritual: {
    kbd: "SHOT 04 · RITUAL",
    title: "Гость как режиссёр",
    body: "Светлеет. Действие переходит зрителю: собрать bowl — и есть сюжет.",
    notes: [
      "Светлая сцена после трёх тёмных: глоток воздуха.",
      "Каждый топпинг = один жест руки.",
      "Цена растёт как саундтрек, не как чек.",
    ],
  },
  line: {
    kbd: "SHOT 05 · LINE",
    title: "Единственная реплика",
    body: "Цитата города. Не слоган агентства — чужая фраза, которую бренд держит.",
    notes: [
      "Чёрный экран / ягодный залив.",
      "Курсив, как шёпот, не как биллборд.",
      "Пауза после точки. Не перебивать CTA.",
    ],
  },
  visit: {
    kbd: "SHOT 06 · VISIT",
    title: "Практический план",
    body: "После поэзии — карта тела: куда идти, когда открыто.",
    notes: [
      "Две карточки, как два кадра split-screen.",
      "Без карты Google: адрес звучит как стих.",
      "Воскресенье закрыто — тоже характер.",
    ],
  },
  end: {
    kbd: "SHOT 07 · END CARD",
    title: "Конец = приглашение",
    body: "Не «узнайте больше». Возврат к чаше. Фильм заканчивается за стойкой.",
    notes: [
      "Крупная типографика, мало слов.",
      "Кнопка ведёт в ритуал, не во внешнюю ссылку.",
      "Титры внизу — продакшн, не SEO.",
    ],
  },
};

const TOPPINGS = [
  { id: "granola", name: "Granola", note: "Crunch", color: "#c47a3a", extra: 0 },
  { id: "banana", name: "Banane", note: "Weich", color: "#f2b84b", extra: 0.8 },
  { id: "strawberry", name: "Erdbeere", note: "Säure", color: "#c23b5e", extra: 1.2 },
  { id: "kiwi", name: "Kiwi", note: "Frisch", color: "#8fbf5a", extra: 1.0 },
  { id: "coconut", name: "Kokos", note: "Weiß", color: "#efe6d6", extra: 0.9 },
  { id: "peanut", name: "Erdnuss", note: "Salz", color: "#d9a066", extra: 1.1 },
  { id: "cacao", name: "Cacao nibs", note: "Bitter", color: "#4a2a22", extra: 1.4 },
  { id: "honey", name: "Honig", note: "Glanz", color: "#e8c04a", extra: 0.6 },
];

const BASE_PRICE = 11.9;
const selected = new Set(["granola"]);

function euro(n) {
  return n.toFixed(2).replace(".", ",") + " €";
}

function extraLabel(extra) {
  if (!extra) return " · in der Basis";
  return " · +" + extra.toFixed(2).replace(".", ",") + " €";
}

function renderToppings() {
  const grid = document.getElementById("toppings");
  const priceEl = document.getElementById("price");
  if (!grid || !priceEl) return;

  grid.innerHTML = TOPPINGS.map((t) => {
    const on = selected.has(t.id) ? " selected" : "";
    return (
      '<button class="topping' +
      on +
      '" type="button" data-id="' +
      t.id +
      '">' +
      '<div class="dot" style="background:' +
      t.color +
      '"></div>' +
      "<strong>" +
      t.name +
      "</strong>" +
      "<small>" +
      t.note +
      extraLabel(t.extra) +
      "</small>" +
      "</button>"
    );
  }).join("");

  let total = BASE_PRICE;
  TOPPINGS.forEach((t) => {
    if (selected.has(t.id)) total += t.extra;
  });
  priceEl.textContent = euro(total);
}

function bindBowlBuilder() {
  const grid = document.getElementById("toppings");
  const orderBtn = document.getElementById("orderBtn");
  if (grid) {
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".topping");
      if (!btn) return;
      const id = btn.dataset.id;
      if (selected.has(id)) selected.delete(id);
      else selected.add(id);
      renderToppings();
    });
  }
  if (orderBtn) {
    orderBtn.addEventListener("click", () => {
      orderBtn.textContent = "Bereit an der Theke";
    });
  }
  renderToppings();
}

function applyDir(key, shotNum) {
  const d = DIR[key];
  if (!d) return;

  const slateKbd = document.getElementById("slateKbd");
  const slateTitle = document.getElementById("slateTitle");
  const slateBody = document.getElementById("slateBody");
  const slateNotes = document.getElementById("slateNotes");
  const reelLinks = document.querySelectorAll(".reel a");

  if (slateKbd) slateKbd.textContent = d.kbd;
  if (slateTitle) slateTitle.textContent = d.title;
  if (slateBody) slateBody.textContent = d.body;
  if (slateNotes) {
    slateNotes.innerHTML = d.notes.map((n) => "<li>" + n + "</li>").join("");
  }
  reelLinks.forEach((a) => {
    a.classList.toggle("active", a.dataset.shot === String(shotNum));
  });
}

function bindScenes() {
  const shots = [...document.querySelectorAll("section.shot")];
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const i = shots.indexOf(en.target) + 1;
        applyDir(en.target.dataset.dir, i);
      });
    },
    { threshold: 0.55 }
  );
  shots.forEach((s) => io.observe(s));
}

function bindTimeline() {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    timeline.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  });
}

function bindRegie() {
  const regieBtn = document.getElementById("regieBtn");
  if (!regieBtn) return;
  regieBtn.addEventListener("click", () => {
    const on = document.body.classList.toggle("directing");
    regieBtn.classList.toggle("on", on);
    regieBtn.setAttribute("aria-pressed", String(on));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindBowlBuilder();
  bindScenes();
  bindTimeline();
  bindRegie();
});
