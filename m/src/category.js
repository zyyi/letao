
define(["jquery", "template"], function ($, template) {

	// 获取一级分类
	$.ajax({
		url: "/api/category/queryTopCategory",
		type: "get",
		success: function (info) {
			// console.log(info);
			var html = template("topTpl", info);
			$("#top").html(html);
			// 默认展示第一个分类
			$("#top").find("li").eq(0).trigger("click");
		}
	});


	// 获取二级分类
	$("#top").on("click", "li", function () {
		// 获取点击的某一分类id
		var id = $(this).attr("data-id");
		// 获取点击的分类的名称
		var title = $(this).attr("data-title");
		// 更改当前点击元素的样式
		$(this).addClass("now").siblings().removeClass("now");

		// 获取二级分类信息
		$.ajax({
			url: "/api/category/querySecondCategory",
			type: "get",
			data: {id: id},
			success: function (info) {
				// console.log(info);
				// 将点击的分类名称添加到info中
				info.title = title;
				// console.log(info)
				// 调用模板
				var html = template("childTpl", info);
				$("#child").html(html);
			}
		});

	});


});
