const input = document.querySelector("#userInput");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});
async function sendMessage() {
  let chatSection = document.querySelector(".chatSection");
  let userInput = document.querySelector("#userInput");
  let message = userInput.value.trim();
  if (message === "") return;
  chatSection.insertAdjacentHTML(
    "beforeend",
    `
        <div class="userChat">
                <p class="userQuery">${userInput.value}</p>
                <i class="fa-solid fa-circle-user"></i>
            </div>
        `
  );
  userInput.value = "";
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    chatSection.insertAdjacentHTML(
      "beforeend",
      `
            
            <div class="response">
                <i class="fa-solid fa-robot"></i>
                <p class="AIresponse">${botReply}</p>
            </div>`
    );
  } catch (error) {
    chatSection.insertAdjacentHTML(
      "beforeend",
      `
            <div class="userChat">
                <p class="userQuery">${userInput.value}</p>
                <i class="fa-solid fa-circle-user"></i>
            </div>
            <div class="response">
                <i class="fa-solid fa-robot"></i>
                <p class="AIresponse">${error.message}</p>
            </div>`
    );
    console.error(error);
  }
}
