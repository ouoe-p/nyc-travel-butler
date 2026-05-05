const chatHistory = document.getElementById("chatHistory");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const API_KEY = "AIzaSyC9Pr-XskpeyGJbO6sONfozx4MTBSf8Z-M";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const firstMessage = `안녕하세요! 저는 뉴욕 여행 버틀러예요 🗽
June 23-27 뉴욕 여행을 도와드릴게요.
궁금한 게 있으시면 뭐든 물어보세요!

💡 이런 것들을 물어볼 수 있어요:
- Day 1~5 일정
- 브로드웨이 뮤지컬 추천
- 재즈바 & 드랙쇼
- 전망대 정보
- 교통 & 레스토랑 팁`;

const SYSTEM_USER_PROMPT = `You are a professional NYC travel butler. You have deep knowledge about New York City travel. Answer in Korean. Be friendly and use emojis. Here is the travel schedule information:

DAY 1 (June 23): YMCA Hostel check-in 15:00 / Vessel (Hudson Yards, free) / High Line (Chelsea, free) / Little Island (Pier 55, free) / Times Square (free)

DAY 2 (June 24): MoMA ($30) / FIFA Fanzone at Flushing Meadows Queens (free) / East River Ferry ($4) / Jazz bar night

DAY 3 (June 25): Central Park morning walk / SoHo shopping & brunch / Chelsea Gallery tour / Lower Manhattan Wall St & 9/11 Memorial / Broadway Musical

DAY 4 (June 26): The Met ($30) / Guggenheim ($26) / Central Park picnic / Roosevelt Island Tram ($2.90) / Whitney Museum ($28)

DAY 5 (June 27): Brooklyn Flea Market / Pebble Beach Brooklyn Bridge Park / DUMBO & Brooklyn Bridge / LGA Airport departure`;

const conversation = [
  { role: "user", text: SYSTEM_USER_PROMPT },
  { role: "model", text: "알겠습니다! NYC 여행 버틀러로서 친절하고 이모지를 사용해 한국어로 안내할게요. 🗽✨" },
];

function addMessage(role, text, isHtml = false) {
  const row = document.createElement("div");
  row.className = `message-row ${role}`;

  const bubble = document.createElement("div");
  bubble.className = "message";

  if (isHtml) {
    bubble.innerHTML = text;
  } else {
    bubble.textContent = text;
  }

  row.appendChild(bubble);
  chatHistory.appendChild(row);
  chatHistory.scrollTop = chatHistory.scrollHeight;
  return row;
}

function showTypingIndicator() {
  return addMessage(
    "butler",
    `<div class="typing" aria-label="버틀러 응답 준비 중">
      <span></span><span></span><span></span>
    </div>`,
    true
  );
}

async function getGeminiResponse(input) {
  const requestBody = {
    contents: [
      ...conversation.map((entry) => ({
        role: entry.role,
        parts: [{ text: entry.text }],
      })),
      { role: "user", parts: [{ text: input }] },
    ],
  };
  console.log("Request URL:", GEMINI_ENDPOINT);
  console.log("Request body:", JSON.stringify(requestBody, null, 2));

  const response = await fetch(GEMINI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  console.log("Response status:", response.status);

  const data = await response.json();
  console.log("Response body:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    throw new Error(`Gemini API error (${response.status})`);
  }

  const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

  if (!answer) {
    throw new Error("Gemini 응답이 비어 있습니다.");
  }

  conversation.push({ role: "user", text: input });
  conversation.push({ role: "model", text: answer });
  return answer;
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = userInput.value.trim();
  if (!message) {
    return;
  }

  addMessage("user", message);
  userInput.value = "";

  const typingRow = showTypingIndicator();
  userInput.focus();

  try {
    const answer = await getGeminiResponse(message);
    typingRow.remove();
    addMessage("butler", answer);
  } catch (error) {
    typingRow.remove();
    addMessage(
      "butler",
      "죄송해요, 지금 답변을 가져오는 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요. 🙏"
    );
    console.error(error);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    addMessage("butler", firstMessage);
  }, 250);
});
