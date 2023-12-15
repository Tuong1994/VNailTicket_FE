<script setup lang="ts">
import { ref, computed, withDefaults, watchEffect, useSlots, type StyleValue } from 'vue'
import type { ComponentShape } from '@/common/type.ts'
import type { UploadError, UploadItem, UploadItems, ControlColor } from '@/components/Control/type'
import { ACCEPT_IMAGE_FILE_TYPE, DEFAULT_FILE_SIZE } from '../../constant'
import NoteMessage from '@/components/UI/NoteMessage/NoteMessage.vue'
import UploadControl from './UploadControl.vue'
import UploadViewArea from './UploadViewArea.vue'
import useFormStore from '@/components/Control/Form/FormStore.ts'
import utils from '@/utils'

export interface MultipleImageUploadProps {
  rootClassName?: string
  controlClassName?: string
  rootStyle?: StyleValue
  controlStyle?: StyleValue
  disabled?: boolean
  limit?: number
  maxUpload?: number
  fileAccepted?: string
  defaultImages?: string[]
  shape?: Exclude<ComponentShape, 'circle'>
  color?: ControlColor
}

const props = withDefaults(defineProps<MultipleImageUploadProps>(), {
  rootClassName: '',
  controlClassName: '',
  shape: 'square',
  color: 'blue',
  maxUpload: 5,
  limit: DEFAULT_FILE_SIZE,
  fileAccepted: ACCEPT_IMAGE_FILE_TYPE.join(','),
  defaultImages: () => []
})

const emits = defineEmits(['onUpload', 'onRemoveDefaultImage'])

const slots = useSlots()

const form = useFormStore()

const images = ref<UploadItems>([])

const viewImages = ref<UploadItems>([])

const defaultViewImages = ref<UploadItems>([])

const error = ref<UploadError | null>(null)

const dragged = ref<boolean>(false)

const hasLabel = computed<boolean>(() => slots.label !== undefined)

const controlColor = computed<ControlColor>(() => (form.isVee ? form.formColor : props.color))

const shapeClassName = computed<string>(() => `multiple-image-upload-${props.shape}`)

const colorClassName = computed<string>(() => `multiple-image-upload-${controlColor.value}`)

const gapClassName = computed<string>(() => (form.isVee ? 'multiple-image-upload-gap' : ''))

const dragClassName = computed<string>(() => (dragged.value ? 'upload-group-dragged' : ''))

const disabledClassName = computed<string>(() => (props.disabled ? 'upload-group-disabled' : ''))

const errorClassName = computed<string>(() => (error.value ? 'upload-group-error' : ''))

const errorMessage = computed<string | undefined>(() => {
  if (!error.value) return ''
  if (error.value.type === 'fileSize')
    return `File size must not greater than ${props.limit / (1024 * 1024)}MB`
  if (error.value.type === 'fileMax') return `Can only upload ${props.maxUpload} image per time`
  if (error.value.type === 'fileType') {
    const types = props.fileAccepted.split(',').map((type) => type.replace('image/', ''))
    return `Only accept file type ${types.join(', ')}`
  }
})

const handleUpload = (imageFiles: File[]) => {
  for (let i = 0; i < imageFiles.length; i++) {
    const image = imageFiles[i]
    if (!props.fileAccepted.includes(image.type)) return (error.value = { type: 'fileType', active: true })
    if (image.size > props.limit) return (error.value = { type: 'fileSize', active: true })
  }

  if (!viewImages.value.length) {
    if (imageFiles.length >= props.maxUpload) return (error.value = { type: 'fileMax', active: true })
  } else {
    if (imageFiles.length + viewImages.value.length > props.maxUpload)
      return (error.value = { type: 'fileMax', active: true })
  }

  const files: UploadItems = imageFiles.map((image) => ({ id: utils.uuid(), file: image }))
  if (!imageFiles.length) images.value = files
  else images.value = [...images.value, ...files]
}

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  const imageFiles: File[] = Array.from(target.files)
  handleUpload(imageFiles)
}

const handleDrag = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  if (e.type === 'dragenter' || e.type === 'dragover') dragged.value = true
  else if (e.type === 'dragleave') dragged.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  dragged.value = false
  if (e.dataTransfer.files) {
    const imageFiles: File[] = Array.from(e.dataTransfer.files)
    handleUpload(imageFiles)
  }
}

const handleRemove = (image: UploadItem) => {
  const inputRef = document.getElementById('multipleUpload') as HTMLInputElement
  if (images.value.length && inputRef && inputRef.files) {
    const fileTransfer = new DataTransfer()
    const UploadItems: File[] = Array.from(inputRef.files)
    const filterImages: File[] = UploadItems.filter((img) => img.name !== image.file?.name)

    filterImages.forEach((file) => {
      const remainFile = new File([file.name], file.name)
      fileTransfer.items.add(remainFile)
    })
    inputRef.files = fileTransfer.files
  }
  viewImages.value = [...viewImages.value].filter((img) => img.id !== image.id)
  images.value = [...images.value].filter((img) => img.id !== image.id)
}

const handleRemoveDefaultImage = (image: UploadItem) => emits('onRemoveDefaultImage', image)

// Set default images
watchEffect(() => {
  if (props.defaultImages.length)
    defaultViewImages.value = props.defaultImages.map((image) => ({ id: utils.uuid(), url: image }))
})

// Generate view images
watchEffect(() => {
  const views: UploadItems = images.value.map((image) => ({
    id: image?.id,
    url: URL.createObjectURL(image?.file as File)
  }))
  viewImages.value = views
  error.value = null
  emits(
    'onUpload',
    images.value.map((image) => image?.file as File)
  )
})
</script>

<template>
  <div
    :style="rootStyle"
    :class="['multiple-image-upload', gapClassName, shapeClassName, colorClassName, rootClassName]"
  >
    <div
      :class="['upload-group', dragClassName, errorClassName, disabledClassName]"
      @dragEnter="handleDrag"
      @dragOver="handleDrag"
      @dragLeave="handleDrag"
      @drop="handleDrop"
    >
      <UploadControl
        id="multipleUpload"
        :hasLabel="hasLabel"
        :controlClassName="controlClassName"
        :controlStyle="controlStyle"
        :accept="fileAccepted"
        :disabled="disabled"
        @onChange="handleChange"
      />
    </div>

    <NoteMessage v-if="error && error.active" type="error" :message="errorMessage" />

    <UploadViewArea
      v-if="defaultViewImages.length > 0"
      title="Default images"
      :items="defaultViewImages"
      @onRemove="handleRemoveDefaultImage"
    />

    <UploadViewArea
      v-if="viewImages.length > 0"
      title="New images"
      :items="viewImages"
      @onRemove="handleRemove"
    />
  </div>
</template>
