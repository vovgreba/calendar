import { setLocalStorage, getLocalStorage } from "../../components/storage/storage";

const initialState = {
  '2023-12-08': [
    {title:"Write a program", desc: 'todo list', date: '2023-12-08', time: '20:20'},
    {title:"Write a program", desc: 'todo', date: '2023-12-08', time: '21:20'},
  ],
  '2023-09-15': [{title:"to buy ", desc: 'a book', date: '2023-09-15', time: '20:30'}],
  '2024-01-02': [{title:"to buy", desc: 'a car',date: '2024-01-02', time: '12:15'}],
}
// const initialState = localStorage.getItem('state') || {}
// localStorage.clear();


export const dataReducer = (state = initialState, action) => {
  const {title, desc, date, time} = action.payload || {};

  const updateState = {...state};
  let indexToUpdate = null;
  const isSameDate = action.payload?.oldData?.date === action.payload?.newData?.date;

  if(date || action.payload?.oldData && action.payload?.newData ) {

    indexToUpdate = updateState[date || action.payload?.oldData.date]?.findIndex(item => {
      
      return JSON.stringify(item) === JSON.stringify(action.payload || action.payload?.oldData)
    })
  }


  switch (action.type) {
    case 'ADD_DATA':
      if(state[date]) {

        return {
          ...state,
          [date]: [...state[date], { title, desc, date, time, }],
        }
      } else {

        return {
          ...state,
          [date]:[{title, desc, date, time}]
        }
      }
    case 'EDDIT_DATA':

      if(indexToUpdate !== -1 && isSameDate) {

        const updatedArray = [...state[action.payload.oldData.date]];
        
        updatedArray[indexToUpdate] = action.payload.newData

        return {
          ...updateState,
          [action.payload.oldData.date]: updatedArray
        };
      }

      if(!isSameDate && state[action.payload.newData?.date]) {
        const {title, desc, date, time} = action.payload.newData
        const updatedArray = [...state[action.payload.oldData.date]];

        updatedArray.splice(indexToUpdate, 1)
        return {
          ...updateState,
          [action.payload.oldData.date]: updatedArray,
          [date]: [...state[date], { title, desc, date, time, }],
        }
      } else {
        const updatedArray = [...state[action.payload.oldData.date]];
        indexToUpdate !== -1 ? updatedArray.splice(indexToUpdate, 1) : delete updateState[action.payload.oldData.date];
        console.log(777)
        return {
          ...updateState,
          [action.payload.oldData?.date]:updatedArray,
          [action.payload.newData?.date]:[action.payload.newData]
        }
      }
      case 'REMOVE_DATA':
        if(state[date] && indexToUpdate !== -1) {
          const updatedArray = [...state[date]];
          updatedArray.splice(indexToUpdate, 1)
          console.log(indexToUpdate)
          return {
            ...updateState,
            [date]: updatedArray,
          }
        } else {
          console.log(indexToUpdate)
          delete updateState[date]
          return {
            ...updateState
          }
        }

    default:

      return state
  }
}

