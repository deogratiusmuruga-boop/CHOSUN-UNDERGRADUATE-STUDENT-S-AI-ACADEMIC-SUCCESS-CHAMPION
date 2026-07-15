const API_URL = import.meta.env.VITE_API_URL;



// Send message to AI chatbot
export async function sendChatMessage(message) {

  const token = localStorage.getItem("access_token");


  const response = await fetch(
    `${API_URL}/chat/`,
    {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify({
        message: message
      })

    }
  );


  if (!response.ok) {

    throw new Error(
      "Chat request failed"
    );

  }


  return response.json();

}




// Load previous chatbot conversations
export async function getChatHistory() {

  const token = localStorage.getItem("access_token");


  const response = await fetch(
    `${API_URL}/chat/history`,
    {

      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`
      }

    }
  );


  if (!response.ok) {

    throw new Error(
      "Could not load chat history"
    );

  }


  return response.json();

}




// Get academic resources
export async function getResources() {

  const response = await fetch(
    `${API_URL}/resources`
  );


  if (!response.ok) {

    throw new Error(
      "Could not load resources"
    );

  }


  return response.json();

}




// Get scholarships
export async function getScholarships() {

  const response = await fetch(
    `${API_URL}/scholarships`
  );


  if (!response.ok) {

    throw new Error(
      "Could not load scholarships"
    );

  }


  return response.json();

}




// Get projects
export async function getProjects() {

  const response = await fetch(
    `${API_URL}/projects`
  );


  if (!response.ok) {

    throw new Error(
      "Could not load projects"
    );

  }


  return response.json();

}