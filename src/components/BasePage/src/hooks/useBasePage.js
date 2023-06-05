import {
  MySelect,
  MyRadio,
  MyCheckbox,
  MyCascader,
  MyDate,
  MyInput,
  PasswordInput
} from '@/components/FormItem'
import { ElMessage } from 'element-plus'
export default (option, tableData, mergeKeys, tableColSpan) => {
  // form part
  // 是否展示表单
  const isShowSearch = (column) => {
    return column?.search !== false ?? option?.search !== false
  }
  // 表单项label的位置
  const labelPosition = option?.labelPosition ?? 'right'
  // 表单项尺寸 'large' | 'default' | 'small'
  const size = option?.formSize ?? option?.size ?? 'default'
  // 表单项宽度
  const formSpan = (column) => {
    return column?.span ?? option?.span ?? 6
  }
  // 表单项label
  const formLabel = (column) => {
    return column?.formLabel ?? column?.label
  }
  // 所有表单项label宽度
  const labelWidth = option?.labelWidth ?? '80px'
  // 单个表单项label的宽度， formLabelWidth 比 labelWidth 优先级高
  const formLabelWidth = (column) => {
    return column?.labelWidth ?? labelWidth
  }
  // component 要显示的组件
  const formItemComponents = (column) => {
    const type = column?.type
    const components = {
      select: MySelect,
      radio: MyRadio,
      checkbox: MyCheckbox,
      cascader: MyCascader,
      date: MyDate,
      password: PasswordInput
    }
    return components[type] ?? MyInput
  }
  // 表单项是否能一件清除
  const isClearable = (column) => {
    return column?.clearable ?? option?.clearable ?? true
  }
  // 获取选项式表单项的选项
  const getOptions = (column) => {
    return option?.dic?.[column.prop] ?? column?.dic ?? []
  }
  // 获取级联选择器的 props
  const getProps = (column) => {
    return column.props ?? { emitPath: false }
  }
  // 当表单项为时间选择器时的类型
  const dateType = (column) => {
    // year/month/week/date/dates/datetime
    // datetimerange/daterange/monthrange
    return column?.dateType ?? 'daterange'
  }
  // 获取单独的表单项的属性
  const getAttrs = (column) => {
    const type = column?.type
    const options = getOptions(column)
    const props = getProps(column)
    const attrs = {
      select: { options },
      cascader: {
        options,
        props,
        showAllLevels: false
      },
      radio: { options },
      date: {
        endPlaceholder: '结束日期',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        type: dateType(column)
      },
      checkbox: { options }
    }
    return attrs[type] ?? {}
  }
  // 是否显示表单的按钮项
  const formBtn = option?.formBtn !== false
  // 表单按钮项的宽度
  const btnSpan = option?.btnSpan ?? option.span ?? 6
  // 是否显示表单搜索按钮
  const searchBtn = option?.searchBtn !== false
  // 表单搜索按钮的显示文字
  const searchBtnText = option?.searchBtnText || '搜索'
  // 是否显示表单重置按钮
  const resetBtn = option?.resetBtn !== false
  // 表单项提示
  const getPlaceholder = (column) => {
    return column?.placeholder ?? `请输入${formLabel(column)}`
  }
  // 获取表单校验规则
  const getFormRules = (column) => {
    return column?.rules ?? []
  }
  // table part
  const tableLoading = ref(false)
  const isShowBorder = option?.border ?? true
  const expand = option?.expand ?? false
  const selection = option?.selection ?? false
  const index = option?.index ?? false
  // 合并表格
  let rowSpanObj = null
  const handleTableSpan = (mergeKeys, tableData) => {
    const spanObj = {}
    if (
      mergeKeys instanceof Array &&
      tableData instanceof Array &&
      mergeKeys.length &&
      tableData.length
    ) {
      mergeKeys.forEach((key, keyIndex) => {
        spanObj[key] = []
        let position = 0
        tableData.forEach((item, index) => {
          if (index === 0) {
            spanObj[key].push(1)
            position = 0
          } else {
            const isObj =
              tableData[index][key] instanceof Array || tableData[index][key] instanceof Object
            if (isKeysMerge(tableData, index, mergeKeys, keyIndex, isObj)) {
              spanObj[key][position] += 1
              spanObj[key].push(0)
            } else {
              spanObj[key].push(1)
              position = index
            }
          }
        })
      })
      return spanObj
    }
  }
  const isKeysMerge = (tableData, index, mergeKeys, keyIndex, isObj) => {
    if (keyIndex < 0) {
      return true
    }
    if (isObj) {
      return (
        JSON.stringify(tableData[index][mergeKeys[keyIndex]]) ===
          JSON.stringify(tableData[index - 1][mergeKeys[keyIndex]]) &&
        isKeysMerge(tableData, index, mergeKeys, keyIndex - 1, isObj)
      )
    } else {
      return (
        tableData[index][mergeKeys[keyIndex]] === tableData[index - 1][mergeKeys[keyIndex]] &&
        isKeysMerge(tableData, index, mergeKeys, keyIndex - 1, isObj)
      )
    }
  }
  const handleObjectSpanMethod = (tableObj, mergeKeys, rowspanObj) => {
    if (mergeKeys instanceof Array && rowspanObj instanceof Object) {
      const { row, column, rowIndex, columnIndex } = tableObj
      for (let i = 0; i < mergeKeys.length; i++) {
        const term = column.property === mergeKeys[i]
        if (term) {
          const _row = rowspanObj[mergeKeys[i]][rowIndex]
          let _col
          // 自定义设置合并列时使用该方法
          if (tableColSpan && tableColSpan(tableObj)) {
            _col = tableColSpan(tableObj)
          } else {
            _col = _row > 0 ? 1 : 0
          }
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }
    }
  }
  // 表格和并的方法
  const tableSpanMethod = (tableObj) => {
    return handleObjectSpanMethod(tableObj, mergeKeys, rowSpanObj)
  }
  watch(
    tableData,
    (newVal) => {
      if (mergeKeys.length) {
        rowSpanObj = handleTableSpan(mergeKeys, newVal)
      }
    },
    { immediate: true, deep: true }
  )
  // 表格 label 的位置
  const tableAlign = (column) => {
    return option?.align ?? column?.align ?? 'left'
  }
  // 表格列飘浮的位置
  const fixed = (column) => {
    return column?.fixed ?? false
  }
  const isShowTableForm = (column) => {
    return column?.showTableForm ?? false
  }
  // 返回校验不通过的消息，并且设置表格数据'$validate'对象
  const validateMsg = (rules, row, prop) => {
    if (!Reflect.has(row, '$validate')) {
      Reflect.set(row, '$validate', {})
    }
    for (const key in rules) {
      const ruleItem = rules[key]
      const validate = ruleItem?.validate(row[prop]) ?? false
      if (!validate) {
        Reflect.set(row['$validate'], prop, false)
        return ruleItem?.message
      }
    }
    Reflect.set(row['$validate'], prop, true)
    return false
  }
  // 校验表格里的表单格式是否正确，返回布尔值
  const tableValidate = () => {
    const validateArr = tableData?.reduce((preValue, { $validate = {} }) => {
      const validate = Object.values($validate)
      return [...preValue, ...validate]
    }, [])
    const unAdopt = validateArr.some((item) => {
      return item === false
    })
    if (unAdopt) {
      ElMessage({
        message: '校验不通过',
        type: 'warning'
      })
      return false
    }
    return true
  }
  // 显示格式化后的数据
  const format = (column, val) => {
    if (column?.format) {
      return column?.format(val)
    }
    return false
  }
  // 检查表单选项是否有 children
  const isHasChildren = (dic) => {
    return dic.filter(({ children }) => {
      return children
    })?.length
  }
  // 根据 value 找到 label
  const findLabel = (column, val) => {
    const dic = getOptions(column)
    const label = dic.find(({ value }) => {
      return value === val
    })?.label
    return label || val
  }
  const findChildrenLabel = (column, val) => {
    const flatArr = []
    const dic = getOptions(column)
    const childProp = column?.childProp ?? 'children'

    function flatDic(dic, childProp) {
      for (let i = 0; i <= dic.length - 1; i++) {
        const item = {
          label: dic[i].label,
          value: dic[i].value
        }
        flatArr.push(item)
        if (dic[i]?.[childProp]?.length) {
          flatDic(dic[i]?.[childProp], childProp)
        }
      }
    }

    flatDic(dic, childProp)
    const flatObj = {}
    flatArr.map(({ label, value }) => {
      Reflect.set(flatObj, value, label)
    })
    return flatObj[val] || val
  }
  // 自动显示有 dic 项的表格内容
  const dicText = (column, val) => {
    const dic = getOptions(column)
    if (isHasChildren(dic)) {
      return findChildrenLabel(column, val)
    } else {
      return findLabel(column, val)
    }
  }
  const operation = option?.operation !== false
  // pagination
  const paginationLayout = 'total, sizes, prev, pager, next, jumper'
  const page = reactive({
    currentPage: 1,
    pageSize: 10
  })
  const getPageSizeList = (list) => {
    return option?.pageSizeList ?? list
  }
  const handleSizeChange = (val) => {
    console.log(val)
  }
  const handleCurrentChange = (val) => {
    console.log(val)
  }

  return {
    // form part
    isShowSearch,
    labelPosition,
    labelWidth,
    size,
    formSpan,
    formLabel,
    formLabelWidth,
    formItemComponents,
    isClearable,
    getOptions,
    getProps,
    dateType,
    btnSpan,
    searchBtnText,
    resetBtn,
    searchBtn,
    formBtn,
    getAttrs,
    getPlaceholder,
    getFormRules,
    // table part
    tableLoading,
    isShowBorder,
    expand,
    selection,
    index,
    tableSpanMethod,
    tableAlign,
    fixed,
    isShowTableForm,
    validateMsg,
    format,
    dicText,
    tableValidate,
    operation,
    // pagination
    paginationLayout,
    page,
    getPageSizeList,
    handleSizeChange,
    handleCurrentChange
  }
}
