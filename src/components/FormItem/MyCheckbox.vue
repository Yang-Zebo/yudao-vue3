<template>
  <el-checkbox-group>
    <el-checkbox v-for="{ label, value } in options" :label="value" :key="value">{{
      label
    }}</el-checkbox>
  </el-checkbox-group>
</template>
<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: () => {
      return {}
    }
  }
})
const { options } = toRefs(props)
</script>
<style lang="scss" scoped></style>
