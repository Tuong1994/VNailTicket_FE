import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSpinner,
  faXmark,
  faUser,
  faAngleUp,
  faAngleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faEye,
  faEyeSlash,
  faTrash,
  faSearchMinus,
  faSearchPlus,
  faRotate,
  faCheck,
  faPlus,
  faMinus,
  faCloudUpload,
  faBoxArchive,
  faList,
  faCircleCheck,
  faXmarkCircle,
  faCircleInfo,
  faCircleExclamation,
  faCalendar,
  faUpload,
  faCaretRight,
  faArrowsLeftRightToLine,
} from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import './style/main.scss'

library.add(
  faSpinner,
  faXmark,
  faUser,
  faAngleUp,
  faAngleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faEye,
  faEyeSlash,
  faTrash,
  faRotate,
  faSearchMinus,
  faSearchPlus,
  faCheck,
  faPlus,
  faMinus,
  faBoxArchive,
  faList,
  faCircleCheck,
  faXmarkCircle,
  faCircleInfo,
  faCircleExclamation,
  faCalendar,
  faCloudUpload,
  faUpload,
  faCaretRight,
  faArrowsLeftRightToLine,
)

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.component('fa', FontAwesomeIcon)

app.mount('#app')

