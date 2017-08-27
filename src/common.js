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
  unset: "",
  free: "check",
  occupied: "times",
  maybe: "question",
}