

define(["jquery", "template", "./utils"], function ($, template) {
	// 每页显示多少个
	var pageSize = 2;

	// 利用正则匹配页码
	var reg = /\?[a-z]+=(\d+)/;
	// 获取请求的参数
	var search = location.search || "";
	// 正则匹配处理请求的参数
	var page = reg.exec(search) && reg.exec(search)[1];
	// 当前页数
	page = page || 1;

	$.ajax({
		url: "/api/product/queryProductDetailList",
		type: "get",
		data: {page: page, pageSize: pageSize},
		success: function (info) {
			// 总的数据
			var total = info.total;
			// 总的页数
			var pageLen = Math.ceil(total/pageSize);
			// console.log(info);
			// 调用模板引擎，商品数据
			var html = template("tpl", info);
			// 调用模板引擎，页数
			var pageHtml = template("page", {
				pageLen: pageLen,
				page: page
			});
			// 将商品数据放入页面中
			$(".goods").html(html);
			// 将页数放入页面中
			$(".pagination").html(pageHtml);
		}
	})
})