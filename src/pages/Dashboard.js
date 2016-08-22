import React from 'react'

import {Speaker} from '../components'

const Dashboard = (props) => (
  <div>

    <div className="row">
      <Speaker
        className="col-1"
        selectedVoice={props.selectedVoice}
        defaultValue="Hello"
        placeholder="Say More..."
      />
    </div>

  </div>
);

export default Dashboard