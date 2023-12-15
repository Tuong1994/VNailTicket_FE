<script setup lang="ts">
import HomeBanner from './HomeBanner.vue'
import HomeQnA from './HomeQnA.vue'
import HomePartners from './HomePartners.vue'
import HomeImages from './HomeImages.vue'
import HomeFooter from './HomeFooter.vue'
</script>

<template>
  <div class="home">
    <HomeBanner />
    <HomeQnA />
    <div class="home-section-divide" />
    <HomePartners />
    <div class="home-section-divide" />
    <HomeImages />
    <HomeFooter />
  </div>
</template>
