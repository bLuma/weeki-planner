import React, { Component } from 'react';
import './App.css';

const baseHour = 8
const durationOfWorkDay = 8
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
  constructor(props) {
    super(props)

    //this.state = {};
    //this.click = this.click.bind(this);
  }

  /*click(e) {
    let key = e.target.attributes.getNamedItem('data-key').value;
    this.setState(prevState => ({
      [key]: !prevState[key]
    }));
  }

  click2(e, i) {
    this.setState(prevState => ({
      [i]: !prevState[i]
    }));
  }*/

  render() {
    const ths = this.props.hours.map(hour => (
      <th key={hour}>{hour}-{hour + 1}</th>
    ))

    /*let ths = this.props.hours.map(hour => (
      this.state[hour] ? // onClick={this.click}  onClick={(e) => {this.click2(e, hour);}}
        <th className='red' key={hour} data-key={hour}>{hour}-{hour + 1}</th>
        :
        <th key={hour} data-key={hour}>{hour}-{hour + 1}</th>

    ));*/

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
    const userRowsCount = Object.keys(this.props.users).length
    const userRows = Object.keys(this.props.users).map(user => (
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
  constructor(props) {
    super(props)
  }

  aggregateUserDataForDay(day) {
    return this.props.data.reduce((result, userObject) => {
      result[userObject.user] = userObject.data[day]
      return result
    }, {})
  }

  render() {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map(day => (
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

class App extends Component {
  render() {
    const hours = [8,9,10,11,12,13,14,15,16]
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
        <Table hours={hours} data={data}/>
      </div>
    );
  }
}

export default App;
