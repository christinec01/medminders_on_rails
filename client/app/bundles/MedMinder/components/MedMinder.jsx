import React from 'react'
import update from 'react-addons-update'; // ES6
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';

class MedsList extends React.Component {
  constructor(){
    super();
    this.state = {
      minders:[],
      newMinder: {
        title: '',
        day: '',
        time: '',
      },
      dateVal: null,
    }
  }
  addMedToList = (e) => {
    this.setState({
      minders: this.state.minders.concat(this.state.newMinder)
    });

    // console.log(this.state.newMinder.time);
  }
  handleChange = (e) => {
    let newMinder = update(this.state.newMinder, {
      [e.target.name]: {$set: e.target.value},
    });
    this.setState({
      newMinder: newMinder,
    });
  }
  handleChangeTimePicker12 = (event, time) => {
    let newTime = moment(time).format('hh:mm a');
    let newMinder = update(this.state.newMinder, {
      time: {$set: newTime},
    });
    this.setState({
      newMinder: newMinder,
      dateVal: time,
    });
  };

  clearField = (e) => {
    this.setState({
      newMinder: {
        title: '',
        day: '',
        time: null,
      },
      dateVal: null,
    })
  }
  render(){
    return (
      <div>
        <h3><strong>Current Medminders:</strong></h3>
        <br/>
        {this.state.minders.map((minder) =>{
          return (
          <p> {minder.title} - {minder.day} - {minder.time}  </p>
          )
        })}
        <p>Add a New Minder:</p>
        <input
          name="title"
          type="text"
          placeholder = "name"
          onChange={this.handleChange}
          value={this.state.newMinder.title}
          />
          <input
          name="day"
          placeholder="day"
          type="text"
          onChange={this.handleChange}
          value={this.state.newMinder.day}
          />
        <TimePicker
          hintText="12hr Format"
          name="time"
          onChange={this.handleChangeTimePicker12}
          value={this.state.dateVal}
        />
        <button onClick={(e) => {
          this.addMedToList(e);
          this.clearField(e);
        }}>Add Medminder</button>
      </div>
    )
  }
  }
export default MedsList;
