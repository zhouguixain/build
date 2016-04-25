$('document').ready(function(){
	$.each($('.item'),function(index,obj){
		$(obj).delay(index*100).animate({left:'60%'},{
			duration:'slow',
		});
	});
});
