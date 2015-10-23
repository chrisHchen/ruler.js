# ruler.js
a configable ruler for  mobile app and H5 page
usage:
simplly add the code below, add 'hidpi-canvas.min.js' first if you are developping on high device pixel rate 
<script type="text/javascript" src='hidpi-canvas.min.js'></script>
<script type="text/javascript" src='ruler.js'></script>
<script>
var opt = {id:'canvas', //canvas的id
		   showId:'number', //显示数字容器的id--id for canvas element
		   h:50, //canvas高，（宽度默认为屏幕宽）--id for input element that show the figure
		   p:80, //一个刻度的宽度--the pixel length of per scale
		   ts:50, //总刻度数--number of total scales
		   sf:500, //两个刻度间的数值--math distance btw 2 indicated figures
		   cs:10000, //屏幕正中间的刻度数--the scale figure that is positioned at the center of the screen
		   c4s:'#BCBCBC', //刻度颜色 -- color for scale
		   c4n:'#BCBCBC'} // 数字颜色 -- color for figures
  var ruler = new Ruler(opt)
  ruler.init()
</script>
