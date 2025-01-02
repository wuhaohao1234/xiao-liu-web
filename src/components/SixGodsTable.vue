<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <table class="w-full text-center">
        <thead>
          <tr class="bg-indigo-600 text-white">
            <th class="px-6 py-3">序号</th>
            <th class="px-6 py-3">六神</th>
            <th class="px-6 py-3">属性</th>
            <th class="px-6 py-3">吉凶</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(god, index) in sixGods" :key="index" 
              class="border-b hover:bg-indigo-50 transition-colors">
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-bold">{{ god.name }}</td>
            <td class="px-6 py-4">{{ god.attribute }}</td>
            <td class="px-6 py-4" :class="god.isGood ? 'text-green-600' : 'text-red-600'">
              {{ god.luck }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const sixGods = [
  {
    name: '大安',
    attribute: '土',
    luck: '大吉',
    isGood: true
  },
  {
    name: '留连',
    attribute: '水',
    luck: '中吉',
    isGood: true
  },
  {
    name: '速喜',
    attribute: '火',
    luck: '小吉',
    isGood: true
  },
  {
    name: '赤口',
    attribute: '金',
    luck: '凶',
    isGood: false
  },
  {
    name: '小吉',
    attribute: '木',
    luck: '小吉',
    isGood: true
  },
  {
    name: '空亡',
    attribute: '土',
    luck: '大凶',
    isGood: false
  }
]
</script> 