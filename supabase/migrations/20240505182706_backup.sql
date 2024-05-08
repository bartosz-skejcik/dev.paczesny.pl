create type roleenum as enum (
  'admin',
  'client'
);

create type statusenum as enum (
    'pending',
    'taken',
    'completed'
);

create type categoryenum as enum (
    'tools',
    'frontend',
    'backend'
);

CREATE TABLE public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role roleenum NOT NULL
);

CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  fullName VARCHAR(255) NOT NULL,
  is_online BOOLEAN NOT NULL DEFAULT FALSE,
  role_id UUID NOT NULL,
  FOREIGN KEY (role_id) REFERENCES public.user_roles(id)
);

CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INT,
  category_id UUID NOT NULL,
  FOREIGN KEY (category_id) REFERENCES public.categories(id)
);

CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_price DECIMAL(10,2) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  created_at DATE NOT NULL,
  user_id UUID NOT NULL,
  service_id UUID NOT NULL,
  category_id UUID NOT NULL,
  FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  FOREIGN KEY (service_id) REFERENCES public.services(id),
  FOREIGN KEY (category_id) REFERENCES public.categories(id)
);

CREATE TABLE public.admin_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  money_made DECIMAL(10,2) NOT NULL,
  total_orders INT NOT NULL,
  completed_orders INT NOT NULL,
  pending_orders INT NOT NULL,
  confirmed_orders INT NOT NULL,
  last_order_date TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);

CREATE TABLE public.client_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  total_orders INT NOT NULL,
  completed_orders INT NOT NULL,
  pending_orders INT NOT NULL,
  last_order_date TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);

CREATE TABLE public.order_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL,
  status statusenum NOT NULL,
  update_date TIMESTAMP NOT NULL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES public.orders(id)
);

CREATE TABLE public.service_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL,
  total_orders INT NOT NULL,
  FOREIGN KEY (service_id) REFERENCES public.services(id)
);

CREATE TABLE public.payment_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  transaction_date TIMESTAMP NOT NULL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES public.orders(id)
);

CREATE TABLE public.client_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL,
  rating INT,
  comment TEXT,
  feedback_date TIMESTAMP NOT NULL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES public.orders(id)
);

CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  notification_date TIMESTAMP NOT NULL NOT NULL,
  FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);

-- Add tables for Portfolio Management System

CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  short_description TEXT,
  full_description TEXT,
  stack JSON,
  link VARCHAR(255),
  github VARCHAR(255),
  thumbnail VARCHAR(255)
);

CREATE TABLE public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(255),
  experience VARCHAR(255),
  category categoryenum NOT NULL
);

CREATE TABLE public.project_skills (
  project_id UUID NOT NULL,
  skill_id UUID NOT NULL,
  FOREIGN KEY (project_id) REFERENCES public.projects(id),
  FOREIGN KEY (skill_id) REFERENCES public.skills(id)
);

CREATE TABLE public.education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  text TEXT,
  stack JSON,
  description TEXT,
  duration VARCHAR(255),
  date DATE
);

CREATE TABLE public.education_skills (
  education_id UUID NOT NULL,
  skill_id UUID NOT NULL,
  FOREIGN KEY (education_id) REFERENCES public.education(id),
  FOREIGN KEY (skill_id) REFERENCES public.skills(id)
);
