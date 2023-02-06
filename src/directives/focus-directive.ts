import type {ObjectDirective} from 'vue'

export default class FocusDirective implements ObjectDirective {
  static NAME = `focus`

  mounted(el: HTMLElement) {
    el.focus()
  }
}
