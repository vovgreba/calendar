import PropTypes from 'prop-types';
import cn from 'classnames'

import s from './basicComponents.module.scss'

export function CalendarOfGrid({day, week, onClick, today, userChoose, array,}) {

  const handleItemClick = (el) => () => {
    onClick(el);
  };

  return(
    <div className={cn(s.wrapp, s[today], s[userChoose])}>
      <div className={s.header}>
        <span className={s.day}>{day}</span>
        <span className={s.week}>{week}</span>
      </div>
      {array?.map((el,index) => {
        let newTitle = el.title
        if(newTitle.length >= 10) {
          newTitle = newTitle.slice(0, 10) + '...'
        }
        return (
          <div onClick={handleItemClick(el)} key={index} className={s.title}>{newTitle}</div>
        )
      })}
      
    </div>

  )
}

CalendarOfGrid.propTypes = {
  day: PropTypes.string.isRequired,
  week: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  today: PropTypes.string,
  userChoose: PropTypes.string,
  array: PropTypes.array,

}

export function Input({type, name, value, onChange, className}) {
  return (
    <input type={type}
    name={name}
    value={value}
    onChange={onChange}
    className={className}
  />
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
  className: PropTypes.string,
}

export function Button({type, onClick, className, children, disabled }) {

  return(
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  disabled: PropTypes.bool,
}