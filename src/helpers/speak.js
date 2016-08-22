const { speechSynthesis } = window;

function speak(speaker, voice, input){
  const voices = speechSynthesis.getVoices();
  speaker.voice = voices.find((x) => x.name == voice);
  speaker.volume = 1;
  speaker.pitch = 1;
  speaker.rate = 1;
  speaker.text = input;
  speechSynthesis.speak(speaker);
}

export default speak