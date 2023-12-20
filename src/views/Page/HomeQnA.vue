<script setup lang="ts">
import { computed, ref } from 'vue'
import { UI } from '@/components'
import type { QnA } from '@/services/qna/type'
import { qnaApis } from '@/services/qna/api'
import useMessage from '@/components/UI/ToastMessage/useMessage'
import useQnAStore from '@/store/qna/QnAStore'
import utils from '@/utils'

const { Section, Typography, Accordion } = UI

const { Title, Paragraph } = Typography

const messageApi = useMessage()

const qnaStore = useQnAStore()

const activeIds = ref<string[]>([])

const handleCollapse = (id: string) => {
  const listIds = [...activeIds.value]
  const idx = listIds.indexOf(id)
  if (idx === -1) activeIds.value = [...listIds, id]
  else activeIds.value = [...listIds].filter((i) => i !== id)
}
</script>

<template>
  <Section rootClassName="home-qna">
    <Title rootClassName="section-title" aligns="center"> Q & A </Title>

    <Paragraph aligns="center" :size="16">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laudantium quod, alias nemo minus fugit?
    </Paragraph>

    <Accordion
      v-for="(item, idx) in qnaStore.qnaItems"
      :key="item.id"
      :label="item.title"
      :contentId="`qnaContent-${idx}`"
      :bordered="false"
      rootClassName="qna-item"
      contentClassName="item-content"
      :labelClassName="`item-label ${activeIds.includes(item.id as string) ? 'item-label-active' : ''}`"
      @onCollapse="() => handleCollapse(item.id as string)"
    >
      <div v-html="utils.formatQuill(item.content)"></div>
      <template #extraLabel>
        <img v-if="!activeIds.includes(item.id as string)" src="/images/icons/Arrow 1.png" class="label-icon" />
        <img v-if="activeIds.includes(item.id as string)" src="/images/icons/Arrow 2.png" class="label-icon" />
      </template>
    </Accordion>
  </Section>
</template>