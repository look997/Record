define('recording-link', ['app-frame'], function(appFrame) {
	
	
	var audioEmpty;
	var audio = audioEmpty = document.createElement("audio");
	var waveAudio = waveAudioEmpty = document.createElement("audio");

	var init = function () {

		appFrame.loadFileEl.onclick = loadFile;
	}

	var loadFile = function () {
		var value = appFrame.linkLoadEl.value;

		var wavesurfer = Object.create(WaveSurfer);

		var t = document.querySelector("#t-record-item");
		var trecordItem = document.importNode(t.content, true);

		var recordItem = trecordItem.querySelector(".record-item");

		audio = recordItem.querySelector(".pan-audio");
		waveAudio = recordItem.querySelector(".wave-audio");
		waveAudio.audio = wavesurfer;
	var list = appFrame.listEl;
		list.insertBefore(recordItem, list.firstElementChild);;

		function deleteItem (event) {
			event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);
			if (list.firstElementChild) {
				audio = list.firstElementChild.querySelector(".pan-audio");
			} else {
				audio = audioEmpty;
			}

		}
		recordItem.querySelector(".delete-item").onclick = deleteItem;
		
		wavesurfer.init({
			container: recordItem.querySelector(".wave-audio"),
			waveColor: 'violet',
			progressColor: 'purple',
			height: '88'
		});
		wavesurfer.on('ready', function () {
		//	wavesurfer.play();
			
			wavesurfer.on('finish', function () {
				wavesurfer.stop();
			});
		});

		wavesurfer.load(value);
		
		
		recordItem.querySelector(".control-audio").onclick = function () {
			var waveOn = recordItem.querySelector(".wave-audio").audio;
			waveOn.playPause();
			recordItem.querySelector(".wave-audio").audio = waveOn;

		};
		
		recordItem.querySelector(".download-item").style.display = "none";
	}
	
	
	var playFromList = function (event) {
		if (event.keyCode == 88 && !(event.target.localName == "input" && event.target.type == "text") )  { // key "x"

			/*if ( audio.paused == true ) {
				audio.play();
			} else {
				audio.pause();
			}*/
			waveAudio.audio.playPause();

		}
	};
	var stopFromList = function (event) {
		if (event.keyCode == 67 && !(event.target.localName == "input" && event.target.type == "text") ) { // key "c"
			/*audio.pause();
			if (audio.currentTime) {
				audio.currentTime = 0.0;
			}
			*/
			waveAudio.audio.stop();
		}
	}
	
	return {
		init: init
	};

});