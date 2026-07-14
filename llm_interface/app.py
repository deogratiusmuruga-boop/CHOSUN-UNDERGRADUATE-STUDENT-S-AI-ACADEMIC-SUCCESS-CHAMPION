from flask import Flask, render_template, request, jsonify

import chatbot
import llm

app = Flask(__name__)

conversation_history = []


@app.route("/")
def index():
    return render_template(
        "index.html",
        model_name=llm.MODEL_NAME
    )


@app.route("/status")
def status():

    return jsonify({

        "ollama_connected": llm.check_ollama_status(),

        "model": llm.MODEL_NAME

    })


@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json(silent=True) or {}

    user_message = (data.get("message") or "").strip()

    if not user_message:

        return jsonify({

            "intent": None,

            "response": "",

            "error": "Message cannot be empty."

        }), 400

    result = chatbot.handle_message(

        user_message,

        history=conversation_history

    )

    if result["error"]:

        return jsonify(result), 500

    conversation_history.append({

        "role": "user",

        "content": user_message

    })

    conversation_history.append({

        "role": "assistant",

        "content": result["response"]

    })

    return jsonify(result)


@app.route("/clear", methods=["POST"])
def clear():

    conversation_history.clear()

    return jsonify({

        "status": "cleared"

    })


if __name__ == "__main__":

    app.run(

        host="127.0.0.1",

        port=5000,

        debug=True

    )