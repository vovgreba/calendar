import dayjs from "dayjs"

export const getLocalStorage = (key) => {
  const obgLocale = localStorage.getItem(key)
  const objParse = JSON.parse(obgLocale)
  return  objParse 
}

export const setLocalStorage = (key, obg) =>{

  const obgString = JSON.stringify(obg)
  localStorage.setItem(key, obgString)
}