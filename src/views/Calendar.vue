<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center text-indigo-600 mb-8">
      2025乙巳蛇年诸神圣诞日
    </h1>

    <!-- 搜索框 -->
    <div class="mb-8">
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="搜索神仙名称..."
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
    </div>

    <!-- 月份选择器 -->
    <div class="flex justify-center space-x-2 mb-8 flex-wrap">
      <button 
        v-for="month in 12" 
        :key="month"
        @click="currentMonth = month"
        class="px-4 py-2 rounded-lg mb-2"
        :class="currentMonth === month ? 
          'bg-indigo-600 text-white' : 
          'bg-white text-indigo-600 hover:bg-indigo-50'"
      >
        {{ month }}月
      </button>
    </div>

    <!-- 月份内容 -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-indigo-600 mb-6">
        {{ currentMonth }}月
        <span class="text-base font-normal text-gray-600">
          （农历{{ getLunarMonth(currentMonth) }}月）
        </span>
      </h2>

      <div class="space-y-4">
        <template v-for="(events, day) in filteredEvents" :key="day">
          <div v-if="events" class="border-l-4 border-indigo-600 pl-4 py-2">
            <h3 class="text-lg font-bold text-gray-800 mb-2">
              {{ day }}日
              <span class="text-sm font-normal text-gray-600">
                （农历{{ getLunarDay(currentMonth, parseInt(day)) }}日）
              </span>
            </h3>
            <div 
              v-for="(event, index) in events" 
              :key="index"
              class="text-gray-600 mb-1 last:mb-0 flex items-center"
            >
              <span 
                class="inline-block w-16 text-xs text-white rounded px-2 mr-2"
                :class="getEventTypeClass(event)"
              >
                {{ getEventType(event) }}
              </span>
              {{ event }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Solar, Lunar } from 'lunar-javascript'

const currentMonth = ref(1)
const searchQuery = ref('')

// 月份数据
const monthData = {
  1: {
    1: [
      '子时跨年祈福道场',
      '天腊之辰（五帝校定生人神气时限长短，五帝会于束方九炁青天）',
      '太上老君降现',
      '昊天上帝统天神地祇朝三清',
      '东方七宿星君下降',
      '徐来勒真人於会稽上虞山传经于葛玄真人'
    ],
    2: ['天曹下降'],
    3: [
      '孙真人（孙登）诞辰',
      '全真华山派开宗祖师广宁真人郝祖圣诞',
      '太白北斗星下降'
    ],
    5: ['五斗星君下降'],
    7: ['举迁赏会', '北斗九皇降'],
    8: ['王侯腊之辰'],
    9: ['玉皇上帝圣诞'],
    13: ['关圣帝君飞升'],
    14: ['三元降', '三官大帝同降'],
    15: [
      '上元天官赐福紫微大帝圣诞',
      '太上老君说《阴符经》',
      '三茅真君圣诞'
    ],
    19: ['长春邱真人圣诞'],
    23: ['天曹考察', '三清同降'],
    25: ['玄天上帝圣诞'],
    28: ['许真君圣诞']
  },
  2: {
    1: [
      '东方玉宝皇上天尊一殿秦广王诞辰',
      '勾陈上宫天皇大帝圣诞',
      '长春派开宗祖师刘渊然真人圣诞',
      '翊圣保德真君下降',
      '冲应太虚王真君',
      '诚应妙远郭真君同飞升'
    ],
    2: ['土地正神诞', '姜太公圣诞'],
    3: ['文昌梓潼帝君圣诞'],
    6: ['东华帝君圣诞'],
    8: ['释迦牟尼佛出家'],
    9: ['玄天上帝飞升'],
    15: ['释迦牟尼佛涅槃', '太阴星君诞'],
    17: ['东方杜将军诞'],
    18: ['至圣先师孔子讳辰'],
    19: ['慈航真人圣诞'],
    21: ['普贤菩萨圣诞']
  },
  3: {
    1: ['谭祖（谭处端）长真子圣诞'],
    3: ['玄天上帝圣诞'],
    8: ['九天司命灶君诞'],
    12: ['中岳大帝圣诞'],
    15: ['天师张大真人圣诞', '财神赵公元帅圣诞'],
    16: ['准提菩萨圣诞', '天师张大真人升天'],
    19: ['太阳星君圣诞'],
    20: ['子孙娘娘圣诞'],
    23: ['天后妈祖圣诞'],
    26: ['鬼谷先师诞'],
    28: ['东岳大帝圣诞']
  },
  4: {
    1: ['东方玉宝皇上天尊二殿楚江王诞'],
    4: ['文殊菩萨圣诞'],
    8: ['释迦牟尼佛圣诞', '善才童子圣诞'],
    14: ['吕祖纯阳祖师圣诞'],
    15: ['钟离祖师圣诞'],
    17: ['十殿阎罗天子诞'],
    18: ['紫阳真人涌泉子圣诞', '北极紫微大帝圣诞'],
    20: ['眼光娘娘圣诞'],
    28: ['药王菩萨圣诞']
  },
  5: {
    1: ['东方玉宝皇上天尊三殿宋帝王诞'],
    5: ['南极长生大帝圣诞', '地腊之辰'],
    8: ['南方五道诸神降'],
    11: ['城隍爷圣诞'],
    12: ['炳灵公圣诞'],
    13: ['关圣帝君圣诞'],
    16: ['天地元气造化万物之辰'],
    18: ['张天师圣诞'],
    22: ['孝娥神圣诞'],
    25: ['龙神会'],
    27: ['天地交道万物化生之辰']
  },
  6: {
    1: ['东方玉宝皇上天尊四殿五官王诞'],
    3: ['韦驮菩萨圣诞'],
    10: ['金粟如来圣诞'],
    13: ['魁星圣诞'],
    15: ['灵官王天君圣诞'],
    19: ['观世音菩萨成道'],
    23: ['南方火神圣诞'],
    24: ['雷祖圣诞', '关圣帝君圣诞'],
    25: ['王天君诞']
  },
  7: {
    1: ['东方玉宝皇上天尊五殿阎罗天子诞'],
    7: ['道德腊之辰', '五帝校定人官爵'],
    12: ['长真谭真人圣诞'],
    13: ['大势至菩萨圣诞'],
    15: ['中元地官赦罪地藏王菩萨圣诞'],
    18: ['王母娘娘圣诞'],
    19: ['太岁周堂诞'],
    22: ['增福财神诞'],
    26: ['张三丰真人圣诞'],
    29: ['杨祖（杨筠松）圣诞'],
    30: ['地藏王菩萨圣诞']
  },
  8: {
    1: ['东方玉宝皇上天尊六殿卞城王诞'],
    3: ['北斗七元降'],
    5: ['北方五道诸神降'],
    10: ['北岳大帝诞辰'],
    15: ['太阴星君诞'],
    16: ['天曹掠刷真君降'],
    18: ['天人兴福之辰'],
    23: ['汉恒候张显王圣诞'],
    24: ['灶君夫人诞'],
    27: ['至圣先师孔子诞辰']
  },
  9: {
    1: ['东方玉宝皇上天尊七殿泰山王诞'],
    2: ['北斗九皇降'],
    3: ['五瘟神诞'],
    9: ['斗母圣诞', '酆都大帝诞'],
    10: ['斗母降'],
    17: ['金龙四大王诞'],
    19: ['观世音菩萨出家'],
    25: ['孔子飞升'],
    28: ['五显灵官马元帅圣诞'],
    29: ['药师琉璃光佛圣诞'],
    30: ['药王菩萨圣诞']
  },
  10: {
    1: ['东方玉宝皇上天尊八殿都市王诞', '民岁腊之辰'],
    3: ['三茅应化真君圣诞'],
    5: ['达摩祖师圣诞'],
    6: ['天曹考察', '天曹考察'],
    15: ['下元水官解厄水官大帝圣诞'],
    23: ['四明真君圣诞'],
    27: ['北极紫微大帝降'],
    30: ['药师琉璃光如来圣诞']
  },
  11: {
    1: ['东方玉宝皇上天尊九殿平等王诞'],
    4: ['至圣先师孔子诞'],
    6: ['西岳大帝圣诞'],
    11: ['太乙救苦天尊圣诞'],
    17: ['阿弥陀佛圣诞'],
    19: ['太阳日宫圣诞'],
    21: ['昊天上帝圣诞'],
    25: ['掌善童子圣诞'],
    26: ['北方五道诸神降']
  },
  12: {
    1: ['东方玉宝皇上天尊十殿转轮王诞'],
    8: ['释迦牟尼佛成道'],
    16: ['南岳大帝圣诞'],
    20: ['天地交道万物化生之辰'],
    21: ['天猷上帝圣诞'],
    23: ['五岳诸神降', '张仙圣诞'],
    24: ['子时祈福'],
    25: ['三清同降', '玉帝校察善恶'],
    29: ['华严菩萨圣诞'],
    30: ['诸神下降察访善恶']
  }
}

// 事件类型判断
const getEventType = (event) => {
  if (event.includes('佛') || event.includes('菩萨')) return '佛教'
  if (event.includes('真人') || event.includes('道场') || event.includes('老君')) return '道教'
  if (event.includes('帝') || event.includes('王')) return '帝王'
  if (event.includes('星') || event.includes('斗')) return '星宿'
  return '其他'
}

// 事件类型样式
const getEventTypeClass = (event) => {
  const type = getEventType(event)
  const classes = {
    '佛教': 'bg-yellow-500',
    '道教': 'bg-green-500',
    '帝王': 'bg-red-500',
    '星宿': 'bg-blue-500',
    '其他': 'bg-gray-500'
  }
  return classes[type]
}

// 获取农历月份
const getLunarMonth = (month) => {
  const solar = Solar.fromYmd(2025, month, 1)
  const lunar = solar.getLunar()
  return lunar.getMonthInChinese()
}

// 获取农历日期
const getLunarDay = (month, day) => {
  const solar = Solar.fromYmd(2025, month, day)
  const lunar = solar.getLunar()
  return lunar.getDayInChinese()
}

// 搜索过滤
const filteredEvents = computed(() => {
  if (!searchQuery.value) return monthData[currentMonth.value]
  
  const result = {}
  const events = monthData[currentMonth.value]
  
  for (const [day, dayEvents] of Object.entries(events)) {
    const filteredDayEvents = dayEvents.filter(event => 
      event.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    if (filteredDayEvents.length > 0) {
      result[day] = filteredDayEvents
    }
  }
  
  return result
})
</script>

<style scoped>
/* 添加过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 