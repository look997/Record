define('list',['app-frame'], function(appFrame) {



var audio = audioEmpty = document.createElement("audio");

var createItem = function(e) {

	var t = document.querySelector("#t-record-item");
	var trecordItem = document.importNode(t.content, true);

	var recordItem = trecordItem.querySelector(".record-item");

	audio = recordItem.querySelector(".pan-audio");

	audio.setAttribute('controls', '');
	var audioURL = window.URL.createObjectURL(e.data);
	audio.src = audioURL;
	//audio.src = window.URL.createObjectURL(localMediaStream);
	var recDescription = appFrame.el.querySelector(".description-to-recorded").value;
	
	recordItem.querySelector(".description").value = recDescription;

	var list = appFrame.el.querySelector(".list");
	list.insertBefore(recordItem, list.firstElementChild);//appendChild(recordItem);

	function deleteItem (event) {
		event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);
		if (list.firstElementChild) {
			audio = list.firstElementChild.querySelector(".pan-audio");
		} else {
			audio = audioEmpty;
		}

	}
	recordItem.querySelector(".delete-item").onclick = deleteItem;
	//audio.play();

}

document.addEventListener("keydown", playFromList);
document.addEventListener("keydown", stopFromList);


var playFromList = function (event) {console.log("test");
	if (event.keyCode == 88 && event.target.localName != "input") { // key "x"

		if ( audio.paused == true ) {
			audio.play();
		} else {
			audio.pause();
		}

	}
};
var stopFromList = function (event) {
	if (event.keyCode == 67 && event.target.localName != "input") { // key "c"
		audio.pause();
		audio.currentTime = 0.0;
	}
}


return {
	
	createItem: createItem
};

});