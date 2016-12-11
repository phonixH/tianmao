$(function(){
	

	catear(); //首页猫耳朵
	menuMove();//首页菜单移入移除
	price();//分类页价格区间
	infoImgURL();// 产品介绍页面显示缩略图
	buyNumber();//产品介绍页面控制购买数量
	changeProductPage();// 切换商品详情和评价
	cartPageChange();// 购物车页面交互
	myPage(); // 我的订单页面交互
	jiesuan(); // 结算页面交互


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

	//购物车页面交互
	function cartPageChange(){
		function formatMoney(num){
			num = num.toString().replace(/\$|\,/g,'');
			if(isNaN(num)) num = "0";
			sign = (num == (num = Math.abs(num)));
			num = Math.floor(num * 100 + 0.50000000001);
			cents = num % 100;
			num = Math.floor(num / 100).toString();
			if(cents < 10) cents = "0" + cents;
			for(var i=0; i<Math.floor((num.length - (1 + i))/3); i++){
				num = num.substring(0,num.length-(4*i + 3)) + ',' + num.substring(num.length - (4*i + 3));
			}
			return (((sign)?'':'-')+num+'.'+cents);
		};
		function syncCreateOrderButton(){
			var selectAny = false;
			$('.cartProductItemIfSelected').each(function(){
				if($(this).attr('selectit') == 'selectit'){
					selectAny = true;
				}
			});
			if(selectAny){
				$('button.createOrderButton').css('background-color','#c40000');
				$('button.createOrderButton').removeAttr('disabled');
			}else{
				$('button.createOrderButton').css('background-color','#aaa');
				$('button.createOrderButton').attr('disabled','disabled');
			}
		};
		function syncSelect(){
			var selectAll = true;
			$('.cartProductItemIfSelected').each(function(){
				if($(this).attr('selectit') == 'false'){
					selectAll = false;
				}
			});
			if(selectAll){
				$('img.selectAllItem').attr('src','img/site/cartSelected.png');
			}else{
				$('img.selectAllItem').attr('src','img/site/cartNotSelected.png');
			}
		};
		function calcCartSumPriceAndNumber(){
			var sum = 0;
			var totalNumber = 0;
			$('img.cartProductItemIfSelected[selectit = "selectit"]').each(function(){
				var oiid = $(this).attr('oiid');
				var price = $('.cartProductItemSmallSumPrice[oiid = ' + oiid +']').text();

				price = price.replace(/,/g,'');
				price = price.replace(/￥/g,'');
				sum += new Number(price);
				var num = $('.orderItemNumberSetting[oiid='+ oiid +']').val();
				totalNumber += new Number(num);
			});
			$('span.cartSumPrice').html("￥" + formatMoney(sum));
			$('span.cartTitlePrice').html("￥" + formatMoney(sum));
			$('span.cartSumNumber').html(totalNumber);
		};
		function syncPrice(pid,num,price){
			$('.orderItemNumberSetting[pid='+pid+']').val(num);
			var cartProductItemSmallSumPrice = formatMoney(num*price);
			$('.cartProductItemSmallSumPrice[pid='+pid+']').html("￥"+cartProductItemSmallSumPrice);
			calcCartSumPriceAndNumber();
		}
		$('img.cartProductItemIfSelected').click(function(){
			var selectit = $(this).attr('selectit');
			if(selectit == 'selectit'){
				$(this).attr('src','img/site/cartNotSelected.png');
				$(this).attr('selectit','false');
				$(this).parents('tr.cartProductItemTR').css('background-color','#fff');
			}else{
				$(this).attr('src','img/site/cartSelected.png');
				$(this).attr('selectit','selectit');
				$(this).parents('tr.cartProductItemTR').css('background-color','#fff8e1');
			}
			syncSelect();
			syncCreateOrderButton();
			calcCartSumPriceAndNumber();
		});
		$('img.selectAllItem').click(function(){
			var selectit = $(this).attr('selectit');
			if(selectit == 'selectit'){
				$('img.selectAllItem').attr('src','img/site/cartNotSelected.png');
				$('img.selectAllItem').attr('selectit','false');
				$('img.cartProductItemIfSelected').each(function(){
					$(this).attr('src','img/site/cartNotSelected.png');
					$(this).attr('selectit','false');
					$(this).parents('tr.cartProductItemTR').css('background-color','#fff');
				});
			}else{
				$('img.selectAllItem').attr('src','img/site/cartSelected.png');
				$(this).attr('selectit','selectit');
				$('img.cartProductItemIfSelected').each(function(){
					$(this).attr('src','img/site/cartSelected.png');
					$(this).attr('selectit','selectit');
					$(this).parents('tr.cartProductItemTR').css('background-color','#fff8e1');
				});
			}
			syncCreateOrderButton();
			calcCartSumPriceAndNumber();
		});
		$('.orderItemNumberSetting').keyup(function(){
			var pid = $(this).attr('pid');
			var stock = $('span.orderItemStock[pid='+ pid +']').text();
			var price = $('span.orderItemPromotionPrice[pid='+ pid +']').text();
			var num = $('.orderItemNumberSetting[pid='+ pid +']').val();
			num = parseInt(num);
			if(isNaN(num)) num = 1;
			if(num<1) num = 1;
			if(num>stock) num = stock;
			syncPrice(pid,num,price);
		});
		$('.numberPlus').click(function(){
			var pid = $(this).attr('pid');
			var stock = $('span.orderItemStock[pid='+pid+']').text();
			var price = $('span.orderItemPromotionPrice[pid='+pid+']').text();
			var num = $('.orderItemNumberSetting[pid='+pid+']').val();
			num ++;
			if(num > stock) num = stock;
			syncPrice(pid,num,price);
		});
		$('.numberMinus').click(function(){
			var pid = $(this).attr('pid');
			var stock = $('span.orderItemStock[pid='+pid+']').text();
			var price = $('span.orderItemPromotionPrice[pid='+pid+']').text();
			var num = $('.orderItemNumberSetting[pid='+pid+']').val();
			-- num;
			if(num < 1) num = 1;
			syncPrice(pid,num,price);
		});
	};

	// 我的订单页面交互
	function myPage(){
		$('a[orderstatus]').click(function(){
			var orderstatus = $(this).attr('orderstatus');
			if(orderstatus == 'all'){
				$('table[orderstatus]').show();
			}else{
				$('table[orderstatus]').hide();
				$('table[orderstatus='+ orderstatus +']').show();
			}
			$('div.orderType div').removeClass('selectedOrderType');
			$(this).parent('div').addClass('selectedOrderType');
		});
	};

	// 结算页面交互
	function jiesuan(){
		$('img.leaveMessageImg').click(function(){
			$(this).hide();
			$('span.leaveMessageTextareaSpan').show();
			$('div.orderItemSumDiv').css('height','100px');
		});
	};
})
