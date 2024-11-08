// Send user input to the API and get a response
async function chatbot(input) {
  try {
    const response = await fetch("https://ticket-chatbot-final.onrender.com/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: input }), 
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json(); // Parse the JSON response
    console.log("API Response:", data); // Log the entire response to inspect its structure

    return data.response; // Return the 'response' property from the API
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, I am having trouble connecting to the server.";
  }
}

// Display the user message on the chat
function displayUserMessage(message) {
  let chat = document.getElementById("chatbot-chat");
  let userMessage = document.createElement("div");
  userMessage.classList.add("chatbot-message", "chatbot-user");
  let userAvatar = document.createElement("div");
  userAvatar.classList.add("chatbot-avatar");
  let userText = document.createElement("div");
  userText.classList.add("chatbot-text");
  userText.innerHTML = message;
  userMessage.appendChild(userAvatar);
  userMessage.appendChild(userText);
  chat.appendChild(userMessage);
  chat.scrollTop = chat.scrollHeight;
}

// Display the bot message on the chat
function displayBotMessage(message) {
  let chat = document.getElementById("chatbot-chat");
  let botMessage = document.createElement("div");
  botMessage.classList.add("chatbot-message", "chatbot-bot");
  let botAvatar = document.createElement("div");
  botAvatar.classList.add("chatbot-avatar");
  let botText = document.createElement("div");
  botText.classList.add("chatbot-text");
  botText.innerHTML = message;
  botMessage.appendChild(botAvatar);
  botMessage.appendChild(botText);
  chat.appendChild(botMessage);
  chat.scrollTop = chat.scrollHeight;
}

// Send the user message and get the bot response
// Send the user message and get the bot response
async function sendMessage() {
  let input = document.getElementById("chatbot-input").value;
  if (input) {
    displayUserMessage(input);
    
    // Clear the input field immediately after displaying the user message
    document.getElementById("chatbot-input").value = "";

    // Wait for the chatbot response
    let output = await chatbot(input);

    // Display the bot's response
    displayBotMessage(output);
  }
}

// Add a click event listener to the button
document
  .getElementById("chatbot-button")
  .addEventListener("click", sendMessage);

// Add a keypress event listener to the input
document
  .getElementById("chatbot-input")
  .addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
      sendMessage();
    }
  });

  
