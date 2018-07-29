//Renders window and parses rss feeds


//Credit to jeancroy for external open from https://discuss.atom.io/t/opening-a-browser-window-from-an-a-in-the-app/28491/5
var shell = require('electron').shell;
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

var RSSFeed = {};
RSSFeed.rssList = config.rssList;
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
                    date = parsed.find("pubDate").text();
					image = parsed.find("image").text();
					console.log("image: \t" + image);
					
					//entry = parsed.find("entry").text();

					if (typeof title !== 'undefined' || title === null) {
						counter++;
						document.getElementById('rss_spot').innerHTML += '<div id="purerss">'
							+ '<a style="color:'+config.numcolor+'">' + counter  + "</a>" + ' '
							+ '<a style="color:'+config.titlecolor+'" href="'+link+'">' + title + "</a>"
							+ "<br>" + ' <a style="color:'+config.textcolor+'">' + description + "</a>"
							+ '<br>' + '<a style="color:'+config.datecolor+'">' + date + "</a>" + '</div>';
					}
				});
			}});
}});
