import React from 'react';
import ReactOnRails from 'react-on-rails';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import MedMinder from '../components/MedMinder';

const MedMinderApp = (props) => {
  return (
    <MuiThemeProvider>
      <MedMinder medminders={props} />
    </MuiThemeProvider>
  );
};

// This is how react_on_rails can see the MedMinderApp in the browser.
ReactOnRails.register({MedMinderApp});
