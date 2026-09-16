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
