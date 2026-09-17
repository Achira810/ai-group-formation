-- ====================================================================
-- KDU AI Group Formation System - Stage 3 Migration Script
-- Run this in your Supabase SQL Editor to safely upgrade your existing schema
-- ====================================================================

-- 1. Upgrade 'students' table with Belbin roles and gender
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS belbin_role VARCHAR(50) DEFAULT 'Technical Implementer',
ADD COLUMN IF NOT EXISTS gender VARCHAR(20) DEFAULT 'Not Specified',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Upgrade 'groups' table with XAI synergy and diversity scores
ALTER TABLE groups 
ADD COLUMN IF NOT EXISTS synergy_score FLOAT DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS synergy_rationale TEXT,
ADD COLUMN IF NOT EXISTS diversity_score FLOAT DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Upgrade 'group_members' table with created_at timestamp
ALTER TABLE group_members 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 4. Create 'team_constraints' table (Affinity & Conflict constraints)
CREATE TABLE IF NOT EXISTS team_constraints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_a_id UUID REFERENCES students(id) ON DELETE CASCADE,
    student_b_id UUID REFERENCES students(id) ON DELETE CASCADE,
    constraint_type VARCHAR(20) NOT NULL CHECK (constraint_type IN ('AFFINITY', 'CONFLICT')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create 'team_health_logs' table (Student feedback, disputes, milestones)
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

-- 6. Create 'chat_messages' table (AI Copilot & Dispute Advisor history)
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'copilot')),
    mode VARCHAR(30) NOT NULL DEFAULT 'lecturer',
    message TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create 'benchmark_runs' table (Comparative Algorithmic Benchmarking)
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

-- 8. Enable Row Level Security & Policies
ALTER TABLE team_constraints ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_health_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmark_runs ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'team_constraints' AND policyname = 'Allow public all on team_constraints') THEN
        CREATE POLICY "Allow public all on team_constraints" ON team_constraints FOR ALL USING (true) WITH CHECK (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'team_health_logs' AND policyname = 'Allow public all on team_health_logs') THEN
        CREATE POLICY "Allow public all on team_health_logs" ON team_health_logs FOR ALL USING (true) WITH CHECK (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'chat_messages' AND policyname = 'Allow public all on chat_messages') THEN
        CREATE POLICY "Allow public all on chat_messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'benchmark_runs' AND policyname = 'Allow public all on benchmark_runs') THEN
        CREATE POLICY "Allow public all on benchmark_runs" ON benchmark_runs FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;
