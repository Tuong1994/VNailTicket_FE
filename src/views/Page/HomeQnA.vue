<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { UI } from '@/components'
import { QnA } from '@/services/qna/type.ts'
import { qnaApis } from '@/services/qna/api.ts'
import useMessage from '@/components/UI/ToastMessage/useMessage.ts'

const { Section, Typography, Accordion } = UI

const { Title, Paragraph } = Typography

const messageApi = useMessage()

const activeIds = ref<string[]>([])

const qnaItems = ref<QnA[]>([])

const handleCollapse = (id: string) => {
  const listIds = [...activeIds.value]
  const idx = listIds.indexOf(id)
  if (idx === -1) activeIds.value = [...listIds, id]
  else activeIds.value = [...listIds].filter((i) => i !== id)
}

const getQnAItems = async () => {
  const res = await qnaApis.getList()
  if (res.error) return messageApi.error('Api network error')
  qnaItems.value = res.success
}

onMounted(() => getQnAItems())
</script>

<template>
  <Section rootClassName="home-qna">
    <Title rootClassName="section-title" aligns="center"> Q & A </Title>

    <Paragraph aligns="center" :size="16">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laudantium quod, alias nemo minus fugit?
    </Paragraph>

    <Accordion
      v-for="(item, idx) in qnaItems"
      :key="item.id"
      :label="item.title"
      :contentId="`qnaContent-${idx}`"
      :bordered="false"
      rootClassName="qna-item"
      contentClassName="item-content"
      :labelClassName="`item-label ${activeIds.includes(item.id) ? 'item-label-active' : ''}`"
      @onCollapse="() => handleCollapse(item.id)"
    >
      {{ item.content }}
      <template #extraLabel>
        <img v-if="!activeIds.includes(item.id)" src="/images/icons/Arrow 1.png" class="label-icon" />
        <img v-if="activeIds.includes(item.id)" src="/images/icons/Arrow 2.png" class="label-icon" />
      </template>
    </Accordion>
  </Section>
</template>
