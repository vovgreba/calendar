import { useSelector, useDispatch } from 'react-redux'

import { selectMonth, selectYear, selectShowDatePicker } from '../../store/selectors'
import {
  changeCurrentMonthPreviousAction,
  changeCurrentMonthNextAction,
  showDatePickerAction,
  closeDatePickerAction
} from '../../store/actions/actions'

import { setLocalStorage,getLocalStorage } from '../storage/storage'
import DatePicker from '../datePicker/DatePicker'
import calendarIcon from './calendar_icon.svg'
import s from './month.module.scss'
import dayjs from 'dayjs'

function Month() {
  const month = useSelector(selectMonth)
  const year = useSelector(selectYear)
  const showDatePicker = useSelector(selectShowDatePicker)
  const dispatch = useDispatch()
  setLocalStorage('currentMonth', month)
  setLocalStorage('currentYear', year)
  // localStorage.clear();



  const getPreviousMonth = () => {
    const previousMonth = month.subtract(1, 'month')
    dispatch(changeCurrentMonthPreviousAction(previousMonth))
  }
  const getNextMonth = () => {
    const nextMonth = month.add(1, 'month')
    dispatch(changeCurrentMonthNextAction(nextMonth))
  }
  const hundleDatePicker = () => {
    if(showDatePicker) {
      dispatch(closeDatePickerAction())
    } else {
      dispatch(showDatePickerAction())
    }
  }


  return(
    <div className={s.wrapp}>
      <div className={s.wrappDate}>
        <span className={s.left} onClick={getPreviousMonth}>&lt;</span>
        <h1 className={s.month}>{month.format('MMMM')} {year.format('YYYY')}</h1>
        <span className={s.right} onClick={getNextMonth}>&gt;</span>
      </div>
      <div className={s.calendarIcon} onClick={hundleDatePicker}>
        <img src={calendarIcon} alt="calendar" />
      </div>
      {showDatePicker && <DatePicker />}
    </div>
  )
}

export default Month;