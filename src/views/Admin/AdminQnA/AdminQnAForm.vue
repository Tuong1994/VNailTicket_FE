<script setup lang="ts">
import { ref, computed } from 'vue'
import { UI, Control } from '@/components'
import { useRouter } from 'vue-router'

interface FormData {
  title: string
  content: string
}

const { Space, Grid, Button } = UI

const { Row, Col } = Grid

const { Form, Input, TextEditor } = Control

const router = useRouter()

const params = computed(() => router.currentRoute.value.params)

const initialValues = ref<FormData>({
  title: '',
  content: ''
})
</script>

<template>
  <Form :initialValues="initialValues">
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
          <Button rootClassName="content-action" color="red">
            {{ params.id === '0' ? 'Complete' : 'Save' }}
          </Button>
        </Col>
      </Row>
    </div>
  </Form>
</template>
