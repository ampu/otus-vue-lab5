import {ref, watch} from 'vue'

export type Preprocess<TState, TInput = any> = (state: TInput) => TState;

export class LocalState {
  constructor(
    private key: string,
    private storage: Storage = localStorage,
  ) {
  }

  getState<TState>(defaultState: TState | undefined = undefined) {
    try {
      const item = this.storage.getItem(this.key)
      return item === null
        ? defaultState
        : JSON.parse(item)
    } catch {
      return defaultState
    }
  }

  setState(newState: unknown) {
    try {
      this.storage.setItem(this.key, JSON.stringify(newState))
      return true
    } catch {
      return false
    }
  }

  useState<TState extends object>(preprocess: Preprocess<TState>) {
    const state = ref(preprocess(this.getState()))
    watch(state, () => this.setState(state.value), {deep: true})
    return state
  }
}

// new LocalState(`otus-vue.books`).useState<BookModel[]>((state) => state ?? [])
