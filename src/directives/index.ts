import type {App} from 'vue'
import FocusDirective from '@/directives/focus-directive'

export default {
  install(app: App) {
    app.directive(FocusDirective.NAME, new FocusDirective())
  }
}
