// 커스텀 모달 함수
function showModal(message, { input = false, defaultValue = '', cancelable = false } = {}) {
  return new Promise((resolve) => {
    const overlay = document.getElementById('customModal');
    const msgEl = document.getElementById('customModalMessage');
    const inputWrap = document.getElementById('customModalInputWrap');
    const inputEl = document.getElementById('customModalInput');
    const okBtn = document.getElementById('customModalOk');
    const cancelBtn = document.getElementById('customModalCancel');

    msgEl.textContent = message;
    inputWrap.style.display = input ? 'block' : 'none';
    cancelBtn.style.display = cancelable ? 'inline-block' : 'none';

    if (input) {
      inputEl.value = defaultValue;
    }

    overlay.style.display = 'flex';

    if (input) {
      setTimeout(() => inputEl.focus(), 50);
    }

    function cleanup() {
      overlay.style.display = 'none';
      okBtn.removeEventListener('click', onOk);
      cancelBtn.removeEventListener('click', onCancel);
      inputEl.removeEventListener('keypress', onKeypress);
    }

    function onOk() {
      cleanup();
      resolve(input ? inputEl.value : true);
    }

    function onCancel() {
      cleanup();
      resolve(null);
    }

    function onKeypress(e) {
      if (e.key === 'Enter') onOk();
    }

    okBtn.addEventListener('click', onOk);
    cancelBtn.addEventListener('click', onCancel);
    if (input) inputEl.addEventListener('keypress', onKeypress);
  });
}

// DOM 요소
const birthdateInput = document.getElementById('birthdate');
const yearInput = document.getElementById('year');
const calculateBtn = document.getElementById('calculateBtn');
const errorDiv = document.getElementById('error');
const resultsSection = document.getElementById('results');
const savePersonBtn = document.getElementById('savePerson');
const peopleTabsContainer = document.getElementById('peopleTabs');
const peopleTabsList = document.getElementById('peopleTabsList');
const clearAllPeopleBtn = document.getElementById('clearAllPeople');
const peopleCompatibilitySection = document.getElementById('peopleCompatibility');
const compatibilityList = document.getElementById('compatibilityList');
const compatPerson1Select = document.getElementById('compatPerson1');
const compatTargetsDiv = document.getElementById('compatTargets');
const checkCompatBtn = document.getElementById('checkCompatBtn');

// 현재 계산 결과 저장
let currentCalculation = null;
let currentSelectedPersonId = null;

// 이벤트 리스너
calculateBtn.addEventListener('click', handleCalculate);
savePersonBtn.addEventListener('click', handleSavePerson);
clearAllPeopleBtn.addEventListener('click', handleClearAllPeople);
checkCompatBtn.addEventListener('click', handleCheckCompatibility);
compatPerson1Select.addEventListener('change', renderCompatTargets);

// 생년월일 숫자 입력 시 자동 하이픈 포맷팅
birthdateInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/[^0-9]/g, '');
  if (value.length > 8) value = value.slice(0, 8);
  if (value.length >= 5 && value.length <= 6) {
    value = value.slice(0, 4) + '-' + value.slice(4);
  } else if (value.length > 6) {
    value = value.slice(0, 4) + '-' + value.slice(4, 6) + '-' + value.slice(6);
  }
  e.target.value = value;
});

// Enter 키로도 계산 가능
birthdateInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleCalculate();
});

yearInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleCalculate();
});

// 메인 계산 함수
function handleCalculate() {
  // 에러 메시지 숨기기
  hideError();

  // 입력값 가져오기
  const birthdate = birthdateInput.value;
  const year = parseInt(yearInput.value);

  // 유효성 검사
  if (!birthdate) {
    showError('생년월일을 입력해주세요.');
    return;
  }

  if (!validateBirthdate(birthdate)) {
    showError('올바른 생년월일을 입력해주세요.');
    return;
  }

  if (!year || year < 1900 || year > 2100) {
    showError('1900년부터 2100년 사이의 연도를 입력해주세요.');
    return;
  }

  // 계산 수행
  try {
    const universalCardNumber = calculateUniversalCard(birthdate);
    const birthdayCardNumber = calculateBirthdayCard(birthdate, year);
    const soulCardNumber = calculateSoulCard(universalCardNumber);
    const age = calculateAge(birthdate);

    // 결과 표시
    displayResults({
      birthdate,
      age,
      year,
      universalCardNumber,
      birthdayCardNumber,
      soulCardNumber
    });

    // GA4 이벤트 트래킹
    if (typeof gtag === 'function') {
      gtag('event', 'tarot_calculate', {
        event_category: 'engagement',
        event_label: `universal_${universalCardNumber}_soul_${soulCardNumber}`
      });
    }

    // 결과 섹션으로 스크롤
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (error) {
    showError('계산 중 오류가 발생했습니다. 다시 시도해주세요.');
    console.error(error);
  }
}

// 결과 표시 함수
function displayResults(data) {
  const {
    birthdate,
    age,
    year,
    universalCardNumber,
    birthdayCardNumber,
    soulCardNumber
  } = data;

  // 현재 계산 결과 저장
  currentCalculation = {
    birthdate,
    age,
    year,
    universalCard: universalCardNumber,
    soulCard: soulCardNumber,
    birthdayCard: birthdayCardNumber
  };

  // 기본 정보 표시
  document.getElementById('displayBirthdate').textContent = formatDate(birthdate);
  document.getElementById('displayAge').textContent = `${age}세`;

  // 유니버셜 카드 표시
  displayUniversalCard(universalCardNumber);

  // 소울 카드 표시
  if (soulCardNumber !== null) {
    displaySoulCard(soulCardNumber);
    document.getElementById('soulCardContent').style.display = '';
    document.getElementById('soulCardNone').style.display = 'none';
  } else {
    document.getElementById('soulCardSection').style.display = '';
    document.getElementById('soulCardContent').style.display = 'none';
    document.getElementById('soulCardNone').style.display = 'block';
  }

  // 카드 페어 심층 해석 (유니버셜 + 소울)
  displayCardPair(universalCardNumber, soulCardNumber);

  // 심층 해석 (유니버셜 카드)
  displayDeepInterpretation(universalCardNumber);

  // 카드 궁합
  displayCompatibility(universalCardNumber);

  // 연도 카드 표시
  displayBirthdayCard(birthdayCardNumber, year);

  // 카드 조화 메시지
  displayHarmony(universalCardNumber, birthdayCardNumber);

  // 저장 버튼 상태 업데이트
  updateSaveButton(birthdate);

  // 결과 섹션 표시
  resultsSection.style.display = 'block';
}

// 유니버셜 카드 표시 (GPT 스타일)
function displayUniversalCard(cardNumber) {
  const basicData = getCardData(cardNumber);
  const simpleData = getSimpleCardData(cardNumber);

  // 이미지와 기본 정보
  document.getElementById('universalCardImage').src = getCardImage(cardNumber);
  document.getElementById('universalCardNumber').textContent = cardNumber;
  document.getElementById('universalCardName').textContent =
    `${basicData.name_ko} (${basicData.name_en})`;

  if (simpleData) {
    // 핵심 키워드
    const keywordsHtml = simpleData.core_keywords
      .map(keyword => `<span class="keyword-tag">${keyword}</span>`)
      .join('');
    document.getElementById('universalCoreKeywords').innerHTML = keywordsHtml;

    // 한마디로
    document.getElementById('universalOneLiner').textContent = simpleData.one_liner;

    // 이런 사람
    const personalityHtml = simpleData.personality
      .map(trait => `<li>${trait}</li>`)
      .join('');
    document.getElementById('universalPersonality').innerHTML = personalityHtml;

    // 실생활
    document.getElementById('universalRealStrength').textContent = simpleData.real_life.strength;
    document.getElementById('universalRealChallenge').textContent = simpleData.real_life.challenge;
    document.getElementById('universalRealAdvice').textContent = simpleData.real_life.advice;

    // 일/관계 스타일
    document.getElementById('universalWorkStyle').textContent = simpleData.work_style;
    document.getElementById('universalRelationStyle').textContent = simpleData.relationship_style;
  }
}

// 소울 카드 표시
function displaySoulCard(cardNumber) {
  const cardData = getCardData(cardNumber);

  document.getElementById('soulCardSection').style.display = 'block';
  document.getElementById('soulCardImage').src = getCardImage(cardNumber);
  document.getElementById('soulCardName').textContent =
    `${cardNumber}번 - ${cardData.name_ko} (${cardData.name_en})`;
  document.getElementById('soulCardMeaning').textContent = cardData.universal_meaning;
}

// 연도 카드 표시
function displayBirthdayCard(cardNumber, year) {
  const cardData = getCardData(cardNumber);
  const simpleData = getSimpleCardData(cardNumber);

  document.getElementById('birthdayYear').textContent = year;
  document.getElementById('birthdayCardImage').src = getCardImage(cardNumber);
  document.getElementById('birthdayCardNumber').textContent = cardNumber;
  document.getElementById('birthdayCardName').textContent =
    `${cardData.name_ko} (${cardData.name_en})`;

  // 올해의 테마
  document.getElementById('birthdayMeaning').textContent = cardData.birthday_meaning;

  if (simpleData) {
    // 핵심 키워드
    const keywordsHtml = simpleData.core_keywords
      .map(keyword => `<span class="keyword-tag">${keyword}</span>`)
      .join('');
    document.getElementById('birthdayCardKeywords').innerHTML = keywordsHtml;

    // 한마디로
    document.getElementById('birthdayOneLiner').textContent = simpleData.one_liner;

    // 올해 이런 에너지가 흘러요
    const personalityHtml = simpleData.personality
      .map(trait => `<li>${trait}</li>`)
      .join('');
    document.getElementById('birthdayPersonality').innerHTML = personalityHtml;

    // 실생활
    document.getElementById('birthdayRealStrength').textContent = simpleData.real_life.strength;
    document.getElementById('birthdayRealChallenge').textContent = simpleData.real_life.challenge;
    document.getElementById('birthdayAdvice').textContent = simpleData.real_life.advice;

    // 일/관계 스타일
    document.getElementById('birthdayWorkStyle').textContent = simpleData.work_style;
    document.getElementById('birthdayRelationStyle').textContent = simpleData.relationship_style;
  }
}

// 카드 조화 메시지 (심층 해석)
function displayHarmony(universalCardNumber, birthdayCardNumber) {
  // 심층 조합 해석 가져오기
  const interpretation = getDeepCombinationInterpretation(universalCardNumber, birthdayCardNumber);

  // 제목 업데이트
  document.getElementById('harmonyTitle').textContent = interpretation.title;

  // 메시지 표시
  document.getElementById('harmonyMessage').textContent = interpretation.message;

  // 조언 표시
  document.getElementById('harmonyAdvice').textContent = interpretation.advice;

  // 집중 포인트 표시
  const focusHtml = interpretation.focus
    .map(point => `<li>${point}</li>`)
    .join('');
  document.getElementById('harmonyFocus').innerHTML = focusHtml;
}

// 유틸리티 함수들
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

function hideError() {
  errorDiv.style.display = 'none';
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
  // 현재 연도 설정
  const currentYear = new Date().getFullYear();
  yearInput.value = currentYear;

  // 저장된 사람들 불러오기
  refreshPeopleTabs();
  refreshPeopleCompatibility();
});

// 카드 페어 해석 표시
function displayCardPair(universalCard, soulCard) {
  const pairInterpretation = getCardPairInterpretation(universalCard, soulCard);
  
  if (!pairInterpretation) {
    document.getElementById('cardPairSection').style.display = 'none';
    return;
  }

  document.getElementById('cardPairSection').style.display = 'block';
  document.getElementById('pairTitle').textContent = pairInterpretation.title;
  document.getElementById('pairEssence').textContent = pairInterpretation.essence;
  document.getElementById('pairGift').textContent = pairInterpretation.unique_gift;
  document.getElementById('pairPurpose').textContent = pairInterpretation.life_purpose;
  document.getElementById('pairChallenge').textContent = pairInterpretation.integration_challenge;

  const adviceHtml = pairInterpretation.practical_advice
    .map(advice => `<li>${advice}</li>`)
    .join('');
  document.getElementById('pairAdviceList').innerHTML = adviceHtml;
}

// 심층 해석 표시
function displayDeepInterpretation(cardNumber) {
  const extended = getExtendedInterpretation(cardNumber);
  
  if (!extended) {
    document.getElementById('deepInterpretationSection').style.display = 'none';
    return;
  }

  document.getElementById('deepInterpretationSection').style.display = 'block';

  // 관계
  if (extended.relationship) {
    document.getElementById('deepRelationshipGeneral').textContent = extended.relationship.general;
    
    const relStrengthsHtml = extended.relationship.strengths
      .map(s => `<li>${s}</li>`)
      .join('');
    document.getElementById('deepRelationshipStrengths').innerHTML = relStrengthsHtml;

    const relChallengesHtml = extended.relationship.challenges
      .map(c => `<li>${c}</li>`)
      .join('');
    document.getElementById('deepRelationshipChallenges').innerHTML = relChallengesHtml;
  }

  // 커리어
  if (extended.career) {
    document.getElementById('deepCareerGeneral').textContent = extended.career.general;
    
    const fieldsHtml = extended.career.ideal_fields
      .map(field => `<span class="career-tag">${field}</span>`)
      .join('');
    document.getElementById('deepCareerFields').innerHTML = fieldsHtml;

    document.getElementById('deepCareerAdvice').textContent = extended.career.advice;
  }

  // 인생 여정
  if (extended.life_journey) {
    document.getElementById('deepLifeEarly').textContent = extended.life_journey.early;
    document.getElementById('deepLifeMiddle').textContent = extended.life_journey.middle;
    document.getElementById('deepLifeMature').textContent = extended.life_journey.mature;
  }

  // 그림자
  if (extended.shadow) {
    document.getElementById('deepShadowUnintegrated').textContent = extended.shadow.unintegrated;
    document.getElementById('deepShadowFear').textContent = extended.shadow.inner_fear;
    document.getElementById('deepShadowPath').textContent = extended.shadow.integration_path;
  }

  // 영적 성장
  if (extended.spiritual_growth) {
    document.getElementById('deepSpiritual').textContent = extended.spiritual_growth;
  }
}

// 카드 궁합 표시
function displayCompatibility(universalCard) {
  const compatibility = getCardCompatibility(universalCard);

  // 최고 궁합
  const bestHtml = compatibility.best
    .map(card => `
      <div class="compat-card-item">
        <div>
          <span class="compat-card-number">${card.number}</span>
          <span class="compat-card-name">${card.name}</span>
        </div>
        <span class="compat-card-reason">${card.reason}</span>
      </div>
    `)
    .join('');
  document.getElementById('compatBest').innerHTML = bestHtml || '<p class="compat-empty">해당하는 카드가 없습니다</p>';

  // 좋은 궁합
  const goodHtml = compatibility.good
    .map(card => `
      <div class="compat-card-item">
        <div>
          <span class="compat-card-number">${card.number}</span>
          <span class="compat-card-name">${card.name}</span>
        </div>
        <span class="compat-card-reason">${card.reason}</span>
      </div>
    `)
    .join('');
  document.getElementById('compatGood').innerHTML = goodHtml || '<p class="compat-empty">해당하는 카드가 없습니다</p>';

  // 도전적 궁합
  const challengingHtml = compatibility.challenging
    .map(card => `
      <div class="compat-card-item">
        <div>
          <span class="compat-card-number">${card.number}</span>
          <span class="compat-card-name">${card.name}</span>
        </div>
        <span class="compat-card-reason">다르지만 성장의 기회</span>
      </div>
    `)
    .join('');
  document.getElementById('compatChallenging').innerHTML = challengingHtml || '<p class="compat-empty">모든 카드와 배울 점이 있습니다</p>';
}

// ===== 사람 관리 기능 =====

// 저장 버튼 상태 업데이트
function updateSaveButton(birthdate) {
  const people = loadPeople();
  const savedPerson = people.find(p => p.birthdate === birthdate);

  if (savedPerson) {
    savePersonBtn.style.display = 'none';
    // 기존 라벨이 있으면 업데이트, 없으면 생성
    let label = document.getElementById('savedPersonLabel');
    if (!label) {
      label = document.createElement('span');
      label.id = 'savedPersonLabel';
      label.className = 'saved-person-label';
      savePersonBtn.parentNode.insertBefore(label, savePersonBtn.nextSibling);
    }
    label.textContent = `${savedPerson.name}(으)로 저장됨`;
    label.style.display = '';
  } else {
    savePersonBtn.style.display = '';
    const label = document.getElementById('savedPersonLabel');
    if (label) label.style.display = 'none';
  }
}

// 사람 저장 핸들러
async function handleSavePerson() {
  if (!currentCalculation) {
    await showModal('먼저 타로 카드를 계산해주세요.');
    return;
  }

  const name = await showModal('이름을 입력하세요:', {
    input: true,
    defaultValue: '',
    cancelable: true
  });

  if (name === null) return; // 취소

  const personData = {
    name: name.trim() || `사람 ${loadPeople().length + 1}`,
    birthdate: currentCalculation.birthdate,
    year: currentCalculation.year,
    age: currentCalculation.age,
    universalCard: currentCalculation.universalCard,
    soulCard: currentCalculation.soulCard,
    birthdayCard: currentCalculation.birthdayCard
  };

  const savedPerson = addPerson(personData);
  currentSelectedPersonId = savedPerson.id;

  // GA4 이벤트 트래킹
  if (typeof gtag === 'function') {
    gtag('event', 'save_person', { event_category: 'engagement' });
  }

  // UI 업데이트
  refreshPeopleTabs();
  refreshPeopleCompatibility();

  // 저장 버튼 → 저장됨 라벨로 전환
  updateSaveButton(currentCalculation.birthdate);

  await showModal(`${savedPerson.name}님이 저장되었습니다!`);
}

// 전체 삭제 핸들러
async function handleClearAllPeople() {
  const people = loadPeople();

  if (people.length === 0) {
    await showModal('저장된 사람이 없습니다.');
    return;
  }

  const confirmed = await showModal(`저장된 ${people.length}명을 모두 삭제하시겠습니까?`, { cancelable: true });
  if (confirmed) {
    savePeople([]);
    currentSelectedPersonId = null;
    refreshPeopleTabs();
    refreshPeopleCompatibility();
    await showModal('모두 삭제되었습니다.');
  }
}

// 사람 탭 새로고침
function refreshPeopleTabs() {
  const people = loadPeople();

  if (people.length === 0) {
    peopleTabsContainer.style.display = 'none';
    return;
  }

  peopleTabsContainer.style.display = 'block';

  const tabsHtml = people.map(person => `
    <div class="person-tab ${person.id === currentSelectedPersonId ? 'active' : ''}"
         data-person-id="${person.id}">
      <div class="person-tab-color" style="background: ${person.color}"></div>
      <div class="person-tab-info">
        <span class="person-tab-name">${person.name}</span>
        <span class="person-tab-card">${person.universalCard}번 카드</span>
      </div>
      <button class="person-tab-remove" data-person-id="${person.id}" title="삭제">×</button>
    </div>
  `).join('');

  peopleTabsList.innerHTML = tabsHtml;

  // 탭 클릭 이벤트
  document.querySelectorAll('.person-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      if (!e.target.classList.contains('person-tab-remove')) {
        const personId = tab.dataset.personId;
        loadPersonData(personId);
      }
    });
  });

  // 삭제 버튼 이벤트
  document.querySelectorAll('.person-tab-remove').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const personId = btn.dataset.personId;
      const person = getPerson(personId);

      const confirmed = await showModal(`${person.name}님을 삭제하시겠습니까?`, { cancelable: true });
      if (confirmed) {
        const remainingPeople = removePerson(personId);

        if (currentSelectedPersonId === personId) {
          if (remainingPeople.length > 0) {
            loadPersonData(remainingPeople[0].id);
          } else {
            currentSelectedPersonId = null;
          }
        }

        refreshPeopleTabs();
        refreshPeopleCompatibility();
      }
    });
  });
}

// 저장된 사람 데이터 불러와서 표시
function loadPersonData(personId) {
  const person = getPerson(personId);

  if (!person) return;

  currentSelectedPersonId = personId;

  // 입력 필드 업데이트
  birthdateInput.value = person.birthdate;
  yearInput.value = person.year;

  // 결과 표시
  const data = {
    birthdate: person.birthdate,
    age: person.age,
    year: person.year,
    universalCardNumber: person.universalCard,
    soulCardNumber: person.soulCard,
    birthdayCardNumber: person.birthdayCard
  };

  displayResults(data);

  // 탭 active 상태 업데이트
  refreshPeopleTabs();

  // 결과 섹션으로 스크롤
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 사람들 간 궁합 새로고침 (드롭다운 갱신)
function refreshPeopleCompatibility() {
  const people = loadPeople();

  if (people.length < 2) {
    peopleCompatibilitySection.style.display = 'none';
    return;
  }

  peopleCompatibilitySection.style.display = 'block';

  // 현재 선택값 보존
  const prev1 = compatPerson1Select.value;

  // 기준 사람 드롭다운 옵션 갱신
  const optionsHtml = people.map(p =>
    `<option value="${p.id}">${p.name} (${p.universalCard}번)</option>`
  ).join('');

  compatPerson1Select.innerHTML = '<option value="">기준이 되는 사람</option>' + optionsHtml;

  // 이전 선택값 복원 (아직 존재하면)
  if (people.find(p => p.id === prev1)) compatPerson1Select.value = prev1;

  // 체크박스 목록 갱신
  renderCompatTargets();

  // 결과 영역 비우기 (선택이 무효화됐을 수 있으므로)
  compatibilityList.innerHTML = '';
}

// 비교 대상 체크박스 목록 렌더링
function renderCompatTargets() {
  const basePersonId = compatPerson1Select.value;
  const people = loadPeople();

  if (!basePersonId) {
    compatTargetsDiv.innerHTML = '<p class="compat-targets-hint">먼저 기준이 되는 사람을 선택하세요</p>';
    compatibilityList.innerHTML = '';
    return;
  }

  const targets = people.filter(p => p.id !== basePersonId);

  if (targets.length === 0) {
    compatTargetsDiv.innerHTML = '<p class="compat-targets-hint">비교할 다른 사람이 없습니다</p>';
    return;
  }

  compatTargetsDiv.innerHTML = targets.map(p => `
    <label class="compat-target-label">
      <input type="checkbox" class="compat-target-checkbox" value="${p.id}">
      <span class="compat-target-name">${p.name} (${p.universalCard}번)</span>
    </label>
  `).join('');

  compatibilityList.innerHTML = '';
}

// 궁합 보기 핸들러
async function handleCheckCompatibility() {
  const basePersonId = compatPerson1Select.value;

  if (!basePersonId) {
    await showModal('기준이 되는 사람을 선택해주세요.');
    return;
  }

  const checkedBoxes = compatTargetsDiv.querySelectorAll('.compat-target-checkbox:checked');
  const targetIds = Array.from(checkedBoxes).map(cb => cb.value);

  if (targetIds.length === 0) {
    await showModal('비교할 상대를 1명 이상 선택해주세요.');
    return;
  }

  const basePerson = getPerson(basePersonId);

  // GA4 이벤트 트래킹
  if (typeof gtag === 'function') {
    gtag('event', 'check_compatibility', {
      event_category: 'engagement',
      target_count: targetIds.length
    });
  }

  const resultsHtml = targetIds.map(targetId => {
    const targetPerson = getPerson(targetId);
    const compat = analyzePeopleCompatibility(basePerson, targetPerson);

    return `
      <div class="compatibility-card">
        <div class="compatibility-people">
          <div class="compat-person">
            <div class="compat-person-name">
              <span class="compat-person-color-dot" style="background: ${compat.person1.color}"></span>
              ${compat.person1.name}
            </div>
            <div class="compat-person-card">${compat.person1.cardNumber}. ${compat.person1.card}</div>
          </div>

          <div class="compat-heart">💕</div>

          <div class="compat-person">
            <div class="compat-person-name">
              <span class="compat-person-color-dot" style="background: ${compat.person2.color}"></span>
              ${compat.person2.name}
            </div>
            <div class="compat-person-card">${compat.person2.cardNumber}. ${compat.person2.card}</div>
          </div>
        </div>

        <div class="compatibility-grade">
          <div class="grade-badge grade-${compat.grade}">${compat.grade}</div>
          <div class="grade-text">${compat.gradeText}</div>
        </div>

        <div class="compatibility-advice">
          <p>${compat.advice}</p>
        </div>

        <div class="compatibility-insights">
          ${compat.insights.map(insight => `
            <div class="insight-item">
              <div class="insight-icon">${insight.icon}</div>
              <div class="insight-content">
                <div class="insight-title">${insight.title}</div>
                <div class="insight-text">${insight.text}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  compatibilityList.innerHTML = resultsHtml;
}
