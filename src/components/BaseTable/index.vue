<template>
  <el-table
    ref="tableRef"
    v-loading="tableLoading"
    :size="size"
    :border="option?.border || true"
    :data="tableData"
    :row-class-name="rowClassName"
    :table-layout="option?.tableLayout || 'fixed'"
    :fit="option?.fit || true"
    :header-row-style="{ backgroundColor: '#ccc' }"
    @row-click="rowClick"
    @selection-change="selectionChange"
  >
    <!-- 下拉弹出框 -->
    <el-table-column
      v-if="option?.expand || false"
      key="expand"
      align="center"
      fixed="'left'"
      type="expand"
      width="50"
    >
      <template #default="scope">
        <slot :row="scope.row" name="expand"></slot>
      </template>
    </el-table-column>
    <!-- 选择框 -->
    <el-table-column
      v-if="option?.selection || false"
      key="selection"
      align="center"
      fixed="'left'"
      type="selection"
      width="50"
    />
    <!-- 序号列 -->
    <el-table-column
      v-if="option?.index || false"
      key="index"
      align="center"
      fixed="'left'"
      type="index"
      width="50"
    />
    <!-- 循环列 -->
    <el-table-column
      v-for="column in option?.columns"
      :key="column.prop"
      :align="column?.tableAlign || option?.tableAlign || 'center '"
      :fixed="column?.fixed || false"
      :label="column.label"
      :min-width="column?.minWidth ?? ''"
      :prop="column.prop"
    >
      <template #default="scope">
        <slot :name="column.prop" v-bind="scope">
          <div v-if="column?.isShowTableForm || false" class="self-input-item">
            <component
              :is="formItemComponents(column)"
              class="iptComponent"
              v-model="scope.row[column.prop]"
              v-bind="getAttrs(column)"
              :clearable="column?.isClearable || true"
              :placeholder="getPlaceholder(column)"
              :prop="column.prop"
              :size="size"
            />
            <div class="error-message-box">
              <Transition name="error">
                <div
                  v-if="validateMsg(column?.tableRules, scope.row, column.prop)"
                  class="error-message"
                >
                  {{ validateMsg(column?.tableRules, scope.row, column.prop) }}
                </div>
              </Transition>
            </div>
          </div>
          <span v-else-if="format(column, scope.row[column.prop])">
            {{ format(column, scope.row[column.prop]) }}
          </span>
          <span v-else-if="getOptions(column)?.length">
            {{ dicText(column, scope.row[column.prop]) }}
          </span>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </slot>
      </template>
    </el-table-column>
    <!-- 操作列 -->
    <el-table-column v-if="option?.operation !== false" label="操作">
      <template #default="scope">
        <slot name="operation" v-bind="scope" :tableValidate="tableValidate"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script name="BaseTable" setup>
import useBaseTable from '@/hooks/base/useBaseTable'
const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return {}
    }
  },
  rowClassName: Function,
  rowClick: Function,
  selectionChange: {
    type: Function,
    default: () => []
  },
  tableData: {
    type: Array,
    default: reactive([])
  }
})
// eslint-disable-next-line vue/no-setup-props-destructure
const { option } = props
const {
  format,
  getOptions,
  dicText,
  tableValidate,
  validateMsg,
  formItemComponents,
  getAttrs,
  getPlaceholder
} = useBaseTable(option)
const size = option?.size || 'default'
const tableRef = ref(null)
const tableLoading = ref(false)
</script>

<style lang="scss" scoped>
.self-input-item {
  .iptComponent {
    margin-bottom: 15px;
  }

  .error-message-box {
    position: absolute;
    bottom: 0;
    height: 24px;

    .error-message {
      font-size: 12px;
      color: red;
    }
  }
}

.error-enter-active,
.error-leave-active {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
}
</style>
