// GPT 스타일 타로 해석 데이터

const SIMPLE_TAROT_DATA = {
  0: { // The Fool
    core_keywords: ["새로운 걸 시도해요", "자유를 사랑해요", "직관을 따라요", "모험을 즐겨요"],
    personality: [
      "뭐든 일단 시작하는 타입",
      "틀에 박힌 걸 싫어하고 자유로운 영혼",
      "호기심이 많고 새로운 경험을 즐김",
      "계획보다 직감을 따라 움직임"
    ],
    one_liner: "새로운 길을 두려워하지 않는 모험가",
    real_life: {
      strength: "변화를 즐기고 새로운 기회를 잘 잡음",
      challenge: "계획 없이 움직여서 실수할 수 있음",
      advice: "모험심은 좋지만 최소한의 준비는 하세요"
    },
    work_style: "틀 없는 환경, 자유직, 창업",
    relationship_style: "새로운 만남에 열려있고 관계도 자유롭게",
    life_lesson: "자유와 책임의 균형 찾기"
  },

  1: { // The Magician
    core_keywords: ["생각을 실행해요", "뭐든 만들어내요", "말을 잘해요", "목표를 이뤄요"],
    personality: [
      "생각을 바로 행동으로 옮기는 타입",
      "없던 걸 만들어내는 사람",
      "말, 기획, 설득 능력이 강함",
      "스스로 길을 여는 개척자 성향"
    ],
    one_liner: "아이디어를 현실로 바꾸는 사람",
    real_life: {
      strength: "필요한 걸 스스로 만들어낸다",
      challenge: "너무 많은 프로젝트를 동시에 시작할 수 있음",
      advice: "집중력을 유지하면 뭐든 이룰 수 있어요"
    },
    work_style: "기획, 마케팅, 영업, 창업가",
    relationship_style: "주도적이고 관계를 발전시키는 능력이 있음",
    life_lesson: "기술과 진심의 균형"
  },

  2: { // The High Priestess
    core_keywords: ["직관이 강해요", "속마음이 깊어요", "신비로워요", "다 꿰뚫어 봐요"],
    personality: [
      "말없이 분위기를 읽는 사람",
      "겉으로 드러내지 않지만 다 알고 있음",
      "혼자만의 시간을 중요하게 생각함",
      "직감이 정확하고 속을 잘 봄"
    ],
    one_liner: "말하지 않아도 다 아는 사람",
    real_life: {
      strength: "사람의 본질을 꿰뚫어 봄",
      challenge: "너무 속마음을 안 보여줘서 오해받을 수 있음",
      advice: "가끔은 당신의 생각을 표현해보세요"
    },
    work_style: "상담, 심리, 연구, 분석",
    relationship_style: "깊은 이해와 연결을 중시함",
    life_lesson: "침묵과 표현의 균형"
  },

  3: { // The Empress
    core_keywords: ["풍요롭게 만들어요", "사람을 키워요", "뭐든 창조해요", "사랑을 나눠요"],
    personality: [
      "사람을 편하게 만드는 따뜻한 성격",
      "뭔가를 키우고 돌보는 걸 좋아함",
      "감각적이고 아름다운 것을 추구",
      "주변 사람들을 챙기는 타입"
    ],
    one_liner: "사랑으로 무언가를 키워내는 사람",
    real_life: {
      strength: "사람들이 당신 곁에서 성장함",
      challenge: "너무 챙겨줘서 상대가 의존할 수 있음",
      advice: "때로는 놓아주는 것도 사랑입니다"
    },
    work_style: "교육, 요리, 디자인, 뷰티",
    relationship_style: "무조건적으로 사랑하고 돌봄",
    life_lesson: "양육과 자립의 균형"
  },

  4: { // The Emperor
    core_keywords: ["리더 역할 해요", "체계를 만들어요", "책임을 져요", "안정감을 줘요"],
    personality: [
      "질서와 규칙을 중요하게 생각함",
      "책임감이 강하고 믿음직함",
      "계획적이고 체계적으로 일 처리",
      "리더 역할을 자연스럽게 맡음"
    ],
    one_liner: "든든한 기둥이 되어주는 사람",
    real_life: {
      strength: "어떤 상황에서도 안정감을 줌",
      challenge: "너무 통제하려 해서 답답할 수 있음",
      advice: "가끔은 계획에서 벗어나도 괜찮아요"
    },
    work_style: "관리직, 경영, 공무원, 조직",
    relationship_style: "안정적이고 보호하는 역할",
    life_lesson: "통제와 자유의 균형"
  },

  5: { // The Hierophant
    core_keywords: ["전통을 지켜요", "가르침을 줘요", "신념이 확고해요", "도덕적이에요"],
    personality: [
      "원칙과 신념이 확고함",
      "경험을 나누고 가르치는 걸 좋아함",
      "검증된 방법을 신뢰함",
      "정통적이고 진지한 태도"
    ],
    one_liner: "지혜를 전하는 선생님",
    real_life: {
      strength: "사람들에게 올바른 길을 안내함",
      challenge: "새로운 방식을 받아들이기 어려울 수 있음",
      advice: "전통도 좋지만 변화도 필요해요"
    },
    work_style: "교육, 종교, 법률, 상담",
    relationship_style: "진지하고 헌신적인 관계 추구",
    life_lesson: "전통과 혁신의 균형"
  },

  6: { // The Lovers
    core_keywords: ["선택을 해요", "사랑을 중시해요", "관계가 중요해요", "가치관을 따라요"],
    personality: [
      "관계를 중요하게 생각하는 사람",
      "선택의 순간마다 가치관을 따름",
      "조화와 균형을 추구",
      "사랑하는 것에 진심"
    ],
    one_liner: "진정한 연결을 찾는 사람",
    real_life: {
      strength: "깊고 의미있는 관계를 만듦",
      challenge: "선택하기 어려워하고 우유부단할 수 있음",
      advice: "당신의 마음이 이끄는 곳이 정답입니다"
    },
    work_style: "상담, 중재, 예술, 파트너십",
    relationship_style: "깊은 정서적 유대를 중시",
    life_lesson: "선택과 책임"
  },

  7: { // The Chariot
    core_keywords: ["의지가 강해요", "승리를 향해 가요", "집중력이 대단해요", "앞으로 나아가요"],
    personality: [
      "한번 마음먹으면 끝까지 해냄",
      "목표를 향해 거침없이 나아감",
      "어려움에도 굴하지 않는 강인함",
      "경쟁에서 이기는 걸 좋아함"
    ],
    one_liner: "목표를 반드시 이루는 사람",
    real_life: {
      strength: "어떤 장애물도 극복함",
      challenge: "주변을 안 보고 달려서 관계가 소홀할 수 있음",
      advice: "가끔은 멈춰서 방향을 확인하세요"
    },
    work_style: "영업, 스포츠, 경쟁 분야",
    relationship_style: "열정적이지만 자기 일에 집중할 때가 많음",
    life_lesson: "집중과 균형"
  },

  8: { // Strength
    core_keywords: ["용기가 있어요", "인내심이 강해요", "온화해요", "내면이 강해요"],
    personality: [
      "부드럽지만 강한 사람",
      "화내지 않고 차분하게 해결함",
      "어려운 상황도 인내로 이겨냄",
      "약한 사람을 배려하고 돌봄"
    ],
    one_liner: "온화함으로 세상을 이기는 사람",
    real_life: {
      strength: "어떤 상황에서도 평정심 유지",
      challenge: "너무 참아서 스트레스 쌓일 수 있음",
      advice: "가끔은 당신의 분노도 표현하세요"
    },
    work_style: "치료, 동물, 사회복지, 상담",
    relationship_style: "포용력 있고 이해심 많음",
    life_lesson: "힘과 온유함의 조화"
  },

  9: { // The Hermit
    core_keywords: ["성찰을 해요", "고독을 즐겨요", "깊이 생각해요", "지혜로워요"],
    personality: [
      "혼자만의 시간이 꼭 필요한 사람",
      "깊게 생각하고 본질을 탐구함",
      "겉치레보다 진실을 중요하게 여김",
      "조용하지만 깊은 통찰력 있음"
    ],
    one_liner: "홀로 진리를 찾는 구도자",
    real_life: {
      strength: "깊은 사색으로 지혜를 얻음",
      challenge: "너무 고립되어 외로울 수 있음",
      advice: "가끔은 당신의 지혜를 나눠주세요"
    },
    work_style: "연구, 집필, 철학, 명상",
    relationship_style: "소수와 깊은 관계 선호",
    life_lesson: "고독과 연결의 균형"
  },

  10: { // Wheel of Fortune
    core_keywords: ["변화를 경험해요", "운명을 믿어요", "흐름을 타요", "기회를 잡아요"],
    personality: [
      "인생에 변화가 많은 편",
      "운이 좋은 편이고 기회를 잘 잡음",
      "흐름을 타는 감각이 있음",
      "변화를 두려워하지 않음"
    ],
    one_liner: "삶의 흐름을 타는 사람",
    real_life: {
      strength: "타이밍을 잘 잡고 적응력이 뛰어남",
      challenge: "너무 운에만 맡기면 주도성이 약해질 수 있음",
      advice: "운도 좋지만 준비된 자에게 온다는 걸 기억하세요"
    },
    work_style: "트렌드, 투자, 국제 업무",
    relationship_style: "운명적 만남을 경험함",
    life_lesson: "수용과 행동의 균형"
  },

  11: { // Justice
    core_keywords: ["공정해요", "진실을 중시해요", "균형을 잡아요", "책임감이 강해요"],
    personality: [
      "공평하고 정의로운 성격",
      "잘잘못을 명확히 따짐",
      "거짓말이나 부정을 못 참음",
      "책임감 있고 원칙적"
    ],
    one_liner: "공정함을 지키는 사람",
    real_life: {
      strength: "신뢰받고 올바른 판단을 함",
      challenge: "너무 냉정해 보일 수 있음",
      advice: "정의도 중요하지만 따뜻함도 필요해요"
    },
    work_style: "법률, 회계, 감사, 중재",
    relationship_style: "공정하고 균형 잡힌 관계 추구",
    life_lesson: "정의와 자비의 균형"
  },

  12: { // The Hanged Man
    core_keywords: ["멈춰서 봐요", "다르게 생각해요", "기꺼이 희생해요", "깨달음을 얻어요"],
    personality: [
      "남들과 다른 관점으로 세상을 봄",
      "급하지 않고 기다릴 줄 앎",
      "때로는 포기하는 것도 선택",
      "역발상의 아이디어가 많음"
    ],
    one_liner: "거꾸로 보면 진실이 보이는 사람",
    real_life: {
      strength: "다른 사람이 못 보는 걸 봄",
      challenge: "너무 기다리다 기회를 놓칠 수 있음",
      advice: "때로는 행동도 필요합니다"
    },
    work_style: "예술, 철학, 상담, 명상",
    relationship_style: "조건 없는 사랑과 희생",
    life_lesson: "기다림과 행동의 타이밍"
  },

  13: { // Death
    core_keywords: ["큰 변화를 겪어요", "끝을 받아들여요", "새로 시작해요", "완전히 바뀌어요"],
    personality: [
      "인생의 변곡점이 많은 편",
      "과거를 정리하고 새롭게 시작하는 용기",
      "변화를 두려워하지 않음",
      "끝은 새로운 시작이라 믿음"
    ],
    one_liner: "끝을 두려워하지 않는 변화의 달인",
    real_life: {
      strength: "과감하게 정리하고 새 출발함",
      challenge: "변화가 너무 잦아 불안정할 수 있음",
      advice: "때로는 유지하는 것도 용기입니다"
    },
    work_style: "컨설팅, 위기 관리, 재건",
    relationship_style: "깊은 변화와 성장을 함께함",
    life_lesson: "놓아줌과 받아들임"
  },

  14: { // Temperance
    core_keywords: ["균형을 잡아요", "조화를 만들어요", "절제할 줄 알아요", "치유해요"],
    personality: [
      "극단을 피하고 중도를 지킴",
      "차분하고 안정적인 성격",
      "사람들 사이를 조율하는 능력",
      "급하지 않고 천천히 나아감"
    ],
    one_liner: "모든 것의 균형을 맞추는 사람",
    real_life: {
      strength: "어떤 상황에서도 균형감 유지",
      challenge: "너무 중립적이어서 우유부단해 보일 수 있음",
      advice: "가끔은 한쪽 편을 들어도 괜찮아요"
    },
    work_style: "치료, 조정, 중재, 힐링",
    relationship_style: "조화롭고 평화로운 관계",
    life_lesson: "조화 속에서 자신을 잃지 않기"
  },

  15: { // The Devil
    core_keywords: ["욕망에 솔직해요", "깊이 빠져요", "열정적이에요", "자유를 선택해요"],
    personality: [
      "욕망에 솔직한 편",
      "열정적이고 강렬한 성격",
      "뭔가에 빠지면 깊게 빠짐",
      "자신의 어두운 면도 인정함"
    ],
    one_liner: "욕망을 인정하고 자유를 선택하는 사람",
    real_life: {
      strength: "열정과 집중력이 대단함",
      challenge: "중독이나 집착에 빠질 수 있음",
      advice: "당신을 묶는 건 당신 자신입니다"
    },
    work_style: "금융, 심리, 예술, 엔터",
    relationship_style: "강렬하고 깊은 관계",
    life_lesson: "자유와 책임"
  },

  16: { // The Tower
    core_keywords: ["충격을 경험해요", "깨달아요", "다시 세워요", "진실만 남겨요"],
    personality: [
      "인생에 큰 사건이 있었던 사람",
      "위기를 통해 성장함",
      "거짓은 무너뜨리고 진실만 남김",
      "파괴 후 재건하는 능력"
    ],
    one_liner: "무너뜨리고 다시 세우는 사람",
    real_life: {
      strength: "위기 상황에서 강해짐",
      challenge: "변화가 너무 급격할 수 있음",
      advice: "무너진 곳에 더 단단히 세우세요"
    },
    work_style: "재건, 혁신, 위기 관리",
    relationship_style: "진실한 관계만 남김",
    life_lesson: "파괴와 재건"
  },

  17: { // The Star
    core_keywords: ["희망을 줘요", "치유해요", "영감을 받아요", "꿈을 믿어요"],
    personality: [
      "어려운 상황에서도 희망을 잃지 않음",
      "사람들에게 영감을 주는 존재",
      "순수하고 맑은 에너지",
      "꿈을 믿고 따라감"
    ],
    one_liner: "어둠 속 빛나는 별",
    real_life: {
      strength: "주변에 희망과 위로를 줌",
      challenge: "너무 이상적이어서 실망할 수 있음",
      advice: "희망을 잃지 말되 현실도 보세요"
    },
    work_style: "치유, 상담, 예술, 영감",
    relationship_style: "순수하고 이상적인 사랑",
    life_lesson: "희망과 현실의 균형"
  },

  18: { // The Moon
    core_keywords: ["직관이 예민해요", "무의식을 느껴요", "불안할 수 있어요", "상상력이 풍부해요"],
    personality: [
      "직감이 매우 발달함",
      "꿈이나 상징에 민감함",
      "불안하거나 예민한 편",
      "상상력이 풍부함"
    ],
    one_liner: "보이지 않는 것을 느끼는 사람",
    real_life: {
      strength: "직관으로 위험을 미리 알아챔",
      challenge: "불안과 환상에 빠질 수 있음",
      advice: "직감을 믿되 확인도 하세요"
    },
    work_style: "예술, 심리, 영성, 꿈 해석",
    relationship_style: "깊은 감정적 연결",
    life_lesson: "직관과 현실의 균형"
  },

  19: { // The Sun
    core_keywords: ["기쁨을 줘요", "성공해요", "활력이 넘쳐요", "명확해요"],
    personality: [
      "밝고 긍정적인 에너지",
      "주변을 즐겁게 만드는 사람",
      "솔직하고 투명한 성격",
      "자신감 있고 당당함"
    ],
    one_liner: "태양처럼 빛나는 사람",
    real_life: {
      strength: "어디서나 빛이 나고 인기가 많음",
      challenge: "너무 낙관적이어서 위험을 못 볼 수 있음",
      advice: "빛도 좋지만 그림자도 인정하세요"
    },
    work_style: "엔터, 교육, 리더십, 영업",
    relationship_style: "밝고 건강한 관계",
    life_lesson: "빛과 그림자의 통합"
  },

  20: { // Judgement
    core_keywords: ["깨어나요", "부름을 느껴요", "용서해요", "다시 태어나요"],
    personality: [
      "인생의 전환점을 경험한 사람",
      "과거를 용서하고 앞으로 나아감",
      "더 높은 부름을 느낌",
      "깨어남의 순간들이 있었음"
    ],
    one_liner: "깨어나 새롭게 태어나는 사람",
    real_life: {
      strength: "과거를 정리하고 새 출발하는 용기",
      challenge: "과거에 대한 후회가 많을 수 있음",
      advice: "용서하고 놓아주세요. 새로운 당신이 기다립니다"
    },
    work_style: "상담, 치유, 영성, 코칭",
    relationship_style: "깊은 용서와 재결합",
    life_lesson: "용서와 새로운 시작"
  },

  21: { // The World
    core_keywords: ["완성해요", "성취를 이뤄요", "통합해요", "새로 시작해요"],
    personality: [
      "인생의 큰 성취를 이룬 사람",
      "여러 경험을 통합하는 지혜",
      "세계적 관점과 넓은 시야",
      "한 단계를 마무리하는 능력"
    ],
    one_liner: "세상을 품은 완성된 사람",
    real_life: {
      strength: "큰 그림을 보고 성취를 이룸",
      challenge: "다음 단계로 가는 게 두려울 수 있음",
      advice: "축하합니다! 이제 새로운 여정이 시작됩니다"
    },
    work_style: "국제 업무, 통합, 완성",
    relationship_style: "성숙하고 완전한 관계",
    life_lesson: "완성은 새로운 시작"
  }
};

// 간단한 데이터 가져오기
function getSimpleCardData(cardNumber) {
  return SIMPLE_TAROT_DATA[cardNumber] || null;
}
