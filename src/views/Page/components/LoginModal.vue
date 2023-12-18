<script setup lang="ts">
import * as yup from 'yup'
import { ref } from 'vue'
import { UI, Control } from '@/components'
import type { Account } from '@/services/auth/type.ts'
import { authApis } from '@/services/auth/api.ts'
import useMessage from '@/components/UI/ToastMessage/useMessage.ts'
import useAuthStore from '@/store/auth/AuthStore.ts'

const { Modal, Button, Typography, Space } = UI

const { Title } = Typography

const { Form, Input, InputPassword } = Control

interface LoginModalProps {
  open: boolean
}

const props = defineProps<LoginModalProps>()

const emits = defineEmits(['onClose'])

const messageApi = useMessage()

const { addAuth } = useAuthStore()

const loading = ref<boolean>(false)

const initialValues = ref<Account>({
  account: '',
  password: ''
})

const handleClose = () => emits('onClose')

const handleSubmit = async (formData: Account) => {
  loading.value = true
  const res = await authApis.signIn(formData)
  if (res.error) {
    messageApi.error(res.error.message)
    return (loading.value = false)
  }
  addAuth(res.success)
  messageApi.success('Sign in success')
  loading.value = false
  handleClose()
}
</script>

<template>
  <Modal
    sizes="sm"
    rootClassName="login-form"
    headClassName="form-head"
    :open="open"
    :hasFoot="false"
    @onClose="handleClose"
  >
    <template #head>
      <Title rootClassName="head-title" aligns="center"> Login </Title>
    </template>
    <template #body>
      <Form color="blue" shape="round" sizes="lg" :initialValues="initialValues" @onFinish="handleSubmit">
        <Input name="account" placeholder="Account" :rule="yup.string().required('This field is required')" />
        <InputPassword
          name="password"
          placeholder="Password"
          :rule="yup.string().required('This field is required')"
        />
        <Space justify="center">
          <Button type="submit" color="blue" rootClassName="form-action" :loading="loading">Done</Button>
        </Space>
      </Form>
    </template>
  </Modal>
</template>
@/store/auth/AuthStore