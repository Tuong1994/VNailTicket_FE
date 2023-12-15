<script setup lang="ts">
import { computed, ref } from 'vue'
import { UI } from '@/components'

const { Section, Typography, Accordion } = UI

const { Title, Paragraph } = Typography

const activeIds = ref<string[]>([])

const items = computed(() => [
  {
    id: '1',
    title: 'What is EB3 Visa?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat! Modi quasi perspiciatis voluptates impedit commodi porro sequi distinctio asperiores rem doloremque iste molestiae in eaque veniam odio nisi quo repudiandae nemo quae quia, expedita, nulla temporibus veritatis. Eaque voluptatibus dolor itaque qui?'
  },
  {
    id: '2',
    title: 'What is a bulletin visa?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat! Modi quasi perspiciatis voluptates impedit commodi porro sequi distinctio asperiores rem doloremque iste molestiae in eaque veniam odio nisi quo repudiandae nemo quae quia, expedita, nulla temporibus veritatis. Eaque voluptatibus dolor itaque qui?'
  },
  {
    id: '3',
    title: 'Who is EB3 Visa for?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat! Modi quasi perspiciatis voluptates impedit commodi porro sequi distinctio asperiores rem doloremque iste molestiae in eaque veniam odio nisi quo repudiandae nemo quae quia, expedita, nulla temporibus veritatis. Eaque voluptatibus dolor itaque qui?'
  },
  {
    id: '4',
    title: 'What is the EB3 Unskilled Worker Visa?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat! Modi quasi perspiciatis voluptates impedit commodi porro sequi distinctio asperiores rem doloremque iste molestiae in eaque veniam odio nisi quo repudiandae nemo quae quia, expedita, nulla temporibus veritatis. Eaque voluptatibus dolor itaque qui?'
  },
  {
    id: '5',
    title: 'What kind of visa will the Spouse and Children get?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat! Modi quasi perspiciatis voluptates impedit commodi porro sequi distinctio asperiores rem doloremque iste molestiae in eaque veniam odio nisi quo repudiandae nemo quae quia, expedita, nulla temporibus veritatis. Eaque voluptatibus dolor itaque qui?'
  },
  {
    id: '6',
    title: 'Condition to participate in the program',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur maiores error commodi, quas officiis, atque quia ex facere totam porro quam dicta tempore vero dolores labore voluptas minima inventore. Ipsum, explicabo! Nam ipsam expedita laborum tenetur voluptatibus, iusto beatae, non amet hic voluptatum, perferendis voluptatem fugiat! Modi quasi perspiciatis voluptates impedit commodi porro sequi distinctio asperiores rem doloremque iste molestiae in eaque veniam odio nisi quo repudiandae nemo quae quia, expedita, nulla temporibus veritatis. Eaque voluptatibus dolor itaque qui?'
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
  <Section rootClassName="home-qna">
    <Title rootClassName="section-title" aligns="center"> Q & A </Title>

    <Paragraph aligns="center" :size="16">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laudantium quod, alias nemo minus fugit?
    </Paragraph>

    <Accordion
      v-for="(item, idx) in items"
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
