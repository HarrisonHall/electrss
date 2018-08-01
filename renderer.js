//Renders window and parses scrambled rss feeds
//Harrison Hall 2018

//Credit to jeancroy for external open from https://discuss.atom.io/t/opening-a-browser-window-from-an-a-in-the-app/28491/5
var shell = require('electron').shell;
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

//Prints to div
function printToDiv(counter, title, link, description, date){
	if (typeof title !== 'undefined' || title === null) {
		if (description != "") {
			description = "<br>" + description;
		}
		document.getElementById('rss_spot').innerHTML += '<div class="purerss">'
			//+ '<a style="color:'+config.numcolor+'">' + counter  + "</a>" + ' '
			+ '<a style="color:'+config.titlecolor+'" href="'+link+'">' + title + "</a>"
			+  ' <a style="color:'+config.textcolor+'">' + description + "</a>"
			+ '<br>' + '<a style="color:'+config.datecolor+'">' + date + "</a>" + '</div>';
	}
}

function printRSS(parsed, counter){
	title = parsed.find("title").text();
	description = parsed.find("description").text();
	link = parsed.find("link").text();
	date = parsed.find("pubDate").text();
	//image = parsed.find("image").text();

	printToDiv(counter, title, link, description, date);
}

function printAtom(parsed, counter){
	title = parsed.find("title").text();
	link = parsed.find("link").attr('href');
	description = parsed.find("summary").text();
	date = parsed.find("updated").text();
	//image = parsed.find("link").attr('href');
	entry = parsed.find("entry").text();

	printToDiv(counter, title, link, entry, date);
}

//credit to https://stackoverflow.com/questions/18483241/random-div-order-on-page-load
function randomizediv(divid){
	var cards = $(divid);
	for(var i = 0; i < cards.length; i++){
		var target = Math.floor(Math.random() * cards.length -1) + 1;
		var target2 = Math.floor(Math.random() * cards.length -1) +1;
		cards.eq(target).before(cards.eq(target2));
	}
}

$(document).ready(function() {
	var counter = 0;
	for (i = 0; i < config.rssList.length; i++){
		let feed = config.rssList[i];
		$.ajax(feed, {
			accepts:{ xml:"application/rss+xml" },
			dataType:"xml",
			success:function(data) {
				$(data).find("item").each(function () {
					var parsed = $(this);
					counter++;
					printRSS(parsed, counter);
				});
			}});
	}
	for (i = 0; i < config.atomList.length; i++){
		let feed = config.atomList[i];
		$.ajax(feed, {
			accepts:{ xml:"application/rss+xml" },
			dataType:"xml",
			success:function(data) {
				$(data).find("entry").each(function () {
					var parsed = $(this);
					counter++;
					printAtom(parsed, counter);
				});
			}});
	}
	//Change setTimeout ms if feeds take too long to load-- they shouldn't...
	setTimeout(randomizediv, 1000, ".purerss"); 
});
