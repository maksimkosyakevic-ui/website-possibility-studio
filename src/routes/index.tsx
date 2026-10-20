import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  ChevronDown,
  Clock,
  Flame,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Send,
  Shirt,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import sneakersImg from "@/assets/sneakers.jpg";
import hoodieImg from "@/assets/hoodie.jpg";
import pufferImg from "@/assets/puffer.jpg";
import tshirtsImg from "@/assets/tshirts.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OkunShop — б/у одяг та кросівки | Одеса" },
      {
        name: "description",
        content:
          "OkunShop — інтернет-магазин перевіреного б/у одягу в Одесі. Кросівки, худі, штани, пуховики та футболки. 2+ роки досвіду, 100+ продажів і чесні відгуки.",
      },
      {
        property: "og:title",
        content: "OkunShop — б/у одяг та кросівки | Одеса",
      },
      {
        property: "og:description",
        content:
          "Перевірений б/у одяг: кросівки, худі, штани, пуховики, футболки. 2+ роки досвіду, 100+ продажів.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TELEGRAM_URL = "https://t.me/okunshop";
const INSTAGRAM_URL = "https://instagram.com/okunshop";

const NAV_LINKS = [
  { href: "#advantages", label: "Переваги" },
  { href: "#catalog", label: "Каталог" },
  { href: "#how", label: "Як замовити" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакти" },
];

const ADVANTAGES = [
  {
    icon: BadgeCheck,
    title: "Перевірена якість",
    text: "Кожну річ оглядаємо вручну: стан, тканина, фурнітура. У продаж потрапляє лише те, що ми одягнули б самі.",
  },
  {
    icon: Camera,
    title: "Реальні фото",
    text: "Жодних стокових картинок. Фотографуємо кожну позицію так, як вона виглядає насправді — з усіма деталями.",
  },
  {
    icon: Flame,
    title: "Чесні ціни",
    text: "Брендові речі за 30–50% від ціни нових. Стильний образ не має коштувати всіх грошей.",
  },
  {
    icon: Truck,
    title: "Швидка доставка",
    text: "Відправляємо Новою поштою по всій Україні в день замовлення або наступного дня. Самовивіз — в Одесі.",
  },
];

const CATALOG = [
  {
    img: sneakersImg,
    title: "Кросівки",
    desc: "Nike, Adidas, New Balance та інші бренди в чудовому стані",
    tag: "Хіт продажів",
  },
  {
    img: hoodieImg,
    title: "Худі",
    desc: "Оверсайз і класика — теплі, м'які, без катишків",
    tag: "Новинки щотижня",
  },
  {
    img: pufferImg,
    title: "Пуховики",
    desc: "Зимові куртки, що реально гріють, за половину ціни",
    tag: "Сезон",
  },
  {
    img: tshirtsImg,
    title: "Футболки",
    desc: "Принти, базові кольори, вінтаж — на будь-який смак",
    tag: "Від 150 ₴",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Обери річ",
    text: "Гортай каталог у нашому Telegram чи Instagram — там всі актуальні позиції з цінами та розмірами.",
  },
  {
    num: "02",
    title: "Напиши нам",
    text: "Натисни «Замовити» і напиши в Telegram. Відповідаємо швидко, допоможемо з розміром і дамо додаткові фото.",
  },
  {
    num: "03",
    title: "Підтверди замовлення",
    text: "Узгоджуємо деталі, спосіб доставки та оплати. Без передоплати за перегляд — все чесно.",
  },
  {
    num: "04",
    title: "Отримай посилку",
    text: "Відправка Новою поштою за 1 день. Оплата при отриманні — спочатку дивишся річ, потім платиш.",
  },
];

const REVIEWS = [
  {
    name: "Даніїл, 19",
    text: "Замовив кросівки Nike — стан реально як нові, а ціна вдвічі нижча ніж у магазині. Фото відповідають дійсності на 100%.",
    item: "Кросівки Nike",
  },
  {
    name: "Анастасія, 23",
    text: "Брала худі і пуховик. Все прийшло за день, речі чисті й охайні. Відповіли на всі питання ще до замовлення. Рекомендую!",
    item: "Худі + пуховик",
  },
  {
    name: "Марко, 17",
    text: "Думав, б/у — це сумнівно, але тут все чесно: показали річ на відео перед відправкою. Тепер постійний клієнт.",
    item: "Футболка + штани",
  },
];

const FAQ = [
  {
    q: "Чи можна подивитись річ перед покупкою?",
    a: "Так. Надішлемо додаткові фото або відео будь-якої позиції. А при доставці Новою поштою ви платите після огляду посилки у відділенні.",
  },
  {
    q: "Який стан речей?",
    a: "Ми відбираємо лише речі в стані «відмінний» і «як новий». Якщо є будь-який дефект — чесно пишемо про нього в описі та знижуємо ціну.",
  },
  {
    q: "Як швидко ви відправляєте?",
    a: "У день замовлення або наступного дня Новою поштою. По Одесі можливий самовивіз — домовляємось про зручне місце.",
  },
  {
    q: "Чи є обмін або повернення?",
    a: "Якщо річ не підійшла за розміром — допоможемо обміняти на іншу позицію з наявності. Головне — напишіть нам одразу після примірки.",
  },
  {
    q: "Як дізнатись про нові надходження?",
    a: "Підпишіться на наш Telegram-канал — там першими з'являються нові речі. Топові позиції розбирають за кілька годин.",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function SectionHeading({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </span>
      <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

function Index() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* ===== Header ===== */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Shirt className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Okun<span className="text-primary">Shop</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35 sm:inline-flex"
            >
              <Send className="h-4 w-4" />
              Написати
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border lg:hidden"
              aria-label="Меню"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-border bg-background px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
              >
                <Send className="h-4 w-4" />
                Написати в Telegram
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* ===== Hero ===== */}
      <section id="top" className="relative overflow-hidden pt-16">
        <div className="glow-orange pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pb-24 lg:pt-20">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Одеса · доставка по всій Україні
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Стильні речі{" "}
              <span className="text-primary">з другої руки</span> — як нові
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              OkunShop — перевірений б/у одяг і взуття: кросівки, худі, штани,
              пуховики та футболки. 2+ роки досвіду, 100+ задоволених покупців
              і ціни на 30–50% нижчі, ніж за нові.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40"
              >
                <Send className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                Замовити в Telegram
              </a>
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-semibold transition-all hover:border-primary/50 hover:text-primary"
              >
                Дивитись каталог
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {[
                { value: "2+", label: "роки досвіду" },
                { value: "100+", label: "продажів" },
                { value: "4.9", label: "середня оцінка" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
            <div className="glow-orange absolute inset-0 scale-110 rounded-full" />
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl shadow-black/60">
              <img
                src={heroImg}
                alt="Стильний образ від OkunShop — худі та кросівки"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-border/60 bg-background/85 px-5 py-4 backdrop-blur-xl">
                <div>
                  <div className="text-sm font-bold">Нове надходження</div>
                  <div className="text-xs text-muted-foreground">
                    щотижня в Telegram-каналі
                  </div>
                </div>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                  aria-label="Перейти в Telegram"
                >
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden border-y border-border bg-card py-4">
          <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex items-center gap-8" aria-hidden={dup === 1}>
                {["Кросівки", "Худі", "Штани", "Пуховики", "Футболки"].map(
                  (word) => (
                    <span
                      key={word}
                      className="flex items-center gap-8 font-display text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground"
                    >
                      {word}
                      <Flame className="h-4 w-4 text-primary" />
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Переваги ===== */}
      <section id="advantages" className="scroll-mt-20 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            kicker="Чому ми"
            title="Чому обирають OkunShop"
            text="Ми не просто продаємо б/у речі — ми відбираємо найкраще, щоб ви виглядали стильно без переплат."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((adv, i) => (
              <div
                key={adv.title}
                className="reveal group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <adv.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{adv.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {adv.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Каталог ===== */}
      <section id="catalog" className="scroll-mt-20 border-y border-border bg-card/40 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            kicker="Каталог"
            title="Що у нас можна знайти"
            text="Асортимент оновлюється щотижня. Актуальні позиції з цінами — у нашому Telegram-каналі."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATALOG.map((cat, i) => (
              <a
                key={cat.title}
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    width={816}
                    height={816}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {cat.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold">{cat.title}</h3>
                    <ArrowRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{cat.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="reveal mt-8 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Шукаєте <span className="font-semibold text-foreground">штани</span> або
              щось конкретне? Напишіть нам — підберемо під ваш розмір і стиль.
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Запитати про наявність
            </a>
          </div>
        </div>
      </section>

      {/* ===== Як це працює ===== */}
      <section id="how" className="scroll-mt-20 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            kicker="Як це працює"
            title="Замовлення за 4 кроки"
            text="Від вибору речі до посилки у ваших руках — зазвичай 2–3 дні."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="reveal relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40"
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <span className="font-display text-4xl font-extrabold text-primary/25">
                  {step.num}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Відгуки ===== */}
      <section id="reviews" className="scroll-mt-20 border-y border-border bg-card/40 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            kicker="Відгуки"
            title="Що кажуть покупці"
            text="100+ продажів — і кожен відгук для нас важливий."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <figure
                key={review.name}
                className="reveal flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  «{review.text}»
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Купив(ла): {review.item}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="scroll-mt-20 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            kicker="FAQ"
            title="Часті питання"
          />
          <div className="reveal mt-12 flex flex-col gap-3">
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    open ? "border-primary/40 bg-card" : "border-border bg-card/60"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Контакти + CTA ===== */}
      <section id="contacts" className="scroll-mt-20 border-t border-border bg-card/40 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="reveal relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card p-8 sm:p-12 lg:p-16">
            <div className="glow-orange pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                  Готовий оновити гардероб{" "}
                  <span className="text-primary">без переплат?</span>
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Напиши нам у Telegram — підберемо річ під твій стиль і розмір,
                  надішлемо реальні фото та відповімо на всі питання.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40"
                  >
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    Написати в Telegram
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-8 py-4 text-base font-semibold transition-all hover:border-primary/50 hover:text-primary"
                  >
                    <Instagram className="h-5 w-5" />
                    Ми в Instagram
                  </a>
                </div>
              </div>
              <div className="grid gap-4">
                {[
                  {
                    icon: MapPin,
                    title: "Місто",
                    text: "Одеса · самовивіз за домовленістю",
                  },
                  {
                    icon: Truck,
                    title: "Доставка",
                    text: "Нова пошта по всій Україні, 1–2 дні",
                  },
                  {
                    icon: Clock,
                    title: "Графік",
                    text: "Відповідаємо щодня з 10:00 до 21:00",
                  },
                  {
                    icon: Package,
                    title: "Оплата",
                    text: "Накладений платіж — платите після огляду",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-background/60 p-5 transition-colors hover:border-primary/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shirt className="h-4 w-4" />
            </span>
            <span className="font-display font-bold">
              Okun<span className="text-primary">Shop</span>
            </span>
          </a>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OkunShop · Одеса · Б/у одяг з характером
          </p>
          <div className="flex gap-3">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
