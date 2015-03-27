
define('record', ['app-frame', 'list', 'user-audio'], function(appFrame, list, userAudio) {


var appContainer = appFrame.el;

var record = appFrame.record;
var status = appFrame.status;

var audio = audioEmpty = document.createElement("audio");

// successCallback
var onSuccess = function(stream) {
	console.log(stream);
	
	var	mediaRecorder = new MediaRecorder(stream);
	var audioContext = new webkitAudioContext();
	var analyser = audioContext.createAnalyser();
	var microphone = audioContext.createMediaStreamSource(stream);
	var javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
	
	analyser.smoothingTimeConstant = 0.3;
	analyser.fftSize = 1024;
	
	var playStopRecord = function (event) {
		if (event.keyCode == 90 && event.target.localName != "input") { // key "z"

			if ( mediaRecorder.state == "recording") {
				stopRecording();
			} else {
				recording();
			}

		}
	};

	var recording = function() {
		userAudio.get(onSuccess, onError);
		/*mediaRecorder.ondataavailable = list.createItem;
		mediaRecorder.start();

		status.textContent = "recording";
		record.onclick = stopRecording;*/
	};

	var stopRecording = function() {
		mediaRecorder.stop();
		stream.stop();

		status.textContent = "stop";
		record.onclick = recording;
	};
	//record.onclick = recording;
	
	mediaRecorder.ondataavailable = list.createItem;
	mediaRecorder.start();

	status.textContent = "recording";
	record.onclick = stopRecording;
	//recording();

	document.addEventListener("keydown", playStopRecord);

};


// errorCallback
var onError = function(err) {
	console.log("The following error occured: " + err);
};

	

return {
	onSuccess: onSuccess,
	onError: onError
};

});