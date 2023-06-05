<template>
  <el-select>
    <el-option v-for="{ label, value } in options" :key="value" :label="label" :value="value" />
  </el-select>
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
