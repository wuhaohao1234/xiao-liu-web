<template>
  <div class="relative">
    <canvas 
      ref="canvas" 
      width="400" 
      height="500" 
      class="mx-auto"
    ></canvas>
    <!-- 六神文字标注 -->
    <div 
      v-for="(text, index) in sixGods" 
      :key="index"
      :style="getTextPosition(index)"
      class="absolute text-sm font-bold text-indigo-700"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
const sixGods = ['大安', '留连', '速喜', '赤口', '小吉', '空亡']

// 计算六神文字位置
const getTextPosition = (index) => {
  const positions = [
    { left: '30%', top: '35%' },    // 大安（大拇指）
    { left: '65%', top: '15%' },    // 留连（食指）
    { left: '75%', top: '30%' },    // 速喜（中指）
    { left: '70%', top: '45%' },    // 赤口（无名指）
    { left: '65%', top: '60%' },    // 小吉（小指）
    { left: '50%', top: '40%' }     // 空亡（手掌中心）
  ]
  return positions[index]
}

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  
  // 设置线条样式
  ctx.strokeStyle = '#4338ca'
  ctx.lineWidth = 3
  
  // 绘制手掌
  ctx.beginPath()
  
  // 手腕部分
  ctx.moveTo(150, 450)
  ctx.lineTo(300, 450)
  
  // 手掌右侧轮廓
  ctx.bezierCurveTo(320, 440, 320, 420, 310, 400) // 手掌右下角
  
  // 小指
  ctx.bezierCurveTo(330, 380, 330, 340, 300, 320)
  
  // 无名指
  ctx.bezierCurveTo(340, 300, 340, 260, 290, 240)
  
  // 中指
  ctx.bezierCurveTo(340, 220, 340, 180, 280, 160)
  
  // 食指
  ctx.bezierCurveTo(320, 140, 310, 100, 260, 120)
  
  // 大拇指和虎口
  ctx.bezierCurveTo(220, 130, 180, 140, 160, 160)
  ctx.bezierCurveTo(120, 190, 100, 230, 120, 280)
  
  // 手掌左侧轮廓
  ctx.bezierCurveTo(100, 320, 120, 380, 150, 450)
  
  // 填充手掌
  ctx.fillStyle = '#eef2ff'
  ctx.fill()
  ctx.stroke()
  
  // 绘制主要掌纹
  ctx.beginPath()
  ctx.lineWidth = 2
  
  // 生命线
  ctx.moveTo(160, 180)
  ctx.bezierCurveTo(140, 250, 140, 320, 150, 400)
  ctx.stroke()
  
  // 智慧线
  ctx.beginPath()
  ctx.moveTo(150, 300)
  ctx.bezierCurveTo(200, 320, 250, 320, 290, 300)
  ctx.stroke()
  
  // 感情线
  ctx.beginPath()
  ctx.moveTo(160, 220)
  ctx.bezierCurveTo(200, 200, 240, 200, 280, 220)
  ctx.stroke()
  
  // 命运线
  ctx.beginPath()
  ctx.moveTo(220, 180)
  ctx.lineTo(220, 380)
  ctx.stroke()
})
</script> 