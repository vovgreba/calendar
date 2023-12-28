export const changeCurrentMonthPreviousAction = (payload) => {
  return {
    type: 'CHANGE_CURRENT_MONTH_PREVIOUS',
    payload:payload,
  }
}
export const changeCurrentMonthNextAction = (payload) => {
  return {
    type: 'CHANGE_CURRENT_MONTH_NEXT',
    payload:payload,
  }
}

export const showModalAddIdeaAction = () => {
  return {
    type: 'SHOW_MODAL_ADD_IDEA'
  }
}
export const closeModalAddIdeaAction = () => {
  return {
    type: 'CLOSE_MODAL_ADD_IDEA'
  }
}
export const showModalEditIdeaAction = () => {
  return {
    type: 'SHOW_MODAL_EDIT_IDEA'
  }
}
export const closeModalEditIdeaAction = () => {
  return {
    type: 'CLOSE_MODAL_EDIT_IDEA'
  }
}

export const showDatePickerAction = () => {
  return {
    type:'SHOW_DATE_PICKER'
  }
}
export const closeDatePickerAction = () => {
  return {
    type:'CLOSE_DATE_PICKER'
  }
}

export const userChooseDateAction = (date) => {
  return {
    type: 'USER_CHOOSE_DATE',
    payload: date,
  }
}
export const changeCurrentMonthOfYearAction = (date) => {
  return {
    type: 'CHANGE_CURRENT_MONTH_OF_YEAR',
    payload: date,
  }
}
export const addDataAction = (data) => {
  return {
    type: 'ADD_DATA',
    payload: data,
  }
}

export const edditDataAtion = (oldData, newData) => {
  return {
    type: 'EDDIT_DATA',
    payload: {oldData, newData}
  }
}
export const removeDataAtion = (oldData) => {
  return {
    type: 'REMOVE_DATA',
    payload: oldData
  }
}