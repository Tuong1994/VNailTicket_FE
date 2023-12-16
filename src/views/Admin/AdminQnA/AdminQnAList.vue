<script setup lang="ts">
import { computed, ref } from 'vue'
import { UI } from '@/components'
import { iconName } from '@/components/UI/Icon/constant.ts'

const { Section, Accordion, Space, Icon, Button } = UI

const activeIds = ref<string[]>([])

const items = computed(() => [
  {
    id: '1',
    title: 'What is EB3 Visa?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat!'
  },
  {
    id: '2',
    title: 'What is a bulletin visa?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat!'
  },
  {
    id: '3',
    title: 'Who is EB3 Visa for?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat!'
  },
  {
    id: '4',
    title: 'What is the EB3 Unskilled Worker Visa?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat!'
  },
  {
    id: '5',
    title: 'What kind of visa will the Spouse and Children get?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat!'
  },
  {
    id: '6',
    title: 'Condition to participate in the program',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat!'
  }
])

const handleCollapse = (id: string) => {
  const listIds = [...activeIds.value]
  const idx = listIds.indexOf(id)
  if (idx === -1) activeIds.value = [...listIds, id]
  else activeIds.value = [...listIds].filter((i) => i !== id)
}
</script>

<template>
  <div class="admin-qna-list">
    <Accordion
      v-for="(item, idx) in items"
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
