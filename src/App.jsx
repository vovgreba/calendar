import { useSelector } from 'react-redux'

import Plus from './components/plus/Plus'
import Month from './components/month/Month'
import Calendar  from './components/calendar/Calendar'
import  ModalCalendarForm  from './components//form/CalendarForm'

import { selectShowModalAddIdea } from './store/selectors'

import s from './app.module.scss'

function App() {
  const show = useSelector(selectShowModalAddIdea);
  return (
    <>
      <header className={s.header}>
        <Plus />
        {show && <ModalCalendarForm header='Add new idea'/>}
        <Month />
      </header>
      <Calendar />
    </>
  )
}

export default App
