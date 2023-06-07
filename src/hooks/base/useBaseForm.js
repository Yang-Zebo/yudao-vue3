import {
  MyCascader,
  MyCheckbox,
  MyDate,
  MyInput,
  MyRadio,
  MySelect,
  PasswordInput
} from '@/components/FormItem'
export default (option) => {
  // 表单项label的位置
  const labelPosition = option?.labelPosition ?? 'right'
  // 所有表单项label宽度
  const labelWidth = option?.labelWidth ?? '80px'
  // 单个表单项label的宽度， formLabelWidth 比 labelWidth 优先级高
  const formLabelWidth = (column) => {
    return column?.labelWidth ?? labelWidth
  }
  const size = option?.formSize ?? option?.size ?? 'default'
  // 表单项宽度
  const formSpan = (column) => {
    if (option?.inline) return column?.span ?? option?.span ?? 6
    return 24
  }
  // 表单项label
  const formLabel = (column) => {
    return column?.formLabel ?? column?.label
  }
  // 获取表单校验规则
  const getFormRules = (column) => {
    return column?.rules ?? []
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
  // 表单项是否能一件清除
  const isClearable = (column) => {
    return column?.clearable ?? option?.clearable ?? true
  }
  // 表单项提示
  const getPlaceholder = (column) => {
    return column?.placeholder ?? `请输入${ formLabel(column) }`
  }
  // 是否显示表单的按钮项
  const formBtn = option?.formBtn !== false
  const btnLabelWidth = option?.btnLabelWidth ?? labelWidth
  // 表单按钮项的宽度
  const btnSpan = option?.inline ? option?.btnSpan ?? option.span ?? 6 : 24
  // 是否显示表单重置按钮
  const resetBtn = option?.resetBtn !== false
  // 是否显示表单搜索按钮
  const searchBtn = option?.searchBtn !== false
  // 表单搜索按钮的显示文字
  const searchBtnText = option?.searchBtnText || '搜索'

  return {
    labelPosition,
    labelWidth,
    size,
    formSpan,
    formLabel,
    formLabelWidth,
    getFormRules,
    formItemComponents,
    getAttrs,
    isClearable,
    getPlaceholder,
    formBtn,
    btnSpan,
    btnLabelWidth,
    resetBtn,
    searchBtn,
    searchBtnText
  }
}
