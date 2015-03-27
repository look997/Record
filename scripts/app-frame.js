define('app-frame', function() {


var el = document.querySelector('.app-container');

var record = el.querySelector('.rec');
var status = el.querySelector('.status');

return {
	el: el,
	record: record,
	status: status
};

});