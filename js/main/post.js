//<![CDATA[

var numposts = 3;
    var showpostthumbnails = true;
    var displaymore = false;
    var displayseparator = true;
    var showcommentnum = false;
    var showpostdate = true;
    var showpostsummary = true;
    var numchars = 100;
function labelthumbs(json) {
	document.write('<ul id="label_with_thumbs">');
	for (var i = 0; i < numposts; i++) {
		var entry = json.feed.entry[i];
		var posttitle = entry.title.$t;
		var posturl;
		if (i == json.feed.entry.length) break;
		for (var k = 0; k < entry.link.length; k++) {
			if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
				var commenttext = entry.link[k].title;
				var commenturl = entry.link[k].href
			}
			if (entry.link[k].rel == 'alternate') {
				posturl = entry.link[k].href;
				break
			}
		}
		var thumburl;
		try {
			thumburl = entry.media$thumbnail.url
		} catch(error) {
			s = entry.content.$t;
			a = s.indexOf("<img");
			b = s.indexOf("src=\"", a);
			c = s.indexOf("\"", b + 5);
			d = s.substr(b + 5, c - b - 5);
			if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
				thumburl = d
			} else thumburl = 'http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png'
		}
		var tag = entry.category[0].term;
		var postdate = entry.published.$t;
		var cdyear = postdate.substring(0, 4);
		var cdmonth = postdate.substring(5, 7);
		var cdday = postdate.substring(8, 10);
		var monthnames = new Array();
		monthnames[1] = "January";
		monthnames[2] = "February";
		monthnames[3] = "March";
		monthnames[4] = "April";
		monthnames[5] = "May";
		monthnames[6] = "June";
		monthnames[7] = "July";
		monthnames[8] = "August";
		monthnames[9] = "September";
		monthnames[10] = "October";
		monthnames[11] = "November";
		monthnames[12] = "December";
		document.write('<li class="clearfix">');
		if (showpostthumbnails == true) document.write('<div class="widget-thumb"><a class="label_thumb" href="' + posturl + '" target ="_top" style="background:url(' + thumburl.replace('/s72-c/', '/s1600/') + ') no-repeat center center;background-size: cover"></a></div>');
		document.write('<div class="widget-con"><h3 class="recent-title"><a href="' + posturl + '" target ="_top">' + posttitle + '</a></h3><div class="widget-sum">');
		if ("content" in entry) {
			var postcontent = entry.content.$t
		} else if ("summary" in entry) {
			var postcontent = entry.summary.$t
		} else var postcontent = "";
		var re = /<\S[^>]*>/g;
		postcontent = postcontent.replace(re, "");
		if (showpostsummary == true) {
			if (postcontent.length < numchars) {
				document.write('');
				document.write(postcontent);
				document.write('')
			} else {
				document.write('');
				postcontent = postcontent.substring(0, numchars);
				var quoteEnd = postcontent.lastIndexOf(" ");
				postcontent = postcontent.substring(0, quoteEnd);
				document.write(postcontent + '...');
				document.write('')
			}
		}
		var towrite = '';
		var flag = 0;
		document.write('</div><div class="widget-meta"><span class="widget-date">');
		if (showpostdate == true) {
			towrite = towrite + ' <i class="fa fa-clock-o"></i> ' + monthnames[parseInt(cdmonth, 10)] + ' ' + cdday + ' , ' + cdyear;
			flag = 1
		}
		if (showcommentnum == true) {
			if (flag == 1) {
				towrite = towrite + ' </span><span class="widget-cmm"> '
			}
			if (commenttext == '1 Comments') commenttext = '<i class="fa fa-comments"> 1</i>';
			if (commenttext == '0 Comments') commenttext = '<i class="fa fa-comments"></i> 0';
			commenttext = '<a href="' + commenturl + '" target ="_top">' + commenttext + '</a>';
			towrite = towrite + commenttext + ' </span></div> ';
			flag = 1
		}
		if (displaymore == true) {
			if (flag == 1) towrite = towrite + ' | ';
			towrite = towrite + '<a href="' + posturl + '" class="url" target ="_top">More ?/a>';
			flag = 1
		}
		document.write(towrite);
		document.write('</div></li>');
		if (displayseparator == true) if (i != (numposts - 1)) document.write('')
	}
	document.write('</ul>')
}
$(document).ready(function() {
    $('.sidebar h2').wrap('<div class="widget-title"></div>');
});
//]]>
