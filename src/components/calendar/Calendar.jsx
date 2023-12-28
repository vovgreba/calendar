import { useState } from 'react';
import dayjs from 'dayjs' 
import isoWeek from'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek)

import { CalendarOfGrid } from '../basicComponents/BasicComponents'
import  ModalCalendarForm  from '../form/CalendarForm'

import { useSelector, useDispatch } from 'react-redux';
import { showModalEditIdeaAction, closeModalAddIdeaAction } from '../../store/actions/actions';
import {
    selectMonth, selectCurrentMonth, selectNextMonth, selectPreviousMonth, selectShowModalEditIdea, selectUserChooseDate, selectData, selectShowModalAddIdea
  } from '../../store/selectors';

import s from './calendar.module.scss'


function Calendar() {
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const show = useSelector(selectShowModalEditIdea)
  const showAdd = useSelector(selectShowModalAddIdea)
  const currentMonth = useSelector(selectMonth)
  const quantityPreviousMonth = useSelector(selectPreviousMonth)
  const quantityNextMonth = useSelector(selectNextMonth)
  const quantityDaysOfCurrentMonth = useSelector(selectCurrentMonth)
  const selectUser = useSelector(selectUserChooseDate);
  const selectDataUser = useSelector(selectData);
  const keysData = Object.keys(selectDataUser)


  const arrayPreviousMonth = Array.from({length: quantityPreviousMonth }, (a,b) => b + 1)
  const arrayNextMonth = Array.from({length: quantityNextMonth}, (a,b) => b + 1)
  const arrayDaysOfCurrentMonth = Array.from({length: quantityDaysOfCurrentMonth }, (a,b) => b + 1)

  const firstDay = Number(currentMonth.date(1).format('d'))
  const lastDay = Number(currentMonth.date(quantityDaysOfCurrentMonth).format('d'));

  const arrayDayOfPreviousMonth = firstDay === 0 ? arrayPreviousMonth.slice(-6) :
        firstDay === 1 ? [] : arrayPreviousMonth.slice(-firstDay + 1);
  const arrayDayOfNextMonth = lastDay === 0 ? [] :
        lastDay === 1 ? arrayNextMonth.slice(0, 6) : arrayNextMonth.slice(0, 7 - lastDay );

  const showEditModal = (el ) => {

    setData(el)

    if(showAdd) {
      dispatch(closeModalAddIdeaAction())
    }
    dispatch(showModalEditIdeaAction())
  }



  const renderedarrayDayOfPreviousMonth = arrayDayOfPreviousMonth.map((el) => {
    const currentDay = currentMonth.subtract(1, 'month').date(el).format('YYYY-MM-DD')
    const includesDate = keysData.includes(currentDay)
    if(includesDate) {
      return (
        <CalendarOfGrid array={selectDataUser[currentDay]}
          onClick={showEditModal}
          key={el} day={String(el)} week={currentMonth.subtract(1, 'month').date(el).format('dd')}
        />
      )
    }

    return (
      <CalendarOfGrid onClick={showEditModal} key={el} day={String(el)} week={currentMonth.subtract(1, 'month').date(el).format('dd')}/>
    )
  });
  


  const renderedarrayDaysOfCurrentMonth = arrayDaysOfCurrentMonth.map((el) => {
    const correct = currentMonth.format('MMM') === dayjs().format('MMM')
    const choseUser = selectUser?.format('MM') === currentMonth.format('MM')
    const currentDay = currentMonth.date(el).format('YYYY-MM-DD')
    const includesDate = keysData.includes(currentDay)

    if(includesDate) {
      return (
        <CalendarOfGrid array={selectDataUser[currentDay]}
          onClick={showEditModal}
          key={el} day={String(el)} week={currentMonth.date(el).format('dd')}
        />
      )
    }

    if(choseUser && (el === Number(selectUser.format('D')))) {

      return (
        <CalendarOfGrid userChoose='userChoose' onClick={showEditModal} key={el} day={String(el)} week={currentMonth.date(el).format('dd')}/>
      )
    }

    if(Number(el) === Number(dayjs().date()) && correct ) {
      return (
        <CalendarOfGrid today='today' onClick={showEditModal} key={el} day={String(el)} week={currentMonth.date(el).format('dd')}/>
      )
    }

    return (
      <CalendarOfGrid onClick={showEditModal} key={el} day={String(el)} week={currentMonth.date(el).format('dd')}/>
    )
  });

  const renderedarrayDayOfNextMonth = arrayDayOfNextMonth.map((el) => {
    const currentDay = currentMonth.add(1, 'month').date(el).format('YYYY-MM-DD')
    const includesDate = keysData.includes(currentDay)
    if(includesDate) {
      return (
        <CalendarOfGrid array={selectDataUser[currentDay]}
          onClick={showEditModal}
          key={el} day={String(el)} week={currentMonth.add(1, 'month').date(el).format('dd')}
        />
      )
    }

    return (
      <CalendarOfGrid onClick={showEditModal} key={el} day={String(el)} week={currentMonth.add(1, 'month').date(el).format('dd')}/>
    )
  });

  return(
    <div className={s.calendarWrapp}>
      {renderedarrayDayOfPreviousMonth}
      {renderedarrayDaysOfCurrentMonth}
      {renderedarrayDayOfNextMonth}
      {show && <ModalCalendarForm header='Edit idea' created={data} />}
    </div>
  )

}

export default Calendar