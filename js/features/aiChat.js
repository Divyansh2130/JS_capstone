
function isCarRelated(message) {
  const carKeywords = [
    "car", "cars", "vehicle", "vehicles",
    "buy", "sell", "rent", "rental",
    "price", "cost", "mileage",
    "fuel", "diesel", "petrol", "cng", "electric", "ev",
    "engine", "gear", "automatic", "manual",
    "sedan", "suv", "hatchback",
    "bmw", "audi", "toyota", "honda", "tesla",
    "insurance", "service", "maintenance"
  ];
 
  const text = message.toLowerCase();
  return carKeywords.some(word => text.includes(word));
}
 
async function fetchAIResponse(userMessage) {
   if (!isCarRelated(userMessage)) {
    return "I'm here to help only with car-related questions 🚗";
  }
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              `
      You are an AI assistant for a car marketplace website named boxcars.
 
      RULES:
      - You must ONLY answer questions related to cars, car buying/selling, rentals, pricing, specs, comparisons, maintenance, or marketplace features.
      - If the user asks anything NOT related to cars, you MUST politely refuse.
      - Do not answer off-topic questions even partially.
      - Your refusal should be brief and friendly.
     
      Refusal example:
      "I'm here to help only with car-related questions. Please ask something about cars."
      `
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    }
  );
 
  if (!response.ok) {
    const text = await response.text();
    console.error("Groq error:", response.status, text);
    throw new Error("Groq API failed");
  }
 
  const data = await response.json();
  return data.choices[0].message.content;
}


function addMessage(text, sender = "user") {
    const messages = document.getElementById("ai-chat-messages");

    const bubble = document.createElement("div");
    bubble.className =
        sender === "user"
            ? "self-end bg-blue-600 text-white px-3 py-2 rounded-lg max-w-[80%]"
            : "self-start bg-gray-100 text-gray-800 px-3 py-2 rounded-lg max-w-[80%]";

    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
}

export function initAIChatUI() {
    const toggleBtn = document.getElementById("ai-chat-toggle");
    const chatBox = document.getElementById("ai-chat-box");
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");

    if (!toggleBtn || !chatBox || !form || !input) return;

    toggleBtn.addEventListener("click", () => {
        chatBox.classList.toggle("hidden");
        console.log("Chat toggled");
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const userMessage = input.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, "user");
        input.value = "";

        addMessage("Typing...", "ai");

        fetchAIResponse(userMessage)
            .then((reply) => {
                document
                    .getElementById("ai-chat-messages")
                    .lastChild.remove();
                addMessage(reply, "ai");
            })
            .catch(() => {
                addMessage("Something went wrong. Try again.", "ai");
            });

    });
}
