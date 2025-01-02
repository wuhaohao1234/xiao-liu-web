<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">小六壬在线排盘</h1>
    
    <!-- 六神表格 -->
    <div class="mb-8">
      <SixGodsTable />
    </div>
    
    <!-- 日期选择区域 -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div class="grid grid-cols-2 gap-4">
        <!-- 当前时间选项 -->
        <button 
          class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          @click="calculateCurrent"
        >
          使用当前时间
        </button>

        <!-- 手动输入选项 -->
        <button 
          class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          @click="showManualInput = true"
        >
          手动输入农历
        </button>
      </div>

      <!-- 手动输入表单 -->
      <div v-if="showManualInput" class="mt-6 space-y-4">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">农历月份</label>
            <select v-model="manualDate.month" class="w-full border rounded-md px-3 py-2">
              <option v-for="n in 12" :key="n" :value="n">{{ n }}月</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">农历日期</label>
            <select v-model="manualDate.day" class="w-full border rounded-md px-3 py-2">
              <option v-for="n in 30" :key="n" :value="n">{{ n }}日</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">时辰</label>
            <select v-model="manualDate.hour" class="w-full border rounded-md px-3 py-2">
              <option v-for="(zhi, index) in earthlyBranches" :key="index" :value="zhi">
                {{ zhi }}时
              </option>
            </select>
          </div>
        </div>
        <button 
          class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          @click="calculateManual"
        >
          计算结果
        </button>
      </div>
    </div>
    
    <!-- 日期显示区域 -->
    <div v-if="dateInfo" class="space-y-6 mb-6">
      <!-- 阳历日期显示 -->
      <div v-if="dateInfo.solar" class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold text-center text-indigo-600 mb-4">当前阳历</h2>
        <div class="grid grid-cols-5 gap-4 text-center">
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">年</div>
            <div class="font-bold text-indigo-700">{{ dateInfo.solar.year }}</div>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">月</div>
            <div class="font-bold text-indigo-700">{{ dateInfo.solar.month }}</div>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">日</div>
            <div class="font-bold text-indigo-700">{{ dateInfo.solar.day }}</div>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">时</div>
            <div class="font-bold text-indigo-700">{{ dateInfo.solar.hour }}</div>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">星期</div>
            <div class="font-bold text-indigo-700">{{ dateInfo.solar.weekday }}</div>
          </div>
        </div>
      </div>

      <!-- 农历日期显示 -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold text-center text-indigo-600 mb-4">
          {{ dateInfo.solar ? '当前农历' : '输入农历' }}
        </h2>
        <div class="grid grid-cols-4 gap-4 text-center">
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">年</div>
            <div class="font-bold text-indigo-700">{{ dateInfo.lunar.year }}</div>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">月</div>
            <div class="font-bold text-indigo-700">{{ dateInfo.lunar.month }}</div>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">日</div>
            <div class="font-bold text-indigo-700">{{ dateInfo.lunar.day }}</div>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">时辰</div>
            <div class="font-bold text-indigo-700">{{ dateInfo.lunar.hour }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="grid grid-cols-1 gap-6">
        <!-- 占事输入 -->
        <div class="space-y-2">
          <label class="block text-gray-700">占事内容</label>
          <textarea 
            class="w-full border rounded-md px-3 py-2 h-24"
            placeholder="请输入您想要占卜的事情..."
            v-model="question"
          ></textarea>
        </div>
        
        <!-- 添加回开始排盘按钮 -->
        <button 
          class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          @click="startDivination"
        >
          开始排盘
        </button>
      </div>
    </div>
    
    <!-- 推算结果显示 -->
    <div v-if="divinationResult" class="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 class="text-xl font-bold text-center text-indigo-600 mb-4">推算结果</h2>
      <div class="space-y-4">
        <!-- 六神显示 -->
        <div class="grid grid-cols-3 gap-4 text-center mb-6">
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">月神（当前状态）</div>
            <div class="font-bold text-indigo-700">{{ divinationResult.monthGod }}</div>
            <div class="text-sm text-gray-600 mt-2">
              {{ godInterpretations[divinationResult.monthGod]?.states.current }}
            </div>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">日神（发展过程）</div>
            <div class="font-bold text-indigo-700">{{ divinationResult.dayGod }}</div>
            <div class="text-sm text-gray-600 mt-2">
              {{ godInterpretations[divinationResult.dayGod]?.states.process }}
            </div>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg">
            <div class="text-gray-600 mb-1">时神（最终结果）</div>
            <div class="font-bold text-indigo-700">{{ divinationResult.result }}</div>
            <div class="text-sm text-gray-600 mt-2">
              {{ godInterpretations[divinationResult.result]?.states.result }}
            </div>
          </div>
        </div>
        
        <!-- 总体解释 -->
        <div class="border-t pt-4">
          <h3 class="font-bold text-lg text-indigo-600 mb-2">
            总体断语
          </h3>
          <div class="space-y-4 text-gray-700">
            <!-- 三神解释 -->
            <div class="grid grid-cols-1 gap-4">
              <!-- 月神解释 -->
              <div class="bg-indigo-50 p-4 rounded-lg">
                <h4 class="font-semibold text-indigo-600 mb-2">月神断语：{{ divinationResult.monthGod }}</h4>
                <div class="space-y-2">
                  <p class="font-semibold">含义：{{ godInterpretations[divinationResult.monthGod]?.meaning }}</p>
                  <p>断语：{{ godInterpretations[divinationResult.monthGod]?.interpretation }}</p>
                  <p>详解：{{ godInterpretations[divinationResult.monthGod]?.details }}</p>
                </div>
              </div>
              
              <!-- 日神解释 -->
              <div class="bg-indigo-50 p-4 rounded-lg">
                <h4 class="font-semibold text-indigo-600 mb-2">日神断语：{{ divinationResult.dayGod }}</h4>
                <div class="space-y-2">
                  <p class="font-semibold">含义：{{ godInterpretations[divinationResult.dayGod]?.meaning }}</p>
                  <p>断语：{{ godInterpretations[divinationResult.dayGod]?.interpretation }}</p>
                  <p>详解：{{ godInterpretations[divinationResult.dayGod]?.details }}</p>
                </div>
              </div>
              
              <!-- 时神解释 -->
              <div class="bg-indigo-50 p-4 rounded-lg">
                <h4 class="font-semibold text-indigo-600 mb-2">时神断语：{{ divinationResult.result }}</h4>
                <div class="space-y-2">
                  <p class="font-semibold">含义：{{ godInterpretations[divinationResult.result]?.meaning }}</p>
                  <p>断语：{{ godInterpretations[divinationResult.result]?.interpretation }}</p>
                  <p>详解：{{ godInterpretations[divinationResult.result]?.details }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SixGodsTable from '../components/SixGodsTable.vue'
import { Lunar, Solar } from 'lunar-javascript'
import { calculateLiuren, godInterpretations } from '../utils/liurenCalc'

const question = ref('')
const dateInfo = ref(null)
const divinationResult = ref(null)
const showManualInput = ref(false)

const weekdays = ['日', '一', '二', '三', '四', '五', '六']
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

const manualDate = ref({
  month: 1,
  day: 1,
  hour: '子'
})

const interpretation = computed(() => {
  if (!divinationResult.value) return {}
  return godInterpretations[divinationResult.value.result] || {}
})

// 添加时辰转换函数
const getTimeZhi = (hour) => {
  const timeZhiMap = {
    23: '子', 0: '子', 1: '丑', 2: '丑',
    3: '寅', 4: '寅', 5: '卯', 6: '卯',
    7: '辰', 8: '辰', 9: '巳', 10: '巳',
    11: '午', 12: '午', 13: '未', 14: '未',
    15: '申', 16: '申', 17: '酉', 18: '酉',
    19: '戌', 20: '戌', 21: '亥', 22: '亥'
  }
  return timeZhiMap[hour] || '子'
}

// 使用当前时间计算
const calculateCurrent = () => {
  const now = new Date()
  const solar = Solar.fromDate(now)
  const lunar = solar.getLunar()
  const currentHour = now.getHours()
  const currentTimeZhi = getTimeZhi(currentHour)
  
  calculateAndDisplay(lunar, currentTimeZhi)
}

// 使用手动输入时间计算
const calculateManual = () => {
  // 计算六壬卦象
  divinationResult.value = calculateLiuren({
    month: manualDate.value.month.toString(),
    day: manualDate.value.day.toString(),
    hour: manualDate.value.hour
  })

  // 设置显示信息
  dateInfo.value = {
    solar: null, // 手动输入时不显示阳历
    lunar: {
      year: '手动输入',
      month: manualDate.value.month + '月',
      day: manualDate.value.day + '日',
      hour: manualDate.value.hour + '时'
    }
  }
}

// 通用计算和显示函数
const calculateAndDisplay = (lunar, timeZhi) => {
  const now = new Date()
  
  dateInfo.value = {
    solar: {
      year: now.getFullYear() + '年',
      month: (now.getMonth() + 1) + '月',
      day: now.getDate() + '日',
      hour: now.getHours() + '时',
      weekday: '星期' + weekdays[now.getDay()]
    },
    lunar: {
      year: lunar.getYearInGanZhi() + '年',
      month: lunar.getMonthInChinese() + '月',
      day: lunar.getDayInChinese(),
      hour: timeZhi + '时'
    }
  }

  divinationResult.value = calculateLiuren({
    month: lunar.getMonth().toString(),
    day: lunar.getDay().toString(),
    hour: timeZhi
  })
}

// 添加开始排盘函数
const startDivination = () => {
  
  if (showManualInput.value) {
    calculateManual()
  } else {
    calculateCurrent()
  }
}

// 页面加载时默认使用当前时间
calculateCurrent()
</script> 