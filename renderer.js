var RSSFeed = {};
RSSFeed.rssList = ["http://feeds.feedburner.com/raymondcamdensblog?format=xml","http://news.ycombinator.com/rss","http://feeds.reuters.com/reuters/oddlyEnoughNews"];
//RSSFeed.iterator = 0;
console.log(RSSFeed);
$(document).ready(function() {
	for (i = 0; i < RSSFeed.rssList.length; i++){
		console.log(RSSFeed.rssList[i])
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
					entry = parsed.find("entry").text();

					if (typeof title !== 'undefined' || title === null) {
						counter++;
						document.getElementById('purerss').innerHTML += "<br>" + counter;
						document.getElementById('purerss').innerHTML += ' <a style="color:#50fa7b" href="'+link+'">' + title + "</a>";
						//document.getElementById('purerss').innerHTML += "<br>" + link;
						document.getElementById('purerss').innerHTML += "<br>" + description;
						document.getElementById('purerss').innerHTML += "<br>" + entry;
					}
				});
			}});
}});
