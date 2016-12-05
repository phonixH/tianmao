$(function(){
	catear(); //首页猫耳朵
	menuMove();//首页菜单移入移除
	price();





	// 首页猫耳朵
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
	// 首页菜单移入移除
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
	//分类页价格区间
	function price(){
		$('input.sortBarPrice').keyup(function(){
			var num = $(this).val();
			if(num.length == 0){
				$('div.productUnit').show();
				return;
			}
			num = parseInt(num);
			if(isNaN(num) || num <= 0){
				num = 1;
			}
			$(this).val(num);
			var begin = $('input.beginPrice').val();
			var end = $('input.endPrice').val();
			if(!isNaN(begin) && !isNaN(end)){
				$('div.productUnit').hide();
				$('div.productUnit').each(function(){
					var price = $(this).attr('price');
					price = new Number(price);
					if(price <= end && price >= begin){
						$(this).show();
					}
				});
			}
		});
	};


})