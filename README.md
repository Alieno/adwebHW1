主要完成了一个简易的用户注册登录系统。

AngularJS

	
	1. 路由
		1.1. 载入了实现路由的 js 文件：angular-route.js。
		1.2. 包含了 ngRoute 模块作为主应用模块的依赖模块。
			var ngRouteExample = angular.module('ngRouteExample', ['ngRoute', 'myController', 'ngAnimate']);
		1.3. 使用 ngView 指令。
			<div ng-view></div>
			该 div 内的 HTML 内容会根据路由的变化而变化，控制切换登陆界面与注册界面。
			ngRouteExample.config(function ($routeProvider) {
                $routeProvider.
                when('/login', {
                    templateUrl: 'login.html',
                    controller: 'LoginController'
                }).
                when('/register', {
                    templateUrl: 'register.html',
                    controller: 'RegisterController'
                }).
                otherwise({
                    redirectTo: '/login'
                });
            });
    
    	2. 输入验证
		2.1. 使用ng-show指令，如：ng-show="myForm.email.$error.email"验证邮箱地址是否合法。
		2.2. 分别验证了表单必须项是否填写，邮箱地址是否合法，两次输入密码是否相符。

    	3. 动画
		3.1. 引入 angular-animate.min.js 库。
		3.2. 包含了 ngAnimate 模块作为主应用模块的依赖模块。
			var ngRouteExample = angular.module('ngRouteExample', ['ngRoute', 'myController', 'ngAnimate']);
		3.3. css中设置动画
			@keyframes slideRight {
				from{
					transform: translateY(500%);
				}
				to{
					transform: translateX(0);
				}
			}
			@keyframes slideLeft{
				to{
					transform: translateX(-100%);
				}
			}
		3.4. 实现切换登录和注册界面的动画效果。

Node.js



	terminal输入node serverN.js启动服务器，浏览器键入localhost:8081/index.html
	
	
	
	1. Express 框架
		1.1. 安装 Express 并将其保存到依赖列表中
			npm install express
			npm install body-parser
			npm install cookie-parser
			npm install multer
		1.2. 路由
			响应各种请求，如：
			app.get('/*\.html', function (req, res) {
				console.log("app");
   				res.sendFile( __dirname + req.originalUrl);
			})
			页面支持正则匹配。
		1.3. GET 方法
			<form action="http://127.0.0.1:8081/finish_register" method="GET" name="myForm" novalidate>
			表单内输入的参数由finish_register路由器处理。
	2. RESTful API
		2.1. 创建一个json数据资源文件users.json:
			[
   				{
      				"name":"alieno",
      				"email":"1@1.com",
      				"password":"password1",
   				},
   				{
      				"name":"John Doe",
      				"email":"john.doe@gmail.com",
      				"password":"1"
   				}
			]
		2.2. 创建finish_register，finish_login两个RESTful API，分别用于检验账户是否存在并新建账户、核对账户信息密码并显示是否成功登录。举例如下：
			app.get('/finish_login', function (req, res) {
   				// 输出 JSON 格式
   				response = {
       				email:req.query.email,
       				password:req.query.password
   				};
				fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       				data = JSON.parse( data );
       				console.log( data );
       				var occupy = false;
       				for(i in data){       		
       					if(response.email == data[i].email&&response.password == data[i].password){
       						occupy = true;
       					}
       				}
       				console.log(i);
       				if(occupy){
       					res.end("Login Successfully!");
       				}
       				else{
       					res.end("Wrong email or password!");
       				}       	
   				});
			})

