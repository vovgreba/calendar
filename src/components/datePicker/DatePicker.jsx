import { useState } from 'react';
import dayjs from 'dayjs';

import { useSelector, useDispatch } from 'react-redux';

import { selectMonth } from '../../store/selectors';
import { 
  userChooseDateAction,
  changeCurrentMonthOfYearAction,
  changeCurrentMonthPreviousAction,
  changeCurrentMonthNextAction,
  closeDatePickerAction,
} from '../../store/actions/actions';

import { Button, Input } from '../basicComponents/BasicComponents';
import { setLocalStorage } from '../storage/storage';

import s from './datePicker.module.scss'

function DatePicker() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch();
  const selectMonthCurrent = useSelector(selectMonth);


  const hundleClickDate = (event)=> {
    setValue(event.target.value)
  }

  const handleSubmitdate = (e)=> {
    e.preventDefault();
    const formatYear = dayjs(value)
    const currentDay = formatYear.format('MM') === selectMonthCurrent.format('MM')

    if(!currentDay) {

      dispatch(changeCurrentMonthOfYearAction(formatYear))
      dispatch(changeCurrentMonthPreviousAction(formatYear))
      dispatch(changeCurrentMonthNextAction(formatYear))
    }
    setLocalStorage('currentMonth', formatYear)
    setLocalStorage('currentYear', formatYear)
    setLocalStorage('userChooseDate', formatYear)

    dispatch(userChooseDateAction(formatYear))
    dispatch(closeDatePickerAction())
  }

  return(
    <form onSubmit={handleSubmitdate}>
      <Input
      type='date'
      name='date'
      value={value}
      onChange={hundleClickDate}
      className={s.inputDate}
      />
      <Button type='submit' className={s.buttonOfDatePicker}>apply</Button>
    </form>


  )
}

export default DatePicker;