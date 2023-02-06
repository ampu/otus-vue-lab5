<template>
  <tfoot
    class="TableFooter"
    :class="{active: !!props.filtered}"
  >
    <tr>
      <td colspan="10">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            Showing <b v-text="first"/> to <b v-text="latest"/>
            of <b v-text="props.filtered"/> entries
            <template v-if="isFiltered">(filtered from <b v-text="props.total"/> total)</template>
          </div>

          <APagination
            :total="filtered"
            :perPage="perPage"
            :page="page"
            @update:page="emit(`update:page`, $event)"
          />
        </div>
      </td>
    </tr>
  </tfoot>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import APagination from '@/components/widgets/APagination.vue'

const props = defineProps<{
  isFiltered: boolean
  total: number
  filtered: number
  page: number
  perPage: number
}>()

const emit = defineEmits<{
  (event: `update:page`, page: number): void
}>()

const first = computed(() => (props.page - 1) * props.perPage + 1)
const latest = computed(() => Math.min(first.value + props.perPage - 1, props.filtered))
</script>

<style lang="scss" scoped>
.TableFooter {
  opacity: 0;

  &.active {
    opacity: 0.7;
  }
}
</style>
