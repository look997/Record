require.config({
    paths: {
        'wave-surfer': 'libs/wavesurfer.min'
    },
    shim: {
        'wave-surfer': {
            exports: 'WaveSurfer' // if someone use 'jQuery' name, use global '$' variable as module value
        }
    }
});

require(['record'], function (record) {
	
	record.init();
	//userAudio.get(record.onSuccess, record.onError);
	//recordingLink.init();
	
});