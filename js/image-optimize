<script type='text/javascript'>
//<![CDATA[
$(document).ready(function() {
$('img').each(function(){
var $img = $(this);
var filename = $img.attr('src')
$img.attr('alt', filename.substring((filename.lastIndexOf('/'))+1, filename.lastIndexOf('.')));
});
});
//]]>
</script>
<script type='text/javascript'>
//<![CDATA[
$(document).ready(function() {
$('img').each(function(){
var $img = $(this);
var filename = $img.attr('src')
$img.attr('title', filename.substring((filename.lastIndexOf('/'))+1, filename.lastIndexOf('.')));
});
});
//]]>
</script>
<script type='text/javascript'>
//<![CDATA[
var scrollTimer = null;
$(window).scroll(function() {
   var viewportHeight = $(this).height(),
       scrollbarHeight = viewportHeight / $(document).height() * viewportHeight,
       progress = $(this).scrollTop() / ($(document).height() - viewportHeight),
       distance = progress * (viewportHeight - scrollbarHeight) + scrollbarHeight / 2 - $('#scroll').height() / 2;
    $('#scroll')
        .css('top', distance)
        .text(' (' + Math.round(progress * 100) + '%)')
        .fadeIn(100);
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(function() {
        $('#scroll').fadeOut();
    }, 1500);
});
//]]>
</script>
