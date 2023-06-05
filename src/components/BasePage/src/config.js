export const basePageProps = {
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
  tableData: {
    type: Array,
    default: () => {
      return []
    }
  },
  rowClassName: {
    type: Function,
    default: () => {}
  },
  mergeKeys: {
    type: Array,
    default: () => {
      return []
    }
  },
  rowClick: {
    type: Function,
    default: () => {}
  },
  selectionChange: {
    type: Function,
    default: () => {}
  },
  tableColSpan: Function,
  paginationSizeList: {
    type: Array,
    default: () => {
      return [10, 20, 30, 40]
    }
  }
}
