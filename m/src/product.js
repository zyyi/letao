
define(["jquery", "template", "./utils"], function ($, template, utils) {

	// 获取地址栏中传过来的id
	var id = utils.qs("id");

	$.ajax({
		url: "/api/product/queryProductDetail",
		type: "get",
		data: {id: id},
		success: function (info) {
			console.log(info);
			var html = template("productTpl", info);
			$("#product").html(html);
		}
	});

});

