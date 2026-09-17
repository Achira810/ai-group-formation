-- Create Students Table
CREATE TABLE students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    degree_program VARCHAR(150) NOT NULL,
    technical_score FLOAT NOT NULL,
    soft_skill_score FLOAT NOT NULL
);

-- Create Groups Table
CREATE TABLE groups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL,
    average_score FLOAT
);

-- Create Group Members Table
CREATE TABLE group_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES groups(id),
    student_id UUID REFERENCES students(id)
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- In Supabase, if RLS is enabled, you must add policies or queries will fail.
-- ====================================================================

-- Enable RLS on tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

-- Allow anonymous / authenticated read and write access for application operations
CREATE POLICY "Allow public read on students" ON students FOR SELECT USING (true);
CREATE POLICY "Allow public insert on students" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on students" ON students FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on students" ON students FOR DELETE USING (true);

CREATE POLICY "Allow public read on groups" ON groups FOR SELECT USING (true);
CREATE POLICY "Allow public insert on groups" ON groups FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete on groups" ON groups FOR DELETE USING (true);

CREATE POLICY "Allow public read on group_members" ON group_members FOR SELECT USING (true);
CREATE POLICY "Allow public insert on group_members" ON group_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete on group_members" ON group_members FOR DELETE USING (true);

