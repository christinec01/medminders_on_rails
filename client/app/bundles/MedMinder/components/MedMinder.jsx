import React, {Component} from 'react'
import update from 'react-addons-update'; // ES6
import {TimePicker, SelectField, MenuItem, TextField, DatePicker} from 'material-ui';

import moment from 'moment';

class MedsList extends Component {
  constructor(){
    super();
    this.state = {
      minders:[],
      newMinder: {
        title: '',
        freqInt: 1,
        freqStr: '',
        time: '',
        startDate: new Date(),
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

  handleChangeFrequencyPicker = (event, index, value) => {
    let newMinder = update(this.state.newMinder, {
      freqStr: {$set: event.target.textContent},
      freqInt: {$set: value},
    });
    this.setState({
      newMinder: newMinder,
    });
  }
  handleDateChange = (event, value) => {
    let newMinder = update(this.state.newMinder, {
      startDate: {$set: value},
    });
    this.setState({
      newMinder: newMinder,
    });
  }

  clearField = (e) => {
    this.setState({
      newMinder: {
        title: '',
        day: 1,
        time: null,
        startDate: new Date()
      },
      dateVal: null,
    });
  }
  render() {
    return (
      <div>
        <h3><strong>Current Medminders:</strong></h3>
        <br/>
        {this.state.minders.map((minder, i) => {
          return (
          <p key={i}> {minder.title} - {minder.freqStr} - {minder.time} starting on: {moment(minder.startDate).format("MM-DD")}</p>
        );
        })}
        <p>Add a New Minder:</p>
        <TextField
          name="title"
          hintText="Name of Med"
          onChange={this.handleChange}
          value={this.state.newMinder.title}
        /><br />
          <SelectField
          name="day"
          placeholder="frequency"
          floatingLabelText="Frequency"
          value={this.state.newMinder.freqInt}
          onChange={this.handleChangeFrequencyPicker}
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
          {/* <input
          type="text"
          onChange={this.handleChange}
          value={this.state.newMinder.day}
          /> */}
        <TimePicker
          hintText="12hr Format"
          name="time"
          onChange={this.handleChangeTimePicker12}
          value={this.state.dateVal}
        />
        <DatePicker
        name="startDate"
        hintText="Portrait Dialog"
        onChange={this.handleDateChange}
        value={this.state.newMinder.startDate}
        />
        <button onClick={(e) => {
          this.addMedToList(e);
          this.clearField(e);
        }}>Add Medminder</button>
      </div>
    );
  }
  }
export default MedsList;
