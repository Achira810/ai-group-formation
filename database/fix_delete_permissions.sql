-- ====================================================================
-- KDU AI Group Formation System - Fix Cascade Delete & RLS Policies
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/udtajzpgrgltkdvcvttm/sql
-- ====================================================================

-- 1. Enable Full Access (SELECT, INSERT, UPDATE, DELETE) for group_members
DROP POLICY IF EXISTS "Allow public all on group_members" ON group_members;
DROP POLICY IF EXISTS "Allow public delete on group_members" ON group_members;
CREATE POLICY "Allow public all on group_members" ON group_members FOR ALL USING (true) WITH CHECK (true);

-- 2. Enable Full Access (SELECT, INSERT, UPDATE, DELETE) for groups
DROP POLICY IF EXISTS "Allow public all on groups" ON groups;
DROP POLICY IF EXISTS "Allow public delete on groups" ON groups;
CREATE POLICY "Allow public all on groups" ON groups FOR ALL USING (true) WITH CHECK (true);

-- 3. Enable Full Access (SELECT, INSERT, UPDATE, DELETE) for students
DROP POLICY IF EXISTS "Allow public all on students" ON students;
DROP POLICY IF EXISTS "Allow public delete on students" ON students;
CREATE POLICY "Allow public all on students" ON students FOR ALL USING (true) WITH CHECK (true);

-- 4. Enable Full Access for team_constraints
DROP POLICY IF EXISTS "Allow public all on team_constraints" ON team_constraints;
CREATE POLICY "Allow public all on team_constraints" ON team_constraints FOR ALL USING (true) WITH CHECK (true);

-- 5. Fix Foreign Key Constraints to CASCADE on delete automatically
ALTER TABLE group_members
DROP CONSTRAINT IF EXISTS group_members_student_id_fkey,
ADD CONSTRAINT group_members_student_id_fkey
FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;

ALTER TABLE group_members
DROP CONSTRAINT IF EXISTS group_members_group_id_fkey,
ADD CONSTRAINT group_members_group_id_fkey
FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;

ALTER TABLE team_constraints
DROP CONSTRAINT IF EXISTS team_constraints_student_a_id_fkey,
ADD CONSTRAINT team_constraints_student_a_id_fkey
FOREIGN KEY (student_a_id) REFERENCES students(id) ON DELETE CASCADE;

ALTER TABLE team_constraints
DROP CONSTRAINT IF EXISTS team_constraints_student_b_id_fkey,
ADD CONSTRAINT team_constraints_student_b_id_fkey
FOREIGN KEY (student_b_id) REFERENCES students(id) ON DELETE CASCADE;
