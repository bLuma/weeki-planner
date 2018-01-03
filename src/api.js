import * as common from './common'

export default class Api {

  constructUrl(action, apikey, params = {}) {
    let url = common.apiurl
    url += encodeURIComponent(action)
    url += '?'
    url += 'api_key=' + encodeURIComponent(apikey)
    for (const i in params) {
      url += '&' + i + '=' + encodeURIComponent(params[i])
    }
    return url
  }

  validateUser(apikey, successCallback) {
    const url = this.constructUrl(
      'validate-user',
      apikey,
      {}
    )

    fetch(url).then(
      response => response.json()
    ).then(
      response => {
        if (!response.status || response.status !== 'success') {
          console.log(response)
          return
        }
          
        successCallback(response.username, apikey)
      }
    ).catch(err => console.log(err))
  }

  login(username, password, successCallback, failCallback) {
    const url = this.constructUrl(
      'user',
      undefined,
      {
        name: username,
        password: password
      }
    )

    fetch(url).then(
      response => response.json()
    ).then(
      response => {
        if (!response.status || response.status !== 'success') {
          failCallback()
          return
        }
          
        successCallback(username, response.api_key)
      }
    ).catch(failCallback)
  }

  getCalendar(state, success, fail) {
    const url = this.constructUrl(
      'calendar',
      state.apikey,
      {
        hours: common.durationOfWorkDay,
        week: state.editType === common.EDIT_TYPE_SL ? '' : (state.editType === common.EDIT_TYPE_S || state.editType === common.EDIT_TYPE_L ? state.editType : false),
        timestamp: !state.editMode || state.editType === common.EDIT_TYPE_SPECIFIC ? state.week.unix() : 0,
        //onlybase: state.editMode && state.editType !== common.EDIT_TYPE_SPECIFIC ? 'true' : 'false'
        onlymycalendar: state.editMode
      }
    )

    fetch(url).then(
      response => response.json()
    ).then(success).catch(fail)
  }

  updateAction(state, day, hour, action, comment = '') {
    const dayOfWeek = state.week.day()
    const firstDayOfWeek = state.week.subtract(dayOfWeek - 1, 'days').hours(0).minutes(0).seconds(0)
    const specificDay = firstDayOfWeek.add(common.workingDays.indexOf(day), 'days')
    // console.log('indexOf: ' + common.workingDays.indexOf(day) + ' specificDay: ' + specificDay.format())

    const url = this.constructUrl(
      'calendar-update',
      state.apikey,
      {
        week: state.editType,
        day: state.editType === common.EDIT_TYPE_SPECIFIC ? specificDay.unix() : day,
        hour: hour,
        state: action,
        comment: comment
      }
    )

    fetch(url).catch(reason => console.log(reason))
    /*.then(
      response => response.json()
    ).then(success).catch(fail)*/
  }
}