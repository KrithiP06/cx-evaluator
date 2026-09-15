const { evaluateConversation } = require("./services/llmService");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    message: "Frontend and backend are connected 🚀"
  });
});

app.post("/api/evaluate", async (req, res) => {
  const { conversation } = req.body;

  console.log("Received conversation:", conversation);

  const result = await evaluateConversation(conversation);

  res.json(result);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});