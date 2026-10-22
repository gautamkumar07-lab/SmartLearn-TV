# SmartLearn TV - REST API & Backend Documentation

All endpoints are hosted at `http://localhost:5000` (or `https://api.smartlearntv.amazon.com/v1` in production).

---

## 1. Authentication & Device Pairing

### `GET /api/auth/device-code`
Generates a unique 6-character code for Fire TV quick pairing via mobile or browser.
- **Response**:
```json
{
  "deviceCode": "SLTV-9342",
  "verificationUrl": "https://smartlearntv.amazon.com/activate",
  "expiresInSeconds": 600
}
```

### `POST /api/auth/verify-device`
Called when student scans QR code or verifies on mobile web.
- **Request Body**:
```json
{
  "deviceCode": "SLTV-9342",
  "userId": "user-1"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Fire TV successfully paired!",
  "user": {
    "id": "user-1",
    "name": "Aarav Sharma",
    "role": "competitive",
    "gradeOrTarget": "JEE Advanced Aspirant"
  }
}
```

---

## 2. AI Study Assistant (Amazon Bedrock)

### `POST /api/ai/ask`
Resolves student doubts with step-by-step whiteboard derivations and audio speech synthesis text.
- **Request Body**:
```json
{
  "question": "Explain Lenz's Law and conservation of energy",
  "subject": "Physics",
  "studentTarget": "JEE Advanced Aspirant"
}
```
- **Response**:
```json
{
  "doubtId": "doubt-1729601932",
  "question": "Explain Lenz's Law and conservation of energy",
  "subject": "Physics",
  "explanation": "Lenz's Law ensures conservation of energy...",
  "formula": "ε = - dΦ / dt",
  "steps": [
    "1. External mechanical work is performed against repulsive magnetic force.",
    "2. This mechanical work is converted directly into electrical energy."
  ],
  "alexaAudioText": "Here is the explanation for Lenz's Law...",
  "source": "Amazon Bedrock AI Engine"
}
```

---

## 3. Alexa Skills Kit Webhook

### `POST /api/alexa/webhook`
Handles invocations from Amazon Alexa voice service.
- **Handled Intents**:
  - `LaunchRequest`: Welcome message and TV menu guide.
  - `StartQuizIntent`: Launches subject quiz on TV screen.
  - `AskStudyDoubtIntent`: Queries Bedrock AI and renders answer.
  - `GetDailyPlanIntent`: Reads out remaining study tasks.
  - `CheckProgressIntent`: Returns XP, level, and active streak.

---

## 4. Parental Dashboard & Guard

### `POST /api/parent/verify-pin`
- **Request Body**:
```json
{
  "pin": "1234"
}
```
- **Response**:
```json
{
  "authorized": true,
  "message": "Parent pin verified."
}
```

### `GET /api/parent/report`
Fetches child attendance, screen time logs, and AI doubt audit history.
