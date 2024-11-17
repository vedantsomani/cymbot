async function sendMessage() {
    // Get the user input
    const userInput = document.getElementById("userInput").value.trim();
    
    // Check if input is empty
    if (!userInput) return;

    // Display user's message in the chatbox
    const chatbox = document.getElementById("chatbox");
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message", "user-message");
    userMessageDiv.textContent = userInput;
    chatbox.appendChild(userMessageDiv);
    
    // Clear the input field
    document.getElementById("userInput").value = "";

    // Send the user's message to the chatbot API
    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ input_text: userInput })
        });

        const data = await response.json();

        // Display the bot's response
        const botMessageDiv = document.createElement("div");
        botMessageDiv.classList.add("message", "bot-message");

        if (data.response) {
            botMessageDiv.textContent = data.response;
        } else {
            botMessageDiv.textContent = "There was an error processing your message.";
        }

        chatbox.appendChild(botMessageDiv);
        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the latest message

    } catch (error) {
        console.error("Error:", error);
        const errorMessageDiv = document.createElement("div");
        errorMessageDiv.classList.add("message", "bot-message");
        errorMessageDiv.textContent = "Unable to connect to the chatbot server.";
        chatbox.appendChild(errorMessageDiv);
    }
}
