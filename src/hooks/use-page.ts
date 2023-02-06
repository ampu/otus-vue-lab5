import {ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import type {RouteLocation} from 'vue-router'

const LATEST_PAGE = -1

const getRoutePageForGetter = (route: RouteLocation) => {
  const routePage = route.query.page
  return Number(routePage) || 1
}

const getRoutePageForSetter = (page: number) => {
  return page <= 1 ? undefined : page
}

export const usePage = (routeName: string, getLatestPage: () => number) => {
  const router = useRouter()
  const route = useRoute()
  const page = ref(1)

  watch(page, () => {
    if (getRoutePageForGetter(route) !== page.value) {
      router.push({name: routeName, query: {...route.query, page: getRoutePageForSetter(page.value)}})
    }
  })

  watch(route, () => {
    const routePage = getRoutePageForGetter(route)
    if (routePage !== LATEST_PAGE) {
      page.value = routePage
      return
    }
    const latestPage = getLatestPage()
    router.replace({name: routeName, query: {...route.query, page: getRoutePageForSetter(latestPage)}})
  }, {immediate: true})

  return page
}


