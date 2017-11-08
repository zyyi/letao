
define(["jquery"], function ($) {
	// 检测登录
	$.ajax({
		url: "/api/user/checkUserLogin",
		type: "get",
		success: function (info) {
			// console.log(info);
			if (info.error) {
				location.href = "/m/user/login.html?path=" + location.href;
			}
		}
	});
});