
define(["jquery", "template"], function ($, template) {
	// 获取地址参数
	var search = location.search;
	// 正则表达式，匹配搜索关键字
	var reg = /key=(.+)/;
	// 执行正则表达式
	var key = reg.exec(search) && reg.exec(search)[1];
	// 发送ajax请求进行查找
	$.ajax({
		url: "/api/product/queryProduct",
		type: "get",
		data: {page: 1, pageSize: 2, proName: key},
		success: function (info) {
			// console.log(info);
			// 调用模板引擎
			var html = template("searchList", info);
			$("#searchContainer").html(html);
			// 让页面可以滑动
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			}); 
		}
	});
});

