<template>
  <div class="base-page">
    <div class="page-header" v-if="config.isShowSearch()">
      <el-form
        ref="formRef"
        :label-position="config.labelPosition"
        :label-width="config.labelWidth"
        :model="formData"
        :size="config.size"
      >
        <el-row>
          <el-col
            v-for="column in option?.columns"
            :key="column?.prop"
            :lg="config.formSpan(column)"
            :xs="24"
          >
            <el-form-item
              :label="config.formLabel(column)"
              :label-width="config.formLabelWidth(column)"
              :prop="column?.prop"
              :rules="config.getFormRules(column)"
            >
              <component
                :is="config.formItemComponents(column)"
                v-model="formData[column.prop]"
                v-bind="config.getAttrs(column)"
                :clearable="config.isClearable(column)"
                :placeholder="config.getPlaceholder(column)"
                :prop="column.prop"
                :size="config.size"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="option?.formBtn !== false" :lg="config.btnSpan" :xs="24">
            <el-form-item label-width="0" class="btn-form-item">
              <slot name="formOperation">
                <div style="text-align: right">
                  <el-button v-if="config.resetBtn" :size="config.size" @click="resetForm">
                    {{ '重置' }}
                  </el-button>
                  <el-button
                    v-if="config.searchBtn"
                    :size="config.size"
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
    </div>
    <div class="page-btn">
      <div class="page-btn-left">
        <slot name="leftBtn"></slot>
      </div>
      <div class="page-btn-right">
        <slot name="rightBtn"></slot>
      </div>
    </div>
    <div class="page-table">
      <el-table
        ref="tableRef"
        v-loading="config.tableLoading.value"
        max-height="calc(100vh - 120px)"
        :size="config.size"
        :border="config.isShowBorder"
        :data="tableData"
        :row-class-name="rowClassName"
        :span-method="config.tableSpanMethod"
        @row-click="rowClick"
        @selection-change="selectionChange"
      >
        <!-- 下拉弹出框 -->
        <el-table-column
          v-if="config.expand"
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
          v-if="config.selection"
          key="selection"
          align="center"
          fixed="'left'"
          type="selection"
          width="50"
        />
        <!-- 序号列 -->
        <el-table-column
          v-if="config.index"
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
          :align="config.tableAlign(column)"
          :fixed="config.fixed(column)"
          :label="column.label"
          :min-width="column?.minWidth ?? ''"
          :prop="column.prop"
        >
          <template #default="scope">
            <slot :name="column.prop" v-bind="scope">
              <div v-if="config.isShowTableForm(column)" class="self-input-item">
                <component
                  :is="config.formItemComponents(column)"
                  class="iptComponent"
                  v-model="scope.row[column.prop]"
                  v-bind="config.getAttrs(column)"
                  :clearable="config.isClearable(column)"
                  :placeholder="config.getPlaceholder(column)"
                  :prop="column.prop"
                  :size="config.size"
                />
                <div class="error-message-box">
                  <Transition name="error">
                    <div
                      v-if="config?.validateMsg(column?.tableRules, scope.row, column.prop)"
                      class="error-message"
                    >
                      {{ config?.validateMsg(column?.tableRules, scope.row, column.prop) }}
                    </div>
                  </Transition>
                </div>
              </div>
              <span v-else-if="config.format(column, scope.row[column.prop])">
                {{ config.format(column, scope.row[column.prop]) }}
              </span>
              <span v-else-if="config.getOptions(column)?.length">
                {{ config.dicText(column, scope.row[column.prop]) }}
              </span>
              <span v-else>{{ scope.row[column.prop] }}</span>
            </slot>
          </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column v-if="config.operation" label="操作">
          <template #default="scope">
            <slot name="operation" v-bind="scope" :tableValidate="config.tableValidate"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-footer">
      <el-pagination
        v-model:current-page="config.page.currentPage"
        v-model:page-size="config.page.pageSize"
        :page-sizes="config.getPageSizeList(paginationSizeList)"
        :background="true"
        :layout="config.paginationLayout"
        :total="400"
        @size-change="config.handleSizeChange"
        @current-change="config.handleCurrentChange"
      />
    </div>
  </div>
</template>
<script name="BasePage" setup>
import { basePageProps } from './config'
import useBasePage from './hooks/useBasePage'
const props = defineProps(basePageProps)
const { option, tableData, mergeKeys, tableColSpan } = toRef(props)
// eslint-disable-next-line vue/no-setup-props-destructure
const { formData } = props
const config = useBasePage(option.value, tableData.value, mergeKeys.value, tableColSpan.value)
// form part
const formRef = ref(null)
const searchBtnClick = () => {
  console.log(formData)
}
const resetForm = () => {
  formRef.value.resetFields()
}
// tablePart
const tableRef = ref(null)
</script>
<style scoped lang="scss">
.base-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    padding: 18px 18px 0 18px;
    border-radius: 8px;
    background-color: #eee;

    .btn-form-item {
      :deep(.el-form-item__content) {
        display: block;
      }
    }
  }

  .page-btn {
    display: flex;
    justify-content: space-between;
    padding: 18px 0;
  }

  .page-table {
    flex: 1;

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
  }

  .page-footer {
    :deep(.el-pagination) {
      flex-direction: row-reverse;
    }
  }
}
</style>
