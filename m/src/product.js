
define(["jquery", "template", "./utils"], function ($, template, utils) {

	// 获取地址栏中传过来的id
	var id = utils.qs("id");

	$.ajax({
		url: "/api/product/queryProductDetail",
		type: "get",
		data: {id: id},
		success: function (info) {
			// console.log(info);
			var html = template("productTpl", info);
			$("#product").html(html);

			// 让页面可以滑动
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			}); 

			// 图片轮播
            mui('.mui-slider').slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
			});
			
			// 选择号码
			$(".p_size").children().on("click", function () {
				$(this).addClass("selected").siblings().removeClass("selected");
			});

			// 修改商品的数量
			$(".p_number span").on("click", function () {
				// 获取商品数量的标签input
				var input = $(this).siblings("input");
				// 获取现在添加的商品数量
				var num = parseInt(input.val());
				// 获取商品剩余件数
				var total = $(this).siblings("b").text();
				
				// 减烧商品数量
				if ($(this).is(".jian") && num > 1) {
					input.val(--num);
				}
				// 增加商品数量
				if ($(this).is(".jia") && num < total) {
					input.val(++num);
				}
			})
		}
	});

	// 添加购物车
	$(".btn_addCart").on("click", function () {
		// 获取商品数量
		var num = $(".num").val().trim();
		// 获取选择的大小
		var size = $(".p_size").find(".selected").text().trim();
		// 发送ajax请求添加到购物车
		$.ajax({
			url: "/api/cart/addCart",
			type: "post",
			data: {productId: id, num: num, size: size},
			success: function (info) {
				if (info.success) {
					mui.toast('添加购物车成功', { 
						duration: 'long', 
						type: 'div' 
					})
				}
			}
		});
	})

});

