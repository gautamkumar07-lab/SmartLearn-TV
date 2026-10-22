# SmartLearn TV - AI-Powered Amazon Fire TV Educational Platform

> Transforming television into a personalized, voice-controlled learning hub powered by Amazon Alexa, Amazon Bedrock, and Fire TV 10-foot UI.

[![Fire TV](https://img.shields.io/badge/Amazon-Fire_TV_OS-orange.svg)](https://developer.amazon.com/fire-tv)
[![Alexa Built-in](https://img.shields.io/badge/Alexa-Voice_Interface-blue.svg)](https://developer.amazon.com/alexa)
[![AWS Bedrock](https://img.shields.io/badge/AWS-Bedrock_AI-green.svg)](https://aws.amazon.com/bedrock/)
[![React 19](https://img.shields.io/badge/React-19_TypeScript-blue.svg)](https://react.dev/)

---

## 📺 Overview

**SmartLearn TV** turns standard and 4K Amazon Fire TV sets into personalized, interactive academic classrooms. Designed for school students, competitive aspirants (JEE/NEET/UPSC), college graduates, rural learners, and working professionals, SmartLearn TV combines:

- **10-Foot Television Spatial Navigation**: 100% remote D-Pad controllable with focus glow and audio feedback.
- **Amazon Alexa Voice Assistant**: Hands-free study questions, quiz initiation, and task lookups via Fire TV Voice Remote.
- **Amazon Bedrock AI Doubt Solver**: Multimodal, step-by-step whiteboard derivations and mathematical formula rendering.
- **Video Learning Center**: 4K educational streaming with interactive transcripts, AI concept summaries, and offline saving.
- **Speed & Mastery Quizzes**: Interactive MCQ drills, countdown timer rings, instant answer explanations, and confetti celebrations.
- **Progress Analytics**: Weekly study hours visual charts, subject mastery radar, and AI weak-topic diagnosis.
- **Study Planner & Exam Countdowns**: Pomodoro focus timer and countdowns to national competitive exams.
- **Career Guidance**: Skill assessment tests, university recommendations (IITs, IISc, BITS, MIT), and salary packages.
- **PIN-Protected Parental Guard**: Daily screen time limits, bedtime locks, attendance tracking, and weekly audit reports.
- **Multi-Language Inclusivity**: Real-time switching between English, Hindi (हिन्दी), and Punjabi (ਪੰਜਾਬੀ).

---

## 🎮 Fire TV Remote Controls & Navigation

| Fire TV Remote Button | Keyboard Key | Action in SmartLearn TV |
|---|---|---|
| **D-Pad Up / Down / Left / Right** | `Arrow Keys` | Move focus spatially across UI tiles and options |
| **Select / Center Button** | `Enter` / `Space` | Select focused item / submit answer |
| **Back Button** | `Escape` / `Backspace` | Return to previous screen or Home |
| **Alexa Voice Button** | `Key 'A'` or On-Screen Mic | Activate Alexa listening drawer and voice commands |
| **Home Button** | `Virtual Remote Home` | Immediate return to Main Dashboard |
| **Media Play / Pause** | `Key 'P'` | Play or pause video lessons |

*Note: A Virtual Fire TV Remote widget is embedded on the bottom-right of the screen for seamless testing on desktop and browser.*

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **NPM** v10+

### 2. Frontend Launch
```bash
# Navigate to project directory
cd smartlearn-tv

# Run Vite development server
npm run dev
```
Open **`http://localhost:3000`** in any browser.

### 3. Backend API Server Launch
```bash
# In a separate terminal
cd smartlearn-tv
node server/index.js
```
The REST API and Alexa webhook will run on **`http://localhost:5000`**.

---

## 🏛️ Project Directory Structure

```
smartlearn-tv/
├── docs/
│   ├── ARCHITECTURE.md          # Full system architecture diagram & AWS stack
│   ├── API_DOCUMENTATION.md     # REST endpoints, payloads, response schemas
│   └── ALEXA_SKILL_SETUP.md     # Alexa Skills Kit interaction model JSON
├── server/
│   ├── index.js                 # Node.js/Express backend & Alexa ASK webhook
│   ├── schema.sql               # Relational SQL Database Schema (PostgreSQL)
│   ├── firestore.rules          # Google Cloud Firestore Security Rules
│   └── database_schema.md       # ERD & collections documentation
├── src/
│   ├── components/
│   │   ├── FireTVHeader.tsx     # Fire TV top navigation bar & status clock
│   │   ├── AlexaVoiceOverlay.tsx # Amazon Alexa cyan pulse drawer & speech recognition
│   │   └── VirtualRemote.tsx    # Interactive Fire TV Voice Remote simulator
│   ├── context/
│   │   └── AppContext.tsx       # Global state, audio synthesizer, and profile data
│   ├── hooks/
│   │   └── useTVNavigation.ts   # Spatial D-Pad navigation engine for TV remotes
│   ├── pages/
│   │   ├── SplashScreen.tsx     # Animated Amazon Fire TV boot screen
│   │   ├── AuthScreen.tsx       # 6-digit TV PIN pairing, QR code & profile selector
│   │   ├── HomeScreen.tsx       # Hero billboard, streaks, continue watching, AI challenge
│   │   ├── LearningCenterScreen.tsx # 16:9 Video player, transcripts, AI notes, offline cache
│   │   ├── AIAssistantScreen.tsx # Bedrock AI doubt solver & formula whiteboard
│   │   ├── QuizCenterScreen.tsx # Interactive MCQ runner, timer, confetti, leaderboard
│   │   ├── ProgressAnalyticsScreen.tsx # Study hours bar chart & weak area recommendations
│   │   ├── StudyPlannerScreen.tsx # Daily schedule, exam countdowns, TV Pomodoro focus
│   │   ├── CareerGuidanceScreen.tsx # Career path matching, college finder, salary ranges
│   │   ├── ParentDashboardScreen.tsx # 4-digit PIN lock, screen limits, bedtime curfew
│   │   ├── SettingsScreen.tsx   # Multi-language (EN/HI/PA), voice rate, 4K resolution
│   │   └── ProfileScreen.tsx    # Avatar, XP level, 12 gamification badges, certifications
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces for all data models
│   ├── data/
│   │   └── mockData.ts          # Curricula, quizzes, transcripts, and regional translations
│   ├── App.tsx                  # Root application router & key listener
│   └── main.tsx                 # React entry point
└── package.json
```

---

## 💡 Commercialization & Hackathon Presentation Highlights

1. **Monetization Streams**:
   - Freemium tier (core school curricula free; premium competitive exam AI masterclasses via subscription).
   - SmartCoins in-app currency for mock exam test series.
   - Amazon Prime / Fire TV educational subscription add-on channel.
2. **AWS Synergy**:
   - Direct integration with **Amazon Bedrock** foundation models (Claude 3.5 Sonnet & AWS Titan Embeddings).
   - Native **Alexa Skills Kit (ASK)** interaction for hands-free study sessions.
   - 4K video distribution via **AWS CloudFront** and **AWS S3**.
3. **Accessibility & Equity**:
   - Tailored specifically for rural households where a single family television serves as the central community computer.
   - Low-bandwidth 720p/480p offline download caching.
