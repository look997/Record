# Record audio
Recording audio from microphone.

Create list of recording and descriptions.

Preview:
https://look997.github.io/Record

Using [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) (work only on Firefox) and libs [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js) and [requirejs](https://github.com/jrburke/requirejs).


Better to use https. Without it, you must approve the "Allowing use the microphone," every time the "Start Recording".

To load the URL requires [CORS](https://github.com/warren-bank/moz-rewrite/tree/json/master) and restrictions of [mixed content](https://addons.mozilla.org/en-US/firefox/addon/toggle-mixed-active-content).
