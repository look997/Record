define('list', ['app-frame', 'wave-surfer'], function(appFrame, WaveSurfer) {
	
	
	var audioEmpty;
	var audio = audioEmpty = document.createElement("audio");
	var waveAudio = waveAudioEmpty = document.createElement("audio");
	var listEl = appFrame.listEl;


	var init = function () {
		document.addEventListener("keydown", playFromList);
		document.addEventListener("keydown", stopFromList);
		document.addEventListener("keydown", deleteFromList);
		document.addEventListener("keydown", arrowsUpDown);
		document.addEventListener("keyup", selDescriptionInput);
		
		appFrame.loadFileEl.onclick = loadFile;
		if (localStorage.getItem( "listLinks" )) {
			var linksString = localStorage.getItem( "listLinks" );
			var links = JSON.parse(linksString);
			var linksString = links.toString();
			appFrame.linkLoadEl.value = linksString.replace(",", " ");
		}
		
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

		listEl.insertBefore(recordItem, listEl.firstElementChild);;

		function deleteItem (event) {
			deleteElFromList(event.target.parentElement.querySelector(".wave-audio"));

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
			if (listEl.firstElementChild ) {
				waveAudio.audio.playPause();
			}

		}
	};
	
	var stopFromList = function (event) {
		if (event.keyCode == 67 && !(event.target.localName == "input" && event.target.type == "text") ) { // key "c"
			/*audio.pause();
			if (audio.currentTime) {
				audio.currentTime = 0.0;
			}
			*/
			if (listEl.firstElementChild ) {
				waveAudio.audio.stop();
			}
		}
	};
	
	var deleteFromList = function (event) {
		if (event.keyCode == 46 && !(event.target.localName == "input" && event.target.type == "text") ) { // key [Delete]
			deleteElFromList(waveAudio);
		}
			
	};
	
	var deleteElFromList = function (delWaveAudioEl) {
		if (listEl.firstElementChild ) {
			var toSelectedEl;
			
			if (delWaveAudioEl.parentElement.parentElement.previousElementSibling) {
				toSelectedEl = delWaveAudioEl.parentElement.parentElement.previousElementSibling;
			}
			
			delWaveAudioEl.parentElement.parentElement.parentElement.removeChild(delWaveAudioEl.parentElement.parentElement);

			if (toSelectedEl) {
				selFun(toSelectedEl);
			} else if (listEl.firstElementChild) {
				selFun(listEl.firstElementChild);
			}
		}
	}
	 
	var arrowsUpDown = function (event) {
		if (event.keyCode ==  38) { // key [up]
			if (listEl.firstElementChild ) {
				var selEl = waveAudio.parentElement.parentElement;
				if(selEl.previousElementSibling) {
					selFun(selEl.previousElementSibling);
				}
				selEl.querySelector(".description").blur();
			}
		}
		if (event.keyCode ==  40 ) { // key [down]
			if (listEl.firstElementChild ) {
				var selEl = waveAudio.parentElement.parentElement;
				if(selEl.nextElementSibling) {
					selFun(selEl.nextElementSibling);
				}
				selEl.querySelector(".description").blur();
			}
		}
	}
	
	var selDescriptionInput = function (event) {
		if (event.keyCode ==  86) { // key "v"
			if (listEl.firstElementChild ) {
				var selEl = waveAudio.parentElement;
				selEl.querySelector(".description").focus();
			}
		}
	}
	
	var selFun = function (recordItem) {
		var il = appFrame.el.querySelectorAll(".record-item");
		var ilLenght = il.length;
		for (var i = 0; i<ilLenght; i++) {
			il[i].setAttribute("data-selected-recirding", false);
		}
		recordItem.setAttribute("data-selected-recirding", true);
		waveAudio = recordItem.querySelector(".wave-audio");
		//recordItem.setAttribute(style.borderLeftColor = "green";
	};
	
	
	var loadFile = function () {
		
		
		var value = appFrame.linkLoadEl.value;
		
		var links = value.split(" ");
		for (prop in links) {
			if (links.hasOwnProperty(prop)) {
				
				var ra = createRazem();
				value = links[prop];
				
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
			}
		}
		
		localStorage.setItem( "listLinks", JSON.stringify(links) );
		
		
	};


	return {
		init: init,
		createItem: createItem
	};

});