
define(["jquery", "template"], function ($, template) {

	// 查询所有的历史记录
	// 如果有记录，将其字符串转换成数组
	var historyList = localStorage.getItem("keys") && JSON.parse(localStorage.getItem("keys"));
	// 判断是否有历史数据
	if (historyList) {
		// 如果有调用模板引擎，展示历史记录
		var html = template("storage", {storage: historyList});
		$(".cz_history").html(html);
	}


	// 搜索商品
	$(".search_btn").on("click", function () {
		// 获取搜索的内容
		var key = $(".search_input").val().trim();
		// 如果内容为空，直接 return 切断函数
		if (key == "") return;
		// 首先获取专门存储历史记录的数组, 如果没有默认给空数组
		var keys = localStorage.getItem("keys") || [];
		// 然后判断keys是不是字符串，如果是则转为数组
		if (typeof keys == "string") {
			keys = JSON.parse(keys);
		}
		// 将搜索的内容存到该数组中
		keys.push(key);
		// 然后将更新过后的数组重新赋值给keys
		localStorage.setItem("keys", JSON.stringify(keys));
		// 向服务端发送请求，查询数据
		location.href = "/m/searchList.html?key="+key;
	});



	// 清空/删除历史记录
	// 通过事件委托绑定事件
	$(".cz_history").on("click", ".fa-close, .fa-trash", function () {
		// 判断点击的是不是删除某个记录
		if ($(this).is(".fa-trash")) {
			// 将历史记录清空
			historyList = [];
			// 将清空后的数组重新存入到localstorage中
			localStorage.setItem("keys", JSON.stringify(historyList));
			// 并把该DOM元素给清空
			$(this).parents(".cz_history").empty();
			// 返回切断函数
			return ;
		}
		// 删除单条历史记录
		// 首先获取该历史记录在历史记录数组中的索引
		var index = $(this).attr("data-index");
		// 从历史记录数组中将该项历史删除
		historyList.splice(index, 1);
		// 重新将数组存入到localStorage中
		localStorage.setItem("keys", JSON.stringify(historyList));
		// 将该DOM元素删除
		$(this).parent().fadeOut(function () {
			// 判断历史记录是否全部删完了
			if ($(this).siblings().size() == 0) {
				// 如果全部删除了，则将清空历史记录DOM也删除
				return $(this).parents(".cz_history").fadeOut();
			}
			// 把当前DOM元素删除
			$(this).remove();
		});
	});

});

