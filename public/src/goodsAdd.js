
define(["jquery", "template", "ckeditor", "uploadify", "./utils"], function ($, template, CKEDITOR) {

	CKEDITOR.replace("proDesc");

	$("form").on("submit", function () {
		// 因为使用ckeditor后获取不到表单的内容，需要加上下面这段话
		for (instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
		}
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



	// 品牌种类
	$.ajax({
		url: "/api/category/querySecondCategoryPaging",
		type: "get",
		data: {page: 1, pageSize: 100},
		success: function (info) {
			// console.log(info);
			// 调用模板引擎
			var html = template("brands", info);
			// console.log(html);
			$(".brand").append(html);
		}
	});


});