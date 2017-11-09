
define(["jquery"], function ($) {
	function checkLogin() {
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
	}

	// 获取地址参数
	function qs(key) {
		// 传过来的地址参数格式为
		// ?key=val&key1=val1
		// 把问号截取掉
		var search = location.search.slice(1);
		// 将结果转成数组格式
		// ["key=val", "key1=val1"]
		var params = search.split("&");

		var obj = {};
		// 循环遍历将数组转成对象格式
		for (var i = 0; i < params.length; i++) {
			// 将数组中的每一项字符串再通过=号转成数组
			var temp = params[i].split("=");
			// 转成对象
			obj[temp[0]] = temp[1];
		}
		// 返回要查询的某一项
		return obj[key];
	}



	return {
		checkLogin: checkLogin,
		qs: qs
	};
	
});


