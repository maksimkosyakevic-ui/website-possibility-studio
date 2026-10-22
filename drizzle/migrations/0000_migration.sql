CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_uk text NOT NULL,
  title_en text NOT NULL DEFAULT '',
  desc_uk text NOT NULL DEFAULT '',
  desc_en text NOT NULL DEFAULT '',
  price integer NOT NULL DEFAULT 0,
  size text NOT NULL DEFAULT '',
  cond text NOT NULL DEFAULT '9/10',
  images text[] NOT NULL DEFAULT '{}',
  in_stock boolean NOT NULL DEFAULT true,
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "staff insert" ON public.products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "staff update" ON public.products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "staff delete" ON public.products FOR DELETE TO authenticated USING (true);

INSERT INTO public.products (title_uk,title_en,desc_uk,desc_en,price,size,cond,images,sort) VALUES
('Куртка вітрозахисна чорна','Black windbreaker jacket','Демісезонна, з капюшоном, водовідштовхувальна тканина. Ідеальний стан.','Mid-season, hooded, water-repellent fabric. Perfect condition.',1499,'M','9.5/10',ARRAY['/__l5e/assets-v1/c854af29-6330-4123-9b26-127ed04b79d6/jacket.jpg'],1),
('Кросівки Nike Shox','Nike Shox sneakers','Культова амортизація, рідкісний сірий колорвей, з оригінальною коробкою.','Iconic cushioning, rare grey colorway, with the original box.',1399,'42','9/10',ARRAY['/__l5e/assets-v1/325a617e-a978-42e1-950e-b2c89b1c9da1/sneakers.jpg'],2),
('Худі Hugo Boss на блискавці','Hugo Boss zip hoodie','Сірий меланж, брендинг на грудях, вільний крій.','Grey melange, chest branding, relaxed fit.',1099,'M','9.5/10',ARRAY['/__l5e/assets-v1/cd5e571d-2ef9-415f-b823-e6bcb869819a/hoodie.jpg'],3),
('Штани Cargo тактичні','Tactical cargo pants','Оливкові, щільний utility-матеріал, накладні кишені.','Olive, dense utility fabric, patch pockets.',899,'L','9/10',ARRAY['/__l5e/assets-v1/21980ad1-4ffc-4ec3-abd0-b76f50b7155d/pants.jpg'],4),
('Футболка Polo Ralph Lauren','Polo Ralph Lauren tee','Чорна, вишитий червоний поні, 100% бавовна.','Black, embroidered red pony, 100% cotton.',399,'M','9.5/10',ARRAY['/__l5e/assets-v1/8c308759-8dc5-432d-8856-304ff85dd96a/tshirt.jpg'],5);

CREATE POLICY "public read photos" ON storage.objects FOR SELECT USING (bucket_id = 'products');
CREATE POLICY "staff upload photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'products');
CREATE POLICY "staff delete photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'products');