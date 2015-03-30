define('app-frame', function() {


var el = document.querySelector('.app-container');

return {
	el: el,
	recordButton: el.querySelector('.rec'),
	autoPlayCheckboxEl: el.querySelector('.autoplay-checkbox'),
	recDescriptionEl: el.querySelector(".description-to-recorded"),
	listEl: el.querySelector(".list"),
	
	linkLoadEl: el.querySelector(".link-load"),
	loadFileEl: el.querySelector(".load-file")
};

});