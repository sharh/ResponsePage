/**
 *description
 *北京热队主页程序，使用jquery框架编写，成员信息置于people.js
 *支持点击侧栏翻页，上下键翻页，鼠标滚轮翻页，移动端滑动翻页
 *使用css3动画;板块颜色随机生成
 *兼容IE9+，ff，safari，chrome，opera及多数移动端浏览器
 *@mail     1148586347@qq.com
 *@author   光光
 *@date     2015-7-15
**/
$(function(){
	var doc = Zepto('body');
	//当前视觉视口显示的页数
	var pst = 1;
	var onMouseWheel = 0;
	var pageWidth = 1003;
	//定义板块颜色集
	const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
	//添加移动端支持
	document.body.addEventListener("touchstart", function(event) {
		event.preventDefault();
	},false);
	//上划事件
	doc.on('swipeUp',function(){
		slideToNext();
	});
	//下划事件
	doc.on('swipeDown', function(){
		slideToPro();
	});
	//页面大小变化监听
	window.addEventListener("resize", resize , false);
	//初始化页面
	$(".btn-1").css("background-color","black");
	//===================================
	//获取据左侧边距函数
	//@return Number
	//===================================
	function getCbLeft(){
		var	windowWidth = $(window).width(); 
		var cbWidth = $(".centerBox").width();
		var cbLeft = (windowWidth - cbWidth - 20)/2>0?(windowWidth - cbWidth)/2:0;
		return cbLeft;
	}
	//计算中心div位置
	var cbLeft = getCbLeft();
	$(".centerBox").css("left",cbLeft+10);
	var cbWidth = $(".centerBox").width();
	if(cbLeft == 0){
		$(".centerBox").css("width",$(window).width()-20);
	}else{
		$(".centerBox").css("width",cbWidth-20);
	}
	$(".centerBox").css("height",$(window).height()*0.8);
	$(".centerBox").css("top",$(window).height()*0.1);
	//===================================
	//页面大小重定义响应函数
	//根据页面大小设置中心div大小
	//===================================
	function resize(){
		var cbWidth = $(".centerBox").css("width");
		var cbLeft = getCbLeft();
		if($(window).width() < pageWidth){
			$(".centerBox").css("width",$(window).width()-20);
		}else{
			$(".centerBox").css("width",pageWidth-20);
		}
		if($(window).width() < 520){
			$("#slide-1 p").css("fontSize",40);
			$("#slide-1 p").css("marginTop",80);
			$("#slide-1 span").css("fontSize",50);
		}else{
			$("#slide-1 p").css("fontSize",60);
			$("#slide-1 p").css("marginTop",60);
			$("#slide-1 span").css("fontSize",100);
		}
		$(".centerBox").css("left",cbLeft+10);
		$(".centerBox").css("top",$(window).height()*0.1);
		$(".centerBox").css("height",$(window).height()*0.8);
	}
	if($(window).width() < 520){
			$("#slide-1 p").css("fontSize",40);
			$("#slide-1 p").css("marginTop",80);
			$("#slide-1 span").css("fontSize",50);
		}else{
			$("#slide-1 p").css("fontSize",60);
			$("#slide-1 p").css("marginTop",60);
			$("#slide-1 span").css("fontSize",100);
		}
	//添加简介内容
	for(var i=0;i<people.length;i++){
		var m = i + 1;
		var bgcolorNum = Math.floor(Math.random()*10);
		if(typeof(people[i][0]) == 'string'){
			$(".cb-"+m).append("<div class='cfloat' style='background-color:"+colors[bgcolorNum]+";text-align:center;'><img height='100%' src='"+people[i][0]+"' /></div>");
		}
		for (var j = 1; j < people[i].length; j++) {
			var bgcolorNum = Math.floor(Math.random()*10);
			$(".cb-"+m).append("<div class='cfloat' style='background-color:"+colors[bgcolorNum]+";'><p>"+people[i][j]+"</p></div>");
			if(j==11){
				break;
			}
		}
		$(".cb-"+m).append("<div class='clear'></div>");
	}
	//添加简介色块动态效果
	$(".p1").addClass("animation-4");
	$(".p2").addClass("animation-3");
	//上翻页
	function slideToPro(){
		if(pst > 1){
			$(".slide").removeClass("slide-y-"+pst);
			$(".rbtn").css("background-color","white");
			pst--;
  			$(".slide").addClass("slide-y-"+pst);
  			$(".btn-"+pst).css("background-color","black");
  			$(".slide section .cb-"+pst+" .cfloat").addClass("animation-1").parent().parent().siblings().children(".centerBox").children(".cfloat").removeClass("animation-1");
			$(".slide section .cb-"+pst+" .cfloat").hover(function(){
				$(".slide section .cb-"+pst+" .cfloat").removeClass("animation-1");
				$(this).addClass("animation-2").siblings().removeClass("animation-2");
			});
	}
	}
	//下翻页
	function slideToNext(){
		if(pst < 6){
			$(".slide").removeClass("slide-y-"+pst);
			$(".rbtn").css("background-color","white");
			pst++;
  			$(".slide").addClass("slide-y-"+pst);
  			$(".btn-"+pst).css("background-color","black");
  			$(".slide section .cb-"+pst+" .cfloat").addClass("animation-1").parent().parent().siblings().children(".centerBox").children(".cfloat").removeClass("animation-1");
			$(".slide section .cb-"+pst+" .cfloat").hover(function(){
				$(".slide section .cb-"+pst+" .cfloat").removeClass("animation-1");
				$(this).addClass("animation-2").siblings().removeClass("animation-2");
		});
		}
	}
	//设置点击页面侧栏按钮事件
	$(".rbtn").each(function(i){
		i++;
		$(".btn-"+i).click(function(){
			var m = -(i-pst);
			var n = i+m;
			pst=pst-m;
			$(".slide").removeClass("slide-y-"+n);
			$(".rbtn").css("background-color","white");
			$(".slide").addClass("slide-y-"+i);
			$(".btn-"+i).css("background-color","black");
			$(".slide section .cb-"+i+" .cfloat").addClass("animation-1").parent().parent().siblings().children(".centerBox").children(".cfloat").removeClass("animation-1");
			$(".slide section .cb-"+i+" .cfloat").hover(function(){
				$(".slide section .cb-"+i+" .cfloat").removeClass("animation-1");
				$(this).addClass("animation-2").siblings().removeClass("animation-2");
			});
		});
	});
	function clickBtn(i){
		$(".slide").removeClass("slide-y-"+i);
		$(".rbtn").css("background-color","white");
		$(".slide").addClass("slide-y-"+i);
		$(".btn-"+i).css("background-color","black");
	}
	//设置鼠标滚轮事件
	jQuery(function($) {
    $('body').bind('mousewheel', function(event, delta) {
    	if(onMouseWheel == 0){
			if(delta>0){
            	slideToPro();
            }else{
            	slideToNext();
            }
            onMouseWheel = 1;
            setTimeout(function(){
            	onMouseWheel = 0;
            },500);
    	}
        });
	});
	//设置键盘事件
	$(document).keydown(function(event){
	switch(event.keyCode){
		case 38:
			event.preventDefault();
			slideToPro();
			break;
		case 40:
			event.preventDefault();
			slideToNext();
			break;
		default:
			break;
	}
	});
});