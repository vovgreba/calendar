import dayjs from 'dayjs'
import { setLocalStorage, getLocalStorage } from '../../components/storage/storage'

const initialState = {
  currentMonth:  dayjs(getLocalStorage('currentMonth')).isValid ? dayjs(getLocalStorage('currentMonth')) : dayjs(),
  currentYear:  dayjs(getLocalStorage('currentYear')).isValid ? dayjs(getLocalStorage('currentYear')) : dayjs(),
  quantityOfPreviousMonth: dayjs().subtract(1, 'month').daysInMonth(),
  quantityDaysOfCurrentMonth: dayjs().daysInMonth(),
  quantityOfNextMonth: dayjs().add(1, 'month').daysInMonth(),
  showModalAddIdea: false,
  showModalEditIdea: false,
  showDatePicker: false,
  userChooseDate: dayjs(getLocalStorage('userChooseDate')).isValid ? dayjs(getLocalStorage('userChooseDate')) : null,
}

export const changeMonthReducer = (state = initialState, action)=> {
  const { currentMonth } = state

  switch(action.type) {
    
    case 'CHANGE_CURRENT_MONTH_PREVIOUS':
      if(currentMonth.year() !== action.payload.year()) {
        return {...state, currentMonth: currentMonth.subtract(1, 'month'),
        quantityDaysOfCurrentMonth: action.payload.daysInMonth(),
        quantityOfPreviousMonth: action.payload.subtract(1, 'month').daysInMonth(),
        quantityOfNextMonth: action.payload.add(1, 'month').daysInMonth(),
        currentYear: action.payload};
      }

      return {...state, currentMonth: currentMonth.subtract(1, 'month'),
      quantityOfPreviousMonth: action.payload.subtract(1, 'month').daysInMonth(),
      quantityOfNextMonth: action.payload.add(1, 'month').daysInMonth(),
      quantityDaysOfCurrentMonth: action.payload.daysInMonth(),
      currentYear: action.payload};

    case 'CHANGE_CURRENT_MONTH_NEXT':

      if(currentMonth.year() !== action.payload.year()) {
        return {...state, currentMonth: currentMonth.add(1, 'month'),
        quantityDaysOfCurrentMonth: action.payload.daysInMonth(),
        quantityOfPreviousMonth: action.payload.subtract(1, 'month').daysInMonth(),
        quantityOfNextMonth: action.payload.add(1, 'month').daysInMonth(),
        currentYear: action.payload};
      }

      return {...state, currentMonth: currentMonth.add(1, 'month'),
      quantityOfPreviousMonth: action.payload.subtract(1, 'month').daysInMonth(),
      quantityOfNextMonth: action.payload.add(1, 'month').daysInMonth(),
      quantityDaysOfCurrentMonth: action.payload.daysInMonth(),
      currentYear: action.payload};
    
      case "CHANGE_CURRENT_MONTH_OF_YEAR":

        return {...state, currentMonth: action.payload }

      default:

        return state;
  }
}


export const changeModalIdeaReducer = (state = initialState, action)=> {

  switch (action.type) {
    case 'SHOW_MODAL_ADD_IDEA':

      return{...state, showModalAddIdea: true}

    case 'CLOSE_MODAL_ADD_IDEA':
      
      return{...state, showModalAddIdea: false}

    case 'SHOW_MODAL_EDIT_IDEA':

      return{...state, showModalEditIdea: true}

    case 'CLOSE_MODAL_EDIT_IDEA':
      
      return{...state, showModalEditIdea: false}
  
    default:
      
      return state;
  }
}

export const changeDatePickerReducer = (state=initialState, action)=> {

  switch (action.type) {
    case "SHOW_DATE_PICKER":

      return {...state, showDatePicker: true}

    case "CLOSE_DATE_PICKER":
    return {...state, showDatePicker: false}
  
    default:

      return state;
  }
}

export const changeUserChooseDateReducer = (state=initialState, action)=> {

  switch (action.type) {
    case "USER_CHOOSE_DATE":

      return {...state, userChooseDate: dayjs(action.payload)}

    default:

      return state;
  }
}

