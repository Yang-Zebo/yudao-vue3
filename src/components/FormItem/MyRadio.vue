<template>
  <el-radio-group>
    <el-radio v-for="{ label, value } in options" :key="value" :label="value"
      >{{ label }}
    </el-radio>
  </el-radio-group>
</template>
<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const { options } = toRefs(props)
</script>
<style lang="scss" scoped></style>
