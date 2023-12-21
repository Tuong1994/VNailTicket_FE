<script setup lang="ts">
import { computed } from 'vue'
import { UI } from '@/components'
import { useViewPoint } from '@/hooks'

const { Button, Image } = UI

const { isPhone } = useViewPoint()

const buttonSize = computed(() => {
  if (isPhone.value) return 'sm'
  return 'lg'
})
</script>

<template>
  <div class="home-banner">
    <Image src="/images/page/Banner.jpg" rootClassName="banner-image" sizes="100%" />
    <div class="banner-actions">
      <Button :sizes="buttonSize" color="red">VN CONTACT</Button>
      <Button :sizes="buttonSize" color="blue">US CONTACT</Button>
    </div>
  </div>
</template>
