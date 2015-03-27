define('user-audio', function() {


navigator.getUserMedia = ( navigator.getUserMedia ||
				   navigator.webkitGetUserMedia ||
				   navigator.mozGetUserMedia ||
				   navigator.msGetUserMedia);

 // constraints
var constraints = {
	audio: true,
};

var get = function (onSuccess, onError) {
	navigator.getUserMedia(constraints, onSuccess, onError);
}



return {
	get: get
};

});