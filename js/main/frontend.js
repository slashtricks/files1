//<![CDATA[
/*GLOBAL SETTINGS, USER CAN CHANGE*/
var tyOptions = {
    monthFormat: [, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    noThumbnail: "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png",
    postperPage: 6,
    labelResults: 6,
    rTitleText: "Recent Posts",
    followByEmailText: "Subscribe for free and get the latest news and offers.",
    shareText: "Share:",
    relatedTitleText: "You Might Also Like",
    cmmTitleText: "Post a Comment"
};

// Main Scripts - "NOTE" (Encrypt in free version)
$(document).ready(function($) {
    $("#menu").each(function() {
        var t = $("#menu .LinkList .widget-content ul").children("li").children("a");
        var l = t.length;
        var a, p, j, f, k;
        for (var i = 0; i < l; i++) {
            a = t.eq(i);
            j = a.text();
            if (j.charAt(0) !== "_") {
                p = t.eq(i + 1);
                f = p.text();
                if (f.charAt(0) === "_") {
                    k = a.parent();
                    k.append('<ul class="sub-menu"/>');
                }
            }
            if (j.charAt(0) === "_") {
                a.text(j.replace("_", ""));
                a.parent().appendTo(k.children(".sub-menu"));
            }
        }
        $("#menu ul li ul").parent("li").addClass("has-sub");
        $("#menu > .widget").css("display", "block");
        $(".mobile-menu").prepend("<div class='nav-toggle'/>");
        $("#nav2").clone().appendTo(".mobile-menu");
        $(".mobile-menu ul li a").on("click", function($this) {
            if ($(this).parent().hasClass('has-sub')) {
                $this.preventDefault();
                if (!$(this).parent().hasClass('show')) {
                    $(this).parent().addClass('show').children('.sub-menu').slideToggle(200);
                } else {
                    $(this).parent().removeClass('show').find('> .sub-menu').slideToggle(200);
                }
            }
        });
        $(".nav-toggle").on("click", function() {
            $("body").toggleClass("show-menu");
        });
        $(".mobile-menu ul li a").each(function() {
            var txta = $(this).attr("href");
            var mtc = txta.match(/[^[\]]+(?=])/g);
            if (txta.charAt(0) === "[") {
                var txt = mtc[0].toLowerCase();
                var sp = mtc[0].split(",");
                var label = sp[0];
                var url = "/search/label/" + label + "?&max-results=" + tyOptions.labelResults;
                if (txt.match("mega")) {
                    $(this).attr("href", url);
                }
            }
        });
    });
    $("#search-icon").on("click", function() {
        $("body").toggleClass("show-search");
    });
    $(".recent-title > h2").text(tyOptions.rTitleText);
    $(".ty-share-post > span").text(tyOptions.shareText);
    $("#related-wrap .title-wrap h2").text(tyOptions.relatedTitleText);
    $(".FollowByEmail .widget-content").prepend("<p class='before-text'>" + tyOptions.followByEmailText + "</p>");
    $(".cmm-title h2").text(tyOptions.cmmTitleText);
    $(".block-image .thumb img, .PopularPosts ul li img, .avatar-image-container img").each(function() {
        var src = $(this).attr("src"),
            src = src.replace(/\/s[0-9]+\-c/g, '/s1600'),
            src = src.replace('/w72-h72-p-nu/', '/s1600/'),
            src = src.replace('/hqdefault.jpg', '/mqdefault.jpg'),
            src = src.replace('/default.jpg', '/mqdefault.jpg'),
            src = src.replace('/s35/', '/s45/'),
            src = src.replace('//img1.blogblog.com/img/blank.gif', '//4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s45-r/avatar.png'),
            src = src.replace('http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png', tyOptions.noThumbnail);
        $(this).attr("src", src);
    });
    $(".PopularPosts .widget-content ul li").each(function() {
        var $this = $(this),
            getPost = $this.find(".item-title a"),
            postURL = getPost.attr("href");
        $.ajax({
            url: postURL,
            type: "get",
            success: function(data) {
                var time = $(data).find(".published").text();
                getPost.parent().after("<div class='ty-meta'><span class='item-date'>" + time + "</span></div>");
            }
        });
    });
    $(".Label a").attr("href", function($this, href) {
        return href.replace(href, href + "?&max-results=" + tyOptions.labelResults);
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $(".back-top").css({
                bottom: "25px"
            });
        } else {
            $(".back-top").css({
                bottom: "-100px"
            });
        }
    });
    $(".back-top").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    $("#menu li").each(function() {
        var liContent = $(this);
        var txta = liContent.find("a").attr("href");
        var mtc = txta.match(/[^[\]]+(?=])/g);
        if (txta.charAt(0) === "[") {
            var $this = liContent;
            var txt = mtc[0].toLowerCase();
            var sp = mtc[0].split(",");
            var label = sp[0];
            tyPosts($this, txt, 4, label);
        }
    });
    $("#feat-sec .HTML").each(function() {
        var widget = $(this);
        var widgetContent = widget.children(".widget-content");
        var widgetContentText = widgetContent.text().trim();
        var mtc = widgetContentText.match(/[^[\]]+(?=])/g);
        if (widgetContentText.charAt(0) === "[") {
            var $this = widgetContent;
            var txt = mtc[0].toLowerCase();
            var sp = mtc[0].split(",");
            var label = sp[0];
            tyPosts($this, txt, 3, label);
        }
    });
    $(".ready-widget .HTML").each(function() {
        var widget = $(this);
        var widgetContent = widget.children(".widget-content");
        var widgetContentText = widgetContent.text().trim();
        var mtc = widgetContentText.match(/[^[\]]+(?=])/g);
        if (widgetContentText.charAt(0) === "[") {
            var $this = widgetContent;
            var txt = mtc[0].toLowerCase();
            var sp = mtc[0].split(",");
            var num = sp[0];
            var label = sp[1];
            tyPosts($this, txt, num, label);
        }
    });
    $(".related-ready").each(function() {
        var $this = $(this),
            label = $this.find(".related-tag").attr("data-label");
        tyPosts($this, "related-posts", 3, label);
    });

    function getLink(feed, z, s) {
        for (var x = 0; x < feed[z].link.length; x++)
            if (feed[z].link[x].rel == "alternate") {
                s = feed[z].link[x].href;
                break
            }
        return s;
    }

    function getTitle(ty, z, s) {
        var n = ty[z].title.$t,
            code = '<a href="' + s + '">' + n + '</a>';
        return code;
    }

    function getAuthor(uk, z) {
        var n = uk[z].author[0].name.$t,
            code = '<span class="item-author">' + n + '</span>';
        return code;
    }

    function getDate(ty, z) {
        var c = ty[z].published.$t
        var d = c.substring(0, 4),
            f = c.substring(5, 7),
            m = c.substring(8, 10),
            h = tyOptions.monthFormat[parseInt(f, 10)] + " " + m + ", " + d,
            code = '<span class="item-date">' + h + '</span>';
        return code;
    }

    function getImage(ty, z) {
        var n = ty[z].title.$t,
            p = ty[z].content.$t,
            u = $("<div>").html(p);
        if ("media$thumbnail" in ty[z]) {
            var w = ty[z].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s1600");
            if (p.indexOf("youtube.com/embed") > -1) {
                w = ty[z].media$thumbnail.url.replace("/default.jpg", "/mqdefault.jpg");
            }
        } else if (p.indexOf("<img") > -1) {
            w = u.find("img:first").attr("src");
        } else {
            w = tyOptions.noThumbnail;
        }
        var code = '<img class="ty-thumb" alt="' + n + '" src="' + w + '"/>';
        return code;
    }

    function getSnip(uk, z) {
        var p = uk[z].content.$t,
            u = $("<div>").html(p),
            snip = u.text();
        return snip;
    }

    function tyPosts($this, txt, num, label) {
        var jURL = "";
        if (txt.match("mega") || txt.match("featured") || txt.match("recent-posts") || txt.match("post-tag") || txt.match("related-posts")) {
            if (txt.match("recent-posts")) {
                jURL = "/feeds/posts/default?alt=json&max-results=" + num;
            } else {
                jURL = "/feeds/posts/default/-/" + label + "?alt=json&max-results=" + num;
            }
            $.ajax({
                url: jURL,
                type: "get",
                dataType: "jsonp",
                success: function(json) {
                    if (txt.match("mega")) {
                        var r = '<ul class="mega-widget">';
                    }
                    if (txt.match("featured")) {
                        var r = '<ul class="featured-posts">';
                    }
                    if (txt.match("recent-posts") || txt.match("post-tag")) {
                        var r = '<ul class="custom-widget">';
                    }
                    if (txt.match("related-posts")) {
                        var r = '<ul class="related-posts">';
                    }
                    console.log(feed);
                    var feed = json.feed.entry;
                    console.log(json);

                  if ( feed == undefined ) {
                    feed = {length: 0};
                    console.log("No entries found for this URL :: ", jURL);
                  }
                     
                    for (var s = "", z = 0; z < feed.length; z++) {
                        var s = getLink(feed, z, s),
                            title = getTitle(feed, z, s),
                            image = getImage(feed, z),
                            author = getAuthor(feed, z),
                            meta = getDate(feed, z),
                            snip = getSnip(feed, z);
                        var k = "";
                        if (txt.match("mega")) {
                            k += '<div class="mega-item"><div class="mega-content"><a class="mega-img" href="' + s + '">' + image + '</a><h3 class="ty-title">' + title + '</h3><div class="ty-meta">' + meta + '</div></div></div>';
                        } else if (txt.match("featured")) {
                            if ($this.parent().addClass("ty-show"));
                            if (z == 0) {
                                k += '<li class="first-item"><div class="ty-inner"><a class="ty-image" href="' + s + '">' + image + '</a><div class="ty-entry"><h3 class="ty-title">' + title + '</h3><div class="ty-meta">' + author + '' + meta + '</div><p class="ty-snip">' + snip.substr(0, 96) + '...</p></div></div></li>';
                            } else if (z == 1) {
                                k += '<li class="second-item"><div class="ty-inner"><a class="ty-image" href="' + s + '">' + image + '</a><div class="ty-entry"><h3 class="ty-title">' + title + '</h3><div class="ty-meta">' + meta + '</div></div></div></li>';
                            } else {
                                k += '<li class="last-item"><div class="ty-inner"><a class="ty-image" href="' + s + '">' + image + '</a><div class="ty-entry"><h3 class="ty-title">' + title + '</h3><div class="ty-meta">' + meta + '</div></div></div></li>';
                            }
                        } else if (txt.match("recent-posts") || txt.match("post-tag")) {
                            k += '<li><a class="custom-thumb" href="' + s + '">' + image + '</a><div class="ty-entry"><h3 class="ty-title">' + title + '</h3><div class="ty-meta">' + meta + '</div></div></li>';
                        } else txt.match("related-posts") && (k += '<li class="related-item"><div class="ty-image"><a class="related-thumb" href="' + s + '">' + image + '</a></div><div class="ty-entry"><h3 class="ty-title">' + title + '</h3><div class="ty-meta">' + meta + '</div></div></li>');
                        r += k
                    }
                    r += "</ul>";
                    if (txt.match("mega")) {
                        $this.addClass("has-sub mega-menu").append(r);
                        $this.find("a:first").attr("href", function($this, href) {
                            return href.replace(href, "/search/label/" + label + "?&max-results=" + tyOptions.labelResults);
                        });
                    } else {
                        $this.html(r);
                    }
                }
            });
        }
    }
});
//]]>
