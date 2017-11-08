
define(["jquery", "template", "./utils"], function ($, template) {

	// 显示用户列表数据
	$.ajax({
		url: "/api/user/queryUser",
		type: "get",
		data: {page: 1, pageSize: 10},
		success: function (info) {
			console.log(info);
			var html = template("userInfo", info);
			$("tbody").html(html);
		}
	});

	$("table").on("click", ".btn", function () {
		var _this = $(this);
		var td = $(this).parent();
		// 获取id
		var id = td.attr("data-id");
		// 获取状态
		var status = td.attr("data-status");
		// 0和1之间进行切换
		status = Math.abs(status - 1);
		$.ajax({
			url: "/api/user/updateUser",
			type: "post",
			data: {id: id, isDelete: status},
			success: function (info) {
				// 判断状态是不是1
				if (status == 1) {
					_this.text("启 用");
					td.prev().text("是");
				} else {
					_this.text("禁 用");
					td.prev().text("否");
				}
				// 重新赋值status的状态的值
				td.attr("data-status", status);
				// 切换类
				_this.toggleClass("btn-info btn-warning");
			}
		});
	});


});
