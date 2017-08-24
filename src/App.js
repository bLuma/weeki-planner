import React, { Component } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import './App.css'

const baseHour = 8
const durationOfWorkDay = 9
const workingDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", /*sunday*/]
const localDayNames = {
  monday: "Pondělí",
  tuesday: "Úterý",
  wednesday: "Středa",
  thursday: "Čtvrtek",
  friday: "Pátek",
  saturday: "Sobota",
  sunday: "Neděle"
}

// props = {fn click, user, hour, state}
const UserTableCell = (props) => (
  <td className={props.state} onClick={e => props.click(props)}>{props.state}</td>
)

// props = {user, day, data[...,...,...]}
class UserTableRow extends Component {
  render() {
    const data = this.props.data || []
    const cells = data.map((state, idx) => (
      <UserTableCell key={idx} user={this.props.user} day={this.props.day} hour={baseHour + idx} state={state}/>
    ))

    return (
      <tr>
        <th>{this.props.user}</th>
        {cells}
      </tr>
    )
  }
}



class TableHeaderWithHours extends Component {

  render() {
    const ths = this.props.hours.map(hour => (
      <th key={hour}>{hour}-{hour + 1}</th>
    ))

    return (
      <tr>
        <td colSpan="2"></td>
        {ths}
      </tr>
    );
  }
}

class DayGroup extends Component {
  render() {
    const users = Object.keys(this.props.users)
    const userRowsCount = users.length
    const userRows = users.map(user => (
      <UserTableRow key={user} user={user} day={this.props.day} data={this.props.users[user]} />
    ))

    return (
      <tbody>
        <tr><th rowSpan={userRowsCount+2}>{localDayNames[this.props.day]}</th></tr>
        {userRows}
        <tr></tr>
      </tbody>
    )
  }
}

class Table extends Component {
  aggregateUserDataForDay(day) {
    return this.props.data.reduce((result, userObject) => {
      result[userObject.user] = userObject.data[day]
      return result
    }, {})
  }

  render() {
    const days = workingDays.map(day => (
        <DayGroup key={day} day={day} users={this.aggregateUserDataForDay(day)} />
    ))

    return (
      <table>
        <thead>
          <TableHeaderWithHours hours={this.props.hours}/>
        </thead>
        {days}
      </table>
    )
  }
}

class Button extends Component {
  render() {
    return (
      <div className={this.props.action + " button"}>{this.props.action}</div>
    )
  }
}

class ControlPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {date: moment()}
    this.onChangeDate = this.onChangeDate.bind(this)
  }

  onChangeDate(selectedDate) {
    this.setState({date: selectedDate})
  }

  render() {
    return (
      <div id="controlPanel">
        <div className="flexflow">
          Týden: <DatePicker id="datepicker" selected={this.state.date} onChange={this.onChangeDate} locale="cs-cz"/>
        </div>
        <div className="flexflow">
          <Button action="remove"/>
          <Button action="free"/>
          <Button action="occupied"/>
          <Button action="maybe"/>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    const hours = new Array(durationOfWorkDay).fill(0).map((v,idx) => baseHour + idx)
    const data = [
      {
        user: "katka",
        data: {
          monday: ["free", "free", "occupied", "maybe", "free", "free", "free", "free", "occupied"],
          tuesday: ["free", "free", "occupied", "maybe", "free", "free", "free", "free", "maybe"]
        }
      },
      {
        user: "petra",
        data: {
          monday: ["occupied", "occupied", "occupied", "maybe", "free", "free", "free", "free", "free"],
          tuesday: ["free", "free", "occupied", "maybe", "free", "free", "free", "free", "free"]
        }
      }
    ]

    return (
      <div className="App">
        <ControlPanel />
        <Table hours={hours} data={data}/>
      </div>
    );
  }
}

export default App;
