import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import jacket from "@/assets/jacket.jpg.asset.json";
import sneakers from "@/assets/sneakers.jpg.asset.json";
import tshirt from "@/assets/tshirt.jpg.asset.json";
import pants from "@/assets/pants.jpg.asset.json";
import hoodie from "@/assets/hoodie.jpg.asset.json";
import { fetchProducts } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OkunShop — брендовий б/у streetwear в Одесі" },
      {
        name: "description",
        content:
          "Оригінальний брендовий одяг б/у в Одесі: кросівки, худі, куртки, штани. Замовлення в Telegram або за телефоном.",
      },
      { property: "og:title", content: "OkunShop — брендовий б/у streetwear" },
      {
        property: "og:description",
        content: "Перевірені оригінальні речі за чесною ціною. Доставка Новою поштою по Україні.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TG = "okuniok044";
const IG = "044okuniok";
const PHONE = "+380967818145";
const PHONE_VIEW = "+380 96 781 81 45";
const tgLink = (text?: string) =>
  `https://t.me/${TG}` + (text ? `?text=${encodeURIComponent(text)}` : "");

type Lang = "uk" | "en";

type Item = {
  id: string;
  img: string;
  imgs?: string[];
  price: number;
  size: string;
  cond: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
};

// КАТАЛОГ: щоб додати/видалити товар — додайте або приберіть об'єкт у цьому списку.
const ITEMS: Item[] = [
  {
    id: "jacket",
    img: jacket.url,
    price: 1499,
    size: "M",
    cond: "9.5/10",
    title: { uk: "Куртка вітрозахисна чорна", en: "Black windbreaker jacket" },
    desc: {
      uk: "Демісезонна, з капюшоном, водовідштовхувальна тканина. Ідеальний стан.",
      en: "Mid-season, hooded, water-repellent fabric. Perfect condition.",
    },
  },
  {
    id: "sneakers",
    img: sneakers.url,
    price: 1399,
    size: "42",
    cond: "9/10",
    title: { uk: "Кросівки Nike Shox", en: "Nike Shox sneakers" },
    desc: {
      uk: "Культова амортизація, рідкісний сірий колорвей, з оригінальною коробкою.",
      en: "Iconic cushioning, rare grey colorway, with the original box.",
    },
  },
  {
    id: "hoodie",
    img: hoodie.url,
    price: 1099,
    size: "M",
    cond: "9.5/10",
    title: { uk: "Худі Hugo Boss на блискавці", en: "Hugo Boss zip hoodie" },
    desc: {
      uk: "Сірий меланж, брендинг на грудях, вільний крій.",
      en: "Grey melange, chest branding, relaxed fit.",
    },
  },
  {
    id: "pants",
    img: pants.url,
    price: 899,
    size: "L",
    cond: "9/10",
    title: { uk: "Штани Cargo тактичні", en: "Tactical cargo pants" },
    desc: {
      uk: "Оливкові, щільний utility-матеріал, накладні кишені.",
      en: "Olive, dense utility fabric, patch pockets.",
    },
  },
  {
    id: "tshirt",
    img: tshirt.url,
    price: 399,
    size: "M",
    cond: "9.5/10",
    title: { uk: "Футболка Polo Ralph Lauren", en: "Polo Ralph Lauren tee" },
    desc: {
      uk: "Чорна, вишитий червоний поні, 100% бавовна.",
      en: "Black, embroidered red pony, 100% cotton.",
    },
  },
];

const T = {
  uk: {
    nav: [
      ["#catalog", "Каталог"],
      ["#how", "Як замовити"],
      ["#pay", "Оплата"],
      ["#faq", "FAQ"],
      ["#contacts", "Контакти"],
    ],
    tag: "Одеса · Доставка по Україні",
    h1a: "Брендовий",
    h1b: "streetwear",
    h1c: "б/у",
    sub: "Оригінальні речі, перевірені вручну, за ціною у 2–3 рази нижчою за магазинну.",
    see: "Дивитися каталог",
    order: "Написати в Telegram",
    stats: [
      ["2+", "роки досвіду"],
      ["100+", "продажів"],
      ["100%", "оригінал"],
    ],
    catalog: "Каталог",
    catalogSub: "Кожна річ — в одному екземплярі. Натисніть на товар, щоб замовити.",
    size: "Розмір",
    cond: "Стан",
    inStock: "В наявності",
    orderBtn: "Замовити",
    askBtn: "Задати питання",
    orderMsg: (i: Item) =>
      `Привіт! Хочу замовити: ${i.title.uk}, розмір ${i.size}, ціна ${i.price} грн (з сайту OkunShop). Чи є в наявності?`,
    askMsg: (i: Item) => `Привіт! Маю запитання щодо товару: ${i.title.uk} (розмір ${i.size}).`,
    modalOrder: "Оформити замовлення",
    modalOrderSub: "Відкриється Telegram з готовим текстом замовлення",
    modalAsk: "Задати питання",
    modalAskSub: "Напишіть про розмір, заміри чи стан речі",
    close: "Закрити",
    advTitle: "Чому OkunShop",
    adv: [
      ["Тільки оригінал", "Перевіряємо бирки, шви та фурнітуру кожної речі."],
      ["Чесний стан", "Реальні фото й оцінка стану без прикрас."],
      ["Швидка відправка", "Новою поштою протягом 1–2 днів."],
      ["Огляд при отриманні", "Накладений платіж — оглядаєте перед оплатою."],
    ],
    howTitle: "Як замовити",
    steps: [
      ["Оберіть річ", "Перегляньте каталог і натисніть на товар."],
      ["Напишіть нам", "Telegram відкриється з готовим текстом."],
      ["Оплата", "Повна на картку або накладений платіж."],
      ["Отримайте", "Забирайте на Новій пошті."],
    ],
    payTitle: "Оплата і доставка",
    pay: [
      ["Повна оплата на картку", "Переказ на картку — без комісії пошти за накладений платіж."],
      [
        "Накладений платіж",
        "Передоплата 150 грн за доставку, решту сплачуєте при отриманні на Новій пошті.",
      ],
    ],
    revTitle: "Відгуки",
    reviews: [
      ["Даніїл, 19", "Кросівки як нові, прийшли за день. Все чесно, як на фото."],
      ["Анастасія, 23", "Брала худі — оригінал, стан топ. Буду замовляти ще."],
      ["Марко, 21", "Швидко відповіли в Telegram, допомогли з розміром."],
    ],
    faqTitle: "Питання",
    faq: [
      ["Речі оригінальні?", "Так. Кожну річ перевіряємо вручну перед продажем."],
      ["Як дізнатися заміри?", "Натисніть «Задати питання» на товарі — надішлемо заміри й додаткові фото."],
      ["Скільки триває доставка?", "Відправляємо Новою поштою за 1–2 дні, доставка 1–3 дні."],
      ["Можна повернути?", "Якщо річ не відповідає опису — повернемо гроші."],
    ],
    ctaTitle: "Готові замовити?",
    ctaSub: "Пишіть у Telegram або телефонуйте — відповідаємо швидко.",
    call: "Зателефонувати",
    rights: "Одеса",
  },
  en: {
    nav: [
      ["#catalog", "Catalog"],
      ["#how", "How to order"],
      ["#pay", "Payment"],
      ["#faq", "FAQ"],
      ["#contacts", "Contacts"],
    ],
    tag: "Odesa · Shipping across Ukraine",
    h1a: "Pre-owned",
    h1b: "streetwear",
    h1c: "brands",
    sub: "Authentic pieces, checked by hand, at 2–3× less than retail.",
    see: "View catalog",
    order: "Message on Telegram",
    stats: [
      ["2+", "years"],
      ["100+", "sales"],
      ["100%", "authentic"],
    ],
    catalog: "Catalog",
    catalogSub: "Every piece is one of a kind. Tap an item to order.",
    size: "Size",
    cond: "Condition",
    inStock: "In stock",
    orderBtn: "Order",
    askBtn: "Ask a question",
    orderMsg: (i: Item) =>
      `Hi! I'd like to order: ${i.title.en}, size ${i.size}, price ${i.price} UAH (from OkunShop website). Is it available?`,
    askMsg: (i: Item) => `Hi! I have a question about: ${i.title.en} (size ${i.size}).`,
    modalOrder: "Place an order",
    modalOrderSub: "Telegram opens with a ready order message",
    modalAsk: "Ask a question",
    modalAskSub: "Ask about size, measurements or condition",
    close: "Close",
    advTitle: "Why OkunShop",
    adv: [
      ["Authentic only", "We check tags, seams and hardware on every piece."],
      ["Honest condition", "Real photos and a fair condition rating."],
      ["Fast shipping", "Nova Poshta within 1–2 days."],
      ["Inspect on delivery", "Cash on delivery — check before you pay."],
    ],
    howTitle: "How to order",
    steps: [
      ["Pick an item", "Browse the catalog and tap a product."],
      ["Message us", "Telegram opens with a ready text."],
      ["Pay", "Full card payment or cash on delivery."],
      ["Receive", "Pick up at Nova Poshta."],
    ],
    payTitle: "Payment & delivery",
    pay: [
      ["Full card payment", "Bank card transfer — no cash-on-delivery fee."],
      ["Cash on delivery", "150 UAH prepayment for shipping, the rest paid at Nova Poshta."],
    ],
    revTitle: "Reviews",
    reviews: [
      ["Daniil, 19", "Sneakers like new, arrived next day. Exactly as in the photos."],
      ["Anastasia, 23", "Got a hoodie — authentic, top condition. Will order again."],
      ["Marko, 21", "Quick reply on Telegram, helped me with sizing."],
    ],
    faqTitle: "FAQ",
    faq: [
      ["Are items authentic?", "Yes. We check every piece by hand before selling."],
      ["How do I get measurements?", "Tap “Ask a question” on an item — we'll send measurements and photos."],
      ["How long is delivery?", "We ship via Nova Poshta in 1–2 days, delivery takes 1–3 days."],
      ["Can I return?", "If the item doesn't match the description — full refund."],
    ],
    ctaTitle: "Ready to order?",
    ctaSub: "Message on Telegram or call — we reply fast.",
    call: "Call",
    rights: "Odesa",
  },
};

function FinLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M8 52 L36 8 L36 52 Z" fill="currentColor" />
      <path d="M42 52 L42 22 L58 52 Z" className="fill-primary" />
    </svg>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

const fmt = (n: number) => n.toLocaleString("uk-UA").replace(/\u00a0/g, " ") + " ₴";

function Index() {
  const [lang, setLang] = useState<Lang>("uk");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>(ITEMS);
  useEffect(() => {
    fetchProducts()
      .then((rows) => {
        if (!rows.length) return;
        setItems(
          rows.map((r) => ({
            id: r.id,
            img: r.images[0] ?? "",
            imgs: r.images,
            price: r.price,
            size: r.size,
            cond: r.cond,
            title: { uk: r.title_uk, en: r.title_en || r.title_uk },
            desc: { uk: r.desc_uk, en: r.desc_en || r.desc_uk },
          })),
        );
      })
      .catch(() => {});
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const t = T[lang];
  useReveal();

  useEffect(() => {
    const l = localStorage.getItem("ok-lang");
    const th = localStorage.getItem("ok-theme");
    if (l === "en" || l === "uk") setLang(l);
    if (th === "light" || th === "dark") setTheme(th);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("ok-theme", theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("ok-lang", lang);
  }, [lang]);
  useEffect(() => {
    document.body.style.overflow = menu || active ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setActive(null), setMenu(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, active]);

  const btnPrimary =
    "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_var(--primary)] active:translate-y-0";
  const btnGhost =
    "inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-foreground transition hover:border-primary hover:text-primary";

  const Toggles = () => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang(lang === "uk" ? "en" : "uk")}
        className="h-10 rounded-full border border-border px-3 text-xs font-bold transition hover:border-primary"
        aria-label="Language"
      >
        <span className={lang === "uk" ? "text-primary" : "text-muted-foreground"}>UA</span>
        <span className="text-muted-foreground"> / </span>
        <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
      </button>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-primary"
        aria-label="Theme"
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground lg:pb-0">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2 font-display text-sm font-bold">
            <FinLogo className="h-7 w-7" />
            <span className="hidden sm:inline">OKUN</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {t.nav.map(([h, l]) => (
              <a key={h} href={h} className="text-sm text-muted-foreground transition hover:text-primary">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Toggles />
            <a href={tgLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary + " hidden !py-2.5 lg:inline-flex"}>
              Telegram
            </a>
            <button
              onClick={() => setMenu(!menu)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
              aria-label="Menu"
              aria-expanded={menu}
            >
              {menu ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="h-[calc(100dvh-4rem)] border-t border-border bg-background px-5 py-6 lg:hidden">
            {t.nav.map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block border-b border-border py-4 font-display text-xl">
                {l}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden px-5 pb-16 pt-28 md:pt-36">
        <div className="glow-orange pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-primary">● {t.tag}</p>
            <h1 className="font-display text-[clamp(2.4rem,9vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight">
              {t.h1a}
              <br />
              <span className="text-primary">{t.h1b}</span> {t.h1c}
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">{t.sub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#catalog" className={btnPrimary}>{t.see} →</a>
              <a href={tgLink()} target="_blank" rel="noopener noreferrer" className={btnGhost}>{t.order}</a>
            </div>
            <div className="mt-6 flex gap-5 text-sm text-muted-foreground">
              <a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a>
              <a href={tgLink()} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Telegram</a>
              <a href={`tel:${PHONE}`} className="hover:text-primary">{PHONE_VIEW}</a>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 border-t border-border pt-6">
              {t.stats.map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-bold md:text-3xl">{n}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md">
            <div className="absolute inset-0 rounded-[2rem] border border-border bg-card" />
            <div className="absolute inset-0 grid place-items-center">
              <FinLogo className="h-1/2 w-1/2 text-foreground transition duration-700 hover:scale-105" />
            </div>
            <span className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">OKUN / EST. ODESA</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border bg-primary py-3 text-primary-foreground">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-sm font-bold uppercase">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10">
              {["Nike", "Hugo Boss", "Ralph Lauren", "Stone Island", "Carhartt", "The North Face", "Nike", "Hugo Boss"].map((b, i) => (
                <span key={i}>✦ {b}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CATALOG */}
      <section id="catalog" className="scroll-mt-20 px-5 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="reveal mb-10">
            <h2 className="font-display text-3xl font-bold uppercase md:text-5xl">{t.catalog}</h2>
            <p className="mt-3 text-muted-foreground">{t.catalogSub}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, i) => (
              <article
                key={it.id}
                className="reveal group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/60"
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                <button onClick={() => setActive(it)} className="relative aspect-[4/5] overflow-hidden bg-muted text-left" aria-label={it.title[lang]}>
                  <img src={it.img} alt={it.title[lang]} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 font-mono text-[11px] uppercase backdrop-blur">{t.size} {it.size}</span>
                  <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 font-mono text-[11px] text-primary-foreground">{it.cond}</span>
                </button>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold leading-snug">{it.title[lang]}</h3>
                    <span className="shrink-0 font-display text-lg font-bold text-primary">{fmt(it.price)}</span>
                  </div>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{it.desc[lang]}</p>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button onClick={() => setActive(it)} className={btnPrimary + " !px-3 !py-3 !text-xs"}>{t.orderBtn}</button>
                    <a href={tgLink(t.askMsg(it))} target="_blank" rel="noopener noreferrer" className={btnGhost + " !px-3 !py-3 !text-xs"}>{t.askBtn}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="border-t border-border px-5 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="reveal mb-10 font-display text-3xl font-bold uppercase md:text-5xl">{t.advTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.adv.map(([h, p], i) => (
              <div key={h} className="reveal rounded-2xl border border-border bg-card p-6 transition hover:border-primary/60">
                <div className="font-mono text-xs text-primary">0{i + 1}</div>
                <h3 className="mt-4 font-display text-lg font-semibold">{h}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="scroll-mt-20 border-t border-border px-5 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="reveal mb-10 font-display text-3xl font-bold uppercase md:text-5xl">{t.howTitle}</h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map(([h, p], i) => (
              <li key={h} className="reveal border-t-2 border-primary pt-5">
                <div className="font-display text-4xl font-bold text-primary">{i + 1}</div>
                <h3 className="mt-3 font-display text-lg font-semibold">{h}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PAYMENT */}
      <section id="pay" className="scroll-mt-20 border-t border-border px-5 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="reveal mb-10 font-display text-3xl font-bold uppercase md:text-5xl">{t.payTitle}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {t.pay.map(([h, p], i) => (
              <div key={h} className={"reveal rounded-2xl border p-7 " + (i === 0 ? "border-primary bg-primary/10" : "border-border bg-card")}>
                <div className="font-display text-xl font-bold">{h}</div>
                <p className="mt-3 text-muted-foreground">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-t border-border px-5 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="reveal mb-10 font-display text-3xl font-bold uppercase md:text-5xl">{t.revTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.reviews.map(([n, r]) => (
              <figure key={n} className="reveal rounded-2xl border border-border bg-card p-6">
                <div className="text-primary">★★★★★</div>
                <blockquote className="mt-4">«{r}»</blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">{n}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-border px-5 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="reveal mb-10 font-display text-3xl font-bold uppercase md:text-5xl">{t.faqTitle}</h2>
          {t.faq.map(([q, a], i) => (
            <div key={q} className="border-b border-border">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                aria-controls={`faq-${i}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold transition hover:text-primary"
              >
                {q}
                <span className={"text-primary transition " + (openFaq === i ? "rotate-45" : "")}>+</span>
              </button>
              {openFaq === i && (
                <p id={`faq-${i}`} className="pb-5 text-muted-foreground">{a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="scroll-mt-20 px-5 pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-14">
          <h2 className="font-display text-3xl font-bold uppercase md:text-5xl">{t.ctaTitle}</h2>
          <p className="mt-3 max-w-md opacity-80">{t.ctaSub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={tgLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-6 py-3.5 text-sm font-bold uppercase text-primary transition hover:-translate-y-0.5">Telegram @{TG}</a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center rounded-full border border-current px-6 py-3.5 text-sm font-bold uppercase transition hover:-translate-y-0.5">{PHONE_VIEW}</a>
            <a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-current px-6 py-3.5 text-sm font-bold uppercase transition hover:-translate-y-0.5">Instagram @{IG}</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><FinLogo className="h-5 w-5 text-foreground" /> OkunShop · {t.rights}</span>
          <span>© 2026</span>
        </div>
      </footer>

      {/* MOBILE BAR */}
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] gap-2 border-t border-border bg-background/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
        <a href={tgLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary + " !py-3"}>{t.order}</a>
        <a href={`tel:${PHONE}`} className={btnGhost + " !px-4 !py-3"} aria-label={t.call}>📞</a>
      </div>

      {/* MODAL */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 backdrop-blur-sm sm:items-center sm:p-5" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <div onClick={(e) => e.stopPropagation()} className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-border bg-card sm:rounded-3xl">
            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-[4/3] bg-muted sm:aspect-auto">
                <div className="flex h-full w-full snap-x snap-mandatory overflow-x-auto">
                  {(active.imgs ?? [active.img]).map((src) => (
                    <img key={src} src={src} alt={active.title[lang]} className="h-full w-full shrink-0 snap-center object-cover" />
                  ))}
                </div>
                {(active.imgs?.length ?? 1) > 1 && (
                  <span className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs font-bold">← {active.imgs!.length} фото →</span>
                )}
                <button onClick={() => setActive(null)} aria-label={t.close} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-background/85 sm:hidden">✕</button>
              </div>
              <div className="flex flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-xs uppercase text-primary">● {t.inStock}</span>
                  <button onClick={() => setActive(null)} aria-label={t.close} className="hidden h-9 w-9 place-items-center rounded-full border border-border hover:border-primary sm:grid">✕</button>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold">{active.title[lang]}</h3>
                <div className="mt-2 font-display text-2xl font-bold text-primary">{fmt(active.price)}</div>
                <p className="mt-3 text-sm text-muted-foreground">{active.desc[lang]}</p>
                <div className="mt-4 flex gap-2 font-mono text-xs">
                  <span className="rounded-full border border-border px-3 py-1">{t.size}: {active.size}</span>
                  <span className="rounded-full border border-border px-3 py-1">{t.cond}: {active.cond}</span>
                </div>
                <div className="mt-6 space-y-3">
                  <a href={tgLink(t.orderMsg(active))} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-primary p-4 text-primary-foreground transition hover:-translate-y-0.5">
                    <div className="font-bold uppercase">{t.modalOrder} →</div>
                    <div className="text-xs opacity-80">{t.modalOrderSub}</div>
                  </a>
                  <a href={tgLink(t.askMsg(active))} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-border p-4 transition hover:border-primary">
                    <div className="font-bold uppercase">{t.modalAsk}</div>
                    <div className="text-xs text-muted-foreground">{t.modalAskSub}</div>
                  </a>
                  <a href={`tel:${PHONE}`} className="block text-center text-sm text-muted-foreground hover:text-primary">{t.call}: {PHONE_VIEW}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
