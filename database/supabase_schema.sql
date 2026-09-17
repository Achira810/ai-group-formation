-- ====================================================================
-- KDU AI Group Formation System - Supabase Schema (Stage 3 Complete)
-- ====================================================================

-- 1. Create Students Table
CREATE TABLE IF NOT EXISTS students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id VARCHAR(30) UNIQUE NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    degree_program VARCHAR(150) NOT NULL,
    technical_score FLOAT NOT NULL,
    soft_skill_score FLOAT NOT NULL DEFAULT 75.0,
    belbin_role VARCHAR(50) DEFAULT 'Technical Implementer',
    gender VARCHAR(20) DEFAULT 'Not Specified',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Groups Table
CREATE TABLE IF NOT EXISTS groups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL,
    average_score FLOAT,
    synergy_score FLOAT DEFAULT 0.0,
    synergy_rationale TEXT,
    diversity_score FLOAT DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Group Members Table
CREATE TABLE IF NOT EXISTS group_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Team Constraints Table (CSP Affinity & Conflict Pairs)
CREATE TABLE IF NOT EXISTS team_constraints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_a_id UUID REFERENCES students(id) ON DELETE CASCADE,
    student_b_id UUID REFERENCES students(id) ON DELETE CASCADE,
    constraint_type VARCHAR(20) NOT NULL CHECK (constraint_type IN ('AFFINITY', 'CONFLICT')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Team Health & Dispute Logs Table
CREATE TABLE IF NOT EXISTS team_health_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE SET NULL,
    milestone_title VARCHAR(120) NOT NULL,
    contribution_score INT CHECK (contribution_score BETWEEN 1 AND 5),
    status VARCHAR(50) DEFAULT 'Under Review',
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Chat Messages Table (AI Copilot & Advisor)
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'copilot')),
    mode VARCHAR(30) NOT NULL DEFAULT 'lecturer',
    message TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create Benchmark Runs Table (Comparative Algorithmic Benchmarking)
CREATE TABLE IF NOT EXISTS benchmark_runs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cohort_size INT NOT NULL,
    num_teams INT NOT NULL,
    algorithm VARCHAR(60) NOT NULL,
    score_variance FLOAT NOT NULL,
    diversity_rate FLOAT NOT NULL,
    execution_time_ms FLOAT NOT NULL,
    fitness_score FLOAT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_constraints ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_health_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmark_runs ENABLE ROW LEVEL SECURITY;

-- Allow public access for demonstration / application operations
CREATE POLICY "Allow public all on students" ON students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on groups" ON groups FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on group_members" ON group_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on team_constraints" ON team_constraints FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on team_health_logs" ON team_health_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on chat_messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all on benchmark_runs" ON benchmark_runs FOR ALL USING (true) WITH CHECK (true);
