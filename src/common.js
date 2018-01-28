import React from 'react'
import CircleOIcon from 'mui-icons/fontawesome/circle-o'
import CheckIcon from 'mui-icons/fontawesome/check'
import TimesIcon from 'mui-icons/fontawesome/times'
import QuestionIcon from 'mui-icons/fontawesome/question'

export const baseHour = 8
export const durationOfWorkDay = 9
export const workingDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', /*sunday*/]

export const momentLocale = 'cs-CZ' // cs

export const apiurl = 'http://localhost:3000/backend/api/v1/'

export const workingHours = new Array(durationOfWorkDay).fill(0).map((v,idx) => baseHour + idx)
export const emptySet = workingHours.map(() => ({state: 'unset', comment: '', type: 'base'}))

export const localDayNames = {
  monday: 'Pondělí',
  tuesday: 'Úterý',
  wednesday: 'Středa',
  thursday: 'Čtvrtek',
  friday: 'Pátek',
  saturday: 'Sobota',
  sunday: 'Neděle'
}

export const fontAwesomeNamesForStates = {
  unset: <CircleOIcon />,
  free: <CheckIcon />,
  occupied: <TimesIcon />,
  maybe: <QuestionIcon />,
}

export const IBIconStyle = {width: 13, height: 13}
export const IBStyle = {width: 15, height: 15, padding: 2}
export const FIStyle = {transform:'scale(0.8) translate(0, 10%)'}

export const EDIT_TYPE_SL = 'eo'
export const EDIT_TYPE_S = 'e'
export const EDIT_TYPE_L = 'o'
export const EDIT_TYPE_SPECIFIC = 'c'

export const EDIT_TYPE_TURN_OFF = '-'
export const EDIT_TYPE_TURN_ON = '+'
