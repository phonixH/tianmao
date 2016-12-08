$(function(){
	catear(); //首页猫耳朵
	menuMove();//首页菜单移入移除
	price();//分类页价格区间
	infoImgURL();// 产品介绍页面显示缩略图
	buyNumber();//产品介绍页面控制购买数量
	changeProductPage();// 切换商品详情和评价


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
	// 产品介绍页面显示缩略图
	function infoImgURL(){
		$('img.smallImg').mouseenter(function(){
			var bigImageURL = $(this).attr('bigImageURL');
			$('img.bigImg').attr('src',bigImageURL);
		});
		// 图片预加载
		$('img.bigImg').load(function(){
			$('img.smallImg').each(function(){
				var bigImageURL = $(this).attr('bigImageURL');
				img = new Image();
				img.src = bigImageURL;
				img.onload = function(){
					console.log(bigImageURL);
					$('div.img4load').append($(img));
				};
			});
		});
	};
	//产品介绍页面控制购买数量
	function buyNumber (){
		var stock = 66;
		$('.productNumberSetting').keyup(function(){
			var num = $(this).val();
			num = parseInt(num);
			if(isNaN(num)) num = 1;
			if(num <=0) num =1;
			if(num > stock) num = stock;
			$(this).val(num);
		});
		$('a.increaseNumber').click(function(){
			var num = $('.productNumberSetting').val();
			num ++;
			if(num > stock) num = stock;
			$('.productNumberSetting').val(num);
		});
		$('a.decreaseNumber').click(function(){
			var num = $('.productNumberSetting').val();
			num --;
			if(num < 1) num = 1;
			$('.productNumberSetting').val(num);
		});
	};
	// 切换商品详情和评价
	function changeProductPage(){
		$('div.productReviewDiv').hide();
		$('a.productDetailTopPartSelectedLink').click(function(){
			$('div.productReviewDiv').hide();
			$('div.productDetailDiv').show();
		});
		$('a.productDetailTopReviewLink').click(function(){
			$('div.productReviewDiv').show();
			$('div.productDetailDiv').hide();
		});
	};
})