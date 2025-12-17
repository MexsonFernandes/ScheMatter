-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (RBAC)
CREATE TABLE public.landing_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.landing_profiles (id, email, role)
  VALUES (new.id, new.email, 'editor'); -- Default role, change to 'admin' manually for the first user
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. CONTACT SUBMISSIONS
CREATE TABLE public.landing_contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TESTIMONIALS
CREATE TABLE public.landing_testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PORTFOLIO ITEMS
CREATE TABLE public.landing_portfolio_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  gallery_urls TEXT[], -- Array of image URLs
  tags TEXT[], -- Array of strings e.g. ['React', 'Supabase']
  live_url TEXT,
  repo_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CASE STUDIES
CREATE TABLE public.landing_case_studies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  content TEXT, -- Markdown or HTML content
  cover_image_url TEXT,
  client_name TEXT,
  industry TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.landing_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_case_studies ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- Helper function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.landing_profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES
CREATE POLICY "Users can view their own profile" ON public.landing_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.landing_profiles
  FOR SELECT USING (public.is_admin_or_editor());

-- CONTACT SUBMISSIONS
CREATE POLICY "Public can create contact submissions" ON public.landing_contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions" ON public.landing_contact_submissions
  FOR SELECT USING (public.is_admin_or_editor());

CREATE POLICY "Admins can update contact submissions" ON public.landing_contact_submissions
  FOR UPDATE USING (public.is_admin_or_editor());

CREATE POLICY "Admins can delete contact submissions" ON public.landing_contact_submissions
  FOR DELETE USING (public.is_admin_or_editor());

-- TESTIMONIALS
CREATE POLICY "Public can view published testimonials" ON public.landing_testimonials
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can view all testimonials" ON public.landing_testimonials
  FOR SELECT USING (public.is_admin_or_editor());

CREATE POLICY "Admins can manage testimonials" ON public.landing_testimonials
  FOR ALL USING (public.is_admin_or_editor());

-- PORTFOLIO
CREATE POLICY "Public can view published portfolio" ON public.landing_portfolio_items
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can view all portfolio" ON public.landing_portfolio_items
  FOR SELECT USING (public.is_admin_or_editor());

CREATE POLICY "Admins can manage portfolio" ON public.landing_portfolio_items
  FOR ALL USING (public.is_admin_or_editor());

-- CASE STUDIES
CREATE POLICY "Public can view published case studies" ON public.landing_case_studies
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can view all case studies" ON public.landing_case_studies
  FOR SELECT USING (public.is_admin_or_editor());

CREATE POLICY "Admins can manage case studies" ON public.landing_case_studies
  FOR ALL USING (public.is_admin_or_editor());

-- STORAGE BUCKETS
-- You need to create a bucket named 'images' in the Supabase Dashboard -> Storage
-- Policy below allows public read, authenticated upload
-- Note: Storage policies are set in the Storage UI or via SQL if supported by your version

-- Example Storage Policy (if running in SQL editor)
-- insert into storage.buckets (id, name, public) values ('images', 'images', true);
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'images' );
-- create policy "Auth Upload" on storage.objects for insert with check ( bucket_id = 'images' and auth.role() = 'authenticated' );
