import { useState, useEffect } from 'react';
import dayjs from 'dayjs' 
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Button } from '../basicComponents/BasicComponents';
import { setLocalStorage } from '../storage/storage'

import {
  closeModalAddIdeaAction,
  closeModalEditIdeaAction, addDataAction, edditDataAtion, removeDataAtion
} from '../../store/actions/actions';
import { selectShowModalAddIdea } from '../../store/selectors';
import closeIcon from './icons/close.svg'
import trashIcon from './icons/trash.svg'

import s from './calendarForm.module.scss'

function ModalCalendarForm({header, created}) {
  const {title = '', desc = '', date = '', time = ''} = created || {}
  const [disabled, setDisabled] = useState(false)
  const [formValues, setFormValues] = useState({
    title: title || '',
    desc: desc || '',
    date: date || '',
    time: time || '',
  })
  useEffect(() => {
    const { title, desc, date, time } = created || {};
    setFormValues({
      title: title || '',
      desc: desc || '',
      date: date || '',
      time: time || '',
    });
  }, [created]);

  const dispatch = useDispatch();
  const showAdd = useSelector(selectShowModalAddIdea)

  const closeModalAdd = () => {
    if(showAdd) {
      dispatch(closeModalAddIdeaAction())
    } else {
      dispatch(closeModalEditIdeaAction())
    }
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target

    if(Boolean(value) !== 'false' && name === 'date') {
      setDisabled(true)
    }

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }
  const hundleSubmit = (event) => {
    event.preventDefault();
    const currentTime = dayjs().format('HH:mm');

    const updatedFormValues = {
      ...formValues,
      time: formValues.time ? formValues.time : currentTime
    };
    
    dispatch(addDataAction(updatedFormValues));
    setLocalStorage(updatedFormValues)
    closeModalAdd();

  }
  
  const hundleEditSubmit = (event) => {
    event.preventDefault();
    dispatch(edditDataAtion(created, formValues))
    dispatch(closeModalEditIdeaAction())
  }

  const hundleRemoveSubmit = (event) => {
    event.preventDefault();
    dispatch(removeDataAtion(created))
    dispatch(closeModalEditIdeaAction())
  }


  return (
    <div className={s.modalWrapper}>
      <form action="" >
        <div className={s.header}>
          <div>
            <h2 className={s.titleHeader}>{header}</h2>
            {created && <span>Created at:{date} {time}</span>}
          </div>
          <img className={s.close} src={closeIcon} alt="close" onClick={closeModalAdd}/>
        </div>
        <div className={s.heading}>
          <span className={s.title}>Title*</span>
          <Input 
            type="text" 
            name='title'
            value={formValues.title}
            onChange={handleInputChange}
          />
        </div>
        <div className={s.desc}>
          <span className={s.title}>Description</span>
          <textarea  id=""
            name='desc'
            value={formValues.desc}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className={s.footer}>
          <div className={s.date}>
            <span className={s.title}>Date*</span>
            <span className={s.opacity}>opacity</span>
            <Input 
              type='date' 
              name='date'
              value={formValues.date}
              onChange={handleInputChange}
            />

          </div>
          <div className={s.time}>
            <span className={s.title}>Begin</span>
            <span className={s.title}>time</span>
            <Input 
              type='time' 
              name='time'
              value={formValues.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {!created && <Button
         className={s.btnSave} type='submit' onClick={hundleSubmit} disabled={!disabled}>
          save
        </Button>}
        {created && <div className={s.btnCreated}>
          <Button className={s.btnRemove} type='submit' onClick={hundleRemoveSubmit}>
            <img src={trashIcon} alt="trash"/>
          </Button>
          <Button className={s.btnCreatedSave} onClick={hundleEditSubmit} type='submit'>save</Button>
        </div>}
      </form>
    </div>
  )
}

ModalCalendarForm.propTypes = {
  header: PropTypes.string.isRequired,
  created: PropTypes.object,
}

export default ModalCalendarForm