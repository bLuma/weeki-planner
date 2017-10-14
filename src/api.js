import * as common from './common'

export default class Api {

  constructUrl(action, apikey, params = {}) {
    let url = common.apiurl
    url += encodeURIComponent(action)
    url += "?"
    url += "api_key=" + encodeURIComponent(apikey)
    for (const i in params) {
      url += "&" + i + "=" + encodeURIComponent(params[i])
    }
    return url
  }

  getCalendar(state, success, fail) {
    const url = this.constructUrl(
      "calendar",
      state.apikey,
      {
        hours: common.durationOfWorkDay,
        week: state.editType === common.EDIT_TYPE_SL ? common.EDIT_TYPE_S : (state.editType === common.EDIT_TYPE_S || state.editType === common.EDIT_TYPE_L ? state.editType : false),
        timestamp: !state.editMode || state.editType === common.EDIT_TYPE_SPECIFIC ? state.week.unix() : 0
      }
    )

    fetch(url).then(
      response => response.json()
    ).then(success).catch(fail)
  }
}