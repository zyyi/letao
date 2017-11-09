
define(["jquery"], function ($) {

	$("form").on("submit", function () {
		var _this = $(this);

		$.ajax({
			url: "/api/address/addAddress",
			type: "post",
			data: _this.serialize(),
			success: function (info) {
				// console.log(info);
				if (info.success) {
					location.href = "/m/user/address.html";
				}
			}
		});
		// 阻止表单默认提交
		return false;
	});

});
