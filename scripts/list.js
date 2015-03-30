define('list',['app-frame'], function(appFrame) {
	
	
	var audioEmpty;
	var audio = audioEmpty = document.createElement("audio");
	var waveAudio = waveAudioEmpty = document.createElement("audio");


	var init = function () {
		document.addEventListener("keydown", playFromList);
		document.addEventListener("keydown", stopFromList);
		
		appFrame.loadFileEl.onclick = loadFile;
	};
	var createRazem = function() {
		var wavesurfer = Object.create(WaveSurfer);



		var t = document.querySelector("#t-record-item");
		var trecordItem = document.importNode(t.content, true);

		var recordItem = trecordItem.querySelector(".record-item");
		
		selFun(recordItem);

		audio = recordItem.querySelector(".pan-audio");
		waveAudio = recordItem.querySelector(".wave-audio");
		waveAudio.audio = wavesurfer;

		/*audio.setAttribute('controls', '');
		var audioURL = window.URL.createObjectURL(e.data);
		audio.src = audioURL;*/

		var recDescription = appFrame.recDescriptionEl.value;

		recordItem.querySelector(".description").value = recDescription;

		var listEl = appFrame.listEl;
		listEl.insertBefore(recordItem, listEl.firstElementChild);;

		function deleteItem (event) {
			event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);
			if (listEl.firstElementChild) {
				audio = listEl.firstElementChild.querySelector(".pan-audio");
			} else {
				audio = audioEmpty;
			}

		}
		recordItem.querySelector(".delete-item").onclick = deleteItem;
		
		

		recordItem.querySelector(".control-audio").onclick = function () {
			var waveOn = recordItem.querySelector(".wave-audio").audio;
			waveOn.playPause();

		};
		
		recordItem.addEventListener("mousedown", function (event) { //switchAtThis
			//event.target.
			//console.log(this);
			waveAudio = this.querySelector(".wave-audio");
			
			selFun(this);
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
		
		return {wavesurfer: wavesurfer, recordItem: recordItem};
	};
	
	
	var createItem = function(e) {
		//console.log("du",e);
		var ra = createRazem();
		
		ra.wavesurfer.init({
			container: ra.recordItem.querySelector(".wave-audio"),
			waveColor: '#00BABA',
			progressColor: '#008B8B',
			height: '88'
		});

		ra.wavesurfer.loadBlob(e.data);

		var chunks = [];
		chunks.push(e.data);
		var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
		//console.log(blob);
		ra.recordItem.querySelector(".download-link-item").href = window.URL.createObjectURL(blob);
	};



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
	};
	
	var selFun = function (recordItem) {
		var il = appFrame.el.querySelectorAll(".record-item");
		var ilLenght = il.length;
		for (var i = 0; i<ilLenght; i++) {
			il[i].setAttribute("data-selected-recirding", false);
		}
		recordItem.setAttribute("data-selected-recirding", true);
		//recordItem.setAttribute(style.borderLeftColor = "green";
	};
	
	
	var loadFile = function () {
		
		var ra = createRazem();
		
		var value = appFrame.linkLoadEl.value;

		ra.wavesurfer.init({
			container: ra.recordItem.querySelector(".wave-audio"),
			waveColor: 'violet',
			progressColor: 'purple',
			height: '88'
		});

		ra.wavesurfer.load(value);
		
		
		
		ra.recordItem.querySelector(".download-link-item").href = value;
		ra.recordItem.querySelector(".download-link-item").download = "";
		//ra.recordItem.querySelector(".download-item").style.display = "none";
	};


	return {
		init: init,
		createItem: createItem
	};

});