// 六神顺序：大安、留连、速喜、赤口、小吉、空亡
const sixGods = ['大安', '留连', '速喜', '赤口', '小吉', '空亡']

// 月份对应的六神（1-12月）
const monthGodMap = [
  '大安',    // 1月
  '留连',    // 2月
  '速喜',    // 3月
  '赤口',    // 4月
  '小吉',    // 5月
  '空亡',    // 6月
  '大安',    // 7月
  '留连',    // 8月
  '速喜',    // 9月
  '赤口',    // 10月
  '小吉',    // 11月
  '空亡'     // 12月
]

export function calculateLiuren(lunar) {
  // 1. 计算月份对应的神煞（使用映射表）
  const monthNum = parseInt(lunar.month)
  const monthGod = monthGodMap[monthNum - 1]

  // 2. 计算日期对应的神煞
  // 修正：从月神的下一位开始计算日神
  const dayNum = parseInt(lunar.day)
  const monthGodIndex = sixGods.indexOf(monthGod)
  const dayStartIndex = (monthGodIndex + 1) % 6  // 从月神的下一位开始
  const dayIndex = (dayStartIndex + (dayNum - 1)) % 6
  const dayGod = sixGods[dayIndex]

  // 3. 计算时辰对应的神煞（从日神起时，取落点的下一位）
  const timeMap = {
    '子': 0, '丑': 1, '寅': 2, '卯': 3, '辰': 4, '巳': 5,
    '午': 6, '未': 7, '申': 8, '酉': 9, '戌': 10, '亥': 11
  }
  const hourNum = timeMap[lunar.hour] || 0
  const hourFallIndex = (dayIndex + hourNum) % 6
  const hourIndex = (hourFallIndex + 1) % 6  // 取落点的下一位
  const hourGod = sixGods[hourIndex]

  return {
    monthGod,
    dayGod,
    hourGod,
    result: hourGod
  }
}

// 神煞断语
export const godInterpretations = {
  '大安': {
    meaning: '大吉大利',
    interpretation: '事事平安，所求皆顺，一切圆满，前程光明。',
    details: '大安为六神之首，主平安大吉。求财、婚姻、事业皆吉，凡事可成。',
    states: {
      current: '当前形势平稳顺遂，诸事皆宜。',
      process: '发展过程中会遇贵人相助，进展顺利。',
      result: '最终结果圆满，可得所愿。'
    }
  },
  '留连': {
    meaning: '延迟缓慢',
    interpretation: '事情有所滞留，需要耐心等待，最终仍可成就。',
    details: '事情有所拖延，但不必着急。静待时机，缓中有成。宜修身养性，不宜急进。',
    states: {
      current: '当前事情进展缓慢，需要耐心。',
      process: '过程中会有反复，需要多加坚持。',
      result: '虽有延迟但终可成，耐心等待即可。'
    }
  },
  '速喜': {
    meaning: '喜庆迅速',
    interpretation: '好事将至，很快会有好消息，事情进展顺利。',
    details: '喜事临门，诸事顺遂。求财、谋事皆宜，但喜中有忧，不可过于乐观。',
    states: {
      current: '当前形势喜庆，有好消息将至。',
      process: '进展迅速，但需防止操之过急。',
      result: '结果喜人，但需警惕喜中有忧。'
    }
  },
  '赤口': {
    meaning: '口舌是非',
    interpretation: '慎防口舌是非，易生争执，凡事需谨慎行事。',
    details: '主口舌是非，易生争执。宜守不宜进，慎言慎行，避免与人冲突。',
    states: {
      current: '当前易有口舌是非，需谨慎言行。',
      process: '过程中可能遇到阻力和争议。',
      result: '结果有波折，需要化解矛盾。'
    }
  },
  '小吉': {
    meaning: '小有所成',
    interpretation: '小事可成，大事难成，适合处理日常事务。',
    details: '小事吉利，大事平平。宜办小事，不宜谋大事。守成不错，开创艰难。',
    states: {
      current: '当前小事顺遂，大事宜缓。',
      process: '进展平稳，但不宜有大动作。',
      result: '小事有成，大事需谋定而动。'
    }
  },
  '空亡': {
    meaning: '虚无空散',
    interpretation: '所求难成，诸事不顺，需避免重要决策。',
    details: '诸事不宜，所求难成。宜修身养性，避免重大决策。若遇急事，需谨慎从事。',
    states: {
      current: '当前形势不明朗，不宜轻举妄动。',
      process: '过程中易生变故，需谨慎对待。',
      result: '结果难以预料，宜守不宜进。'
    }
  }
} 