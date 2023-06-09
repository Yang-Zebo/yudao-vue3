<template>
  <BaseTable :option="option" />
</template>

<script name="test" setup>
import BaseTable from '@/components/BaseTable/index.vue'
const option = {
  columns: [
    {
      label: '创建时间',
      prop: 'createTime'
    },
    {
      label: '报表名称',
      prop: 'reportName'
    }
  ]
}
</script>

<style lang="scss" scoped></style>
