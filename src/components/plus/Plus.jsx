import { useDispatch, useSelector } from 'react-redux/'


import { 
  showModalAddIdeaAction,
  closeModalAddIdeaAction,
  closeModalEditIdeaAction
} from '../../store/actions/actions'
import { selectShowModalAddIdea} from '../../store/selectors'
import s from './plus.module.scss'

function Plus() {
  const dispatch = useDispatch()
  const showAdd = useSelector(selectShowModalAddIdea)


  const showModalAdd = () => {
    if(showAdd) {
      dispatch(closeModalAddIdeaAction())
    } else {
      dispatch(showModalAddIdeaAction())
      dispatch(closeModalEditIdeaAction())
    }

  }

  return (
    <div className={s.plus} onClick={showModalAdd}>
      <span>+</span>
    </div>
  )
}

export default Plus