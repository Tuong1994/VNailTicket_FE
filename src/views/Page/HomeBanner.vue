<script setup lang="ts">
import { UI } from '@/components'

const { Button, Image } = UI
</script>

<template>
  <div class="home-banner">
    <Image src="/images/page/Banner.jpg" rootClassName="banner-image" sizes="100%" />
    <div class="banner-actions">
      <Button sizes="lg" color="red">VN CONTACT</Button>
      <Button sizes="lg" color="blue">US CONTACT</Button>
    </div>
  </div>
</template>
