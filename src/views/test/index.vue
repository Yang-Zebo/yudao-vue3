<template>
  <BaseForm :option="option" />
</template>

<script name="test" setup>
import BaseForm from '@/components/BaseForm/index.vue'
const option = {
  columns: [
    {
      label: 'createTime',
      prop: 'createTime'
    },
    {
      label: 'reportName',
      prop: 'reportName'
    }
  ]
}
</script>

<style lang="scss" scoped></style>
