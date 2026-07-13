import { useState } from "react";
import { sendChatMessage } from "../services/api";


function Chat() {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);


  function clearChat() {

    setMessages([]);

    setResponse("");

  }


  async function handleSend() {


    if (!message.trim()) {
      return;
    }


    setLoading(true);


    // Save user message
    setMessages((prev) => [

      ...prev,

      {
        role: "user",
        text: message
      }

    ]);


    try {

      const data = await sendChatMessage(message);


      const aiResponse = data.message || "No response received";


      // Save latest AI response
      setResponse(aiResponse);


      // Save AI message to history
      setMessages((prev) => [

        ...prev,

        {
          role: "ai",
          text: aiResponse
        }

      ]);


    } catch (error) {

      console.log("API Error:", error);


      const errorMessage = "Unable to connect to AI service.";


      setResponse(errorMessage);


      setMessages((prev) => [

        ...prev,

        {
          role: "ai",
          text: errorMessage
        }

      ]);

    }


    setLoading(false);

    setMessage("");

  }


  return (

    <div>

      <h1>
        AI Chat Assistant
      </h1>


      <div>

        {
          messages.length === 0 ? (

            <p>
              AI responses will appear here.
            </p>

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

                <strong>
                  {msg.role === "user" ? "You: " : "AI: "}
                </strong>


                <p>
                  {msg.text}
                </p>


              </div>

            ))

          )
        }

      </div>


      <input

        className="chat-input"

        type="text"

        placeholder="Ask something..."

        value={message}

        onChange={(e) => setMessage(e.target.value)}

      />


      <button onClick={handleSend} disabled={loading}>

        {loading ? "Thinking..." : "Send"}

      </button>


      <button onClick={clearChat}>

        Clear Chat

      </button>


    </div>

  );

}


export default Chat;