
define(["jquery", "template", "./utils"], function ($, template, utils) {
	
	// 检测登录
	utils.checkLogin();

	var cart = $("#cart");
	var total = 0;

	$.ajax({
		url: "/api/cart/queryCart",
		type: "get",
		success: function (info) {
			console.log(info);
			var html = template("cartList", {list: info});
			$("#cart").html(html);

			// 让页面可以滑动
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			}); 

			// 遍历每一项，计算购物车中商品的总价格
			cart.find("li").each(function () {
				total += parseFloat($(this).attr("data-account"));
			});

			// 初始默认全选的价格, 保留两位小数
			$("#total").text(total.toFixed(2));

			// 取消选择商品，重新计算总的订单金额
			cart.find("input").on("click", function () {
				total = 0;
				// 获取所有的li
				var li = $(this).parents("li");
				// 遍历除自己之外的每一项，计算购物车中商品的总价格
				li.siblings().each(function () {
					if ($(this).find("input").is(":checked")) {
						total += parseFloat($(this).attr("data-account"));
					}
				});
				// 当自己如果被选中的话，需要加上自己的商品金额
				if ($(this).is(":checked")) {
					total += parseFloat(li.attr("data-account"));
				}
				// 重新赋值订单金额
				$("#total").text(total.toFixed(2));
			});
		}
	});

});

