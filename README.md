# ruler.js
a configable ruler for mobile app and H5 page<br><br>
<h2>usage:</h2><br><br>
<code>
<script>
var opt = {id:'canvas', //canvas的id
		   showId:'number', //显示数字容器的id
		   h:50, //canvas高，（宽度默认为屏幕宽）
		   p:80, //一个刻度的宽度
		   ts:50, //总刻度数
		   sf:500, //两个刻度间的数值
		   cs:10000, //屏幕正中间的刻度数
		   c4s:'#BCBCBC', //刻度颜色
		   c4n:'#BCBCBC'} // 数字颜色
  var ruler = new Ruler(opt)
  ruler.init()
</script>
</code>
add 'hidpi-canvas.min.js' first if you are developping on high device pixel rate 




