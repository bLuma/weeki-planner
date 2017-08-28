import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

export const baseHour = 8
export const durationOfWorkDay = 9
export const workingDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", /*sunday*/]

export const workingHours = new Array(durationOfWorkDay).fill(0).map((v,idx) => baseHour + idx)
export const emptySet = workingHours.map(() => "unset")

export const localDayNames = {
  monday: "Pondělí",
  tuesday: "Úterý",
  wednesday: "Středa",
  thursday: "Čtvrtek",
  friday: "Pátek",
  saturday: "Sobota",
  sunday: "Neděle"
}

export const fontAwesomeIconsForStates = {
  unset: (<FontAwesome name="circle-o"/>),
  free: (<FontAwesome name="check"/>),
  occupied: (<FontAwesome name="times"/>),
  maybe: (<FontAwesome name="question"/>),
}

export const fontAwesomeNamesForStates = {
  unset: "circle-o",
  free: "check",
  occupied: "times",
  maybe: "question",
}

export const EDIT_TYPE_SL = 'sl'
export const EDIT_TYPE_S = 's'
export const EDIT_TYPE_L = 'l'
export const EDIT_TYPE_SPECIFIC = 'specific'

export const fontAwesomeIconsForEditTypes = {
  [EDIT_TYPE_SL]: 'S+L',
  [EDIT_TYPE_S]: 'S',
  [EDIT_TYPE_L]: 'L',
  [EDIT_TYPE_SPECIFIC]: 'Week',
}


