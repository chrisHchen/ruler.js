 var Ruler = function(opt){
 	var winW = window.innerWidth,canvas,ctx,canvasW,show
 		canvasH = opt.h || 50, //canvas height
 		perScaleLen = opt.p || 80, // the pixel length of per scale
 		totalScale = opt.ts || 50, // number of total scales
 		color4Scale =  opt.c4s || '#BCBCBC',
 		color4Num =  opt.c4n || '#BCBCBC',
 		scaleFigure = opt.sf || 500, // math distance btw 2 indicated figures
 		centerScale = opt.cs || 10000, // the scale figure that is positioned at the center of the screen
 		fg = 0.15, // friction factor
 		interval = 1,
 		totalLen = totalScale*perScaleLen

 	var addListener = function( e, str, func ) {
		if( e.addEventListener ) {
			e.addEventListener( str, func, false );
		}else if( e.attachEvent ) {
			e.attachEvent( "on" + str, func );
		}else {
			
		}
	};
	var removeListener = function( e, str, func ) {
		if( e.removeEventListener ) {
			e.removeEventListener( str, func, false );
		}else if( e.attachEvent ) {
			e.detachEvent( "on" + str, func );
		}else {
			
		}
	};

	function initCvs(){
		canvas = document.getElementById(opt.id)
		show = document.getElementById(opt.showId)
		show.value = centerScale
		canvas.width = canvasW = winW
		canvas.height = canvasH
		ctx = canvas.getContext('2d')
	}

	this.init = function(){
		initCvs()
		draw()
		regListener()
	}
	function showValue(a){
		show.value = Math.round(centerScale-a*scaleFigure/perScaleLen)
	}
	function draw(){
		ctx.strokeStyle = '#BCBCBC'
		ctx.fillStyle = '#BCBCBC'
		ctx.font='normal 12px Microsoft YaHei'
		var pointLen = 4//刻度长
		for(var i = 0; i <=totalScale*10 ;i++){
			ctx.beginPath()
			ctx.moveTo(-centerScale/scaleFigure*perScaleLen + winW/2 + i*perScaleLen/10, canvasH)
			if(i%5 == 0){
				ctx.lineTo(-centerScale/scaleFigure*perScaleLen + winW/2 + i*perScaleLen/10, canvasH-pointLen*2)
				if(i%10==0){
					ctx.fillText(scaleFigure*i/10, -centerScale/scaleFigure*perScaleLen+winW/2 + i*perScaleLen/10-16, canvasH-pointLen*2-2)
				}	
			}else{
				ctx.lineTo(-centerScale/scaleFigure*perScaleLen + winW/2 + i*perScaleLen/10, canvasH-pointLen)
			}
			ctx.stroke()
		}
		ctx.restore()
		ctx.beginPath()
		ctx.strokeStyle = '#D84C29'
		ctx.moveTo(winW/2, canvasH)
		ctx.lineTo(winW/2, 0)
		ctx.stroke()
	}

	function update(distance){
		ctx.clearRect(0, 0, canvasW, canvasH);
		ctx.save()
		ctx.translate(distance,0);
		draw()
	}

	function velocity(distance,time){
		return distance/time
	}

	function regListener(){
		var startX=0, endX=0,distance=0,a = 0,startTime,endTime,v,timer,s=0//s: inertia distance
		addListener(canvas,'touchstart',function(e){
			startTime = new Date().getTime()
			startX = e.touches[0].pageX
		})
		addListener(canvas,'touchmove',function(e){
			console.log('hehe');
			endX = e.touches[0].pageX
			distance = endX -startX
			if(distance + a > centerScale/scaleFigure*perScaleLen){
				update(centerScale/scaleFigure*perScaleLen)
				showValue(centerScale/scaleFigure*perScaleLen)
			}else if(distance + a < -(totalScale-centerScale/scaleFigure)*perScaleLen){
				update(-(totalScale-centerScale/scaleFigure)*perScaleLen)
				showValue(-(totalScale-centerScale/scaleFigure)*perScaleLen)
			}else{
				showValue(distance + a)
				update(distance + a)
			}
		})
		addListener(canvas,'touchend',function(e){
			if(distance==0)return
			endTime = new Date().getTime()
			v = velocity(distance,(endTime-startTime)/1000)/200
			if(Math.abs(v) > 1.5){
				s = 0
				f = v>0?fg:(-fg)
				timer = setInterval(function(){
						if(Math.abs(v)>0.5){
							if(distance + a + s > centerScale/scaleFigure*perScaleLen){
								a = centerScale/scaleFigure*perScaleLen
								showValue(a)
								clearInterval(timer)
							}else if(distance + a + s < -(totalScale-centerScale/scaleFigure)*perScaleLen){
								a = -(totalScale-centerScale/scaleFigure)*perScaleLen
								showValue(a)
								clearInterval(timer)
							}else{
								update(distance + a + s)
								showValue(distance + a + s)
								s = s + v*interval
								v = v - f*interval
							}								
						}else{
							clearInterval(timer)
							a = a + distance + s
						}
					}, interval)
			}else{
					if(distance + a > centerScale/scaleFigure*perScaleLen){
						a = centerScale/scaleFigure*perScaleLen
					}else if(distance + a < -(totalScale-centerScale/scaleFigure)*perScaleLen){
						a = -(totalScale-centerScale/scaleFigure)*perScaleLen
					}else{
						a = a + distance								
					}	
			}
			distance = 0;
		})
	}
}
 