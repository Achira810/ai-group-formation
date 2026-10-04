-- ====================================================================
-- KDU AI Group Formation System - Complete Database & Security Fix
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/udtajzpgrgltkdvcvttm/sql
-- ====================================================================

-- 1. FOREIGN KEY CONSTRAINTS WITH AUTOMATIC CASCADE DELETION
-- Ensures deleting a student or group cleanly cascades without orphan errors (23503)

-- Table: group_members
ALTER TABLE IF EXISTS group_members
DROP CONSTRAINT IF EXISTS group_members_student_id_fkey,
ADD CONSTRAINT group_members_student_id_fkey
FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS group_members
DROP CONSTRAINT IF EXISTS group_members_group_id_fkey,
ADD CONSTRAINT group_members_group_id_fkey
FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;

-- Table: team_constraints
ALTER TABLE IF EXISTS team_constraints
DROP CONSTRAINT IF EXISTS team_constraints_student_a_id_fkey,
ADD CONSTRAINT team_constraints_student_a_id_fkey
FOREIGN KEY (student_a_id) REFERENCES students(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS team_constraints
DROP CONSTRAINT IF EXISTS team_constraints_student_b_id_fkey,
ADD CONSTRAINT team_constraints_student_b_id_fkey
FOREIGN KEY (student_b_id) REFERENCES students(id) ON DELETE CASCADE;

-- Table: team_health_logs
ALTER TABLE IF EXISTS team_health_logs
DROP CONSTRAINT IF EXISTS team_health_logs_group_id_fkey,
ADD CONSTRAINT team_health_logs_group_id_fkey
FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;

-- Table: peer_evaluations (if created)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'peer_evaluations') THEN
        ALTER TABLE peer_evaluations
        DROP CONSTRAINT IF EXISTS peer_evaluations_group_id_fkey,
        ADD CONSTRAINT peer_evaluations_group_id_fkey
        FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;

        ALTER TABLE peer_evaluations
        DROP CONSTRAINT IF EXISTS peer_evaluations_evaluator_id_fkey,
        ADD CONSTRAINT peer_evaluations_evaluator_id_fkey
        FOREIGN KEY (evaluator_id) REFERENCES students(id) ON DELETE CASCADE;

        ALTER TABLE peer_evaluations
        DROP CONSTRAINT IF EXISTS peer_evaluations_evaluatee_id_fkey,
        ADD CONSTRAINT peer_evaluations_evaluatee_id_fkey
        FOREIGN KEY (evaluatee_id) REFERENCES students(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Table: group_grades (if created)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'group_grades') THEN
        ALTER TABLE group_grades
        DROP CONSTRAINT IF EXISTS group_grades_group_id_fkey,
        ADD CONSTRAINT group_grades_group_id_fkey
        FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE;
    END IF;
END $$;


-- ====================================================================
-- 2. ROW-LEVEL SECURITY (RLS) POLICIES FOR PUBLIC & AUTHENTICATED ACCESS
-- Grants full SELECT, INSERT, UPDATE, DELETE permissions for the web application
-- ====================================================================

-- Students
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on students" ON students;
DROP POLICY IF EXISTS "Allow public delete on students" ON students;
DROP POLICY IF EXISTS "Enable all operations for students" ON students;
CREATE POLICY "Enable all operations for students" ON students FOR ALL USING (true) WITH CHECK (true);

-- Groups
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on groups" ON groups;
DROP POLICY IF EXISTS "Allow public delete on groups" ON groups;
DROP POLICY IF EXISTS "Enable all operations for groups" ON groups;
CREATE POLICY "Enable all operations for groups" ON groups FOR ALL USING (true) WITH CHECK (true);

-- Group Members
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on group_members" ON group_members;
DROP POLICY IF EXISTS "Allow public delete on group_members" ON group_members;
DROP POLICY IF EXISTS "Enable all operations for group_members" ON group_members;
CREATE POLICY "Enable all operations for group_members" ON group_members FOR ALL USING (true) WITH CHECK (true);

-- Team Constraints
ALTER TABLE team_constraints ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on team_constraints" ON team_constraints;
DROP POLICY IF EXISTS "Enable all operations for team_constraints" ON team_constraints;
CREATE POLICY "Enable all operations for team_constraints" ON team_constraints FOR ALL USING (true) WITH CHECK (true);

-- Team Health Logs
ALTER TABLE team_health_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on team_health_logs" ON team_health_logs;
DROP POLICY IF EXISTS "Enable all operations for team_health_logs" ON team_health_logs;
CREATE POLICY "Enable all operations for team_health_logs" ON team_health_logs FOR ALL USING (true) WITH CHECK (true);

-- Chat Messages
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on chat_messages" ON chat_messages;
DROP POLICY IF EXISTS "Enable all operations for chat_messages" ON chat_messages;
CREATE POLICY "Enable all operations for chat_messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);

-- Benchmark Runs
ALTER TABLE benchmark_runs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on benchmark_runs" ON benchmark_runs;
DROP POLICY IF EXISTS "Enable all operations for benchmark_runs" ON benchmark_runs;
CREATE POLICY "Enable all operations for benchmark_runs" ON benchmark_runs FOR ALL USING (true) WITH CHECK (true);

-- Peer Evaluations & Group Grades (if tables exist)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'peer_evaluations') THEN
        ALTER TABLE peer_evaluations ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Enable all operations for peer_evaluations" ON peer_evaluations;
        CREATE POLICY "Enable all operations for peer_evaluations" ON peer_evaluations FOR ALL USING (true) WITH CHECK (true);
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'group_grades') THEN
        ALTER TABLE group_grades ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Enable all operations for group_grades" ON group_grades;
        CREATE POLICY "Enable all operations for group_grades" ON group_grades FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;
