<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { UI } from '@/components'
import { iconName } from '@/components/UI/Icon/constant'
import { qnaApis } from '@/services/qna/api'
import { getQnAItems } from '@/store/qna/actions'
import type { QnA } from '@/services/qna/type'
import PageLoading from '@/views/components/PageLoading.vue'
import useMessage from '@/components/UI/ToastMessage/useMessage'
import useQnAStore from '@/store/qna/QnAStore'
import utils from '@/utils'

const { Section, Accordion, Space, Icon, Button, Loading } = UI

const { Spinner } = Loading

const messageApi = useMessage()

const qnaStore = useQnAStore()

const activeIds = ref<string[]>([])

const loading = ref<boolean>(false)

const handleCollapse = (id: string) => {
  const listIds = [...activeIds.value]
  const idx = listIds.indexOf(id)
  if (idx === -1) activeIds.value = [...listIds, id]
  else activeIds.value = [...listIds].filter((i) => i !== id)
}

const handleRemoveItem = async (id: string) => {
  loading.value = true
  const res = await qnaApis.remove({ qnaItemId: id })
  if (res.error) {
    messageApi.error('Remove error')
    return (loading.value = false)
  }
  messageApi.success('Removed success')
  getQnAItems(messageApi, qnaStore.addQnaItems)
  loading.value = false
}

onMounted(() => getQnAItems(messageApi, qnaStore.addQnaItems, loading))
</script>

<template>
  <PageLoading v-if="loading" />

  <div class="admin-qna-list" v-if="!loading">
    <Accordion
      v-for="(item, idx) in qnaStore.qnaItems"
      :key="item.id"
      :label="item.title"
      :contentId="`qnaContent-${idx}`"
      :bordered="false"
      :showLabelIcon="false"
      :rootClassName="`list-qna ${activeIds.includes(item.id as string) ? 'list-qna-active' : ''}`"
      contentClassName="qna-content"
      @onCollapse="() => handleCollapse(item.id as string)"
    >
      <div v-html="utils.formatQuill(item.content)"></div>

      <Space justify="end" aligns="middle" size="md">
        <router-link v-if="!loading" :to="`/admin/qna/form/${item.id}`" class="content-icon">
          <Icon :iconName="iconName.PEN_ALT" />
        </router-link>
        <button v-if="!loading" class="content-icon" @click="() => handleRemoveItem(item.id as string)">
          <Icon :iconName="iconName.TRASH" />
        </button>
        <div v-if="loading" class="content-icon">
          <Spinner />
        </div>
      </Space>
    </Accordion>

    <div class="content-footer">
      <router-link to="/admin/qna/form/0">
        <Button color="red" rootClassName="content-action">New Q&A</Button>
      </router-link>
    </div>
  </div>
</template>
