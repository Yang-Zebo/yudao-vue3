<template>
  <div class="base-page">
    <div class="base-page-header" v-if="option?.search !== false">
      <el-form
        ref="formRef"
        :label-position="option.labelPosition || 'right'"
        :label-width="option.labelWidth ?? '100px'"
        :model="formData"
        :size="size"
      >
        <el-row :gutter="20">
          <el-col
            v-for="column in option?.columns"
            :key="column?.prop"
            :lg="column?.span ?? option?.span ?? 6"
            :xs="24"
          >
            <el-form-item
              :label="column?.formLabel || column?.label"
              :label-width="column?.labelWidth || '100px'"
              :prop="column?.prop"
              :rules="column?.rules || []"
            >
              <component
                :is="formItemComponents(column)"
                v-model="formData[column.prop]"
                v-bind="getAttrs(column)"
                :clearable="column?.isClearable || true"
                :placeholder="getPlaceholder(column)"
                :prop="column.prop"
                :size="size"
              />
            </el-form-item>
          </el-col>
          <el-col
            v-if="option?.formBtn !== false"
            :lg="option?.btnSpan || option.span || 6"
            :xs="24"
          >
            <el-form-item label-width="0" class="btn-form-item">
              <slot name="formOperation">
                <div style="text-align: right">
                  <el-button v-if="option?.resetBtn !== false" :size="size" @click="resetForm">
                    {{ '重置' }}
                  </el-button>
                  <el-button
                    v-if="option?.searchBtn !== false"
                    :size="size"
                    type="primary"
                    @click="searchBtnClick"
                  >
                    {{ option?.searchBtnText || '搜索' }}
                  </el-button>
                </div>
              </slot>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="base-page-btn">
      <div class="page-btn-left">
        <slot name="leftBtn" :init="initData"></slot>
      </div>
      <div class="page-btn-right">
        <slot name="rightBtn" :init="initData"></slot>
      </div>
    </div>
    <div class="base-page-body">
      <div class="body-table">
        <el-table
          ref="tableRef"
          v-loading="tableLoading"
          max-height="calc(100vh - 120px)"
          :size="size"
          :border="option?.border || true"
          :data="tableData"
          :row-class-name="rowClassName"
          :span-method="tableSpanMethod"
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
                <div v-if="option?.isShowTableForm || false" class="self-input-item">
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
      </div>
      <div class="body-footer">
        <el-pagination
          v-model:current-page="page.pageNo"
          v-model:page-size="page.pageSize"
          :page-sizes="pageSizeList"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script name="BasePage" setup>
import useBasePage from '@/hooks/base/useBasePage'

const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return {}
    }
  },
  formData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  rowClassName: Function,
  mergeKeys: {
    type: Array,
    default: () => []
  },
  rowClick: Function,
  selectionChange: {
    type: Function,
    default: () => []
  },
  tableColSpan: Function,
  pageSizeList: {
    type: Array,
    default: () => {
      return [10, 20, 30, 40]
    }
  },
  api: Function,
  mergeForm: {
    type: Object,
    default: () => {
      return {}
    }
  },
  initCallback: Function
})
// eslint-disable-next-line vue/no-setup-props-destructure
const { mergeKeys, tableColSpan, option, api, mergeForm, formData } = props
const tableData = ref([])
const {
  tableSpanMethod,
  getAttrs,
  getPlaceholder,
  validateMsg,
  format,
  getOptions,
  dicText,
  tableValidate,
  formItemComponents
} = useBasePage(option, tableData.value, mergeKeys, tableColSpan)

const formRef = ref(null)
const tableRef = ref(null)

const resetForm = () => {
  formRef.value.resetFields()
}
const tableLoading = ref(false)
const page = {
  pageNo: 1,
  pageSize: 10,
  total: 0
}
const size = option?.size || 'default'
const initData = async () => {
  if (option?.isShowTable === false) return
  try {
    tableLoading.value = true
    let query
    if (Object.keys(mergeForm)?.length) {
      query = { ...mergeForm, ...formData, ...page }
    } else {
      query = { ...formData, ...page }
    }
    delete query.total
    const { list, total } = await api(query)
    tableData.value = list
    page.total = Number(total)
  } finally {
    tableLoading.value = false
  }
}
const handleSizeChange = () => {
  initData()
}
const handleCurrentChange = () => {
  initData()
}
const searchBtnClick = () => {
  initData()
}
onBeforeMount(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.base-page {
  .base-page-header {
    padding-top: 20px;
    margin-bottom: 20px;
    background-color: #eee;
    border-radius: 5px;
    .el-form {
      .el-col {
        display: flex;
        align-items: center;
        .el-form-item {
          margin-bottom: 20px;
        }
      }
    }
  }
  .base-page-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .base-page-body {
    .body-footer {
      margin-top: 20px;
      text-align: right;
      .el-pagination {
        justify-content: right;
      }
    }
  }
}
</style>
