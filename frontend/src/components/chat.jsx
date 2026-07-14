import { useState } from "react";
import { sendChatMessage } from "../services/api";
import "../styles/Chat.css";

function Chat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  function clearChat() {
    setMessages([]);
  }

  async function handleSend() {
    if (!message.trim()) return;

    const userMessage = message;

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const data = await sendChatMessage(userMessage);

      const aiResponse = data.message || "No response received.";

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: aiResponse,
        },
      ]);
    } catch (error) {
      console.log("API Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Unable to connect to AI service.",
        },
      ]);
    }

    setLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className="chat-container">

      <div className="chat-header">
        <h1>🤖 AI Academic Assistant</h1>

        <p>
          Ask questions about your coursework, projects,
          scholarships and academic resources.
        </p>
      </div>

      <div className="chat-toolbar">
        <h3>Conversation</h3>

        <button
          className="clear-button"
          onClick={clearChat}
        >
          Clear Chat
        </button>
      </div>

      <div className="chat-history">

        {messages.length === 0 ? (

          <div className="empty-chat">

            <h2>👋 Welcome!</h2>

            <p>
              Start chatting with the AI Assistant.
            </p>

          </div>

        ) : (

          messages.map((msg, index) => (

            <div
  key={index}
  className={`chat-message ${
    msg.role === "user"
      ? "user-message"
      : "ai-message"
  }`}
>

  <div className="message-header">

    <div className="message-avatar">

      {msg.role === "user" ? "👤" : "🤖"}

    </div>

    <strong>

      {msg.role === "user"
        ? "You"
        : "AI Assistant"}

    </strong>

  </div>

  <p>{msg.text}</p>

</div>

          ))

        )}

      </div>

      <div className="chat-input-area">

        <input
          className="chat-input"
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="send-button"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>

        <button
          className="send-button clear-button"
          onClick={clearChat}
        >
          Clear
        </button>

      </div>

    </div>
  );
}

export default Chat;