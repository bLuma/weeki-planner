//import React, { Component } from 'react'
//import FontAwesome from 'react-fontawesome'

export const baseHour = 8
export const durationOfWorkDay = 9
export const workingDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", /*sunday*/]

export const momentLocale = 'cs'

export const apiurl = "http://localhost:3000/backend/api/v1/"

export const workingHours = new Array(durationOfWorkDay).fill(0).map((v,idx) => baseHour + idx)
export const emptySet = workingHours.map(() => ({state: "unset", comment: "", type: "base"}))

export const localDayNames = {
  monday: "Pondělí",
  tuesday: "Úterý",
  wednesday: "Středa",
  thursday: "Čtvrtek",
  friday: "Pátek",
  saturday: "Sobota",
  sunday: "Neděle"
}

export const fontAwesomeNamesForStates = {
  unset: "circle-o",
  free: "check",
  occupied: "times",
  maybe: "question",
}

export const EDIT_TYPE_SL = 'eo'
export const EDIT_TYPE_S = 'e'
export const EDIT_TYPE_L = 'o'
export const EDIT_TYPE_SPECIFIC = 'c'

export const EDIT_TYPE_TURN_OFF = '-'
export const EDIT_TYPE_TURN_ON = '+'

/*export const fontAwesomeIconsForEditTypes = {
  [EDIT_TYPE_SL]: 'S+L',
  [EDIT_TYPE_S]: 'S',
  [EDIT_TYPE_L]: 'L',
  [EDIT_TYPE_SPECIFIC]: 'Week',
}*/


