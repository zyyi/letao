

define(["jquery"], function($) {

	// 获取（传递的参数）将要跳转到哪里
	var search = location.search;
	// 利用正则进行截取匹配
	var reg = /\?path=(.+)/;
	// 得到跳转的地址
	var path = reg.exec(search) && reg.exec(search)[1];;
	// 对路径进行处理
	path = path || "/m/user/index.html";

	$("form").on("submit", function () {
		var _this = $(this);
		$.ajax({
			url: "/api/user/login",
			type: "post",
			data: _this.serialize(),
			success: function (info) {
				if (info.success) {
					location.href = path;
				} else {
					alert(info.message);
				}
			}
		});
	});

});
