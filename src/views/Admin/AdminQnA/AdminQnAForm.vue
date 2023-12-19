<script setup lang="ts">
import * as yup from 'yup'
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

const isEdit = computed<boolean>(() => params.value.id && params.value.id !== '0')

const loading = ref<boolean>(false)

const initialValues = ref<QnA>({
  title: '',
  content: ''
})

const getQnA = async () => {
  if (!isEdit.value) return
  const res = await qnaApis.getDetail({ qnaItemId: params.value.id })
  if (res.error) return messageApi.error('Api network error')
  initialValues.value = res.success
}

onMounted(() => getQnA())

const handleSubmit = async (formData: QnA) => {
  loading.value = true
  if (!isEdit.value) {
    const res = await qnaApis.create(formData)
    if (res.error) messageApi.error('Create error')
    else {
      messageApi.success('Created success')
      router.push(`/admin/qna/form/${res.success.id}`)
    }
  } else {
    const res = await qnaApis.update({ qnaItemId: params.value.id }, formData)
    if (res.error) messageApi.error('Update error')
    else {
      messageApi.success('Updated success')
      getQnA()
    }
  }
  loading.value = false
}
</script>

<template>
  <Form :initialValues="initialValues" @onFinish="handleSubmit">
    <Input name="title" placeholder="Title" :rule="yup.string().required('This field is required')" />

    <TextEditor name="content" />

    <div class="content-footer">
      <Row justify="between">
        <Col :lg="6" :span="6">
          <router-link to="/admin">
            <Button rootClassName="content-action" ghost color="red">Close</Button>
          </router-link>
        </Col>
        <Col :lg="18" :span="18">
          <Button type="submit" :loading="loading" rootClassName="content-action" color="red">
            {{ !isEdit ? 'Complete' : 'Save' }}
          </Button>
        </Col>
      </Row>
    </div>
  </Form>
</template>
