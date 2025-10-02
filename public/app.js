const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input button');
const chatbox = document.querySelector(".chatbox");

// Add message to DOM
const chatLog = (message, className) => {
  const li = document.createElement("li");
  li.classList.add("chat", className);
  li.innerHTML = `<p>${message}</p>`;
  return li;
};

// Send message to server and get Claude response
const generateResponse = (incomingChatLi) => {
  const messageElement = incomingChatLi.querySelector("p");
  
  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: chatInput.value.trim() })
  })
  .then(res => res.json())
  .then(data => {
    messageElement.textContent = data.reply || "No response from Claude.";
  })
  .catch(err => {
    console.error(err);
    messageElement.classList.add("error");
    messageElement.textContent = "Oops! Something went wrong.";
  })
  .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Add user's message
  chatbox.appendChild(chatLog(userMessage, "chat-output"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Add "thinking..." placeholder
  const thinkingLi = chatLog("Thinking...", "chat-incoming");
  chatbox.appendChild(thinkingLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Generate response
  generateResponse(thinkingLi);

  // Clear input
  chatInput.value = "";
};

sendChatBtn.addEventListener("click", handleChat);
