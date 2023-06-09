<template>
  <el-form
    ref="formRef"
    :label-position="config.labelPosition"
    :label-width="config.labelWidth"
    :model="formData"
    :size="config.size"
  >
    <el-row>
      <el-col v-for="column in option?.columns" :key="column?.prop" :span="config.formSpan(column)">
        <el-form-item
          :label="config.formLabel(column)"
          :label-width="config.formLabelWidth(column)"
          :prop="column?.prop"
          :rules="config.getFormRules(column)"
        >
          <slot
            :name="column.prop"
            :formData="formData"
            :placeholder="config.getPlaceholder(column)"
          >
            <component
              :is="config.formItemComponents(column)"
              v-model="formData[column.prop]"
              v-bind="config.getAttrs(column)"
              :clearable="config.isClearable(column)"
              :placeholder="config.getPlaceholder(column)"
              :prop="column.prop"
              :size="config.size"
              :style="{ width: config.formItemWidth(column) }"
            />
          </slot>
        </el-form-item>
      </el-col>
      <el-col v-if="config.formBtn" :span="config.btnSpan">
        <el-form-item :label-width="config.btnLabelWidth" class="btn-form-item">
          <slot name="formOperation">
            <div>
              <el-button v-if="config.resetBtn" :size="config.size" @click="resetForm">
                {{ '重置' }}
              </el-button>
              <el-button
                v-if="config.searchBtn"
                :size="config.size"
                :loading="loading"
                type="primary"
                @click="searchBtnClick"
              >
                {{ config.searchBtnText }}
              </el-button>
            </div>
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script name="BaseForm" setup>
import useBaseForm from '@/hooks/base/useBaseForm'
const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return reactive({})
    }
  },
  formData: {
    type: Object,
    default: () => {
      return reactive({})
    }
  }
})
const emit = defineEmits(['submitHandle'])
// eslint-disable-next-line vue/no-setup-props-destructure
const { option, formData } = props
const config = useBaseForm(option)
const formRef = ref(null)
const loading = ref(false)
const searchBtnClick = () => {
  emit('submitHandle', loading, formData)
}
const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<style lang="scss" scoped></style>
