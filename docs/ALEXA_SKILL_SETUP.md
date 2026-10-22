# SmartLearn TV - Amazon Alexa Skills Kit (ASK) Interaction Model

This configuration defines the voice interaction model for the **SmartLearn TV** Alexa Skill. Deploy this JSON model within the [Amazon Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).

---

## 1. Skill Details
- **Skill Name**: SmartLearn TV
- **Invocation Name**: `smart learn` or `smart learn tv`
- **Target Category**: Education & Reference

---

## 2. Interaction Model JSON (`en-US` & `hi-IN`)

```json
{
  "interactionModel": {
    "languageModel": {
      "invocationName": "smart learn tv",
      "intents": [
        {
          "name": "AMAZON.CancelIntent",
          "samples": []
        },
        {
          "name": "AMAZON.HelpIntent",
          "samples": []
        },
        {
          "name": "AMAZON.StopIntent",
          "samples": []
        },
        {
          "name": "StartQuizIntent",
          "slots": [
            {
              "name": "Subject",
              "type": "SUBJECT_TYPE"
            }
          ],
          "samples": [
            "start a quiz",
            "quiz me on {Subject}",
            "start {Subject} speed drill",
            "test my knowledge in {Subject}",
            "launch {Subject} quiz"
          ]
        },
        {
          "name": "AskStudyDoubtIntent",
          "slots": [
            {
              "name": "StudyQuery",
              "type": "AMAZON.SearchQuery"
            }
          ],
          "samples": [
            "explain {StudyQuery}",
            "how do I solve {StudyQuery}",
            "what is {StudyQuery}",
            "tell me about {StudyQuery}",
            "ask AI assistant {StudyQuery}"
          ]
        },
        {
          "name": "GetDailyPlanIntent",
          "slots": [],
          "samples": [
            "what is my study schedule today",
            "show my tasks",
            "what should I study now",
            "what are my study goals"
          ]
        },
        {
          "name": "CheckProgressIntent",
          "slots": [],
          "samples": [
            "what is my study streak",
            "show my progress",
            "how much XP do I have",
            "what level am I"
          ]
        }
      ],
      "types": [
        {
          "name": "SUBJECT_TYPE",
          "values": [
            { "name": { "value": "Physics" } },
            { "name": { "value": "Mathematics" } },
            { "name": { "value": "Chemistry" } },
            { "name": { "value": "Biology" } },
            { "name": { "value": "Computer Science" } },
            { "name": { "value": "Polity" } }
          ]
        }
      ]
    }
  }
}
```

---

## 3. Webhook Endpoint Configuration
1. Open **Alexa Developer Console** > **Endpoint**.
2. Select **HTTPS** and provide your deployed Express server or AWS Lambda ARN:
   `https://<your-server-domain>/api/alexa/webhook`
3. Select SSL Certificate: *My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority*.
4. Click **Save Endpoints** and **Build Model**.
