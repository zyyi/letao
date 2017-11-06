
// 模块公共配置
require.config({
    baseUrl: "/public",
    paths: {
        jquery: "assets/jquery/jquery.min",
        template: "assets/artTemplate/template-web",
        uploadify: "assets/uploadify/jquery.uploadify.min",
        echarts: "assets/echarts/echarts.min",
        nprogress: "assets/nprogress/nprogress",
        ckeditor: "assets/ckeditor/ckeditor"
    },
    // 如果某个第三方的类库不支持 AMD，通过
    // shim 可以实现类似模块的用法
    shim: {
    	// 模块有什么特点？
    	uploadify: {
    		// 1. 通过exports可以将非模块的方法或属性
    		// 公开出来，相当于标准模块中 return 的作用
    		// exports:

    		// 2. 通过deps可以依赖其他模块
    		deps: ["jquery"]
    	},
        // 因为ckeditor不支持模板，所以可以使用exports将其公开出去
        ckeditor: {
            exports: "CKEDITOR"
        }
    }
});



// 全局执行，当页面加载时出现进度条
require(["nprogress", "jquery"], function (NProgress, $) {
    NProgress.start();

    NProgress.done();

    // 当发送ajax请求的时候，也需要进度显示
    $(document).ajaxStart(function () {
        NProgress.start();
    }).ajaxStop(function () {
        NProgress.done();
    });

});

