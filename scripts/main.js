require(['record', 'recording-link'], function (record, recordingLink) {
	
	record.init();
	//userAudio.get(record.onSuccess, record.onError);
	recordingLink.init();
	
});