const API_URL = import.meta.env.VITE_API_URL;


export async function sendChatMessage(message) {

  const response = await fetch(`${API_URL}/chat`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      message: message
    })

  });


  return response.json();

}



export async function getResources() {

  const response = await fetch(`${API_URL}/resources`);

  return response.json();

}



export async function getScholarships() {

  const response = await fetch(`${API_URL}/scholarships`);

  return response.json();

}



export async function getProjects() {

  const response = await fetch(`${API_URL}/projects`);

  return response.json();

}