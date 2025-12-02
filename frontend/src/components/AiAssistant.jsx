import React, { useState } from "react";

const AiAssistant = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setReply("");

    try {
      const res = await fetch("http://localhost:8001/llm/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          user_id: "user-1", // later you can use real logged-in user id
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Request failed");
      }

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>AI Assistant</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          style={{ width: "100%", padding: "0.5rem" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask the AI something about your tasks..."
          required
        />
        <button
          type="submit"
          style={{ marginTop: "0.5rem", padding: "0.5rem 1rem" }}
          disabled={loading || !message.trim()}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {loading && <p>💭 AI is thinking...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {reply && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #ddd",
            background: "#f9f9f9",
          }}
        >
          <strong>AI:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
