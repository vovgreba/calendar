import { combineReducers } from "redux";
import { changeMonthReducer } from './reducers'
import { changeModalIdeaReducer } from './reducers'
import { changeDatePickerReducer } from './reducers'
import { changeUserChooseDateReducer } from './reducers'
import { dataReducer } from "./dataReducer";

export const rootReducer = combineReducers({
  changeMonthReducer,
  changeModalIdeaReducer,
  changeDatePickerReducer,
  changeUserChooseDateReducer,
  dataReducer,
})