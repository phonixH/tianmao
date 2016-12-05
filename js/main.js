$(function(){
	catear(); //猫耳朵
	menuMove();//菜单移入移除





	// 猫耳朵
	function catear(){
		$("div.right-menu span").mouseenter(function(){
			var left = $(this).position().left;
			var top = $(this).position().top;
			var width = $(this).css('width');
			var destLest = parseInt(left) + parseInt(width)/2;
			$('img#catear').css({'left':destLest,'top':top-20,}).fadeIn(500);
		});
		$('div.right-menu span').mouseleave(function(){
			$('img#catear').hide();
		});
	};
	// 菜单移入移除
	function menuMove(){
		$('div.eachCategory').mouseenter(function(){
			var cid = $(this).attr('cid');
			$('div.productsAsideCategorys[cid=' + cid + ']').show();
		});
		$('div.eachCategory').mouseleave(function(){
			var cid = $(this).attr('cid');
			$('div.productsAsideCategorys[cid=' + cid + ']').hide();
		});
		$('div.productsAsideCategorys').mouseenter(function(){
			$(this).show();
		});
		$('div.productsAsideCategorys').mouseleave(function(){
			$(this).hide();
		});
	};
	


})