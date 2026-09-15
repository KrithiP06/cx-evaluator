const { GoogleGenAI } = require("@google/genai");

async function evaluateConversation(conversation) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: `Analyze this customer-agent conversation.

Return ONLY valid JSON in exactly this structure:

{
  "scores": {
    "empathy": 0,
    "clarity": 0,
    "relevance": 0,
    "resolution": 0,
    "professionalism": 0,
    "overall": 0
  },
  "sentiment": {
    "initial": "",
    "final": ""
  },
  "issues": [],
  "recommendations": [],
  "improvedResponse": ""
}

All scores must be numbers from 0 to 10.

Conversation:
${conversation}`
  });

  const text = response.text;

  // Remove Markdown code fences if Gemini adds them
  const cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const evaluation = JSON.parse(cleanText);

  return evaluation;
}

module.exports = { evaluateConversation };