const chatHistory = document.getElementById("chatHistory");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

const firstMessage = `안녕하세요! 저는 뉴욕 여행 버틀러예요 🗽
June 23-27 뉴욕 여행을 도와드릴게요.
궁금한 게 있으시면 뭐든 물어보세요!

💡 이런 것들을 물어볼 수 있어요:
- Day 1~5 일정
- 브로드웨이 뮤지컬 추천
- 재즈바 & 드랙쇼
- 전망대 정보
- 교통 & 레스토랑 팁`;

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

function getMockResponse(input) {
  const text = input.toLowerCase();

  if (text.includes("day 1") || text.includes("day1") || input.includes("첫째날")) {
    return `📅 Day 1 — Midtown West & Chelsea

⏰ 15:00 YMCA Hostel 체크인
💰 사전결제 | 11:00 체크아웃

⏰ 16:30 베슬 (Vessel)
📍 Hudson Yards
💰 무료 (사전예약 권장)
💡 내부 16층 나선형 계단 구조물

⏰ 17:30 하이라인 (High Line)
📍 Chelsea
💰 무료
💡 남쪽→북쪽 방향 추천

⏰ 19:00 리틀아일랜드 (Little Island)
📍 Pier 55
💰 무료
💡 허드슨강 위 인공섬, 야경 추천

⏰ 20:30 타임즈스퀘어
📍 Midtown
💰 무료
💡 밤에 더 화려함, TKTS 계단 야경`;
  }

  if (text.includes("day 2") || text.includes("day2")) {
    return `📅 Day 2 — Art, Queens & Night Jazz

⏰ 10:00 MoMA
📍 Midtown Manhattan
💰 유료
💡 인기 작품 위주로 2~3시간 관람

⏰ 14:00 FIFA Fanzone
📍 Queens
💰 무료/행사별 상이
💡 경기일정과 입장조건 사전 확인

⏰ 17:30 페리 탑승 (Ferry)
📍 East River 노선
💰 유료
💡 해질녘 시간대 탑승 추천

⏰ 21:00 재즈바 방문
📍 Manhattan
💰 커버차지/음료비 별도
💡 공연 시작 20~30분 전 도착 추천`;
  }

  if (text.includes("day 3") || text.includes("day3")) {
    return `📅 Day 3 — Uptown to Downtown + Musical

⏰ 09:30 센트럴파크 (Central Park)
📍 Manhattan
💰 무료
💡 Sheep Meadow/ Bethesda Fountain 산책 추천

⏰ 12:30 소호 (SoHo)
📍 Lower Manhattan
💰 자유일정
💡 쇼핑과 브런치 코스에 적합

⏰ 15:30 첼시 (Chelsea)
📍 Manhattan West Side
💰 자유일정
💡 갤러리/카페 중심으로 이동

⏰ 18:00 로어맨해튼 (Lower Manhattan)
📍 Financial District 일대
💰 자유일정
💡 야경 포인트 위주로 이동

⏰ 20:00 뮤지컬 관람
📍 Broadway Theater District
💰 유료
💡 예매 티켓은 모바일로 미리 준비`;
  }

  if (text.includes("day 4") || text.includes("day4")) {
    return `📅 Day 4 — Museum Day & East River

⏰ 10:00 The Met
📍 Upper East Side
💰 유료
💡 이집트관/유럽회화관 인기

⏰ 13:00 구겐하임 (Guggenheim)
📍 5th Ave
💰 유료
💡 나선형 동선으로 빠르게 관람 가능

⏰ 15:30 센트럴파크 피크닉
📍 Great Lawn 주변
💰 식비 별도
💡 간단한 테이크아웃 도시락 추천

⏰ 17:30 루즈벨트 아일랜드
📍 Roosevelt Island Tram
💰 대중교통 요금 적용
💡 트램에서 맨해튼 스카이라인 감상

⏰ 20:00 휘트니 미술관 (Whitney Museum)
📍 Meatpacking District
💰 유료
💡 폐관시간과 야간 운영일 확인`;
  }

  if (text.includes("day 5") || text.includes("day5")) {
    return `📅 Day 5 — Brooklyn Morning & Departure

⏰ 09:30 브루클린 플리마켓
📍 Brooklyn
💰 입장 무료
💡 빈티지 소품/로컬 푸드 탐방 추천

⏰ 11:30 페블비치 (Pebble Beach)
📍 DUMBO Waterfront
💰 무료
💡 맨해튼 브릿지+스카이라인 포토스팟

⏰ 13:00 덤보 (DUMBO)
📍 Brooklyn
💰 자유일정
💡 워싱턴 스트리트 포인트 방문 추천

⏰ 16:00 LGA 공항 이동
📍 LaGuardia Airport
💰 교통비 별도
💡 출발 2시간 전 공항 도착 권장`;
  }

  if (text.includes("musical") || input.includes("뮤지컬")) {
    return `브로드웨이 뮤지컬 추천
- Chicago
- Lion King
- Aladdin
- SIX
- Wicked
- MJ`;
  }

  if (text.includes("jazz") || input.includes("재즈")) {
    return `재즈바 추천
- Village Vanguard
- Blue Note
- Dizzy's Club`;
  }

  if (input.includes("전망대") || text.includes("observatory") || text.includes("view")) {
    return `전망대 추천
- Empire State
- One World
- Top of the Rock
- Summit
- Edge`;
  }

  if (text.includes("drag") || input.includes("드랙")) {
    return `드랙쇼 추천
- Hardware Bar
- Industry Bar
- Pieces Bar`;
  }

  if (text.includes("transport") || input.includes("교통") || input.includes("지하철")) {
    return `교통 팁
- OMNY로 카드/휴대폰 태그 결제 가능
- 지하철 기본 요금: $2.90
- 공항 이동은 AirTrain + Subway 조합이 편리`;
  }

  if (
    text.includes("tip") ||
    input.includes("팁") ||
    text.includes("restaurant") ||
    input.includes("레스토랑")
  ) {
    return `레스토랑 & 팁 가이드
- 일반 식당 팁: 보통 18~20%
- 바에서 음료 주문 시 잔당 $1~2
- 영수증에 Service Charge 포함 여부 먼저 확인`;
  }

  return "저는 뉴욕 여행 버틀러예요 🗽 일정, 뮤지컬, 재즈바, 전망대 등 뉴욕에 관한 건 뭐든 물어보세요!";
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = userInput.value.trim();
  if (!message) {
    return;
  }

  addMessage("user", message);
  userInput.value = "";

  const typingRow = showTypingIndicator();
  userInput.focus();

  setTimeout(() => {
    typingRow.remove();
    addMessage("butler", getMockResponse(message));
  }, 1000);
});

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    addMessage("butler", firstMessage);
  }, 250);
});
