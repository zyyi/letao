
define(["jquery"], function ($) {

	// 检测登录
    $.ajax({
        url: "/api/employee/checkRootLogin",
        type: "get",
        success: function (info) {
            if (info.error) {
                location.href = "/login.html";
            }
        }
    });

	// 退出登录
    $(".logout").on("click", function () {
        $.ajax({
            url: "/api/employee/employeeLogout",
            type: "get",
            success: function (info) {
            	if (info.success) {
					location.href = "/login.html";
            	}
            }
        });
    });


    // 点击分类管理时，显示下面的内容
    $(".navs a + ul").prev().on("click", function () {
        $(this).next().slideToggle();
    })

})
