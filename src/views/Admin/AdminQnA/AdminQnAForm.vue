<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UI, Control } from '@/components'
import { useRouter } from 'vue-router'
import { QnA } from '@/services/qna/type.ts'
import { qnaApis } from '@/services/qna/api.ts'
import useMessage from '@/components/UI/ToastMessage/useMessage.ts'

const { Space, Grid, Button } = UI

const { Row, Col } = Grid

const { Form, Input, TextEditor } = Control

const messageApi = useMessage()

const router = useRouter()

const params = computed(() => router.currentRoute.value.params)

const initialValues = ref<QnA>({
  title: '',
  content: ''
})

const getQnA = async () => {
  if (!params.value.id || params.value.id === '0') return
  const res = await qnaApis.getDetail({ qnaItemId: params.value.id })
  if (res.error) return messageApi.error('Api network error')
  initialValues.value = res.success
}

onMounted(() => getQnA())

const handleSubmit = (formData: QnA) => {
  console.log(formData)
}
</script>

<template>
  <Form :initialValues="initialValues" @onFinish="handleSubmit">
    <Input name="title" placeholder="Title" />

    <TextEditor name="content" />

    <div class="content-footer">
      <Row justify="between">
        <Col :lg="6" :span="6">
          <router-link to="/admin">
            <Button rootClassName="content-action" ghost color="red">Close</Button>
          </router-link>
        </Col>
        <Col :lg="18" :span="18">
          <Button type="submit" rootClassName="content-action" color="red">
            {{ params.id === '0' ? 'Complete' : 'Save' }}
          </Button>
        </Col>
      </Row>
    </div>
  </Form>
</template>
