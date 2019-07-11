# lib.yuey.site
https://github.com/viphuyy/lib.yuey.site_server
# 图书馆微信小程序后端代码

[![github](https://img.shields.io/badge/-spring-brightgreen.svg)](https://github.com/viphuyy/Just-for-fun-just-do-it-service)
[![github](https://img.shields.io/badge/-springmvc-green.svg)](https://github.com/viphuyy/Just-for-fun-just-do-it-service)
[![github](https://img.shields.io/badge/-mybatis-blue.svg)](https://github.com/viphuyy/Just-for-fun-just-do-it-service)
[![github](https://img.shields.io/badge/updated-today-brightgreen.svg)](https://github.com/viphuyy/Just-for-fun-just-do-it-service)
## 目前进度：
1、小程序页面menu API完成（但却无法实现自定义功能）  
2、打卡定位功能  
先确认是否登录，登录完成后获取定位权限，取得定位以及时间戳，因在微信小程序中使用高德api的https业务域名请求限制，故前台将打卡信息发送至后台，由后端操作实现。（数据控制这块：验证登录状态&参数）  
3、登录：为简化同学使用，也简化了登录回话功能，使用微信小程序storage来保存账号密码以及登录状态（代码封装在util.js）  
4、后端使用springmvc框架搭建

-----------------------------------------------2019.7.11-----------------------------------------------------------------  
接下来想要做的：对于不同社团活动的打卡，则需要诸多地理围栏来实现；  
功能需求：  
在图书馆开办活动，下午两点钟至四点钟（期间是否要检测同学位移情况？），在这时间与地理位置的范围内打卡，给出成功打卡成员名单。（这个名单可能需要单独写页面，在服务器渲染一个结果视图）  
针对各种社团，需要给他们每个社团各自活动地点规划，设置好地理围栏（风操，六号教学楼、、、）社团管理员，负责选择本次活动场地：选择在风操矩形，则同学分需要再风操的地理围栏中打卡。  
那么是管理员如何告知（发布）打卡任务呢？  
管理员账号登录后操作选择地理围栏，（或者提交创建地理围栏）然后引导，或者给出唯一的注册链接（注册成功的同学拥有打卡权限，以区分同一时间段多个活动的情况）  

-----------------------------------------------2019.7.12-----------------------------------------------------------------   

<img src="http://yuey.site/wp-content/uploads/2019/07/X9JPH3LWF289B338ZEKS-e1562873784700.png" height="500">    
聊天模块：  
增加  
使用起来勾选方框，功能用途：将其视为参数传递至后台（或请求的controller），后台调用图书馆查询书籍的api，返回数据在前端（弹窗显示？）
使用起来不会过于累赘，且与聊天模块整合丰富功能，使用起来也类似书籍助手
