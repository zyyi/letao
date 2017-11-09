
define(["jquery", "template"], function ($, template) {

	$.ajax({
		url: "/api/address/queryAddress",
		type: "get",
		success: function (info) {
			// 该取出来的地址为当前登录者的地址
			// console.log(info);
			var html = template("address", {lists: info});
			$("#addressList").html(html);
		}
	});

});

