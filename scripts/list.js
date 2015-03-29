define('list',['app-frame'], function(appFrame) {


var audioEmpty;
var audio = audioEmpty = document.createElement("audio");

var init = function () {
	document.addEventListener("keydown", playFromList);
	document.addEventListener("keydown", stopFromList);
}

var createItem = function(e) {

	var t = document.querySelector("#t-record-item");
	var trecordItem = document.importNode(t.content, true);

	var recordItem = trecordItem.querySelector(".record-item");

	audio = recordItem.querySelector(".pan-audio");

	audio.setAttribute('controls', '');
	var audioURL = window.URL.createObjectURL(e.data);
	audio.src = audioURL;
	
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
	
	if (appFrame.autoPlayCheckboxEl.checked == true) {
		audio.play();
	}
}



var playFromList = function (event) {
	if (event.keyCode == 88 && !(event.target.localName == "input" && event.target.type == "text") )  { // key "x"

		if ( audio.paused == true ) {
			audio.play();
		} else {
			audio.pause();
		}

	}
};
var stopFromList = function (event) {
	if (event.keyCode == 67 && !(event.target.localName == "input" && event.target.type == "text") ) { // key "c"
		audio.pause();
		if (audio.currentTime) {
			audio.currentTime = 0.0;
		}
		
	}
}


return {
	init: init,
	createItem: createItem
};

});