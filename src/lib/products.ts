import { supabase } from "@/integrations/supabase/client";

export type ProductRow = {
  id: string;
  title_uk: string;
  title_en: string;
  desc_uk: string;
  desc_en: string;
  price: number;
  size: string;
  cond: string;
  images: string[];
  in_stock: boolean;
  sort: number;
};

export async function fetchProducts(includeSold = false): Promise<ProductRow[]> {
  let q = supabase.from("products").select("*").order("sort").order("created_at", { ascending: false });
  if (!includeSold) q = q.eq("in_stock", true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as ProductRow[];
}

export async function uploadPhoto(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("products").upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage
    .from("products")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (e2 || !data) throw e2 ?? new Error("no url");
  return data.signedUrl;
}
