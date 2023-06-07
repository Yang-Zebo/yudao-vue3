<template>
  <BasePage :api="incomingList" :option="option" />
</template>

<script name="test" setup>
import BasePage from '@/components/BasePage/index.vue'
import { incomingList } from '@/api/infra/codegen'

const option = {
  columns: [
    {
      label: 'createTime',
      prop: 'createTime',
      isShowTableForm: true
    },
    {
      label: 'reportName',
      prop: 'reportName'
    }
  ]
}
</script>

<style lang="scss" scoped></style>
