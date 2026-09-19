create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  request_type text not null check (request_type in ('demo','pilot')),
  name text not null,
  company text not null,
  work_email text not null,
  job_title text,
  company_size text,
  ai_tools text,
  security_approach text,
  interest text,
  message text
);

alter table public.demo_requests enable row level security;
-- No public table policies: all website writes go through the protected server route.
create index if not exists demo_requests_created_at_idx on public.demo_requests (created_at desc);
