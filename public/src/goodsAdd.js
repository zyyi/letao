
define(["jquery", "uploadify", "./utils"], function ($) {
	$("form").on("submit", function () {
		// 缓存this
		var _this = $(this);
		$.ajax({
			url: "/api/product/addProduct",
			type: "post",
			data: _this.serialize(),
			success: function (info) {
				console.log(info);
				if (info.success) {
					location.href = "/goods_list.php";
				}
			}
		});
		return false;
	});

	// 图片上传,使用插件 uploadify
	$("#upfile").uploadify({
		// 修改上传的按钮文字
		buttonText: "",
		// 修改上传按钮宽度：
		width: 120,
		// 修改上传按钮高度：
		height: 120,
		// 上传文件 name 属性
		fileObjName: "pic1",
		// 自定义上传进度条样式
		itemTemplate: "<span></span>",
		// 使用flash
		swf: "/public/assets/uploadify/uploadify.swf",
		// 文件上传地址
		uploader: "/api/product/addProductPic",
		// 上传成功的回调
		onUploadSuccess: function (file, data) {
			// console.log(data);
			// 将返回的数据转成对象格式
			var data = JSON.parse(data);
			// 实现图片预览
			$(".preview img").attr("src", "http://localhost:3000" + data.picAddr);
			// 将图片地址上传到表单中等待提交
			$("input[name='pic']").val(data.picAddr);
		}
	});
});