import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProducts, uploadPhoto, type ProductRow } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Адмінка OkunShop — керування товарами" },
      { name: "description", content: "Панель керування каталогом OkunShop." },
      { property: "og:title", content: "Адмінка OkunShop" },
      { property: "og:description", content: "Панель керування каталогом OkunShop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const empty = {
  title_uk: "", title_en: "", desc_uk: "", desc_en: "",
  price: 0, size: "", cond: "9/10", images: [] as string[], in_stock: true, sort: 0,
};
type Draft = typeof empty & { id?: string };

const input = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";
const btn = "rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50";
const ghost = "rounded-full border border-border px-4 py-2 text-sm transition hover:border-primary";

function Admin() {
  const [session, setSession] = useState<boolean | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(!!s));
    return () => data.subscription.unsubscribe();
  }, []);
  if (session === null) return <div className="p-10 text-center text-muted-foreground">Завантаження…</div>;
  return <div className="min-h-screen bg-background text-foreground">{session ? <Panel /> : <Login />}</div>;
}

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) setErr("Невірна пошта або пароль");
    setBusy(false);
  }
  return (
    <form onSubmit={submit} className="mx-auto mt-24 max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8">
      <h1 className="font-display text-2xl font-bold">Вхід в адмінку</h1>
      <input className={input} type="email" placeholder="Пошта" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className={input} type="password" placeholder="Пароль" value={pass} onChange={(e) => setPass(e.target.value)} required />
      {err && <p className="text-sm text-destructive">{err}</p>}
      <button className={btn + " w-full"} disabled={busy}>{busy ? "Вхід…" : "Увійти"}</button>
      <Link to="/" className="block text-center text-sm text-muted-foreground">← На сайт</Link>
    </form>
  );
}

function Panel() {
  const [items, setItems] = useState<ProductRow[]>([]);
  const [edit, setEdit] = useState<Draft | null>(null);
  const load = () => fetchProducts(true).then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  async function toggle(p: ProductRow) {
    await supabase.from("products").update({ in_stock: !p.in_stock }).eq("id", p.id);
    load();
  }
  async function remove(p: ProductRow) {
    if (!confirm(`Видалити «${p.title_uk}»?`)) return;
    await supabase.from("products").delete().eq("id", p.id);
    load();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold">Товари <span className="text-primary">({items.length})</span></h1>
        <div className="flex gap-2">
          <Link to="/" className={ghost}>Сайт</Link>
          <button className={ghost} onClick={() => supabase.auth.signOut()}>Вийти</button>
          <button className={btn} onClick={() => setEdit({ ...empty })}>+ Додати товар</button>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3">
            <img src={p.images[0]} alt="" className="h-20 w-20 shrink-0 rounded-xl bg-muted object-cover" />
            <div className="min-w-0 flex-1">
              <div className="truncate font-bold">{p.title_uk}</div>
              <div className="text-sm text-muted-foreground">{p.price} ₴ · розмір {p.size} · фото: {p.images.length}</div>
              <div className={"text-xs font-bold " + (p.in_stock ? "text-primary" : "text-muted-foreground")}>
                {p.in_stock ? "● В наявності" : "○ Продано (приховано)"}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button className={ghost} onClick={() => toggle(p)}>{p.in_stock ? "Продано" : "Повернути"}</button>
              <button className={ghost} onClick={() => setEdit({ ...p })}>Змінити</button>
              <button className={ghost + " text-destructive"} onClick={() => remove(p)}>Видалити</button>
            </div>
          </div>
        ))}
      </div>
      {edit && <Editor draft={edit} onClose={() => { setEdit(null); load(); }} />}
    </div>
  );
}

function Editor({ draft, onClose }: { draft: Draft; onClose: () => void }) {
  const [d, setD] = useState<Draft>(draft);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((x) => ({ ...x, [k]: v }));

  async function addFiles(files: FileList | null) {
    if (!files) return;
    setBusy(true); setErr("");
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) urls.push(await uploadPhoto(f));
      setD((x) => ({ ...x, images: [...x.images, ...urls] }));
    } catch { setErr("Не вдалося завантажити фото"); }
    setBusy(false);
  }
  async function save() {
    if (!d.title_uk || !d.price || d.images.length === 0) { setErr("Вкажіть назву, ціну та хоча б 1 фото"); return; }
    setBusy(true);
    const { id, ...row } = d;
    const payload = { ...row, title_en: row.title_en || row.title_uk, desc_en: row.desc_en || row.desc_uk };
    const { error } = id
      ? await supabase.from("products").update(payload).eq("id", id)
      : await supabase.from("products").insert(payload);
    setBusy(false);
    if (error) setErr("Помилка збереження"); else onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur sm:items-center" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-card p-6 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 font-display text-xl font-bold">{d.id ? "Змінити товар" : "Новий товар"}</h2>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {d.images.map((u, i) => (
              <div key={u} className="relative">
                <img src={u} alt="" className="aspect-square w-full rounded-xl object-cover" />
                {i === 0 && <span className="absolute left-1 top-1 rounded bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">ГОЛОВНЕ</span>}
                <button className="absolute right-1 top-1 rounded-full bg-background/90 px-2 text-sm" onClick={() => set("images", d.images.filter((x) => x !== u))}>✕</button>
              </div>
            ))}
            <label className="flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border text-center text-xs text-muted-foreground hover:border-primary">
              {busy ? "…" : "+ Фото"}
              <input type="file" accept="image/*" multiple hidden onChange={(e) => addFiles(e.target.files)} />
            </label>
          </div>
          <input className={input} placeholder="Назва (укр) *" value={d.title_uk} onChange={(e) => set("title_uk", e.target.value)} />
          <input className={input} placeholder="Назва (англ, необов'язково)" value={d.title_en} onChange={(e) => set("title_en", e.target.value)} />
          <textarea className={input} rows={2} placeholder="Опис (укр)" value={d.desc_uk} onChange={(e) => set("desc_uk", e.target.value)} />
          <textarea className={input} rows={2} placeholder="Опис (англ, необов'язково)" value={d.desc_en} onChange={(e) => set("desc_en", e.target.value)} />
          <div className="grid grid-cols-3 gap-2">
            <input className={input} type="number" placeholder="Ціна ₴ *" value={d.price || ""} onChange={(e) => set("price", Number(e.target.value))} />
            <input className={input} placeholder="Розмір" value={d.size} onChange={(e) => set("size", e.target.value)} />
            <input className={input} placeholder="Стан" value={d.cond} onChange={(e) => set("cond", e.target.value)} />
          </div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <button className={ghost} onClick={onClose}>Скасувати</button>
            <button className={btn} disabled={busy} onClick={save}>Зберегти</button>
          </div>
        </div>
      </div>
    </div>
  );
}
