<script setup lang="ts">
import HomeBanner from './HomeBanner.vue'
import HomeQnA from './HomeQnA.vue'
import HomePartners from './HomePartners.vue'
import HomeImages from './HomeImages.vue'
import HomeFooter from './HomeFooter.vue'
</script>

<template>
  <div class="home">
    <div class="home-content">
      <HomeBanner />
      <HomeQnA />
      <div class="content-section-divide" />
      <HomePartners />
      <div class="content-section-divide" />
      <HomeImages />
      <HomeFooter />
    </div>
  </div>
</template>
