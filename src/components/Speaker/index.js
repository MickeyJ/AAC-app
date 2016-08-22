import React, {Component} from 'react'

import speak from '../../helpers/speak'
import {Button} from '../../materials'

const { SpeechSynthesisUtterance, speechSynthesis } = window;

export default class speaker extends Component{
  constructor(props){
    super(props);
  }
  getSpeechInput(ref){
    this.speechInput = ref
  }
  handleSpeech(e){
    e.preventDefault();
    const speech = new SpeechSynthesisUtterance();
    const voice = this.props.selectedVoice || 'Samantha';
    const input = this.speechInput.value;
    if(input){
      speak(speech, voice, input);
      this.speechInput.value = '';
    }
  }
  render(){
    return(
      <div className={`speaker ${this.props.className}`}>
        <form className="form speech center-both" onSubmit={this.handleSpeech.bind(this)} >
          <input
            type="text"
            id="speech-input"
            className="shadow focusable"
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder}
            ref={(ref) => this.getSpeechInput(ref)}
          />
          <Button
            text="Speak"
            handleClick={this.handleSpeech.bind(this)}
            className="bg-blue txt-white shadow clickable"
          />
        </form>
      </div>
    )
  }
}