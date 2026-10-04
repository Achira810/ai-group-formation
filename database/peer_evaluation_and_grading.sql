-- ====================================================================
-- KDU AI Group Formation System - Peer Evaluation & Batch Grading Schema
-- ====================================================================

-- 1. Milestone peer review submissions
CREATE TABLE IF NOT EXISTS peer_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    evaluator_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    evaluatee_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    technical_score INT CHECK (technical_score BETWEEN 1 AND 5),
    timeliness_score INT CHECK (timeliness_score BETWEEN 1 AND 5),
    communication_score INT CHECK (communication_score BETWEEN 1 AND 5),
    quality_score INT CHECK (quality_score BETWEEN 1 AND 5),
    feedback_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_peer_eval UNIQUE(group_id, evaluator_id, evaluatee_id)
);

-- 2. Final group rubric scores & feedback
CREATE TABLE IF NOT EXISTS group_grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE UNIQUE,
    rubric_scores JSONB NOT NULL DEFAULT '{}'::jsonb, 
    -- e.g. {"architecture": 18, "implementation": 36, "report": 18, "viva": 18}
    raw_group_score NUMERIC(5, 2) NOT NULL,
    general_feedback TEXT,
    graded_by TEXT DEFAULT 'Lecturer',
    graded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row-Level Security (RLS) Configuration
ALTER TABLE peer_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_grades ENABLE ROW LEVEL SECURITY;

-- Policies for Authenticated & Public Application Access
CREATE POLICY "Enable all operations for peer_evaluations" 
    ON peer_evaluations FOR ALL 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Enable all operations for group_grades" 
    ON group_grades FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- Helpful Indexing for High-Performance Assessment Queries
CREATE INDEX IF NOT EXISTS idx_peer_eval_group ON peer_evaluations(group_id);
CREATE INDEX IF NOT EXISTS idx_peer_eval_evaluatee ON peer_evaluations(evaluatee_id);
CREATE INDEX IF NOT EXISTS idx_peer_eval_evaluator ON peer_evaluations(evaluator_id);
CREATE INDEX IF NOT EXISTS idx_group_grades_group ON group_grades(group_id);
