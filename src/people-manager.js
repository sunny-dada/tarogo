// 여러 사람의 타로 데이터 관리

const STORAGE_KEY = 'tarot_people';

// 사람 색상 팔레트
const PERSON_COLORS = [
  '#6b4ce6', '#e91e63', '#00bcd4', '#4caf50',
  '#ff9800', '#9c27b0', '#f44336', '#3f51b5'
];

/**
 * 저장된 사람들 불러오기
 */
function loadPeople() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * 사람들 저장하기
 */
function savePeople(people) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
}

/**
 * 새로운 사람 추가
 */
function addPerson(personData) {
  const people = loadPeople();

  const newPerson = {
    id: Date.now().toString(),
    name: personData.name || `사람 ${people.length + 1}`,
    birthdate: personData.birthdate,
    year: personData.year,
    age: personData.age,
    universalCard: personData.universalCard,
    soulCard: personData.soulCard,
    birthdayCard: personData.birthdayCard,
    color: PERSON_COLORS[people.length % PERSON_COLORS.length],
    createdAt: new Date().toISOString()
  };

  people.push(newPerson);
  savePeople(people);

  return newPerson;
}

/**
 * 사람 삭제
 */
function removePerson(personId) {
  let people = loadPeople();
  people = people.filter(p => p.id !== personId);
  savePeople(people);
  return people;
}

/**
 * 사람 정보 수정
 */
function updatePerson(personId, updates) {
  const people = loadPeople();
  const index = people.findIndex(p => p.id === personId);

  if (index !== -1) {
    people[index] = { ...people[index], ...updates };
    savePeople(people);
    return people[index];
  }

  return null;
}

/**
 * 특정 사람 가져오기
 */
function getPerson(personId) {
  const people = loadPeople();
  return people.find(p => p.id === personId);
}

/**
 * 두 사람의 궁합 분석
 */
function analyzePeopleCompatibility(person1, person2) {
  const card1 = person1.universalCard;
  const card2 = person2.universalCard;

  let score = 0;
  let insights = [];

  // 1. 유니버셜 카드 관계
  const relationship = analyzeCardRelationship(card1, card2);

  switch (relationship) {
    case 'same':
      score += 15;
      insights.push({
        icon: '⭐',
        title: '같은 영혼',
        text: '두 분 모두 같은 유니버셜 카드를 가지고 있어요. 서로의 본질을 깊이 이해할 수 있는 관계입니다.'
      });
      break;

    case 'complementary':
      score += 20;
      insights.push({
        icon: '⚖️',
        title: '완벽한 균형',
        text: '두 카드의 합이 21로 완전함을 이룹니다. 서로 부족한 부분을 채워주는 최고의 조합입니다.'
      });
      break;

    case 'sequential':
      score += 10;
      insights.push({
        icon: '🔗',
        title: '자연스러운 흐름',
        text: '연속된 카드로 서로의 다음 단계를 이해하고 도울 수 있는 관계입니다.'
      });
      break;

    case 'mirror':
      score += 12;
      insights.push({
        icon: '🪞',
        title: '거울 효과',
        text: '서로에게 다른 관점을 제공하며, 자신을 되돌아보게 만드는 관계입니다.'
      });
      break;

    case 'same_group':
      score += 8;
      insights.push({
        icon: '🤝',
        title: '같은 여정',
        text: '인생의 비슷한 단계를 걷고 있어 서로 공감하고 격려할 수 있습니다.'
      });
      break;

    default:
      score += 5;
      insights.push({
        icon: '🌈',
        title: '다양성의 조화',
        text: '서로 다른 에너지를 가져 새로운 시각을 배울 수 있는 관계입니다.'
      });
  }

  // 2. 에너지 공유
  const energies1 = findCardEnergy(card1);
  const energies2 = findCardEnergy(card2);
  const commonEnergies = energies1.filter(e => energies2.includes(e));

  if (commonEnergies.length > 0) {
    score += commonEnergies.length * 5;
    const energyNames = {
      ACTIVE: '능동적이고 외향적인',
      RECEPTIVE: '수용적이고 내향적인',
      CREATIVE: '창조적이고 낙관적인',
      TRANSFORMATIVE: '변화와 전환을',
      BALANCED: '균형과 조화로운'
    };
    insights.push({
      icon: '⚡',
      title: '에너지 공유',
      text: `${energyNames[commonEnergies[0]]} 에너지를 공유하여 서로를 이해하기 쉽습니다.`
    });
  }

  // 3. 소울 카드 비교
  if (person1.soulCard !== null && person2.soulCard !== null) {
    if (person1.soulCard === person2.soulCard) {
      score += 10;
      insights.push({
        icon: '💫',
        title: '영혼의 공명',
        text: '소울 카드가 같아 내면의 본질이 비슷합니다. 깊은 이해가 가능한 관계예요.'
      });
    }
  }

  // 4. 올해의 카드 (같은 연도인 경우)
  if (person1.year === person2.year && person1.birthdayCard === person2.birthdayCard) {
    score += 8;
    insights.push({
      icon: '🎯',
      title: '올해의 동행',
      text: '올해 같은 테마를 경험하고 있어 서로의 경험을 공유하고 응원할 수 있습니다.'
      });
  }

  // 궁합 등급 결정
  let grade, gradeText, advice;

  if (score >= 25) {
    grade = 'S';
    gradeText = '환상의 궁합';
    advice = '서로에게 큰 힘이 되는 관계입니다. 함께 있을 때 더 나은 자신이 될 수 있어요.';
  } else if (score >= 18) {
    grade = 'A';
    gradeText = '최고의 궁합';
    advice = '서로를 잘 이해하고 지지할 수 있는 관계입니다. 함께 성장할 수 있어요.';
  } else if (score >= 12) {
    grade = 'B';
    gradeText = '좋은 궁합';
    advice = '서로에게 긍정적인 영향을 주는 관계입니다. 노력하면 더 깊어질 수 있어요.';
  } else if (score >= 8) {
    grade = 'C';
    gradeText = '보통 궁합';
    advice = '서로 다른 점이 많지만 그만큼 배울 것도 많습니다. 이해하려는 노력이 필요해요.';
  } else {
    grade = 'D';
    gradeText = '도전적 관계';
    advice = '매우 다른 성향이지만, 그 차이가 성장의 기회가 될 수 있습니다. 인내심을 가지세요.';
  }

  return {
    score,
    grade,
    gradeText,
    advice,
    insights,
    person1: {
      name: person1.name,
      card: getCardData(card1).name_ko,
      cardNumber: card1,
      color: person1.color
    },
    person2: {
      name: person2.name,
      card: getCardData(card2).name_ko,
      cardNumber: card2,
      color: person2.color
    }
  };
}

/**
 * 모든 사람들 간 궁합 분석
 */
function analyzeAllCompatibilities() {
  const people = loadPeople();
  const compatibilities = [];

  for (let i = 0; i < people.length; i++) {
    for (let j = i + 1; j < people.length; j++) {
      const compatibility = analyzePeopleCompatibility(people[i], people[j]);
      compatibilities.push({
        ...compatibility,
        person1Id: people[i].id,
        person2Id: people[j].id
      });
    }
  }

  // 점수 순으로 정렬
  compatibilities.sort((a, b) => b.score - a.score);

  return compatibilities;
}
