import { useState } from "react";

function Evaluation() {
  const [conversation, setConversation] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async () => {
    if (!conversation.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversation }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const scores = result?.scores;

  return (
    <div className="evaluation-page">

      {/* Header */}
      <div className="evaluation-header">
        <div className="eyebrow">
          AI-POWERED CUSTOMER EXPERIENCE INTELLIGENCE
        </div>

        <h1>Evaluate a Conversation</h1>

        <p>
          Paste a customer-agent conversation below and let AI analyze the
          quality of the interaction.
        </p>
      </div>

      {/* Conversation Input */}
      <div className="evaluation-card">
        <div className="input-header">
          <div>
            <h3>Conversation Input</h3>
            <p>
              Paste the complete customer-agent conversation for analysis.
            </p>
          </div>
        </div>

        <textarea
          value={conversation}
          onChange={(e) => setConversation(e.target.value)}
          placeholder={`Customer: I have been waiting for my refund for two weeks...

Agent: I understand your concern. Let me check the status of your refund.`}
        />

        <button
          className="evaluate-button"
          onClick={handleEvaluate}
          disabled={loading}
        >
          {loading
            ? "Analyzing Conversation..."
            : "Evaluate Conversation →"}
        </button>
      </div>

      {/* Results */}
      {scores && (
        <div className="results-section">

          {/* Results Header */}
          <div className="results-header">
            <div className="eyebrow">
              AI ANALYSIS COMPLETE
            </div>

            <h2>Customer Experience Score</h2>

            <p>
              Here's how the interaction performed across key CX metrics.
            </p>
          </div>

          {/* Score Cards */}
          <div className="score-grid">

            {/* Empathy */}
            <div className="score-card">
              <span>Empathy</span>
              <strong>{scores.empathy}/10</strong>

              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${scores.empathy * 10}%` }}
                />
              </div>
            </div>

            {/* Clarity */}
            <div className="score-card">
              <span>Clarity</span>
              <strong>{scores.clarity}/10</strong>

              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${scores.clarity * 10}%` }}
                />
              </div>
            </div>

            {/* Relevance */}
            <div className="score-card">
              <span>Relevance</span>
              <strong>{scores.relevance}/10</strong>

              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${scores.relevance * 10}%` }}
                />
              </div>
            </div>

            {/* Resolution */}
            <div className="score-card">
              <span>Resolution</span>
              <strong>{scores.resolution}/10</strong>

              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${scores.resolution * 10}%` }}
                />
              </div>
            </div>

            {/* Professionalism */}
            <div className="score-card">
              <span>Professionalism</span>
              <strong>{scores.professionalism}/10</strong>

              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${scores.professionalism * 10}%` }}
                />
              </div>
            </div>

            {/* Overall */}
            <div className="score-card overall-score">
              <span>Overall CX</span>
              <strong>{scores.overall}/10</strong>

              <div className="score-bar">
                <div
                  className="score-fill overall-fill"
                  style={{ width: `${scores.overall * 10}%` }}
                />
              </div>
            </div>

          </div>

          {/* Sentiment Journey */}
{result.sentiment && (
  <div className="sentiment-card">

    <div className="sentiment-header">
      <span className="sentiment-label">
        SENTIMENT JOURNEY
      </span>

      <h3>How the customer's mood changed</h3>

      <p>
        AI detected a shift in customer sentiment throughout the interaction.
      </p>
    </div>

    <div className="sentiment-flow">

      {/* Initial Sentiment */}
      <div className="sentiment-box">
        <div className="sentiment-icon">◐</div>

        <span>Initial Sentiment</span>

        <strong>{result.sentiment.initial}</strong>
      </div>

      {/* Journey */}
      <div className="sentiment-journey">
        <div className="journey-line">
          <div className="journey-dot"></div>
          <div className="journey-progress"></div>
          <div className="journey-dot"></div>
        </div>

        <span>Customer journey</span>
      </div>

      {/* Final Sentiment */}
      <div className="sentiment-box">
        <div className="sentiment-icon">◉</div>

        <span>Final Sentiment</span>

        <strong>{result.sentiment.final}</strong>
      </div>

    </div>

  </div>
)}

         {/* Issues Detected */}
{result.issues && result.issues.length > 0 && (
  <div className="issues-card">

    <div className="issues-header">
      <span className="issues-label">
        ATTENTION REQUIRED
      </span>

      <h3>Issues Detected</h3>

      <p>
        Potential problems identified in the interaction.
      </p>
    </div>

    <div className="issues-list">
      {result.issues.map((issue, index) => (
        <div className="issue-item" key={index}>

          <div className="issue-number">
            {index + 1}
          </div>

          <p>{issue}</p>

        </div>
      ))}
    </div>

  </div>
)}

          {/* Recommendations */}
          {result.recommendations &&
            result.recommendations.length > 0 && (
              <div className="recommendations-card">

                <div className="recommendations-header">
                  <span className="recommendations-label">
                    AI RECOMMENDATIONS
                  </span>

                  <h3>How to improve the interaction</h3>

                  <p>
                    Actionable suggestions generated from the conversation.
                  </p>
                </div>

                <div className="recommendations-list">
                  {result.recommendations.map(
                    (recommendation, index) => (
                      <div
                        className="recommendation-item"
                        key={index}
                      >

                        <div className="recommendation-icon">
                          ✓
                        </div>

                        <p>{recommendation}</p>

                      </div>
                    )
                  )}
                </div>

              </div>
            )}

          {/* AI Improved Response */}
          {result.improvedResponse && (
            <div className="improved-response-card">

              <div className="improved-response-header">
                <span className="improved-response-label">
                  AI-ENHANCED RESPONSE
                </span>

                <h3>Suggested Agent Response</h3>

                <p>
                  A stronger response generated using the conversation
                  context and identified CX opportunities.
                </p>
              </div>

              <div className="improved-response-content">
                <p>{result.improvedResponse}</p>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default Evaluation;