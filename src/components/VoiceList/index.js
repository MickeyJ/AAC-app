import React from 'react'

const voiceList = (props) => (
  <form className={`voice-select ${props.className}`} >
    <span>Select Voice</span>
    <select
      id="voice-select"
      className="form-control"
      onChange={props.changeVoice.bind(this)}
      defaultValue={props.selectedVoice} >
      {window.speechSynthesis.getVoices().map((voice, i) =>(
        <option key={i} >{voice.name}</option>
      ))}
    </select>
  </form>
);

export default voiceList
