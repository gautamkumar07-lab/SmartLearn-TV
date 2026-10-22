-- ========================================================
-- SmartLearn TV: Amazon Fire TV Educational Platform
-- Relational Database Schema (PostgreSQL / MySQL)
-- ========================================================

-- Users Table
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    amazon_user_id VARCHAR(128) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Student Profiles (Multi-user per Fire TV household)
CREATE TABLE student_profiles (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(32) CHECK (role IN ('school', 'college', 'competitive', 'rural', 'professional')),
    grade_or_target VARCHAR(100),
    preferred_language VARCHAR(10) DEFAULT 'en',
    xp_points INT DEFAULT 0,
    coins INT DEFAULT 0,
    level INT DEFAULT 1,
    streak_days INT DEFAULT 0,
    weekly_goal_hours INT DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fire TV Paired Devices
CREATE TABLE fire_tv_devices (
    id VARCHAR(64) PRIMARY KEY,
    device_serial VARCHAR(128) UNIQUE NOT NULL,
    device_model VARCHAR(64), -- e.g., 'Fire TV Stick 4K Max', 'Fire TV Omni'
    current_profile_id VARCHAR(64) REFERENCES student_profiles(id),
    activation_code VARCHAR(16),
    is_active BOOLEAN DEFAULT TRUE,
    paired_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_ping TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Educational Courses & Modules
CREATE TABLE courses (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(64) NOT NULL,
    category VARCHAR(64),
    target_role VARCHAR(32),
    thumbnail_url TEXT,
    difficulty VARCHAR(32) CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Video Lessons
CREATE TABLE video_lessons (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    topic VARCHAR(128),
    video_url TEXT NOT NULL,
    duration_seconds INT NOT NULL,
    instructor_name VARCHAR(120),
    rating NUMERIC(2,1) DEFAULT 5.0,
    summary TEXT,
    transcript_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Student Video Progress
CREATE TABLE student_video_progress (
    id VARCHAR(64) PRIMARY KEY,
    profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    lesson_id VARCHAR(64) REFERENCES video_lessons(id) ON DELETE CASCADE,
    watched_seconds INT DEFAULT 0,
    progress_percentage INT DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    is_downloaded_offline BOOLEAN DEFAULT FALSE,
    last_watched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(profile_id, lesson_id)
);

-- Quizzes
CREATE TABLE quizzes (
    id VARCHAR(64) PRIMARY KEY,
    lesson_id VARCHAR(64) REFERENCES video_lessons(id),
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(64) NOT NULL,
    time_limit_seconds INT DEFAULT 180,
    xp_reward INT DEFAULT 100,
    coins_reward INT DEFAULT 20
);

-- Quiz Questions
CREATE TABLE quiz_questions (
    id VARCHAR(64) PRIMARY KEY,
    quiz_id VARCHAR(64) REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(32) CHECK (question_type IN ('mcq', 'true_false')),
    options_json JSONB NOT NULL,
    correct_option_index INT NOT NULL,
    explanation_text TEXT,
    difficulty VARCHAR(20) DEFAULT 'medium'
);

-- Quiz Attempts
CREATE TABLE quiz_attempts (
    id VARCHAR(64) PRIMARY KEY,
    profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    quiz_id VARCHAR(64) REFERENCES quizzes(id) ON DELETE CASCADE,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    xp_earned INT DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI Doubts History (Amazon Bedrock audit log)
CREATE TABLE ai_doubts_history (
    id VARCHAR(64) PRIMARY KEY,
    profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    subject VARCHAR(64),
    student_query TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    derived_formula TEXT,
    voice_input_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Daily Study Planner & Tasks
CREATE TABLE study_tasks (
    id VARCHAR(64) PRIMARY KEY,
    profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(64),
    scheduled_time VARCHAR(16),
    duration VARCHAR(32),
    priority VARCHAR(16) CHECK (priority IN ('high', 'medium', 'low')),
    is_completed BOOLEAN DEFAULT FALSE,
    task_date DATE DEFAULT CURRENT_DATE
);

-- Exam Countdowns
CREATE TABLE exam_countdowns (
    id VARCHAR(64) PRIMARY KEY,
    profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    exam_name VARCHAR(120) NOT NULL,
    exam_date DATE NOT NULL,
    target_score VARCHAR(64),
    readiness_percentage INT DEFAULT 50
);

-- Parent Control Settings
CREATE TABLE parent_controls (
    profile_id VARCHAR(64) PRIMARY KEY REFERENCES student_profiles(id) ON DELETE CASCADE,
    pin_hash VARCHAR(128) NOT NULL,
    daily_screen_limit_minutes INT DEFAULT 180,
    bedtime_hour INT DEFAULT 22,
    ai_doubt_monitoring_enabled BOOLEAN DEFAULT TRUE,
    weekly_report_email VARCHAR(255),
    content_restricted BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
