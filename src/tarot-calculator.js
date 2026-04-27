// 타로 카드 계산 로직

/**
 * 생년월일로부터 유니버셜 카드 번호 계산
 * @param {string} birthdate - YYYY-MM-DD 형식
 * @returns {number} 카드 번호 (0-21)
 */
function calculateUniversalCard(birthdate) {
  // 날짜를 숫자 배열로 변환
  const digits = birthdate.replace(/-/g, '').split('').map(Number);

  // 모든 숫자를 더함
  let sum = digits.reduce((acc, digit) => acc + digit, 0);

  // 22 이하가 될 때까지 각 자리수를 더함
  while (sum > 22) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  // 22는 0으로 처리 (The Fool)
  if (sum === 22) sum = 0;

  return sum;
}

/**
 * 특정 연도의 연도 카드 계산
 * @param {string} birthdate - YYYY-MM-DD 형식
 * @param {number} year - 계산할 연도
 * @returns {number} 카드 번호 (0-21)
 */
function calculateBirthdayCard(birthdate, year) {
  const [_, month, day] = birthdate.split('-');

  // 해당 연도 + 월 + 일의 모든 숫자를 더함
  const dateString = `${year}${month}${day}`;
  const digits = dateString.split('').map(Number);

  let sum = digits.reduce((acc, digit) => acc + digit, 0);

  // 22 이하가 될 때까지 축약
  while (sum > 22) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  if (sum === 22) sum = 0;

  return sum;
}

/**
 * 소울 카드 계산 (유니버셜 카드를 한 번 더 축약)
 * @param {number} universalCardNumber - 유니버셜 카드 번호
 * @returns {number|null} 소울 카드 번호 (단일 숫자인 경우 null)
 */
function calculateSoulCard(universalCardNumber) {
  // 이미 단일 숫자면 소울 카드 없음
  if (universalCardNumber < 10) return null;

  const sum = universalCardNumber.toString().split('')
    .reduce((acc, digit) => acc + parseInt(digit), 0);

  return sum;
}

/**
 * 카드 이미지 파일명 매핑
 */
const cardImageMap = {
  0: 'major_arcana_fool.png',
  1: 'major_arcana_magician.png',
  2: 'major_arcana_priestess.png',
  3: 'major_arcana_empress.png',
  4: 'major_arcana_emperor.png',
  5: 'major_arcana_hierophant.png',
  6: 'major_arcana_lovers.png',
  7: 'major_arcana_chariot.png',
  8: 'major_arcana_strength.png',
  9: 'major_arcana_hermit.png',
  10: 'major_arcana_fortune.png',
  11: 'major_arcana_justice.png',
  12: 'major_arcana_hanged.png',
  13: 'major_arcana_death.png',
  14: 'major_arcana_temperance.png',
  15: 'major_arcana_devil.png',
  16: 'major_arcana_tower.png',
  17: 'major_arcana_star.png',
  18: 'major_arcana_moon.png',
  19: 'major_arcana_sun.png',
  20: 'major_arcana_judgement.png',
  21: 'major_arcana_world.png'
};

/**
 * 카드 번호로 이미지 경로 가져오기
 * @param {number} cardNumber - 카드 번호
 * @returns {string} 이미지 경로
 */
function getCardImage(cardNumber) {
  return `assets/images/${cardImageMap[cardNumber]}`;
}

/**
 * 생년월일 유효성 검사
 * @param {string} birthdate - YYYY-MM-DD 형식
 * @returns {boolean} 유효 여부
 */
function validateBirthdate(birthdate) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(birthdate)) return false;

  const date = new Date(birthdate);
  const [year, month, day] = birthdate.split('-').map(Number);

  return date.getFullYear() === year &&
         date.getMonth() === month - 1 &&
         date.getDate() === day;
}

/**
 * 나이 계산
 * @param {string} birthdate - YYYY-MM-DD 형식
 * @returns {number} 나이
 */
function calculateAge(birthdate) {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
