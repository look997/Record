require(['user-audio', 'record'], function (userAudio, record) {
	
	
	
	var playStopRecord = function () {
		userAudio.get(record.onSuccess, record.onError);
	};
	
	document.onkeydown = playStopRecord;
});