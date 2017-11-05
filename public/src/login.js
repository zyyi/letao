
define(["jquery"], function ($) {
	// 登录功能
    $("form").on("submit", function () {
        // 缓存this
        var _this = $(this);
        $.ajax({
            url: "/api/employee/employeeLogin",
            type: "post",
            data: _this.serialize(),
            success: function (info) {
                if (info.error) {
                    // 失败提示信息
                    return alert(info.message);
                }
                // 成功跳转到后台首页
                location.href = "/";
            }
        });
        return false;
    })
});