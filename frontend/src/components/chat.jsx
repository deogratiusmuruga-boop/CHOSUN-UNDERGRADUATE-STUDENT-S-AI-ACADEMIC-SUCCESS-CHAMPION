import { useState } from "react";
import { sendChatMessage } from "../services/api";
import "../styles/Chat.css";


function Chat() {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);



  async function handleSend() {

    if (!message.trim()) return;


    const userMessage = message;


    // Add user message immediately
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


      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply || "No response received.",
        },
      ]);


    } catch (error) {

      console.error("Chat error:", error);


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




  function clearChat() {

    setMessages([]);

  }





  return (

    <div className="chat-page">


      {/* Header */}

      <div className="chat-title">

        <h1>
          🤖 AI Assistant
        </h1>

        <p>
          Academic Success Companion
        </p>

      </div>





      {/* Chat messages */}

      <div className="chat-window">


        {
          messages.length === 0 && (

            <div className="chat-empty">

              <h2>
                👋 Hello Student
              </h2>

              <p>
                Ask me about your studies, GPA, projects,
                scholarships or learning resources.
              </p>


              <div className="suggestions">

                <button
                  onClick={() =>
                    setMessage("How can I improve my GPA?")
                  }
                >
                  Improve GPA
                </button>


                <button
                  onClick={() =>
                    setMessage("Create a study plan for me")
                  }
                >
                  Study Plan
                </button>


                <button
                  onClick={() =>
                    setMessage("Explain machine learning")
                  }
                >
                  Explain Topic
                </button>


              </div>


            </div>

          )
        }




        {
          messages.map((msg, index) => (

            <div
              key={index}
              className={
                msg.role === "user"
                  ? "message user"
                  : "message ai"
              }
            >


              {
                msg.role === "ai" && (

                  <div className="avatar">
                    🤖
                  </div>

                )
              }



              <div className="bubble">

                {msg.text}

              </div>



              {
                msg.role === "user" && (

                  <div className="avatar">
                    👤
                  </div>

                )
              }



            </div>


          ))
        }




        {
          loading && (

            <div className="message ai">

              <div className="avatar">
                🤖
              </div>


              <div className="bubble">
                Thinking...
              </div>


            </div>

          )
        }



      </div>





      {/* Input */}

      <div className="input-area">


        <input

          type="text"

          placeholder="Message AI Assistant..."

          value={message}

          onChange={(e) =>
            setMessage(e.target.value)
          }

          onKeyDown={handleKeyDown}

        />



        <button

          onClick={handleSend}

          disabled={loading}

        >

          {loading ? "..." : "Send"}

        </button>




        <button

          className="clear-chat"

          onClick={clearChat}

        >

          Clear

        </button>


      </div>



    </div>

  );

}


export default Chat;