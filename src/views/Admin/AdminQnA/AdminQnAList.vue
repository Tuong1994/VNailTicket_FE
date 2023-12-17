<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { UI } from '@/components'
import { iconName } from '@/components/UI/Icon/constant.ts'
import { QnA } from '@/services/qna/type.ts'
import { qnaApis } from '@/services/qna/api.ts'
import useMessage from '@/components/UI/ToastMessage/useMessage.ts'

const { Section, Accordion, Space, Icon, Button } = UI

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
  <div class="admin-qna-list">
    <Accordion
      v-for="(item, idx) in qnaItems"
      :key="item.id"
      :label="item.title"
      :contentId="`qnaContent-${idx}`"
      :bordered="false"
      :showLabelIcon="false"
      :rootClassName="`list-qna ${activeIds.includes(item.id) ? 'list-qna-active' : ''}`"
      contentClassName="qna-content"
      @onCollapse="() => handleCollapse(item.id)"
    >
      {{ item.content }}

      <Space justify="right" aligns="center" size="md">
        <router-link :to="`/admin/qna/form/${item.id}`" class="content-icon">
          <Icon :iconName="iconName.PEN_ALT" />
        </router-link>
        <button class="content-icon">
          <Icon :iconName="iconName.TRASH" />
        </button>
      </Space>
    </Accordion>

    <div class="content-footer">
      <router-link to="/admin/qna/form/0">
        <Button color="red" rootClassName="content-action">New Q&A</Button>
      </router-link>
    </div>
  </div>
</template>
