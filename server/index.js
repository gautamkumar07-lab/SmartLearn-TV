import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Data Store (Simulating Firestore / SQL Database)
const db = {
  users: [
    {
      id: 'user-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@jee.edu',
      role: 'competitive',
      gradeOrTarget: 'JEE Advanced Aspirant',
      xp: 4850,
      coins: 340,
      level: 12,
      streakDays: 19
    },
    {
      id: 'user-2',
      name: 'Priya Patel',
      email: 'priya.patel@cbse.edu',
      role: 'school',
      gradeOrTarget: 'Class 10 CBSE Board',
      xp: 3200,
      coins: 210,
      level: 8,
      streakDays: 14
    }
  ],
  deviceCodes: {
    'SLTV-9342': { userId: 'user-1', expiresAt: Date.now() + 600000, verified: true }
  },
  studyDoubts: [
    {
      id: 'd-1',
      userId: 'user-1',
      subject: 'Physics',
      question: 'Explain Lenz’s Law and Conservation of Energy',
      aiResponse: 'Lenz’s law ensures conservation of energy. The induced current creates a field opposing the motion.',
      createdAt: new Date().toISOString()
    }
  ]
};

// ----------------------------------------------------
// 1. Health & Meta API
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'SmartLearn TV Cloud Backend',
    version: '2.4.0',
    platform: 'Amazon Fire TV Edition',
    aiEngine: 'Amazon Bedrock + Claude/GPT-4o',
    alexaSkillActive: true
  });
});

// ----------------------------------------------------
// 2. Auth & Fire TV Device Code Activation
// ----------------------------------------------------
app.get('/api/auth/device-code', (req, res) => {
  const code = 'SLTV-' + Math.floor(1000 + Math.random() * 9000);
  db.deviceCodes[code] = {
    userId: null,
    expiresAt: Date.now() + 600000, // 10 mins
    verified: false
  };
  res.json({
    deviceCode: code,
    verificationUrl: 'https://smartlearntv.amazon.com/activate',
    expiresInSeconds: 600
  });
});

app.post('/api/auth/verify-device', (req, res) => {
  const { deviceCode, userId } = req.body;
  const entry = db.deviceCodes[deviceCode];

  if (!entry) {
    return res.status(404).json({ error: 'Device code not found or expired.' });
  }

  entry.userId = userId || 'user-1';
  entry.verified = true;

  res.json({
    success: true,
    message: 'Fire TV successfully paired!',
    user: db.users.find(u => u.id === entry.userId)
  });
});

app.get('/api/auth/profiles', (req, res) => {
  res.json({ profiles: db.users });
});

// ----------------------------------------------------
// 3. AI Study Assistant (Amazon Bedrock / OpenAI)
// ----------------------------------------------------
app.post('/api/ai/ask', (req, res) => {
  const { question, subject, studentTarget } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question parameter is required.' });
  }

  // Fallback AI logic simulating Amazon Bedrock Claude 3.5 Sonnet response
  const formula = question.toLowerCase().includes('solenoid')
    ? 'B = μ₀ · n · I'
    : question.toLowerCase().includes('flux') || question.toLowerCase().includes('lenz')
    ? 'ε = - dΦ / dt'
    : 'E = m · c²';

  const responsePayload = {
    doubtId: `doubt-${Date.now()}`,
    question,
    subject: subject || 'General Science',
    explanation: `Detailed 10-foot TV explanation generated for ${studentTarget || 'Student'}: When evaluating ${question}, fundamental physical principles require symmetry and conservation constraints.`,
    formula,
    steps: [
      '1. Identify given variables and target quantities.',
      '2. Formulate underlying differential/algebraic equations.',
      '3. Apply boundary conditions and check dimensional validity.'
    ],
    alexaAudioText: `Here is the explanation for ${question}. The key formula is ${formula}.`,
    source: 'Amazon Bedrock AI Engine'
  };

  db.studyDoubts.push({
    id: responsePayload.doubtId,
    userId: 'user-1',
    subject,
    question,
    aiResponse: responsePayload.explanation,
    createdAt: new Date().toISOString()
  });

  res.json(responsePayload);
});

// ----------------------------------------------------
// 4. Alexa Skills Kit Webhook Handler
// ----------------------------------------------------
app.post('/api/alexa/webhook', (req, res) => {
  const { request } = req.body;
  const requestType = request?.type || 'LaunchRequest';

  let speechText = 'Welcome to SmartLearn TV on your Amazon Fire TV. What would you like to study today?';
  let shouldEndSession = false;

  if (requestType === 'LaunchRequest') {
    speechText = 'Welcome to SmartLearn TV. You can say: quiz me in physics, show my study tasks, or ask any study question.';
  } else if (requestType === 'IntentRequest') {
    const intentName = request.intent?.name;

    if (intentName === 'StartQuizIntent') {
      const subject = request.intent?.slots?.Subject?.value || 'Physics';
      speechText = `Starting your ${subject} speed quiz on SmartLearn TV. Grab your Fire TV remote!`;
    } else if (intentName === 'AskStudyDoubtIntent') {
      const query = request.intent?.slots?.StudyQuery?.value || 'your question';
      speechText = `I have analyzed your question: ${query}. Displaying the whiteboard formula and steps on your Fire TV.`;
    } else if (intentName === 'GetDailyPlanIntent') {
      speechText = 'You have 3 study tasks remaining today. Your next task is Electrostatics numericals at 4 PM.';
    } else if (intentName === 'CheckProgressIntent') {
      speechText = 'Aarav, your current streak is 19 days, and you are Level 12 with 4850 XP. Great job!';
    } else {
      speechText = 'SmartLearn TV is listening. Ask a question or start a quiz.';
    }
  } else if (requestType === 'SessionEndedRequest') {
    shouldEndSession = true;
    speechText = 'Goodbye! Keep learning with SmartLearn TV.';
  }

  res.json({
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: speechText
      },
      card: {
        type: 'Simple',
        title: 'SmartLearn TV Alexa Assistant',
        content: speechText
      },
      shouldEndSession
    }
  });
});

// ----------------------------------------------------
// 5. Parent Dashboard APIs
// ----------------------------------------------------
app.post('/api/parent/verify-pin', (req, res) => {
  const { pin } = req.body;
  if (pin === '1234') {
    res.json({ authorized: true, message: 'Parent pin verified.' });
  } else {
    res.status(401).json({ authorized: false, error: 'Incorrect PIN.' });
  }
});

app.get('/api/parent/report', (req, res) => {
  res.json({
    studentName: 'Aarav Sharma',
    totalStudyMinutesWeek: 1908,
    dailyLimitMinutes: 180,
    complianceRate: '100%',
    doubtsAuditedCount: db.studyDoubts.length,
    recentDoubts: db.studyDoubts.slice(-5)
  });
});

// ----------------------------------------------------
// 6. Serve Frontend Static UI (Build)
// ----------------------------------------------------
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[SmartLearn TV Backend & Full App] running on http://localhost:${PORT}`);
});
