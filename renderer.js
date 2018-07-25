//Renders window and parses rss feeds

//custom
var textcolor = "#8be9fd";
var titlecolor = "#50fa7b";

//Credit to jeancroy from https://discuss.atom.io/t/opening-a-browser-window-from-an-a-in-the-app/28491/5
var shell = require('electron').shell;
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});


var RSSFeed = {};
RSSFeed.rssList = ["https://www.reddit.com/r/all.rss","http://news.ycombinator.com/rss","https://www.nasa.gov/rss/dyn/breaking_news.rss","https://codek.tv/feed/"];
//RSSFeed.iterator = 0;
console.log(RSSFeed);
$(document).ready(function() {
	for (i = 0; i < RSSFeed.rssList.length; i++){
		//console.log(RSSFeed.rssList[i])
		let feed = RSSFeed.rssList[i];
		var counter = 0;
		$.ajax(feed, {
			accepts:{ xml:"application/rss+xml" },
			dataType:"xml",
			success:function(data) {
				$(data).find("item").each(function () { // or "item" or whatever suits your rss //entry for reddit
					var parsed = $(this);

					title = parsed.find("title").text();
					console.log("title: \t" + title);
					link = parsed.find("link").text();
					description = parsed.find("description").text();
					image = parsed.find("image").text();
					console.log("image: \t" + image);
					
					//entry = parsed.find("entry").text();

					if (typeof title !== 'undefined' || title === null) {
						counter++;
						document.getElementById('rss_spot').innerHTML += '<div id="purerss">' + counter
						+ ' <a style="color:'+titlecolor+'" href="'+link+'">' + title + "</a>"
						+ "<br>" + ' <a style="color:'+textcolor+'">' + description + "</a>" + '</div>';

					}
				});
			}});
}});
