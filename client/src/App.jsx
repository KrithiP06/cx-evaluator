import { BrowserRouter, Routes, Route } from "react-router-dom";
import Evaluation from "./pages/Evaluation";
import "./App.css";

function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">CX EVALUATOR</div>

        <div className="nav-links">
          <span>Evaluate</span>
          <span>History</span>
          <span>About</span>
        </div>
      </nav>

      <main className="hero">
        <div className="eyebrow">
          AI-POWERED CUSTOMER EXPERIENCE INTELLIGENCE
        </div>

        <h1>
          Turn conversations into better customer experiences.
        </h1>

        <p>
          Evaluate every interaction with clear CX scores, sentiment
          insights, and actionable AI recommendations.
        </p>

        <button
          className="cta"
          onClick={() => (window.location.href = "/evaluate")}
        >
          Evaluate a Conversation →
        </button>

        <section className="features">
          <div className="feature-card">
            <h3>CX Scoring</h3>
            <p>
              Measure empathy, clarity, relevance, resolution, and
              professionalism with clear 0–10 scores.
            </p>
          </div>

          <div className="feature-card">
            <h3>Conversation Insights</h3>
            <p>
              Understand sentiment shifts and identify the moments
              that shaped the customer experience.
            </p>
          </div>

          <div className="feature-card">
            <h3>AI Improvement</h3>
            <p>
              Get actionable recommendations and an improved response
              for better customer interactions.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evaluate" element={<Evaluation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;