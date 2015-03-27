
define('record', ['app-frame', 'list', 'user-audio'], function(appFrame, list, userAudio) {


document.addEventListener("keydown", list.playFromList);
document.addEventListener("keydown", list.stopFromList);

var playStopRecord = function (event) {
		if (event.keyCode == 90 && event.target.localName != "input") { // key "z"
			console.log("first",mediaRecorder.state );

		}
	};
	
var appContainer = appFrame.el;

var record = appFrame.record;
var status = appFrame.record;

document.addEventListener("keydown", playStopRecord);

// successCallback
var onSuccess = function(stream) {
	//console.log(stream);
	
	var	mediaRecorder = new MediaRecorder(stream);
	
	var audioContext = new AudioContext();
	var analyser = audioContext.createAnalyser();
	var microphone = audioContext.createMediaStreamSource(stream);
	var scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
	
	analyser.smoothingTimeConstant = 0.3;
	analyser.fftSize = 1024;
	
	microphone.connect(analyser);
	analyser.connect(scriptProcessor);
	scriptProcessor.connect(audioContext.destination);
	
	var canvasContext = appFrame.el.querySelector('.draw-sound');
	
	scriptProcessor.onaudioprocess = () => {
		var array =  new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(array);
		var values = 0;
		
		//console.log(canvasContext);
		
		var length = array.length;
		for (var i = 0; i < length; i++) {
			values += array[i];
		}
		
		var average = values / length;
		canvasContext.style.height = average+"px";
	}
	


	var recording = function() {
		userAudio.get(onSuccess, onError);
		/*mediaRecorder.ondataavailable = list.createItem;
		mediaRecorder.start();

		status.textContent = "recording";*/
		record.onclick = stopRecording;
	};

	stopRecording = function () {
		mediaRecorder.stop();
		stream.stop();
		
		scriptProcessor.onaudioprocess = null;
		appFrame.el.querySelector(".draw-sound").removeAttribute("style");
		
		status.textContent = "Start Recording";
		record.onclick = recording;
	};
	//record.onclick = recording;
	
	mediaRecorder.ondataavailable = list.createItem;
	mediaRecorder.start();

	status.textContent = "Stop Recording";
	//recording();
	record.onclick = stopRecording;
	
	playStopRecord = function (event) {
			if (event.keyCode == 90 && event.target.localName != "input") { // key "z"
				console.log(mediaRecorder.state );
				if ( mediaRecorder.state == "recording") {
					stopRecording();
				} else if (mediaRecorder.state == "inactive") {
					recording();
				}

			}
		};
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