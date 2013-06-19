/**
 * @author admin
 */
Ext.namespace('Js.Center.SysMonitor');

/****************************************************************************
*1、得到通用模块监控列表
*
* url：   URL/Monitor/SysMonitor/SysMonitorQuery.ashx
* input：
*   flag(commonmodule)
* method：POST
* output：
*    id                     //模块id
			
*    name                   //模块名称  

*    status              	//模块状态
    
*    lastruntime   			//最后运行时间
*****************************************************************************/


/****************************************************************************
*2、发送通用模块监控命令
*
* url：   cmd.ashx
* input：
*   flag(commonmodulemonitor)
*   id                      //模块id
*   command 				//命令（启动：start，停止：stop，暂停：pause）
*   
* method：POST
* output：
*    id                     //模块id
			
*    name                   //模块名称  

*    status              	//模块状态
    
*    lastruntime   			//最后运行时间
*****************************************************************************/

/****************************************************************************
*3、得到功能模块监控列表
*
* url：   URL/Monitor/SysMonitor/SysMonitorQuery.ashx
* input：
*   flag(module)
* method：POST
* output：
*    id                     //模块id
			
*    name                   //模块名称  

*    status              	//模块状态
    
*    lastruntime   			//最后运行时间
*****************************************************************************/


/****************************************************************************
*4、发送模块监控命令
*
* url：   cmd.ashx
* input：
*   flag(modulemonitor)
*   id                      //模块id
*   command 				//命令（启动：start，停止：stop，暂停：pause）
*   
* method：POST
* output：
*    id                     //模块id
			
*    name                   //模块名称  

*    status              	//模块状态
    
*    lastruntime   			//最后运行时间
*****************************************************************************/


/****************************************************************************
*5、得到组件监控列表
*
* url：   URL/Monitor/SysMonitor/SysMonitorQuery.ashx
* input：
*   flag(components)
* method：POST
* output：
*    id                     //组件id
			
*    name                   //组件名称  

*    status              	//组件状态

*    lastruntime   			//最后运行时间
*****************************************************************************/

/****************************************************************************
*6、发送组件监控命令
*
* url：   cmd.ashx
* input：
*   flag(componentsmonitor)
*   id                      //模块id
*   command 				//命令（启动：start，停止：stop，暂停：pause）
*   
* method：POST
* output：
*    id                     //模块id
			
*    name                   //模块名称  

*    status              	//模块状态
    
*    lastruntime   			//最后运行时间
*****************************************************************************/

/****************************************************************************
*7、查看功能监视
*
* url：   cmd.ashx
* input：
*   flag(monitorshow)
*   id                      //模块或组件id
*   
* method：POST
* output：
*    index                  //顺序
			
*    name                   //监视名称  

*    value              	//监视状态

*    key  					//键值
*    
例如：
{"totalCount":2,"success":true,"error":"","data":
[{index:"1",name:"运行状态",value:"良好",key:""},
 {index:"2",name:"接入客户端数",value:"32",key:""} 
 ]}


*****************************************************************************/

/****************************************************************************
*8、得到通信模块监控列表
*
* url：   URL/Monitor/SysMonitor/SysMonitorQuery.ashx
* input：
*   flag(communicationmodule)
* method：POST
* output：
*    id                     //通信模块id
			
*    name                   //通信模块名称  

*    status              	//通信模块状态
    
*    lastruntime   			//最后运行时间
*****************************************************************************/

/****************************************************************************
*9、网元处理速度监控列表
*
* url：   cmd.ashx
* input：
*   cmd=(-U93 -Cqueue)
* method：POST
* output：
*    getspeed
*    putcount
*    putspeed
*    queuecount
*    queuename
*    moSend1001
*    getcount
*****************************************************************************/
Js.Center.SysMonitor.SysMonitorQueryURL = 'cmd.ashx';//?cmd=-U1 -Clistt

Js.Center.SysMonitor.SysMonitorListURL = 'URL/Monitor/SysMonitor/SysMonitorQuery.ashx';
//查询网元信息URL
Ext.namespace('Js.Center.System.Deployment');
Js.Center.System.Deployment.DeploymentQueryURL = "URL/deployment/node.ashx";