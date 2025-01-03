<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-indigo-600 text-white shadow-lg p-4">
      <div class="container mx-auto flex justify-between items-center">
        <router-link 
          to="/" 
          class="text-xl font-bold hover:text-indigo-200"
        >
          小六壬在线
        </router-link>
        <div class="space-x-6">
          <router-link 
            to="/" 
            class="hover:text-indigo-200"
          >
            排盘
          </router-link>
          <router-link 
            to="/calendar" 
            class="hover:text-indigo-200"
          >
            诸神圣诞
          </router-link>
          <router-link 
            to="/about" 
            class="hover:text-indigo-200"
          >
            关于
          </router-link>
        </div>
      </div>
    </nav>
    
    <main class="container mx-auto mt-8 px-4 pb-12">
      <router-view></router-view>
    </main>
  </div>
</template>
