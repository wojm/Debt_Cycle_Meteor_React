import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';
//import Test from '../imports/ui/test.jsx';

import '../imports/startup/accounts-config.js';

import Board from '../imports/ui/Chess/Board.js';


Meteor.startup(() => {
  render(<Board knightPosition={[0, 0]} />, document.getElementById('render-target'));
});
