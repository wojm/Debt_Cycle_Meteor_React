import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';
//import Test from '../imports/ui/test.jsx';

import '../imports/startup/accounts-config.js';

import Board from '../imports/ui/Chess/Board';
import { observe } from '../imports/ui/Chess/Game';



Meteor.startup(() => {
  observe(knightPosition =>
    render(
      <Board knightPosition={knightPosition} />,
      document.getElementById('render-target')
    )
  );
});
