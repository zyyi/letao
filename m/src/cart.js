
define(["jquery", "template", "./utils"], function ($, template, utils) {
	
	// 检测登录
	utils.checkLogin();

	$.ajax({
		url: "/api/cart/queryCart",
		type: "get",
		success: function (info) {
			console.log(info);
			var html = template("cartList", {list: info});
			$("#cart").html(html);
		}
	});

});

