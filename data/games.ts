export type GameCategory = "결정" | "여행" | "친구" | "테스트" | "월드컵";
export type GameEngine =
  | "cards"
  | "wheel"
  | "teams"
  | "order"
  | "balance"
  | "quiz"
  | "worldcup"
  | "split"
  | "missions";

export type BalancePrompt = { a: string; b: string };
export type QuizQuestion = {
  question: string;
  answers: { label: string; scores: Record<string, number> }[];
};
export type QuizResult = {
  title: string;
  emoji: string;
  summary: string;
  detail: string;
};

export type Game = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  category: GameCategory;
  engine: GameEngine;
  emoji: string;
  accent: string;
  plays: string;
  featured?: boolean;
  fresh?: boolean;
  tags: string[];
  instructions: string[];
  options?: string[];
  prompts?: BalancePrompt[];
  questions?: QuizQuestion[];
  results?: Record<string, QuizResult>;
  missions?: string[];
  longDescription: string;
};

const travelBalance: BalancePrompt[] = [
  { a: "계획표대로 알차게", b: "발길 닿는 대로 자유롭게" },
  { a: "새벽 비행기라도 저렴하게", b: "돈 더 내고 편한 시간에" },
  { a: "맛집 웨이팅 2시간", b: "근처 빈집 바로 입장" },
  { a: "사진 500장 남기기", b: "눈으로 오래 기억하기" },
  { a: "숙소에 투자하기", b: "숙소는 잠만 자는 곳" },
  { a: "매일 로컬 음식", b: "한식 한 번은 꼭" },
  { a: "기념품에 지갑 열기", b: "경험에 전부 쓰기" },
  { a: "유명 관광지 정복", b: "동네 골목 탐험" },
];

const friendBalance: BalancePrompt[] = [
  { a: "내 흑역사 친구 10명에게 공개", b: "친구 흑역사 부모님께 공개" },
  { a: "약속마다 30분 일찍 오는 친구", b: "매번 10분 늦는 친구" },
  { a: "평생 단톡방 읽씹 금지", b: "평생 음성 메시지만 보내기" },
  { a: "친구와 옷 취향 완전 겹치기", b: "친구와 음식 취향 완전 반대" },
  { a: "모든 사진에서 나만 눈 감기", b: "모든 사진에서 친구만 잘 나오기" },
  { a: "여행 내내 길 담당", b: "여행 내내 예약 담당" },
  { a: "내 비밀 하나 공개", b: "친구 비밀 하나 평생 지키기" },
  { a: "10년 전으로 친구와 돌아가기", b: "10년 뒤 친구와 미리 만나기" },
];

const chaosBalance: BalancePrompt[] = [
  { a: "평생 재채기할 때마다 ‘사랑해!’ 외치기", b: "하품할 때마다 혼자 박수 세 번 치기" },
  { a: "내 검색 기록을 친구 단톡방에 공개", b: "내 갤러리 최근 사진 30장을 가족에게 공개" },
  { a: "소개팅에서 전 애인 이름 부르기", b: "소개팅에서 상대 부모님 성함 먼저 묻기" },
  { a: "모든 사진에서 나만 브이 금지", b: "모든 사진에서 나만 정면 응시" },
  { a: "카톡 오타를 평생 수정 못 하기", b: "음성 메시지만 보낼 수 있기" },
  { a: "회사 회식에서 내 노래방 영상 상영", b: "친구 결혼식에서 내 흑역사 사진 상영" },
  { a: "웃을 때마다 효과음 ‘뿌우’ 나기", b: "걸을 때마다 슬리퍼 소리 나기" },
  { a: "평생 라면 스프 먼저 넣는 사람과 살기", b: "평생 탕수육 소스 취향 반대인 사람과 살기" },
  { a: "중요한 순간마다 딸꾹질 10번", b: "조용한 순간마다 배에서 천둥소리" },
  { a: "친구가 내 옷 대신 골라주기", b: "부모님이 내 프로필 사진 골라주기" },
];

const spicyRelationshipBalance: BalancePrompt[] = [
  { a: "내 스토리 올리자마자 1초 만에 보는 썸", b: "항상 23시간 뒤에 보는 썸" },
  { a: "애정 표현 100점, 연락 텀 6시간", b: "연락은 칼답, 애정 표현은 0점" },
  { a: "회사에서 애칭으로 불리기", b: "부모님 앞에서 연애 편지 낭독하기" },
  { a: "연인의 전 애인 사진을 우연히 발견", b: "연인이 내 흑역사 계정을 우연히 발견" },
  { a: "첫 데이트 내내 이에 고춧가루", b: "첫 데이트 끝날 때 바지 지퍼 발견" },
  { a: "모든 싸움을 친구들이 알기", b: "모든 화해 과정을 부모님이 알기" },
  { a: "공개 연애로 매일 커플 사진", b: "비밀 연애로 남들 앞에서 존댓말" },
  { a: "질투는 많지만 바로 말하는 연인", b: "쿨한 척하다가 일기장에 다 쓰는 연인" },
  { a: "데이트 계획표를 분 단위로 짜기", b: "만나서 정하자만 반복하기" },
  { a: "내 친구들과 너무 친한 연인", b: "내 친구 이름을 매번 헷갈리는 연인" },
];

const chaosQuiz: QuizQuestion[] = [
  {
    question: "단톡방이 갑자기 3시간째 조용하다. 당신은?",
    answers: [
      { label: "웃긴 짤을 투척하고 반응을 기다린다", scores: { overheat: 2 } },
      { label: "조용히 읽고 아무 일도 없었던 척한다", scores: { ghost: 2 } },
      { label: "이번 주 약속 일정을 정리해 올린다", scores: { director: 2 } },
      { label: "‘뭐 먹지?’ 한마디로 모두를 깨운다", scores: { snack: 2 } },
    ],
  },
  {
    question: "여행 숙소에 도착했는데 예약이 잘못됐다.",
    answers: [
      { label: "일단 웃긴 상황이라며 영상부터 찍는다", scores: { overheat: 2 } },
      { label: "조용히 로비 구석으로 사라진다", scores: { ghost: 2 } },
      { label: "예약 내역과 대안을 동시에 펼친다", scores: { director: 2 } },
      { label: "근처 편의점 위치부터 찾는다", scores: { snack: 2 } },
    ],
  },
  {
    question: "친구가 소개팅 후기를 묻는다.",
    answers: [
      { label: "표정과 성대모사까지 1인 4역으로 재연", scores: { overheat: 2 } },
      { label: "‘그냥 그랬어’ 하고 화제를 돌린다", scores: { ghost: 2 } },
      { label: "장점·단점·재만남 가능성을 표로 정리", scores: { director: 2 } },
      { label: "뭐 먹었는지부터 자세히 설명한다", scores: { snack: 2 } },
    ],
  },
  {
    question: "모임에서 갑자기 어색한 침묵이 찾아왔다.",
    answers: [
      { label: "내 흑역사를 자진 공개해 분위기를 살린다", scores: { overheat: 2 } },
      { label: "휴대폰을 보며 투명 인간 모드에 들어간다", scores: { ghost: 2 } },
      { label: "다음 코스를 자연스럽게 제안한다", scores: { director: 2 } },
      { label: "디저트 시킬 사람을 모집한다", scores: { snack: 2 } },
    ],
  },
  {
    question: "약속 시간 10분 전, 당신의 모습은?",
    answers: [
      { label: "이미 도착해서 친구 놀릴 멘트 준비 중", scores: { overheat: 2 } },
      { label: "도착했지만 아무에게도 말하지 않고 대기", scores: { ghost: 2 } },
      { label: "도착 시간과 좌석 위치를 단톡에 공지", scores: { director: 2 } },
      { label: "근처 붕어빵 냄새를 따라 이동 중", scores: { snack: 2 } },
    ],
  },
];

const chaosResults: Record<string, QuizResult> = {
  overheat: {
    title: "인간 예능 자막",
    emoji: "📺",
    summary: "당신이 입을 열면 단톡방이 다시 살아납니다.",
    detail: "어색함을 못 견뎌 본인의 흑역사까지 콘텐츠로 바꾸는 타입입니다. 친구들은 웃지만 가끔 당신의 다음 발언을 두려워합니다.",
  },
  ghost: {
    title: "선택적 투명 인간",
    emoji: "👻",
    summary: "분명 있었는데 목격자가 없습니다.",
    detail: "필요한 순간에는 정확히 나타나고, 귀찮은 기운이 감지되면 조용히 사라집니다. 읽씹이 아니라 에너지 절약 모드라고 주장합니다.",
  },
  director: {
    title: "모임 총괄 프로듀서",
    emoji: "🎬",
    summary: "당신이 없으면 예약도, 이동도, 엔딩도 없습니다.",
    detail: "친구들이 아무 생각 없이 웃을 수 있는 이유는 당신이 뒤에서 모든 것을 정리하기 때문입니다. 단, 본인만의 휴식 시간도 일정에 넣어주세요.",
  },
  snack: {
    title: "간식 기반 평화주의자",
    emoji: "🍪",
    summary: "대부분의 갈등은 맛있는 것으로 해결된다고 믿습니다.",
    detail: "복잡한 상황에서도 먹을 것을 찾아내는 생존형 분위기 메이커입니다. 가방 안에서 과자가 나오는 순간 모두가 당신을 믿게 됩니다.",
  },
};

const travelQuiz: QuizQuestion[] = [
  {
    question: "여행지가 정해지면 가장 먼저 하는 일은?",
    answers: [
      { label: "지도에 갈 곳을 빼곡히 저장한다", scores: { planner: 2 } },
      { label: "항공권만 끊고 마음을 놓는다", scores: { drifter: 2 } },
      { label: "맛집과 카페부터 찾는다", scores: { collector: 2 } },
      { label: "동행에게 하고 싶은 걸 묻는다", scores: { harmonizer: 2 } },
    ],
  },
  {
    question: "예정한 식당이 갑자기 문을 닫았다.",
    answers: [
      { label: "플랜 B 목록을 바로 연다", scores: { planner: 2 } },
      { label: "잘됐다, 옆 골목으로 들어간다", scores: { drifter: 2 } },
      { label: "리뷰 4.5 이상을 다시 검색한다", scores: { collector: 2 } },
      { label: "다들 뭘 먹고 싶은지 투표한다", scores: { harmonizer: 2 } },
    ],
  },
  {
    question: "숙소에서 가장 중요한 한 가지는?",
    answers: [
      { label: "동선이 완벽한 위치", scores: { planner: 2 } },
      { label: "예상 밖의 분위기", scores: { drifter: 2 } },
      { label: "사진이 잘 나오는 공간", scores: { collector: 2 } },
      { label: "모두가 편한 방 구조", scores: { harmonizer: 2 } },
    ],
  },
  {
    question: "여행 마지막 날, 시간이 두 시간 남았다.",
    answers: [
      { label: "체크해 둔 마지막 장소로 간다", scores: { planner: 2 } },
      { label: "벤치에 앉아 도시를 구경한다", scores: { drifter: 2 } },
      { label: "못 산 기념품을 찾는다", scores: { collector: 2 } },
      { label: "다 같이 가장 좋았던 곳에 다시 간다", scores: { harmonizer: 2 } },
    ],
  },
  {
    question: "친구가 갑자기 일정을 바꾸자고 한다.",
    answers: [
      { label: "전체 동선을 다시 계산한다", scores: { planner: 2 } },
      { label: "오히려 좋아, 바로 변경한다", scores: { drifter: 2 } },
      { label: "새 일정이 더 특별한지 따져본다", scores: { collector: 2 } },
      { label: "모두 괜찮으면 따라간다", scores: { harmonizer: 2 } },
    ],
  },
];

const travelResults: Record<string, QuizResult> = {
  planner: {
    title: "빈틈없는 루트 디자이너",
    emoji: "🗺️",
    summary: "당신과 가면 헤맬 틈이 없습니다.",
    detail: "동선, 영업시간, 예약까지 먼저 챙기는 든든한 여행 설계자예요. 가끔은 계획표에 ‘아무것도 안 하기’를 넣어두면 더 오래 기억되는 여행이 됩니다.",
  },
  drifter: {
    title: "우연 수집가",
    emoji: "🛵",
    summary: "계획 밖에서 진짜 여행을 만나는 사람.",
    detail: "낯선 골목과 갑작스러운 제안에 강합니다. 함께하는 사람에게는 당신의 여유가 큰 선물이에요. 단, 숙소 주소와 마지막 교통편만큼은 저장해 두세요.",
  },
  collector: {
    title: "장면 채집가",
    emoji: "📸",
    summary: "한 번의 여행을 오래 남기는 감각파.",
    detail: "좋은 맛, 빛, 공간을 발견하는 눈이 탁월합니다. 남들이 지나친 장면을 여행의 하이라이트로 만들죠. 기록하느라 순간을 놓치지만 않으면 완벽합니다.",
  },
  harmonizer: {
    title: "분위기 온도 조절사",
    emoji: "🫶",
    summary: "어디보다 누구와 가는지가 중요한 사람.",
    detail: "동행의 표정과 속도를 가장 먼저 살피는 여행자예요. 모두의 기억을 편안하게 만드는 재능이 있습니다. 이번 여행에는 당신이 정말 원하는 것도 하나 꼭 넣어보세요.",
  },
};

const friendshipQuiz: QuizQuestion[] = [
  {
    question: "친구가 새벽에 ‘자니?’라고 보냈다.",
    answers: [
      { label: "전화부터 건다", scores: { anchor: 2 } },
      { label: "무슨 일인지 차분히 묻는다", scores: { compass: 2 } },
      { label: "일단 웃긴 짤부터 보낸다", scores: { spark: 2 } },
      { label: "아침에 긴 답장을 남긴다", scores: { archive: 2 } },
    ],
  },
  {
    question: "단체 여행에서 자연스럽게 맡는 역할은?",
    answers: [
      { label: "다들 빠짐없이 챙기기", scores: { anchor: 2 } },
      { label: "예약과 동선 정리하기", scores: { compass: 2 } },
      { label: "분위기 띄우기", scores: { spark: 2 } },
      { label: "사진과 기록 남기기", scores: { archive: 2 } },
    ],
  },
  {
    question: "친구와 다퉜을 때 나는?",
    answers: [
      { label: "먼저 만나자고 한다", scores: { anchor: 2 } },
      { label: "문제의 원인을 정리한다", scores: { compass: 2 } },
      { label: "분위기가 풀릴 타이밍을 만든다", scores: { spark: 2 } },
      { label: "생각을 정리한 뒤 진심을 쓴다", scores: { archive: 2 } },
    ],
  },
  {
    question: "친구 생일 선물을 고르는 방식은?",
    answers: [
      { label: "요즘 힘든 점을 해결해 주는 것", scores: { anchor: 2 } },
      { label: "가장 실용적인 것", scores: { compass: 2 } },
      { label: "열자마자 웃을 수 있는 것", scores: { spark: 2 } },
      { label: "우리 추억이 담긴 것", scores: { archive: 2 } },
    ],
  },
  {
    question: "친구들이 나에게 가장 자주 하는 말은?",
    answers: [
      { label: "너 없었으면 큰일 날 뻔했어", scores: { anchor: 2 } },
      { label: "역시 너한테 물어보길 잘했어", scores: { compass: 2 } },
      { label: "너 때문에 진짜 웃겨", scores: { spark: 2 } },
      { label: "그걸 아직도 기억해?", scores: { archive: 2 } },
    ],
  },
];

const friendshipResults: Record<string, QuizResult> = {
  anchor: { title: "마음의 정박지", emoji: "⚓", summary: "돌아가고 싶게 만드는 든든한 친구.", detail: "말보다 먼저 곁을 내주는 타입입니다. 친구들에게 당신은 설명하지 않아도 편안한 장소예요. 가끔은 당신도 기대도 괜찮습니다." },
  compass: { title: "현실 나침반", emoji: "🧭", summary: "혼란 속에서 방향을 찾아주는 친구.", detail: "복잡한 고민을 선명하게 정리하고 실제적인 도움을 줍니다. 정답뿐 아니라 공감 한 스푼을 더하면 누구도 놓치고 싶지 않은 친구예요." },
  spark: { title: "분위기 점화장치", emoji: "✨", summary: "평범한 하루를 사건으로 만드는 친구.", detail: "어색함을 녹이고 웃을 이유를 만드는 재능이 있습니다. 당신 덕분에 모임이 시작돼요. 밝은 모습 뒤의 진짜 마음도 가끔 보여주세요." },
  archive: { title: "우리의 기록보관소", emoji: "📚", summary: "사소한 순간까지 오래 기억하는 친구.", detail: "언젠가 했던 말과 함께한 순간을 소중히 간직합니다. 당신의 섬세한 기억 덕분에 관계에는 서사가 생겨요." },
};

const baseInstructions = {
  cards: ["함께 있는 사람의 이름을 입력하세요.", "카드를 잘 섞은 뒤 한 장씩 골라보세요.", "당첨 카드는 마지막 순간까지 비밀입니다."],
  wheel: ["원하는 후보를 2개 이상 입력하세요.", "룰렛을 힘껏 돌려 결과를 확인하세요.", "결과가 마음에 안 들어도 한 번은 존중하기!"],
  teams: ["참가자 이름을 입력하세요.", "원하는 팀 수를 선택하세요.", "실력보다 운을 믿고 팀을 확정하세요."],
  order: ["참가자나 할 일을 입력하세요.", "한 번에 순서를 섞으세요.", "결과를 공유해 모두에게 확정 공지하세요."],
  balance: ["둘 중 더 끌리는 선택지를 고르세요.", "오래 고민하지 말고 첫 느낌을 믿으세요.", "마지막에 친구들과 선택 비율을 비교해 보세요."],
  quiz: ["질문마다 가장 나다운 답을 고르세요.", "정답은 없으니 솔직할수록 정확합니다.", "결과 카드를 친구에게 공유해 비교해 보세요."],
  worldcup: ["매 라운드 더 끌리는 후보를 고르세요.", "선택한 후보만 다음 라운드로 진출합니다.", "마지막까지 살아남은 단 하나를 확인하세요."],
  split: ["총금액과 인원수를 입력하세요.", "필요하면 한 명이 더 낼 금액을 조정하세요.", "정산 결과를 복사해 단톡방에 공유하세요."],
  missions: ["카드를 섞고 한 장을 뽑으세요.", "오늘 안에 미션을 수행하세요.", "완료했다면 다음 카드에 도전하세요."],
} satisfies Record<GameEngine, string[]>;

export const games: Game[] = [
  {
    slug: "who-pays-card", title: "오늘 누가 계산할까?", shortTitle: "결제자 카드", eyebrow: "대표 게임", description: "친구 이름을 넣고 카드를 뒤집어 오늘의 계산 담당을 정해요.", category: "여행", engine: "cards", emoji: "💳", accent: "#ff5c46", plays: "이번 주 12.8K", featured: true, fresh: true, tags: ["여행", "친구", "결제"], instructions: baseInstructions.cards, options: ["오늘의 계산 담당"], longDescription: "여행의 마지막 식사, 카페 한 잔, 편의점 야식처럼 누가 낼지 애매한 순간을 유쾌하게 끝내는 랜덤 카드 게임입니다. 실제 결제나 카드정보는 전혀 다루지 않으며, 친구들과 가볍게 역할을 정하는 용도로만 사용합니다.",
  },
  {
    slug: "decision-wheel", title: "고민 끝 결정 룰렛", shortTitle: "결정 룰렛", eyebrow: "결정 도구", description: "메뉴부터 여행지까지, 후보를 넣고 한 번에 돌려 결정해요.", category: "결정", engine: "wheel", emoji: "🎡", accent: "#8d66ff", plays: "이번 주 9.4K", featured: true, tags: ["룰렛", "랜덤", "메뉴"], instructions: baseInstructions.wheel, options: ["한식", "일식", "중식", "양식"], longDescription: "선택지가 많아 결정하지 못할 때 쓰는 가장 빠른 해결책입니다. 직접 후보를 입력할 수 있어 점심 메뉴, 여행 코스, 영화, 카페 등 어떤 상황에서도 바로 사용할 수 있습니다.",
  },
  {
    slug: "travel-type", title: "나의 여행 본캐 테스트", shortTitle: "여행 본캐", eyebrow: "5문항 · 2분", description: "계획파인지 즉흥파인지, 당신의 진짜 여행 캐릭터를 찾아요.", category: "테스트", engine: "quiz", emoji: "🧳", accent: "#1d8f6e", plays: "이번 주 8.7K", featured: true, tags: ["심리테스트", "여행", "성향"], instructions: baseInstructions.quiz, questions: travelQuiz, results: travelResults, longDescription: "여행을 준비하고 예상 밖의 상황을 만났을 때 드러나는 행동을 바탕으로 네 가지 여행 캐릭터를 찾아드립니다. 결과는 우열이 아니라 서로 다른 여행 방식의 장점을 보여줍니다.",
  },
  {
    slug: "travel-balance", title: "여행 취향 밸런스게임", shortTitle: "여행 밸런스", eyebrow: "8라운드", description: "새벽 비행기 vs 편한 시간, 숙소 투자 vs 경험 투자. 당신의 선택은?", category: "친구", engine: "balance", emoji: "⚖️", accent: "#ffb000", plays: "이번 주 7.9K", featured: true, tags: ["밸런스게임", "여행", "취향"], instructions: baseInstructions.balance, prompts: travelBalance, longDescription: "여행 전에 동행과 해보면 서로의 취향 차이를 미리 발견할 수 있는 밸런스게임입니다. 정답을 맞히는 게임이 아니라 대화를 시작하는 게임입니다.",
  },
  {
    slug: "random-teams", title: "우리 팀 랜덤 배정", shortTitle: "팀 나누기", eyebrow: "공정한 팀 편성", description: "눈치 보지 말고 이름만 넣으세요. 팀은 운이 정합니다.", category: "결정", engine: "teams", emoji: "🫱🏻‍🫲🏽", accent: "#1769ff", plays: "이번 주 6.8K", featured: true, tags: ["팀", "모임", "게임"], instructions: baseInstructions.teams, longDescription: "워크숍, 보드게임, 체육대회, 여행 미션에서 공정하게 팀을 나눌 수 있습니다. 참가자 수가 팀 수로 나누어떨어지지 않아도 최대한 균형 있게 배정됩니다.",
  },
  {
    slug: "friendship-type", title: "나는 친구들 사이에서 어떤 역할?", shortTitle: "우정 캐릭터", eyebrow: "5문항 · 2분", description: "마음의 정박지부터 분위기 점화장치까지, 내 우정 캐릭터를 발견해요.", category: "테스트", engine: "quiz", emoji: "🫂", accent: "#e84e86", plays: "이번 주 6.2K", fresh: true, tags: ["우정", "심리테스트", "친구"], instructions: baseInstructions.quiz, questions: friendshipQuiz, results: friendshipResults, longDescription: "친구의 고민, 여행, 다툼과 선물 같은 실제 관계의 순간을 통해 당신이 친구들 사이에서 자연스럽게 맡는 역할을 알아봅니다.",
  },
  {
    slug: "split-the-bill", title: "깔끔한 N빵 계산기", shortTitle: "N빵 계산기", eyebrow: "여행 정산", description: "총금액만 넣으면 1원 단위까지 깔끔하게 나눠드려요.", category: "여행", engine: "split", emoji: "🧾", accent: "#167d6f", plays: "이번 주 5.7K", tags: ["정산", "여행", "계산기"], instructions: baseInstructions.split, longDescription: "복잡한 가입 없이 총금액과 인원수만으로 빠르게 정산합니다. 나머지 금액이 생기면 일부 인원에게 1원씩 배분해 전체 합계가 정확히 맞도록 계산합니다.",
  },
  {
    slug: "room-picker", title: "여행 숙소 방 배정", shortTitle: "방 배정", eyebrow: "여행 필수", description: "창가방, 큰방, 소파 자리까지 카드 한 장으로 공정하게 정해요.", category: "여행", engine: "cards", emoji: "🛏️", accent: "#5d62d8", plays: "이번 주 5.1K", tags: ["여행", "숙소", "랜덤"], instructions: baseInstructions.cards, options: ["큰방", "창가방", "작은방", "소파 자리"], longDescription: "숙소에 도착하자마자 시작되는 방과 침대 눈치게임을 끝내는 도구입니다. 사람 이름을 넣고 카드를 뽑으면 준비한 역할이 무작위로 배정됩니다.",
  },
  {
    slug: "travel-missions", title: "여행 미션 카드", shortTitle: "여행 미션", eyebrow: "12개의 순간", description: "평범한 여행을 오래 기억하게 만드는 오늘의 작은 미션.", category: "여행", engine: "missions", emoji: "🎒", accent: "#ff784f", plays: "이번 주 4.9K", tags: ["여행", "미션", "사진"], instructions: baseInstructions.missions, missions: ["현지인에게 오늘의 메뉴 추천받기", "파란색이 들어간 장면 세 개 찍기", "일행 모두 같은 포즈로 단체사진 남기기", "지도 없이 15분 동안 골목 걷기", "여행지에서 처음 듣는 노래 저장하기", "가장 마음에 드는 엽서 한 장 고르기", "서로에게 5천 원 이하 기념품 골라주기", "오늘 최고의 장면을 한 문장으로 적기", "일행 중 한 명의 인생사진 찍어주기", "처음 보는 간식 하나 함께 도전하기", "해 질 무렵 10분 동안 휴대폰 넣어두기", "미래의 우리에게 짧은 영상 편지 남기기"], longDescription: "유명한 장소를 더 많이 보는 대신 여행의 감각을 선명하게 남기는 미션을 모았습니다. 뽑은 미션이 마음에 들지 않으면 한 번만 다시 뽑을 수 있습니다.",
  },
  {
    slug: "friend-balance", title: "찐친 난감 밸런스게임", shortTitle: "찐친 밸런스", eyebrow: "8라운드", description: "우정이 깊을수록 더 어려운 선택. 우리 얼마나 잘 맞을까?", category: "친구", engine: "balance", emoji: "🫠", accent: "#e2589a", plays: "이번 주 4.6K", tags: ["친구", "밸런스게임", "파티"], instructions: baseInstructions.balance, prompts: friendBalance, longDescription: "친한 사이일수록 웃기고 난감한 상황을 담은 밸런스게임입니다. 같은 화면을 돌려 보며 서로 다른 선택의 이유를 이야기해 보세요.",
  },
  {
    slug: "chaos-balance", title: "대환장 흑역사 밸런스게임", shortTitle: "대환장 밸런스", eyebrow: "10라운드 · 웃음 주의", description: "검색 기록 공개부터 재채기 사랑 고백까지. 둘 다 싫어도 하나는 골라야 해요.", category: "친구", engine: "balance", emoji: "🤡", accent: "#ff713d", plays: "신규", fresh: true, tags: ["유머", "밸런스게임", "흑역사"], instructions: baseInstructions.balance, prompts: chaosBalance, longDescription: "현실에서 일어나면 곤란하지만 상상만 하면 웃긴 상황을 모았습니다. 친구들과 선택 이유를 말하는 순간부터 진짜 게임이 시작됩니다.",
  },
  {
    slug: "spicy-relationship-balance", title: "어른의 연애 흑역사 밸런스", shortTitle: "연애 매운맛", eyebrow: "매운맛 · 수위 2/5", description: "썸, 질투, 공개 연애와 흑역사. 노골적이지 않아도 충분히 얼굴이 뜨거워져요.", category: "친구", engine: "balance", emoji: "🌶️", accent: "#d83c54", plays: "신규", fresh: true, tags: ["연애", "매운맛", "밸런스게임"], instructions: baseInstructions.balance, prompts: spicyRelationshipBalance, longDescription: "성인 친구와 커플이 가볍게 즐길 수 있는 연애 상황형 밸런스게임입니다. 노골적인 성적 내용 없이 썸, 질투, 흑역사처럼 대화가 달아오르는 소재만 담았습니다.",
  },
  {
    slug: "social-chaos-type", title: "내 안의 모임 빌런 테스트", shortTitle: "모임 빌런", eyebrow: "5문항 · 과몰입 금지", description: "인간 예능 자막인가, 선택적 투명 인간인가. 친구들이 보는 내 본캐를 찾아요.", category: "테스트", engine: "quiz", emoji: "🦹", accent: "#7047d7", plays: "신규", fresh: true, tags: ["유머", "심리테스트", "친구"], instructions: baseInstructions.quiz, questions: chaosQuiz, results: chaosResults, longDescription: "모임과 단톡방에서 무심코 드러나는 행동을 과장된 캐릭터로 풀어낸 유머 테스트입니다. 전문적인 심리 진단이 아니며 결과를 친구들과 비교할 때 가장 재미있습니다.",
  },
  {
    slug: "food-worldcup", title: "오늘 뭐 먹지 월드컵", shortTitle: "메뉴 월드컵", eyebrow: "16강", description: "떡볶이부터 초밥까지. 오늘 내 마음이 원하는 단 하나의 메뉴.", category: "월드컵", engine: "worldcup", emoji: "🍽️", accent: "#f4512c", plays: "이번 주 4.4K", tags: ["월드컵", "메뉴", "음식"], instructions: baseInstructions.worldcup, options: ["🍲 김치찌개", "🍣 초밥", "🍕 피자", "🍜 쌀국수", "🌮 타코", "🍗 치킨", "🍝 파스타", "🥘 마라탕", "🥩 고기구이", "🍛 카레", "🥟 만두", "🍔 버거", "🍱 돈가스", "🌯 샌드위치", "🍚 비빔밥", "🥞 떡볶이"], longDescription: "오늘 먹고 싶은 메뉴를 토너먼트 방식으로 좁혀주는 텍스트 월드컵입니다. 이미지 저작권 걱정 없이 음식 이름과 이모지만으로 빠르고 가볍게 진행합니다.",
  },
  {
    slug: "destination-worldcup", title: "다음 여행지 월드컵", shortTitle: "여행지 월드컵", eyebrow: "16강", description: "도시와 자연, 휴양과 모험 사이에서 다음 목적지를 발견해요.", category: "월드컵", engine: "worldcup", emoji: "🌍", accent: "#167bdb", plays: "이번 주 3.9K", tags: ["월드컵", "여행지", "여행"], instructions: baseInstructions.worldcup, options: ["🇯🇵 도쿄", "🇫🇷 파리", "🇮🇩 발리", "🇺🇸 뉴욕", "🇹🇭 방콕", "🇮🇹 로마", "🇻🇳 다낭", "🇪🇸 바르셀로나", "🇬🇧 런던", "🇨🇭 인터라켄", "🇵🇹 리스본", "🇦🇺 시드니", "🇨🇿 프라하", "🇸🇬 싱가포르", "🇨🇦 밴프", "🇹🇷 이스탄불"], longDescription: "다음 여행지를 고르기 어려울 때 도시별 분위기를 떠올리며 선택하는 16강 월드컵입니다. 우승한 여행지는 저장하고 실제 예산과 계절을 확인해 보세요.",
  },
  {
    slug: "presentation-order", title: "발표 순서 정하기", shortTitle: "발표 순서", eyebrow: "눈치게임 종료", description: "먼저 할까, 나중에 할까. 공정하게 순서를 섞어요.", category: "결정", engine: "order", emoji: "🎤", accent: "#5e57d9", plays: "이번 주 3.7K", tags: ["순서", "발표", "학교"], instructions: baseInstructions.order, longDescription: "발표, 게임 턴, 청소 담당 순서처럼 누구도 먼저 나서고 싶지 않은 순간에 쓰는 공정한 순서 결정 도구입니다.",
  },
  {
    slug: "driver-picker", title: "오늘의 운전 담당 뽑기", shortTitle: "운전 담당", eyebrow: "안전 여행", description: "운전 가능한 사람만 넣고 오늘의 담당 순서를 정해요.", category: "여행", engine: "order", emoji: "🚙", accent: "#268b65", plays: "이번 주 3.4K", tags: ["여행", "운전", "순서"], instructions: baseInstructions.order, longDescription: "여러 명이 번갈아 운전하는 여행에서 담당 순서를 공정하게 정합니다. 실제 운전은 면허, 보험 적용 여부, 컨디션을 반드시 먼저 확인한 뒤 결정하세요.",
  },
  {
    slug: "coffee-card", title: "커피 살 사람 카드", shortTitle: "커피 카드", eyebrow: "가벼운 한 판", description: "회의 끝, 산책 중, 여행 아침. 오늘 커피는 누가 살까요?", category: "친구", engine: "cards", emoji: "☕", accent: "#a36a45", plays: "이번 주 3.1K", tags: ["친구", "커피", "랜덤"], instructions: baseInstructions.cards, options: ["오늘의 커피 담당"], longDescription: "친구나 동료와 가볍게 커피 담당을 정하는 랜덤 카드입니다. 부담 없는 범위에서 재미로만 사용하고 결과를 강요하지 마세요.",
  },
  {
    slug: "photo-duty", title: "오늘의 사진 담당", shortTitle: "사진 담당", eyebrow: "인생사진 보장", description: "이번 장소에서 모두의 인생사진을 책임질 한 명을 뽑아요.", category: "여행", engine: "cards", emoji: "📷", accent: "#e96262", plays: "이번 주 2.9K", tags: ["여행", "사진", "담당"], instructions: baseInstructions.cards, options: ["오늘의 포토그래퍼"], longDescription: "늘 사진을 찍는 사람만 찍게 되는 문제를 해결합니다. 장소마다 한 명씩 뽑아 모두가 골고루 사진에 남을 수 있게 해보세요.",
  },
  {
    slug: "late-night-menu", title: "야식 결정 룰렛", shortTitle: "야식 룰렛", eyebrow: "밤의 결정", description: "치킨인가 라면인가. 배고픈 밤에는 룰렛이 답합니다.", category: "결정", engine: "wheel", emoji: "🌙", accent: "#6853bc", plays: "이번 주 2.8K", tags: ["야식", "메뉴", "룰렛"], instructions: baseInstructions.wheel, options: ["치킨", "떡볶이", "라면", "피자", "족발", "참기"], longDescription: "배달앱을 끝없이 스크롤하는 시간을 줄여주는 야식 전용 룰렛입니다. 원하는 후보를 직접 바꾸고 딱 한 번만 돌려보세요.",
  },
  {
    slug: "date-worldcup", title: "주말 데이트 월드컵", shortTitle: "데이트 월드컵", eyebrow: "8강", description: "전시, 산책, 맛집, 집콕. 이번 주말의 완벽한 데이트를 골라요.", category: "월드컵", engine: "worldcup", emoji: "💞", accent: "#ed5f87", plays: "이번 주 2.6K", tags: ["데이트", "커플", "월드컵"], instructions: baseInstructions.worldcup, options: ["🖼️ 전시회", "🌳 공원 산책", "🍝 새 맛집", "🎬 영화관", "🏠 집콕 요리", "🚆 근교 당일치기", "🎳 액티비티", "☕ 카페 투어"], longDescription: "둘 다 괜찮다고만 할 때 토너먼트로 이번 주말 데이트를 정합니다. 우승 결과를 공유하고 바로 일정에 넣어보세요.",
  },
  {
    slug: "workshop-teams", title: "워크숍 팀 메이커", shortTitle: "워크숍 팀", eyebrow: "최대 24명", description: "부서와 친분 눈치 없이 빠르고 균형 있게 팀을 만들어요.", category: "결정", engine: "teams", emoji: "🧩", accent: "#338a7e", plays: "이번 주 2.4K", tags: ["워크숍", "팀", "회사"], instructions: baseInstructions.teams, longDescription: "회사 워크숍과 학교 활동처럼 참가자가 많은 상황을 위한 랜덤 팀 배정 도구입니다. 결과는 한 번에 복사해 공지할 수 있습니다.",
  },
  {
    slug: "first-impression", title: "나의 첫인상 온도 테스트", shortTitle: "첫인상 온도", eyebrow: "친구에게 물어보기", description: "차가워 보이지만 따뜻한 사람? 첫인상과 실제 모습의 간극을 확인해요.", category: "테스트", engine: "quiz", emoji: "🌡️", accent: "#ef6b4d", plays: "이번 주 2.2K", tags: ["심리테스트", "첫인상", "성향"], instructions: baseInstructions.quiz, questions: friendshipQuiz, results: friendshipResults, longDescription: "사람들과 관계를 맺는 방식으로 첫인상 뒤에 숨은 당신의 우정 캐릭터를 알아봅니다. 결과는 재미를 위한 성향 콘텐츠이며 전문적인 심리 진단이 아닙니다.",
  },
  {
    slug: "packing-order", title: "여행 준비 담당 배정", shortTitle: "준비 담당", eyebrow: "출발 전 체크", description: "예약 확인, 상비약, 간식, 길찾기. 담당을 랜덤으로 나눠요.", category: "여행", engine: "cards", emoji: "✅", accent: "#389a65", plays: "이번 주 2.0K", tags: ["여행", "준비", "담당"], instructions: baseInstructions.cards, options: ["예약 확인", "상비약", "간식", "길찾기"], longDescription: "여행 준비를 한 사람에게 몰아주지 않도록 참가자마다 준비 업무를 하나씩 공정하게 배정합니다. 카드를 모두 뒤집으면 전체 배정 결과를 한 번에 공유할 수 있습니다.",
  },
  {
    slug: "weekend-wheel", title: "이번 주말 뭐 하지?", shortTitle: "주말 룰렛", eyebrow: "무료한 날", description: "산책, 전시, 드라이브, 낮잠까지. 오늘의 시간을 돌려봐요.", category: "결정", engine: "wheel", emoji: "🌤️", accent: "#ec9b24", plays: "이번 주 1.9K", tags: ["주말", "룰렛", "데이트"], instructions: baseInstructions.wheel, options: ["동네 산책", "새 카페", "전시 보기", "근교 드라이브", "집에서 요리", "낮잠과 영화"], longDescription: "특별한 계획이 없는 주말, 하고 싶은 후보를 넣고 즉흥적인 하루를 시작하는 룰렛입니다.",
  },
  {
    slug: "conversation-cards", title: "우리 사이 질문 카드", shortTitle: "질문 카드", eyebrow: "12개의 대화", description: "오래 알아도 아직 모르는 이야기. 한 장씩 천천히 열어보세요.", category: "친구", engine: "missions", emoji: "💬", accent: "#7b61d1", plays: "이번 주 1.8K", tags: ["친구", "커플", "질문"], instructions: baseInstructions.missions, missions: ["요즘 가장 자주 떠올리는 장면은?", "우리가 처음 만났을 때 내 첫인상은?", "지금 당장 한 달을 살고 싶은 도시는?", "최근 스스로 대견했던 순간은?", "나에게 꼭 추천하고 싶은 한 가지는?", "10년 뒤 우리에게 남아 있을 것 같은 습관은?", "최근 마음을 바꾼 작은 계기는?", "어릴 때 가장 좋아했던 놀이는?", "하루 동안 서로의 재능을 바꾼다면?", "지금 가장 배우고 싶은 것은?", "올해 함께 만들고 싶은 기억은?", "고맙지만 아직 말하지 못한 것은?"], longDescription: "친구, 연인, 가족과 화면을 내려놓고 조금 더 깊은 대화를 시작할 수 있는 질문을 모았습니다.",
  },
  {
    slug: "cleaning-order", title: "숙소 정리 순서 뽑기", shortTitle: "정리 순서", eyebrow: "여행 마무리", description: "설거지, 분리수거, 짐 점검. 마지막까지 공정하게.", category: "여행", engine: "order", emoji: "🧹", accent: "#2b8d89", plays: "이번 주 1.6K", tags: ["여행", "정리", "순서"], instructions: baseInstructions.order, longDescription: "숙소 체크아웃 전 필요한 일을 참가자 순서대로 나눌 수 있습니다. 특정 업무는 각자 상황에 맞게 함께 정하세요.",
  },
];

export const categories: { label: GameCategory | "전체"; emoji: string }[] = [
  { label: "전체", emoji: "✦" },
  { label: "결정", emoji: "🎯" },
  { label: "여행", emoji: "🧳" },
  { label: "친구", emoji: "🫶" },
  { label: "테스트", emoji: "🪞" },
  { label: "월드컵", emoji: "🏆" },
];

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}

export function getRelatedGames(game: Game, limit = 4) {
  return games
    .filter((candidate) => candidate.slug !== game.slug)
    .sort((a, b) => {
      const aScore = Number(a.category === game.category) * 2 + a.tags.filter((tag) => game.tags.includes(tag)).length;
      const bScore = Number(b.category === game.category) * 2 + b.tags.filter((tag) => game.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}
