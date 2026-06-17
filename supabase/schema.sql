-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Users Table
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  telegram_id bigint unique not null,
  full_name text not null,
  role text check (role in ('student', 'mentor', 'admin')) default 'student',
  avatar_url text,
  xp integer default 0,
  level integer default 1,
  streak integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Courses Table
create table public.courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  mentor_id uuid references public.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Assignments Table
create table public.assignments (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  description text,
  xp_reward integer not null default 10,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Submissions Table
create table public.submissions (
  id uuid primary key default uuid_generate_v4(),
  assignment_id uuid references public.assignments(id) on delete cascade not null,
  student_id uuid references public.users(id) on delete cascade not null,
  content text not null,
  status text check (status in ('pending', 'graded')) default 'pending',
  score integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(assignment_id, student_id) -- one submission per assignment per student
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.courses enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;

-- Policies for Users
create policy "Users can view all users (for leaderboards etc)"
  on public.users for select
  using (true);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Policies for Courses
create policy "Anyone can view courses"
  on public.courses for select
  using (true);

create policy "Mentors can insert courses"
  on public.courses for insert
  with check (
    exists (
      select 1 from public.users where id = auth.uid() and role in ('mentor', 'admin')
    )
  );

create policy "Mentors can update own courses"
  on public.courses for update
  using (auth.uid() = mentor_id);

-- Policies for Assignments
create policy "Anyone can view assignments"
  on public.assignments for select
  using (true);

create policy "Mentors can insert assignments for their courses"
  on public.assignments for insert
  with check (
    exists (
      select 1 from public.courses 
      where id = course_id and mentor_id = auth.uid()
    )
  );

-- Policies for Submissions
create policy "Students can view own submissions, mentors can view all"
  on public.submissions for select
  using (
    auth.uid() = student_id or 
    exists (
      select 1 from public.users where id = auth.uid() and role in ('mentor', 'admin')
    )
  );

create policy "Students can insert own submissions"
  on public.submissions for insert
  with check (auth.uid() = student_id);

create policy "Mentors can update submissions (grading)"
  on public.submissions for update
  using (
    exists (
      select 1 from public.users where id = auth.uid() and role in ('mentor', 'admin')
    )
  );
