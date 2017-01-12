import React, {Component} from 'react'
import ReactOnRails from 'react-on-rails';
import _ from 'lodash';
import update from 'react-addons-update'; // ES6
import {
  TimePicker,
  SelectField,
  MenuItem,
  TextField,
  DatePicker,
  Dialog,
  FlatButton,
  Paper} from 'material-ui';
import axios from 'axios';
import moment from 'moment';

// const BASE_URL = process.env.ON_HEROKU ? 'https://medminder2point0.herokuapp.com' : 'http://localhost:3000';

class MedsList extends Component {
  constructor() {
    super();
    this.state = {
      minders: [],
      newMinder: {
        title: '',
        freqInt: 1,
        freqStr: '',
        time: '',
        startDate: new Date(),
      },
      dateVal: null,
      open: false,
    }
  }

  componentWillMount() {
    let mindersToDisplay = this.props.medminders.map((minder) => {
      minder.freqStr = minder.frequency;
      return minder;
    })
    this.setState({
      minders: mindersToDisplay,
    });
  }
  addMedToDb = (e) => {
    axios.request({
      method: 'POST',
      url: '/medminders',
      data: this.state.newMinder,
      headers: ReactOnRails.authenticityHeaders(),
    })
    .then((res) => {
      console.log('RES IS', res);
      this.addMedToList(res.data.minder);
    });
  }

  addMedToList = (minder) => {
    let newMinders = this.state.minders.concat([minder]);
    console.log('ADDING TO LIST', newMinders);
    this.setState({
      minders: newMinders,
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
  handleDeleteClick = (e) => {
    let id = e.target.name;
    axios.request({
      method: 'DELETE',
      url:  'medminders/' + id,
      data: this.state.newMinder,
      headers: ReactOnRails.authenticityHeaders(),
    })
    .then((res) => {
      console.log('REMOVE MINDER WITH ID', id);
      this.removeMedFromList(id);
    });
  }

  removeMedFromList = (id) => {
    let newSetOfMinders = _.reject(this.state.minders, (minder) => {
      return minder.id === parseInt(id);
    });
    this.setState({
      minders: newSetOfMinders,
    });
  }
  addMedMinderFull = (e) => {
    this.addMedToDb(e);
    this.clearField(e);
    this.setState({open: false})
  }
  clearField = (e) => {
    this.setState({
      newMinder: {
        title: '',
        day: 1,
        time: null,
        startDate: new Date(),
      },
      dateVal: null,
    });
  }
  openModal = (e) => {
    this.setState({open: true});
  }
  handleClose = (e) => {
    this.setState({open: false});
  }
  render() {
    const actions = [
      <FlatButton
       label="Cancel"
       primary={true}
       keyboardFocused={true}
       onTouchTap={this.handleClose}
     />,
      <FlatButton
      label="Add Minder"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.addMedMinderFull}
    />,
   ];
    return (
      <Paper className="main-content-paper" style={{padding: '4px', margin: '15px auto', width: '80%'}} zDepth={5}>
      <div style={{textAlign: 'center'}}>

          <Paper style={{height:'100%', width:'100%', textAlign:'center', backgroundColor:'#0D47A1'}} zDepth={4}> <h1 className="alert alert-info this-works title-well-class">Med </h1> <i className="fa fa-4x fa-clock-o" zIndex={{10000}}></i><h1 className="alert alert-info this-works title-well-class"> minders</h1></Paper>

        <br />
        <h2>Hey, Mind Your Meds</h2>
        <FlatButton
          onClick={this.openModal}
          label="Add a MedMinder"
          primary={true}
        />
        <h3><strong>Current Medminders:</strong></h3>
        <br/>
        {this.state.minders.map((minder, i) => {
          return (
          <Paper style={{padding: '15px', margin: '10px auto', width: '30%'}} zDepth={5}>
            <p key={i}> {minder.title} - {minder.freqStr} - {minder.time} starting on: {moment(minder.startDate).format("MM-DD")}</p>
            <FlatButton name={minder.id} onClick={this.handleEditClick} primary={true} label="Edit" />
            <FlatButton name={minder.id} onClick={this.handleDeleteClick} secondary={true} label="Delete" />
          </Paper>
        );
        })}
        <Dialog
         title="Dialog With Date Picker"
         actions={actions}
         modal={false}
         open={this.state.open}
         onRequestClose={this.handleClose}
       >
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
        </Dialog>
        </div>

    </Paper>
    );
  }
  }
export default MedsList;
