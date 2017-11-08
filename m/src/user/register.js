

define(["jquery"], function ($) {

	// 获取验证码
	$(".btn_getCode").on("click", function () {
		$.ajax({
			url: "/api/user/vCode",
			type: "get",
			success: function (info) {
				console.log(info);
				alert(info.vCode);
			}
		});
	})

	// 注册用户
	$("form").on("submit", function () {

		var _this = $(this);

		$.ajax({
			url: "/api/user/register",
			type: "post",
			data: _this.serialize(),
			success: function (info) {
				// console.log(info);
				if (info.success) {
					location.href = "/m/user/login.html";
				} else {
					alert(info.message);
				}
			}
		});

		// 取消表单默认提交的行为
		return false;
	})

});