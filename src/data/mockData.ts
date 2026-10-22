import {
  UserProfile,
  LessonVideo,
  Quiz,
  LeaderboardEntry,
  StudyTask,
  ExamCountdown,
  WeakTopic,
  SubjectMastery,
  CareerPath,
  ParentControlSettings
} from '../types';

export const mockUsers: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    role: 'competitive',
    gradeOrTarget: 'JEE Advanced Aspirant',
    language: 'en',
    xp: 4850,
    coins: 340,
    level: 12,
    streakDays: 19,
    todayMinutes: 85,
    weeklyGoalHours: 25,
    badges: [
      { id: 'b1', name: 'Quantum Leap', description: 'Solved 50 Advanced Physics Doubts with AI', icon: '⚛️', category: 'mastery', unlockedAt: '2026-10-15' },
      { id: 'b2', name: 'Night Scholar', description: 'Studied past 10 PM for 5 days in a row', icon: '🦉', category: 'streak', unlockedAt: '2026-10-18' },
      { id: 'b3', name: 'Lightning Solver', description: 'Completed a 10-question quiz in under 3 minutes', icon: '⚡', category: 'speed', unlockedAt: '2026-10-20' },
      { id: 'b4', name: 'Voice Pioneer', description: 'Used 25 Alexa study commands', icon: '🎙️', category: 'explorer', unlockedAt: '2026-10-21' }
    ]
  },
  {
    id: 'user-2',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    role: 'school',
    gradeOrTarget: 'Class 10 CBSE Board',
    language: 'hi',
    xp: 3200,
    coins: 210,
    level: 8,
    streakDays: 14,
    todayMinutes: 45,
    weeklyGoalHours: 15,
    badges: [
      { id: 'b1', name: 'Math Prodigy', description: '100% score in Quadratic Equations', icon: '📐', category: 'mastery', unlockedAt: '2026-10-12' },
      { id: 'b2', name: 'Consistent Star', description: 'Two-week unbroken study streak', icon: '🔥', category: 'streak', unlockedAt: '2026-10-19' }
    ]
  },
  {
    id: 'user-3',
    name: 'Gurpreet Singh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    role: 'rural',
    gradeOrTarget: 'State Board & Agricultural Science',
    language: 'pa',
    xp: 2600,
    coins: 180,
    level: 6,
    streakDays: 8,
    todayMinutes: 60,
    weeklyGoalHours: 12,
    badges: [
      { id: 'b1', name: 'Rural Innovator', description: 'Completed 15 offline saved modules', icon: '🌾', category: 'explorer', unlockedAt: '2026-10-10' }
    ]
  },
  {
    id: 'user-4',
    name: 'Sneha Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    role: 'professional',
    gradeOrTarget: 'Cloud AI & Data Science Certification',
    language: 'en',
    xp: 6100,
    coins: 520,
    level: 16,
    streakDays: 24,
    todayMinutes: 110,
    weeklyGoalHours: 20,
    badges: [
      { id: 'b1', name: 'Neural Architect', description: 'Built and trained deep learning pipeline', icon: '🧠', category: 'mastery', unlockedAt: '2026-10-14' },
      { id: 'b2', name: 'Mastermind', description: 'Rank #1 in Global AI Weekly Challenge', icon: '🏆', category: 'speed', unlockedAt: '2026-10-21' }
    ]
  }
];

export const mockVideos: LessonVideo[] = [
  {
    id: 'vid-1',
    title: 'Electromagnetic Induction & Faraday’s Laws',
    subject: 'Physics',
    topic: 'Electromagnetism',
    duration: '22:40',
    durationSeconds: 1360,
    progressPercent: 68,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    instructor: 'Dr. H. C. Verma Inspired Lectures',
    rating: 4.9,
    level: 'Advanced',
    tags: ['JEE Prep', 'Derivations', 'Magnetic Flux', 'Lenz Law'],
    summary: 'Master Faraday’s two laws of induction, induced EMF formula ε = -dΦ/dt, and the directional significance of Lenz’s Law with animated 3D magnetic fields on TV.',
    transcript: [
      { time: '00:00', text: 'Welcome to SmartLearn TV. Today we explore how magnetism generates electricity.' },
      { time: '04:15', text: 'Magnetic flux is the scalar product of magnetic field B and area vector A.' },
      { time: '11:20', text: 'Whenever magnetic flux through a circuit changes, an electromotive force is induced.' },
      { time: '18:05', text: 'Lenz’s law ensures conservation of energy by opposing the change in flux.' }
    ],
    isDownloaded: true
  },
  {
    id: 'vid-2',
    title: 'Differential Calculus: Maxima, Minima & Optimization',
    subject: 'Mathematics',
    topic: 'Calculus',
    duration: '26:15',
    durationSeconds: 1575,
    progressPercent: 42,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    instructor: 'Prof. Ramanujan Academy',
    rating: 4.8,
    level: 'Intermediate',
    tags: ['Derivatives', 'First Derivative Test', 'Critical Points'],
    summary: 'Step-by-step visual graph analysis of functions, inflection points, second derivative tests, and practical real-world optimization problems.',
    transcript: [
      { time: '00:00', text: 'In this session, we investigate how slope indicates peak and valley behavior.' },
      { time: '06:30', text: 'A critical point occurs where the first derivative f’(x) equals zero or is undefined.' },
      { time: '14:45', text: 'The second derivative f’’(x) tells us about concavity: concave up implies a local minimum.' }
    ],
    isDownloaded: false
  },
  {
    id: 'vid-3',
    title: 'Organic Chemistry: Reaction Mechanisms & Nucleophilic Substitution',
    subject: 'Chemistry',
    topic: 'Organic Reaction Mechanisms',
    duration: '19:50',
    durationSeconds: 1190,
    progressPercent: 15,
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    instructor: 'Dr. Anita Banerjee',
    rating: 4.9,
    level: 'Advanced',
    tags: ['SN1 vs SN2', 'Carbocation Stability', 'Walden Inversion'],
    summary: 'Crisp 4K visual breakdown of bimolecular vs unimolecular nucleophilic substitutions with stereochemistry animations.',
    transcript: [
      { time: '00:00', text: 'Distinguishing SN1 from SN2 kinetics is critical for competitive exams.' },
      { time: '08:10', text: 'SN2 involves a backside attack resulting in 100% Walden inversion of configuration.' },
      { time: '15:20', text: 'Polar protic solvents favor SN1 by stabilizing the carbocation intermediate.' }
    ],
    isDownloaded: true
  },
  {
    id: 'vid-4',
    title: 'Genetics & CRISPR Gene Editing Demystified',
    subject: 'Biology',
    topic: 'Biotechnology',
    duration: '24:10',
    durationSeconds: 1450,
    progressPercent: 90,
    thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    instructor: 'Dr. Vivek Menon',
    rating: 4.7,
    level: 'Intermediate',
    tags: ['DNA', 'Cas9', 'RNA Guide', 'NEET Special'],
    summary: 'Explore how molecular scissors Cas9 find specific DNA sequences to cure genetic disorders and transform modern agriculture.',
    transcript: [
      { time: '00:00', text: 'CRISPR-Cas9 originated as a bacterial immune defense against bacteriophage viruses.' },
      { time: '07:40', text: 'Single guide RNA directs the endonuclease Cas9 with pinpoint 20-base accuracy.' }
    ],
    isDownloaded: false
  },
  {
    id: 'vid-5',
    title: 'Introduction to Transformers, LLMs & Generative AI',
    subject: 'Computer Science',
    topic: 'Artificial Intelligence',
    duration: '31:00',
    durationSeconds: 1860,
    progressPercent: 30,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    instructor: 'Alex Thorne (Ex-Amazon Bedrock Lead)',
    rating: 5.0,
    level: 'Advanced',
    tags: ['Self-Attention', 'PyTorch', 'Embeddings', 'Transformers'],
    summary: 'The architecture behind modern AI models. Discover query-key-value self-attention matrices and token embeddings on your TV screen.',
    transcript: [
      { time: '00:00', text: 'In 2017, the seminal paper Attention Is All You Need changed NLP forever.' },
      { time: '12:30', text: 'Multi-head self-attention allows tokens to attend to contextual relationships simultaneously.' }
    ],
    isDownloaded: false
  },
  {
    id: 'vid-6',
    title: 'Indian Constitution: Fundamental Rights & Directive Principles',
    subject: 'Polity & Governance',
    topic: 'Constitutional Law',
    duration: '28:30',
    durationSeconds: 1710,
    progressPercent: 0,
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    instructor: 'Advocate Rajesh Kashyap',
    rating: 4.8,
    level: 'Beginner',
    tags: ['UPSC CSE', 'Article 21', 'Basic Structure Doctrine'],
    summary: 'Comprehensive analysis of Articles 12 to 35, judicial review, writ petitions, and the landmark Kesavananda Bharati verdict.',
    transcript: [
      { time: '00:00', text: 'Fundamental Rights in Part III form the conscience of the Indian Constitution.' },
      { time: '14:20', text: 'Article 32 was hailed by Dr. B. R. Ambedkar as the very heart and soul of the Constitution.' }
    ],
    isDownloaded: false
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'Electromagnetic Induction Speed Drill',
    subject: 'Physics',
    timeLimitSeconds: 120,
    totalQuestions: 5,
    xpReward: 150,
    coinsReward: 25,
    questions: [
      {
        id: 'q1',
        question: 'What is the SI unit of Magnetic Flux (Φ)?',
        options: ['Tesla (T)', 'Weber (Wb)', 'Henry (H)', 'Gauss (G)'],
        correctIndex: 1,
        explanation: 'Magnetic Flux has the SI unit Weber (Wb), which equals 1 Tesla × 1 square meter (T·m²).',
        difficulty: 'easy',
        type: 'mcq',
        subject: 'Physics'
      },
      {
        id: 'q2',
        question: 'Lenz’s law is a direct consequence of which conservation law?',
        options: ['Conservation of Charge', 'Conservation of Momentum', 'Conservation of Energy', 'Conservation of Mass'],
        correctIndex: 2,
        explanation: 'Lenz’s law ensures conservation of energy. If the induced current aided the change, free energy would be created endlessly.',
        difficulty: 'medium',
        type: 'mcq',
        subject: 'Physics'
      },
      {
        id: 'q3',
        question: 'True or False: If a bar magnet is dropped through a copper pipe, it falls faster than in open air due to magnetic attraction.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False! Eddy currents induced in the copper pipe create an opposing magnetic field, slowing the magnet down (magnetic damping).',
        difficulty: 'medium',
        type: 'true_false',
        subject: 'Physics'
      },
      {
        id: 'q4',
        question: 'The electromotive force (EMF) induced in a coil with N turns is given by:',
        options: ['ε = -N (dΦ / dt)', 'ε = +N (dΦ / dt)', 'ε = -dΦ / (N · dt)', 'ε = N · B · I'],
        correctIndex: 0,
        explanation: 'Faraday-Neumann-Lenz formula is ε = -N (dΦ / dt), where the minus sign denotes Lenz’s opposing direction.',
        difficulty: 'medium',
        type: 'mcq',
        subject: 'Physics'
      },
      {
        id: 'q5',
        question: 'Self-inductance (L) of a long solenoid depends on:',
        options: ['Current only', 'Length and cross-sectional area and turns squared', 'Only the wire resistance', 'None of the above'],
        correctIndex: 1,
        explanation: 'Self-inductance is L = μ₀ · n² · A · l = μ₀ · (N² / l) · A, depending purely on geometry and core permeability.',
        difficulty: 'hard',
        type: 'mcq',
        subject: 'Physics'
      }
    ]
  },
  {
    id: 'quiz-2',
    title: 'Differential Calculus & Derivatives Master Quiz',
    subject: 'Mathematics',
    timeLimitSeconds: 150,
    totalQuestions: 4,
    xpReward: 180,
    coinsReward: 30,
    questions: [
      {
        id: 'qm1',
        question: 'What is the derivative of f(x) = ln(sin(x)) with respect to x?',
        options: ['cos(x)', 'tan(x)', 'cot(x)', '-cot(x)'],
        correctIndex: 2,
        explanation: 'Using the chain rule: d/dx[ln(sin(x))] = (1/sin(x)) * cos(x) = cot(x).',
        difficulty: 'medium',
        type: 'mcq',
        subject: 'Mathematics'
      },
      {
        id: 'qm2',
        question: 'At a point of inflection of y = f(x), what is always true?',
        options: ['f’(x) = 0', 'f’’(x) changes sign', 'f(x) = 0', 'f’(x) does not exist'],
        correctIndex: 1,
        explanation: 'A point of inflection is where concavity changes, meaning f’’(x) crosses zero or changes sign.',
        difficulty: 'medium',
        type: 'mcq',
        subject: 'Mathematics'
      },
      {
        id: 'qm3',
        question: 'True or False: Every continuous function is differentiable.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False! For example, f(x) = |x| is continuous at x = 0, but not differentiable because it has a sharp corner.',
        difficulty: 'easy',
        type: 'true_false',
        subject: 'Mathematics'
      },
      {
        id: 'qm4',
        question: 'If f’(c) = 0 and f’’(c) < 0, then x = c represents a:',
        options: ['Local Minimum', 'Local Maximum', 'Saddle Point', 'Asymptote'],
        correctIndex: 1,
        explanation: 'Second derivative test: when f’(c)=0 and f’’(c) < 0, the curve is concave down, hence a local maximum.',
        difficulty: 'easy',
        type: 'mcq',
        subject: 'Mathematics'
      }
    ]
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userName: 'Sneha Deshmukh', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', xp: 6100, streak: 24, badge: '🏆 Grandmaster' },
  { rank: 2, userName: 'Aarav Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', xp: 4850, streak: 19, badge: '⚡ Quantum Prodigy', isCurrentUser: true },
  { rank: 3, userName: 'Rohan Mehta', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', xp: 4420, streak: 16, badge: '🔥 Fire Ranker' },
  { rank: 4, userName: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', xp: 3200, streak: 14, badge: '📐 Math Ace' },
  { rank: 5, userName: 'Gurpreet Singh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', xp: 2600, streak: 8, badge: '🌾 Rising Spark' }
];

export const mockStudyTasks: StudyTask[] = [
  { id: 't1', title: 'Complete Electrostatics Numericals (Set 3)', subject: 'Physics', time: '16:00', duration: '45 mins', completed: true, priority: 'high' },
  { id: 't2', title: 'Watch AI Transformer Self-Attention Lecture', subject: 'Computer Science', time: '17:30', duration: '30 mins', completed: true, priority: 'medium' },
  { id: 't3', title: 'Solve 15 JEE Differential Calculus MCQs', subject: 'Mathematics', time: '19:00', duration: '40 mins', completed: false, priority: 'high' },
  { id: 't4', title: 'Alexa Voice Revision: Organic Chemistry Named Reactions', subject: 'Chemistry', time: '20:30', duration: '20 mins', completed: false, priority: 'medium' },
  { id: 't5', title: 'Review Weak Topic: Rotational Dynamics Angular Momentum', subject: 'Physics', time: '21:15', duration: '25 mins', completed: false, priority: 'low' }
];

export const mockExamCountdowns: ExamCountdown[] = [
  { id: 'e1', examName: 'JEE Advanced 2027', date: 'May 24, 2027', daysRemaining: 184, targetScore: 'Top 500 Rank', readinessPercentage: 74 },
  { id: 'e2', examName: 'CBSE Class 12 Boards', date: 'March 02, 2027', daysRemaining: 101, targetScore: '96% Target', readinessPercentage: 86 },
  { id: 'e3', examName: 'NEET UG National Medical', date: 'May 03, 2027', daysRemaining: 163, targetScore: '680+ Score', readinessPercentage: 68 },
  { id: 'e4', examName: 'UPSC Civil Services Prelims', date: 'May 31, 2027', daysRemaining: 191, targetScore: '115+ Score', readinessPercentage: 59 }
];

export const mockWeakTopics: WeakTopic[] = [
  {
    id: 'w1',
    subject: 'Physics',
    topic: 'Rotational Inertia of Composite Shapes',
    accuracy: 42,
    recommendedAction: 'Watch 3D Moment of Inertia derivation video & complete 5 AI-guided practice questions',
    recommendedVideoId: 'vid-1'
  },
  {
    id: 'w2',
    subject: 'Mathematics',
    topic: 'Definite Integrals as Limit of Sum',
    accuracy: 54,
    recommendedAction: 'Review Riemann Sum visualizer in AI Assistant and practice 10 drill questions',
    recommendedVideoId: 'vid-2'
  },
  {
    id: 'w3',
    subject: 'Chemistry',
    topic: 'Aldol Condensation & Cannizzaro Reaction',
    accuracy: 48,
    recommendedAction: 'Ask Alexa for quick audio summary of alpha-hydrogen acidity criteria',
    recommendedVideoId: 'vid-3'
  }
];

export const mockSubjectMastery: SubjectMastery[] = [
  { subject: 'Physics', masteryPercentage: 82, color: '#00a8e1', hoursSpent: 42, quizzesTaken: 28 },
  { subject: 'Mathematics', masteryPercentage: 76, color: '#ff9900', hoursSpent: 38, quizzesTaken: 22 },
  { subject: 'Chemistry', masteryPercentage: 69, color: '#10b981', hoursSpent: 31, quizzesTaken: 19 },
  { subject: 'AI & CS', masteryPercentage: 88, color: '#8b5cf6', hoursSpent: 26, quizzesTaken: 15 },
  { subject: 'Biology', masteryPercentage: 61, color: '#ec4899', hoursSpent: 18, quizzesTaken: 11 }
];

export const mockWeeklyStudyHours = [
  { day: 'Mon', hours: 3.5 },
  { day: 'Tue', hours: 4.2 },
  { day: 'Wed', hours: 2.8 },
  { day: 'Thu', hours: 5.1 },
  { day: 'Fri', hours: 4.6 },
  { day: 'Sat', hours: 6.2 },
  { day: 'Sun', hours: 5.4 }
];

export const mockCareerPaths: CareerPath[] = [
  {
    id: 'c1',
    title: 'AI Research Scientist & LLM Engineer',
    stream: 'Computer Science & Machine Intelligence',
    matchScore: 96,
    salaryRange: '₹28 - ₹65 LPA ($140K - $280K)',
    growth: '+42% High Demand',
    topColleges: ['IIT Bombay', 'IIT Delhi', 'IISc Bangalore', 'Carnegie Mellon', 'Stanford'],
    keySkills: ['Deep Learning', 'PyTorch', 'Transformers', 'Reinforcement Learning', 'Cloud Compute'],
    description: 'Design generative models, autonomous agents, and multimodal foundation AI systems for global scale.'
  },
  {
    id: 'c2',
    title: 'Aerospace & Quantum Systems Engineer',
    stream: 'Applied Physics & Mechanical Engineering',
    matchScore: 89,
    salaryRange: '₹18 - ₹45 LPA ($110K - $210K)',
    growth: '+28% Steady Growth',
    topColleges: ['IIT Madras', 'IIT Kharagpur', 'ISRO IIST', 'MIT', 'Purdue'],
    keySkills: ['Electrodynamics', 'Fluid Mechanics', 'Quantum Computing', 'MATLAB', 'Simulation'],
    description: 'Build satellites, propulsion systems, and quantum sensor architectures for deep space and defense missions.'
  },
  {
    id: 'c3',
    title: 'Robotics & Autonomous Vehicle Specialist',
    stream: 'Mechatronics & Embedded Systems',
    matchScore: 84,
    salaryRange: '₹20 - ₹50 LPA ($120K - $230K)',
    growth: '+35% Rapid Growth',
    topColleges: ['BITS Pilani', 'IIT Roorkee', 'Georgia Tech', 'TU Munich'],
    keySkills: ['Computer Vision', 'ROS 2', 'Sensor Fusion', 'Embedded C++', 'Control Systems'],
    description: 'Combine sensor algorithms, kinematics, and edge AI to build self-driving vehicles and medical robots.'
  },
  {
    id: 'c4',
    title: 'Quantitative Finance & Algorithmic Trader',
    stream: 'Mathematics, Statistics & Financial Engineering',
    matchScore: 81,
    salaryRange: '₹35 - ₹90 LPA ($180K - $350K)',
    growth: '+25% Premium Niche',
    topColleges: ['IIT Kanpur', 'ISI Kolkata', 'Oxford', 'Columbia University'],
    keySkills: ['Stochastic Calculus', 'Probability', 'Python', 'C++ Low Latency', 'Time Series'],
    description: 'Formulate predictive mathematical models for capital markets, liquidity forecasting, and algorithmic execution.'
  }
];

export const mockParentSettings: ParentControlSettings = {
  pin: '1234',
  dailyScreenLimitMinutes: 180,
  bedtimeHour: 22, // 10 PM
  aiDoubtMonitoring: true,
  weeklyReportEmail: 'parent.sharma@example.com',
  contentRestricted: true
};

export const uiTranslations: Record<string, Record<string, string>> = {
  en: {
    appName: 'SmartLearn TV',
    tagline: 'Amazon Fire TV AI Educational Platform',
    home: 'Home',
    learning: 'Learn',
    aiAssistant: 'AI Assistant',
    quiz: 'Quizzes',
    analytics: 'Analytics',
    planner: 'Planner',
    career: 'Career',
    parent: 'Parental',
    settings: 'Settings',
    profile: 'Profile',
    alexaAsk: 'Alexa, ask SmartLearn TV...',
    continueLearning: 'Continue Learning',
    recommended: 'Recommended For You',
    watchNow: 'Watch Lesson',
    takeQuiz: 'Take Quiz',
    askAI: 'Ask AI Doubts',
    dailyStreak: 'Daily Streak',
    level: 'Level',
    xp: 'XP',
    offline: 'Offline Ready',
    screenTime: 'Screen Time Today',
    remoteHint: 'Use Fire TV Remote D-Pad (Arrow Keys & Enter) or Click buttons'
  },
  hi: {
    appName: 'स्मार्टलर्न टीवी',
    tagline: 'अमेज़ॅन फायर टीवी एआई शिक्षा मंच',
    home: 'होम',
    learning: 'सीखें',
    aiAssistant: 'एआई सहायक',
    quiz: 'प्रश्नोत्तरी',
    analytics: 'प्रगति विश्लेषण',
    planner: 'अध्ययन योजना',
    career: 'करियर मार्गदर्शन',
    parent: 'माता-पिता डैशबोर्ड',
    settings: 'सेटिंग्स',
    profile: 'प्रोफ़ाइल',
    alexaAsk: 'एलेक्सा, स्मार्टलर्न टीवी से पूछें...',
    continueLearning: 'पढ़ाई जारी रखें',
    recommended: 'आपके लिए अनुशंसित',
    watchNow: 'पाठ देखें',
    takeQuiz: 'क्विज खेलें',
    askAI: 'एआई से प्रश्न पूछें',
    dailyStreak: 'दैनिक स्ट्रीक',
    level: 'स्तर',
    xp: 'अंक',
    offline: 'ऑफ़लाइन उपलब्ध',
    screenTime: 'आज का स्क्रीन समय',
    remoteHint: 'फायर टीवी रिमोट डी-पैड का उपयोग करें'
  },
  pa: {
    appName: 'ਸਮਾਰਟਲਰਨ ਟੀਵੀ',
    tagline: 'ਐਮਾਜ਼ਾਨ ਫਾਇਰ ਟੀਵੀ ਏਆਈ ਸਿੱਖਿਆ ਪਲੇਟਫਾਰਮ',
    home: 'ਮੁੱਖ ਪੰਨਾ',
    learning: 'ਸਿੱਖੋ',
    aiAssistant: 'ਏਆਈ ਸਹਾਇਕ',
    quiz: 'ਕਵਿਜ਼',
    analytics: 'ਤਰੱਕੀ ਵਿਸ਼ਲੇਸ਼ਣ',
    planner: 'ਪੜ੍ਹਾਈ ਯੋਜਨਾ',
    career: 'ਕਰੀਅਰ ਅਗਵਾਈ',
    parent: 'ਮਾਪੇ ਡੈਸ਼ਬੋਰਡ',
    settings: 'ਸੈਟਿੰਗਜ਼',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
    alexaAsk: 'ਅਲੈਕਸਾ, ਸਮਾਰਟਲਰਨ ਤੋਂ ਪੁੱਛੋ...',
    continueLearning: 'ਜਾਰੀ ਰੱਖੋ',
    recommended: 'ਤੁਹਾਡੇ ਲਈ ਖ਼ਾਸ',
    watchNow: 'ਪਾਠ ਵੇਖੋ',
    takeQuiz: 'ਕਵਿਜ਼ ਸ਼ੁਰੂ ਕਰੋ',
    askAI: 'ਸਵਾਲ ਪੁੱਛੋ',
    dailyStreak: 'ਰੋਜ਼ਾਨਾ ਲੜੀ',
    level: 'ਦਰਜਾ',
    xp: 'ਅੰਕ',
    offline: 'ਔਫਲਾਈਨ ਤਿਆਰ',
    screenTime: 'ਅੱਜ ਦਾ ਸਕ੍ਰੀਨ ਸਮਾਂ',
    remoteHint: 'ਫਾਇਰ ਟੀਵੀ ਰਿਮੋਟ ਦੀ ਵਰਤੋਂ ਕਰੋ'
  }
};
