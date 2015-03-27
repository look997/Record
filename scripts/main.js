require(['app-frame', 'user-audio', 'record'], function (appFrame, userAudio, record) {
	
	
	
	var playRecord = function () {
		userAudio.get(record.onSuccess, record.onError);
	};
	
	appFrame.record.onclick = playRecord;
	document.onkeydown = playRecord;
	
});