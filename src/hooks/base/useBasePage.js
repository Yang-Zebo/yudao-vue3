import {
  MyCascader,
  MyCheckbox,
  MyDate,
  MyInput,
  MyRadio,
  MySelect,
  PasswordInput
} from '@/components/FormItem'

export default (option, tableData, mergeKeys, tableColSpan) => {
  // 表格和并的方法
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
      const { column, rowIndex } = tableObj
      for (let i = 0; i < mergeKeys.length; i++) {
        let term = column.property === mergeKeys[i]
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
  // 获取选项式表单项的选项
  const getOptions = (column) => {
    return option?.dic?.[column.prop] ?? column?.dic ?? []
  }
  // 当表单项为时间选择器时的类型
  const dateType = (column) => {
    // year/month/week/date/dates/datetime
    // datetimerange/daterange/monthrange
    return column?.dateType ?? 'daterange'
  }
  // 获取级联选择器的 props
  const getProps = (column) => {
    return column.props ?? { emitPath: false }
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
  // 表单项label
  const formLabel = (column) => {
    return column?.formLabel ?? column?.label
  }
  // 表单项提示
  const getPlaceholder = (column) => {
    return column?.placeholder ?? `请输入${formLabel(column)}`
  }
  // 返回校验不通过的消息，并且设置表格数据'$validate'对象
  const validateMsg = (rules, row, prop) => {
    if (!Reflect.has(row, '$validate')) {
      Reflect.set(row, '$validate', {})
    }
    for (let key in rules) {
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
  // 显示格式化后的数据
  const format = (column, val) => {
    if (column?.format) {
      return column?.format(val)
    }
    return false
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
  return {
    tableSpanMethod,
    getAttrs,
    getPlaceholder,
    validateMsg,
    format,
    getOptions,
    dicText,
    tableValidate,
    formItemComponents
  }
}
