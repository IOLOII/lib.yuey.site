# lib.yuey.site
https://lib.yuey.site
https://github.com/viphuyy/lib.yuey.site_server
# 图书馆微信小程序后端代码

[![github](https://img.shields.io/badge/-spring-brightgreen.svg)](https://github.com/viphuyy/Just-for-fun-just-do-it-service)
[![github](https://img.shields.io/badge/-springmvc-green.svg)](https://github.com/viphuyy/Just-for-fun-just-do-it-service)
[![github](https://img.shields.io/badge/-mybatis-blue.svg)](https://github.com/viphuyy/Just-for-fun-just-do-it-service)
[![github](https://img.shields.io/badge/updated-today-brightgreen.svg)](https://github.com/viphuyy/Just-for-fun-just-do-it-service)
## 目前进度：
1、小程序页面menu API完成（但却无法实现自定义功能）  
2、打卡定位功能  
 &ubsp;&ubsp;&ubsp;先确认是否登录，登录完成后获取定位权限，取得定位以及时间戳，因在微信小程序中使用高德api的https业务域名请求限制，故前台将打卡信息发送至后台，由后端操作实现。（数据控制这块：验证登录状态&参数）  
3、登录：为简化同学使用，也简化了登录回话功能，使用微信小程序storage来保存账号密码以及登录状态（代码封装在util.js）  
## 后端使用springmvc框架搭建
