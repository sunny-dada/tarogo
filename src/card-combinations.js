// 타로 카드 조합 해석 시스템

/**
 * 카드를 여정의 단계별로 분류
 */
const CARD_GROUPS = {
  BEGINNING: [0, 1, 2], // 시작과 잠재력
  GROWTH: [3, 4, 5, 6], // 성장과 구조
  ACTION: [7, 8, 9], // 행동과 의지
  TRANSFORMATION: [10, 11, 12, 13], // 전환과 변화
  BALANCE: [14, 15, 16], // 균형과 재건
  COMPLETION: [17, 18, 19, 20, 21] // 완성과 계시
};

/**
 * 카드의 주요 에너지 타입
 */
const CARD_ENERGY = {
  ACTIVE: [1, 4, 7, 8, 16], // 능동적, 외향적
  RECEPTIVE: [2, 5, 9, 12, 14], // 수용적, 내향적
  CREATIVE: [0, 3, 6, 17, 19], // 창조적, 낙관적
  TRANSFORMATIVE: [10, 11, 13, 15, 20, 21], // 변화, 전환
  BALANCED: [14, 11, 6] // 균형, 조화
};

/**
 * 카드의 주제
 */
const CARD_THEMES = {
  0: 'new_beginnings',
  1: 'manifestation',
  2: 'intuition',
  3: 'creation',
  4: 'structure',
  5: 'tradition',
  6: 'choices',
  7: 'willpower',
  8: 'inner_strength',
  9: 'introspection',
  10: 'change',
  11: 'balance',
  12: 'surrender',
  13: 'transformation',
  14: 'harmony',
  15: 'shadow',
  16: 'breakthrough',
  17: 'hope',
  18: 'mystery',
  19: 'clarity',
  20: 'awakening',
  21: 'completion'
};

/**
 * 카드 그룹 찾기
 */
function findCardGroup(cardNumber) {
  for (const [group, cards] of Object.entries(CARD_GROUPS)) {
    if (cards.includes(cardNumber)) return group;
  }
  return null;
}

/**
 * 카드 에너지 타입 찾기
 */
function findCardEnergy(cardNumber) {
  const energies = [];
  for (const [energy, cards] of Object.entries(CARD_ENERGY)) {
    if (cards.includes(cardNumber)) energies.push(energy);
  }
  return energies;
}

/**
 * 두 카드의 관계 분석
 */
function analyzeCardRelationship(card1, card2) {
  const diff = Math.abs(card1 - card2);

  // 같은 카드
  if (card1 === card2) {
    return 'same';
  }

  // 연속된 카드
  if (diff === 1) {
    return 'sequential';
  }

  // 보완 관계 (합이 21)
  if (card1 + card2 === 21) {
    return 'complementary';
  }

  // 대칭 관계
  if (diff === 11) {
    return 'mirror';
  }

  // 같은 그룹
  const group1 = findCardGroup(card1);
  const group2 = findCardGroup(card2);
  if (group1 === group2) {
    return 'same_group';
  }

  // 인접 그룹
  const groupOrder = ['BEGINNING', 'GROWTH', 'ACTION', 'TRANSFORMATION', 'BALANCE', 'COMPLETION'];
  const index1 = groupOrder.indexOf(group1);
  const index2 = groupOrder.indexOf(group2);
  if (Math.abs(index1 - index2) === 1) {
    return 'adjacent_group';
  }

  return 'general';
}

/**
 * 심층 조합 해석 생성
 */
function getDeepCombinationInterpretation(universalCard, birthdayCard) {
  const universal = getCardData(universalCard);
  const birthday = getCardData(birthdayCard);
  const relationship = analyzeCardRelationship(universalCard, birthdayCard);

  let interpretation = {
    title: '',
    message: '',
    advice: '',
    focus: []
  };

  switch (relationship) {
    case 'same':
      interpretation = getSameCardInterpretation(universalCard);
      break;

    case 'sequential':
      interpretation = getSequentialInterpretation(universalCard, birthdayCard);
      break;

    case 'complementary':
      interpretation = getComplementaryInterpretation(universalCard, birthdayCard);
      break;

    case 'mirror':
      interpretation = getMirrorInterpretation(universalCard, birthdayCard);
      break;

    case 'same_group':
      interpretation = getSameGroupInterpretation(universalCard, birthdayCard);
      break;

    default:
      interpretation = getGeneralInterpretation(universalCard, birthdayCard);
  }

  return interpretation;
}

/**
 * 같은 카드일 때
 */
function getSameCardInterpretation(cardNumber) {
  const card = getCardData(cardNumber);

  return {
    title: '🌟 본질의 강화',
    message: `올해는 당신의 유니버셜 카드 "${card.name_ko}"가 연도 카드로도 나타났습니다.
    이는 당신의 본질적인 에너지가 올해 특히 강하게 작용한다는 의미입니다.
    평생의 테마가 올해 절정을 이루는 특별한 해입니다. 당신이 누구인지, 무엇을 위해 태어났는지가
    더욱 명확해지는 시기입니다.`,
    advice: `"${card.name_ko}"의 에너지를 최대한 활용하세요. 당신의 강점인 ${card.strengths[0]}과(와)
    ${card.strengths[1]}을(를) 더욱 발전시키는 데 집중하되, ${card.challenges[0]} 같은 도전에도
    주의를 기울이세요. 이 해는 당신의 본질을 완전히 받아들이고 표현하는 해입니다.`,
    focus: [
      `${card.keywords[0]} 에너지를 최대한 활용`,
      '자신의 본질에 충실하기',
      `${card.challenges[0]} 극복에 집중`,
      '장기적 성장의 기회'
    ]
  };
}

/**
 * 연속된 카드일 때
 */
function getSequentialInterpretation(card1, card2) {
  const first = Math.min(card1, card2);
  const second = Math.max(card1, card2);
  const firstCard = getCardData(first);
  const secondCard = getCardData(second);

  const isProgressing = card2 > card1;

  return {
    title: isProgressing ? '📈 성장의 여정' : '🔄 재확인의 시기',
    message: isProgressing
      ? `"${firstCard.name_ko}"에서 "${secondCard.name_ko}"로 나아가는 자연스러운 성장의 흐름입니다.
      당신의 본질(${firstCard.name_ko})이 올해는 한 단계 진화하여 ${secondCard.name_ko}의 에너지를 경험하게 됩니다.
      이는 여정의 다음 단계로 나아갈 준비가 되었다는 신호입니다.`
      : `올해는 "${secondCard.name_ko}"에서 "${firstCard.name_ko}"로 돌아가는 시기입니다.
      이는 후퇴가 아니라, 더 나은 도약을 위해 기본을 재확인하는 과정입니다.
      당신의 본질로 돌아가 더 단단한 기반을 다지세요.`,
    advice: isProgressing
      ? `${firstCard.name_ko}의 강점인 "${firstCard.strengths[0]}"을(를) 발판 삼아
      ${secondCard.name_ko}의 "${secondCard.keywords[0]}" 에너지를 개발하세요.
      자연스러운 성장을 받아들이되, 너무 서두르지 마세요.`
      : `${firstCard.name_ko}의 핵심 교훈을 다시 되새기세요.
      기본으로 돌아가는 것이 때로는 가장 빠른 성장의 길입니다.`,
    focus: isProgressing
      ? ['점진적 성장', '새로운 단계 준비', '기본 유지하며 확장', '인내심']
      : ['기본 재확인', '견고한 기반 다지기', '과거의 교훈', '재정비']
  };
}

/**
 * 보완 관계일 때 (합이 21)
 */
function getComplementaryInterpretation(card1, card2) {
  const cardA = getCardData(card1);
  const cardB = getCardData(card2);

  return {
    title: '⚖️ 완벽한 균형',
    message: `"${cardA.name_ko}"(${card1})와 "${cardB.name_ko}"(${card2})는 합이 21로,
    완성을 상징하는 특별한 조합입니다. 이 두 카드는 서로 보완하며 완전함을 만들어냅니다.
    당신의 본질과 올해의 테마가 함께 완벽한 균형을 이루는 해입니다.
    두 에너지를 모두 통합할 때 큰 성취가 가능합니다.`,
    advice: `${cardA.name_ko}의 "${cardA.keywords[0]}"와 ${cardB.name_ko}의 "${cardB.keywords[0]}"을(를)
    함께 활용하세요. 한쪽에만 치우치지 말고 두 에너지의 균형을 찾는 것이 핵심입니다.
    이 조합은 통합과 완성의 기회를 제공합니다.`,
    focus: [
      '두 에너지의 통합',
      '균형 잡힌 접근',
      '완성을 향한 여정',
      `${cardA.keywords[0]}과 ${cardB.keywords[0]}의 조화`
    ]
  };
}

/**
 * 대칭 관계일 때 (차이가 11)
 */
function getMirrorInterpretation(card1, card2) {
  const cardA = getCardData(card1);
  const cardB = getCardData(card2);

  return {
    title: '🪞 거울 효과',
    message: `"${cardA.name_ko}"와 "${cardB.name_ko}"는 타로 덱의 정중앙(11)을 기준으로
    대칭을 이루는 특별한 관계입니다. 이는 당신의 본질이 올해 거울처럼 반사되어
    새로운 관점을 제공한다는 의미입니다. 자신을 다른 각도에서 바라보게 되는 해입니다.`,
    advice: `${cardA.name_ko}와 ${cardB.name_ko}가 어떻게 서로를 비추는지 관찰하세요.
    한쪽은 당신의 빛을, 다른 한쪽은 그림자를 보여줄 수 있습니다.
    양쪽 모두에서 배울 점이 있습니다.`,
    focus: [
      '다양한 관점',
      '자기 성찰',
      '빛과 그림자 통합',
      '새로운 자아 발견'
    ]
  };
}

/**
 * 같은 그룹일 때
 */
function getSameGroupInterpretation(card1, card2) {
  const group = findCardGroup(card1);
  const cardA = getCardData(card1);
  const cardB = getCardData(card2);

  const groupNames = {
    BEGINNING: '시작과 잠재력',
    GROWTH: '성장과 구조',
    ACTION: '행동과 의지',
    TRANSFORMATION: '전환과 변화',
    BALANCE: '균형과 재건',
    COMPLETION: '완성과 계시'
  };

  return {
    title: `🔗 ${groupNames[group]}의 심화`,
    message: `"${cardA.name_ko}"와 "${cardB.name_ko}"는 모두 "${groupNames[group]}" 단계에 속합니다.
    올해는 이 주제를 다양한 각도에서 깊이 탐구하는 시기입니다.
    당신의 평생 테마와 올해의 테마가 같은 영역에서 만나,
    이 분야에서 큰 성장과 이해를 얻게 됩니다.`,
    advice: `${groupNames[group]} 관련 경험에 집중하세요.
    ${cardA.name_ko}의 "${cardA.keywords[0]}"와 ${cardB.name_ko}의 "${cardB.keywords[0]}"는
    서로 다른 방식으로 같은 주제를 탐구합니다. 두 접근법을 모두 활용하세요.`,
    focus: [
      `${groupNames[group]} 마스터하기`,
      '주제의 다양한 측면 탐구',
      '전문성 개발',
      '깊은 이해'
    ]
  };
}

/**
 * 일반적인 조합 해석
 */
function getGeneralInterpretation(card1, card2) {
  const cardA = getCardData(card1);
  const cardB = getCardData(card2);
  const group1 = findCardGroup(card1);
  const group2 = findCardGroup(card2);

  const energies1 = findCardEnergy(card1);
  const energies2 = findCardEnergy(card2);
  const commonEnergy = energies1.filter(e => energies2.includes(e));

  let energyMessage = '';
  if (commonEnergy.length > 0) {
    const energyNames = {
      ACTIVE: '능동적이고 외향적인',
      RECEPTIVE: '수용적이고 내향적인',
      CREATIVE: '창조적이고 낙관적인',
      TRANSFORMATIVE: '변화와 전환의',
      BALANCED: '균형과 조화로운'
    };
    energyMessage = `두 카드 모두 ${energyNames[commonEnergy[0]]} 에너지를 공유합니다. `;
  }

  return {
    title: '🌈 조화로운 만남',
    message: `"${cardA.name_ko}"(당신의 본질)와 "${cardB.name_ko}"(올해의 테마)가 만나
    독특한 조합을 만들어냅니다. ${energyMessage}
    ${cardA.name_ko}의 "${cardA.keywords[0]}" 에너지와
    ${cardB.name_ko}의 "${cardB.keywords[0]}" 에너지를
    어떻게 통합할지가 올해의 핵심 과제입니다.`,
    advice: `${cardA.name_ko}의 강점인 "${cardA.strengths[0]}"을(를) 활용하여
    ${cardB.name_ko}가 제시하는 "${cardB.keywords[0]}"의 길을 걸어가세요.
    두 카드의 조언을 모두 실천하되, 우선순위는 올해의 테마인 ${cardB.name_ko}에 두세요.`,
    focus: [
      `${cardA.keywords[0]}과 ${cardB.keywords[0]}의 통합`,
      '유연한 적응',
      '새로운 관점 수용',
      '균형 찾기'
    ]
  };
}

/**
 * 카드 궁합 분석
 */
function getCardCompatibility(universalCard) {
  const allCards = Array.from({length: 22}, (_, i) => i);
  const compatibility = {
    best: [],
    good: [],
    challenging: []
  };

  const myGroup = findCardGroup(universalCard);
  const myEnergies = findCardEnergy(universalCard);

  allCards.forEach(card => {
    if (card === universalCard) return; // 자기 자신 제외

    let score = 0;
    let reasons = [];

    // 1. 보완 관계 (합이 21) - 최고 궁합
    if (universalCard + card === 21) {
      score += 10;
      reasons.push('완벽한 균형');
    }

    // 2. 같은 에너지 공유
    const cardEnergies = findCardEnergy(card);
    const commonEnergies = myEnergies.filter(e => cardEnergies.includes(e));
    if (commonEnergies.length > 0) {
      score += commonEnergies.length * 3;
      reasons.push('같은 에너지');
    }

    // 3. 같은 그룹
    const cardGroup = findCardGroup(card);
    if (myGroup === cardGroup) {
      score += 4;
      reasons.push('같은 여정');
    }

    // 4. 연속된 카드
    if (Math.abs(universalCard - card) === 1) {
      score += 3;
      reasons.push('자연스러운 흐름');
    }

    // 5. 인접 그룹
    const groupOrder = ['BEGINNING', 'GROWTH', 'ACTION', 'TRANSFORMATION', 'BALANCE', 'COMPLETION'];
    const myIndex = groupOrder.indexOf(myGroup);
    const cardIndex = groupOrder.indexOf(cardGroup);
    if (Math.abs(myIndex - cardIndex) === 1) {
      score += 2;
      reasons.push('다음 단계');
    }

    // 6. 대칭 관계
    if (Math.abs(universalCard - card) === 11) {
      score += 2;
      reasons.push('거울 효과');
    }

    // 궁합 분류
    const cardData = getCardData(card);
    const compatibilityInfo = {
      number: card,
      name: cardData.name_ko,
      score: score,
      reason: reasons.join(', ')
    };

    if (score >= 8) {
      compatibility.best.push(compatibilityInfo);
    } else if (score >= 4) {
      compatibility.good.push(compatibilityInfo);
    } else if (score === 0 && commonEnergies.length === 0) {
      // 공통점이 전혀 없는 카드 = 도전적
      compatibility.challenging.push(compatibilityInfo);
    }
  });

  // 점수 순으로 정렬
  compatibility.best.sort((a, b) => b.score - a.score);
  compatibility.good.sort((a, b) => b.score - a.score);

  // 상위 3개씩만 반환
  return {
    best: compatibility.best.slice(0, 3),
    good: compatibility.good.slice(0, 3),
    challenging: compatibility.challenging.slice(0, 3)
  };
}
