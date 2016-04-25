$("document").ready(function(){

	/** 
	 * 图片数组
	 */
	var images = [
	{
		name:"宝城翡翠园",
		img:"../images/project-1.jpg",
		des:"中山五桂山宝城翡翠园",
	},
	{
		name:"龙光海悦城邦",
		img:"../images/project-2-1.jpg",
		des:"中山坦洲龙光海悦城邦",
	},
	{
		name:"龙光海悦城邦",
		img:"../images/project-2-2.jpg",
		des:"中山坦洲龙光海悦城邦",
	},
	{
		name:"玫瑰园",
		img:"../images/project-3-1.jpg",
		des:"佛山市广东玫瑰园",
	},
	{
		name:"玫瑰园",
		img:"../images/project-3-2.jpg",
		des:"佛山市广东玫瑰园",
	},
	{
		name:"汇翠湾",
		img:"../images/project-4-1.jpg",
		des:"增城汇翠湾",
	},
	{
		name:"汇翠湾",
		img:"../images/project-4-2.jpg",
		des:"增城汇翠湾",
	},
	{
		name:"污水处理厂",
		img:"../images/project-5-1.jpg",
		des:"增城石滩污水处理厂",
	},
	{
		name:"污水处理厂",
		img:"../images/project-5-2.jpg",
		des:"增城石滩污水处理厂",
	},
	{
		name:"星河湾",
		img:"../images/project-6-1.jpg",
		des:"山西太原星河湾",
	},
	{
		name:"星河湾",
		img:"../images/project-6-2.jpg",
		des:"山西太原星河湾",
	},
	{
		name:"猎德村",
		img:"../images/project-7-1.jpg",
		des:"广州天河猎德村改造",
	},
	{
		name:"猎德村",
		img:"../images/project-7-2.jpg",
		des:"广州天河猎德村改造",
	},
	{
		name:"火车南站",
		img:"../images/project-8-1.jpg",
		des:"广州火车南站",
	},
	{
		name:"火车南站",
		img:"../images/project-8-2.jpg",
		des:"广州火车南站",
	},
	{
		name:"景峰华亭",
		img:"../images/project-9-1.jpg",
		des:"广州科学城龙光景峰华亭",
	},
	{
		name:"景峰华亭",
		img:"../images/project-9-2.jpg",
		des:"广州科学城龙光景峰华亭",
	},
	]

	// TODO: (优化) 把40%等数字，转成配置项，例如：mainWidth|narrowWidth

	/**
	 * 从任何位置转到左位的属性
	 */
	var position_left_property = {
		left:'40%',
		width:'55%',
		height:'80%'
	}

	/**
	 * 从任何位置转到右位的属性
	 */
	var position_right_property = {
		left:'60%',
		width:'55%',
		height:'80%',
	}

	/**
	 * 从任何位置转到中间的属性
	 */
	var position_main_property = {
		left:'50%',
		width:'60%',
		height:'90%',
	}
	
	/**
	 * 配置信息,用于动画中切换属性的期望值
	 */
	var config = {
		o_main:{
			forward:{
				dest:position_left_property,
				beginIndex:50,
				endIndex:50,
				claz:'left'
			},
			backward:{
				dest:position_right_property,
				beginIndex:50,
				endIndex:50,
				claz:'right'
			}
		},
		o_left:{
			forward:{
				dest:position_right_property,
				beginIndex:0,
				endIndex:50,
				claz:'right'
			},
			backward:{
				dest:position_main_property,
				beginIndex:100,
				endIndex:100,
				claz:'main'
			}
		},
		o_right:{
			forward:{
				dest:position_main_property,
				beginIndex:100,
				endIndex:100,
				claz:'main'
			},
			backward:{
				dest:position_left_property,
				beginIndex:0,
				endIndex:50,
				claz:'left'
			}
		}
	}

	/**
	 * 页面转换
	 * @param direction : 方向::forward -> 向左边滚动,后一帧置中
	 *						  ::backward -> 向右边滚动,前一帧置中
	 */
	function flip(direction){
		var o_main = $('.main');
		var o_left = $('.left');
		var o_right= $('.right');

		// TODO: (代码优化) 配置信息初始化时添加到对应的obj

		// 右边页面动画
		o_right.animate(config.o_right[direction].dest,{
			duration:'fast',
			start:function(){
				o_right.css({zIndex:config.o_right[direction].beginIndex});
			},
			always:function(){
				o_right.css({zIndex:config.o_right[direction].endIndex});
				o_right.removeClass().addClass('slide').addClass(config.o_right[direction].claz);
			}
		});
		// 中间页面动画
		o_main.animate(config.o_main[direction].dest,{
			duration:'fast',
			start:function(){
				o_main.css({zIndex:config.o_main[direction].beginIndex});
			},
			always:function(){
				o_main.css({zIndex:config.o_main[direction].endIndex});
				o_main.removeClass().addClass('slide').addClass(config.o_main[direction].claz);
;
			}
		});

		// 左边页面动画
		o_left.animate(config.o_left[direction].dest,{
			duration:'fast',
			start:function(){
				o_left.css({zIndex:config.o_left[direction].beginIndex});
			},
			always:function(){
				o_left.css({zIndex:config.o_left[direction].endIndex});
				o_left.removeClass().addClass('slide').addClass(config.o_left[direction].claz);
			}
		});
	}

	/**
	 * 切换图片
	 */
	function imageSwitch(direction){
		if (direction == 'forward'){
			var image = images.shift();
			images.push(image);
			console.log('forward:'+images);
			$('.left').css('background-image','url("'+images[2].img+'")');
		}else{
			var image = images.pop();
			images.unshift(image);
			console.log("backward:"+images);
			$('.right').css('background-image','url("'+images[0].img+'")');
		}
	}

	// 初始化

	$('.slide').eq(1).addClass('main').css(position_main_property).css({zIndex:100});
	$('.slide').eq(0).addClass('left').css(position_left_property).css({zIndex:50});
	$('.slide').eq(2).addClass('right').css(position_right_property).css({zIndex:50});

	$('.right').css('background-image','url("'+images[2].img+'")');
	$('.main').css('background-image','url("'+images[1].img+'")');
	$('.left').css('background-image','url("'+images[3].img+'")');

	$("#title").text(images[0].name);
	$("#description").text(images[0].des);

	// 注册事件
	$(".rightBtn").bind('click',function(){
		imageSwitch('forward')
		flip('forward');
		$("#title").text(images[0].name);
		$("#description").text(images[0].des);
	});

	$(".leftBtn").bind('click', function(){
		imageSwitch('backward')
		flip('backward');
		$("#title").text(images[0].name);
		$("#description").text(images[0].des);
	});
});
