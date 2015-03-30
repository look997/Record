define('list',['app-frame'], function(appFrame) {


var audioEmpty;
var audio = audioEmpty = document.createElement("audio");
var waveAudio = waveAudioEmpty = document.createElement("audio");
	

var init = function () {
	document.addEventListener("keydown", playFromList);
	document.addEventListener("keydown", stopFromList);
}

var createItem = function(e) {
	//console.log("du",e);
	
	
	var wavesurfer = Object.create(WaveSurfer);
	
	
	
	var t = document.querySelector("#t-record-item");
	var trecordItem = document.importNode(t.content, true);

	var recordItem = trecordItem.querySelector(".record-item");

	audio = recordItem.querySelector(".pan-audio");
	waveAudio = recordItem.querySelector(".wave-audio");
	waveAudio.audio = wavesurfer;

	/*audio.setAttribute('controls', '');
	var audioURL = window.URL.createObjectURL(e.data);
	audio.src = audioURL;*/
	
	var recDescription = appFrame.recDescriptionEl.value;
	
	recordItem.querySelector(".description").value = recDescription;

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
		waveColor: '#00BABA',
		progressColor: '#008B8B',
		height: '88'
	});
	wavesurfer.on('ready', function () {
	//	wavesurfer.play();
		
		if (appFrame.autoPlayCheckboxEl.checked == true) {
			//audio.play();
			waveAudio.audio.play();
		}
		wavesurfer.on('finish', function () {
			wavesurfer.stop();
		});
	});
	
	wavesurfer.loadBlob(e.data);
	
	recordItem.querySelector(".control-audio").onclick = function () {
		var waveOn = recordItem.querySelector(".wave-audio").audio;
		waveOn.playPause();
		recordItem.querySelector(".wave-audio").audio = waveOn;
		
	};
	
	var chunks = [];
	chunks.push(e.data);
	var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
	console.log(blob);
	recordItem.querySelector(".download-link-item").href = window.URL.createObjectURL(blob);
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
	init: init,
	createItem: createItem
};

});