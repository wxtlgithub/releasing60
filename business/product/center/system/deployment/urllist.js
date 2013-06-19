/**
 * @author Zhaoyanhua
 * 系统配置管理接口
 */
Ext.namespace('Js.Center.System.Deployment');
/****************************************************************************
*查询网元信息（根据网元名称）
* url：   	URL/deployment/node.ashx					
* input：
*   flag(selectall)
*   vc2taskname		网元名称
* method：POST
* output：
* numtaskid			编号
* vc2taskname		名称
* vc2taskdesc		描述
*****************************************************************************/

/****************************************************************************
*添加网元信息
* url：   	URL/deployment/node.ashx					
* input：
*   flag(insertnode)
*   vc2taskname		网元名称
*   vc2taskdesc		描述
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/			

/****************************************************************************
*修改网元信息
* url：   	URL/deployment/node.ashx					
* input：
*   flag(updatenode)
*   numtaskid		网元编号
*   vc2taskname		网元名称
*   vc2taskdesc		描述
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*删除网元信息	
* url：   	URL/deployment/node.ashx					
* input：
*   flag(delnodes)
*   ids			网元编号，逗号隔开
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*查询网元配置项
* url：   	URL/deployment/node.ashx					
* input：
*   flag(gettaskitem)
*   taskid
* method：POST
* output：
* vc2name		--itemname配置项名称
* vc2key		--itemkey配置项key
* numtypeid		--itemtype配置项类型
* vc2value		--itemvalue配置项值
* vc2range		配置项类型
*****************************************************************************/

/****************************************************************************
*查询模块和模块的选中状态	
* url：   	URL/deployment/node.ashx					
* input：
*   flag(gettasklist)
*   taskId
*   programtype(22：通讯模块，311：任务，62：公共模块，869：功能模块, -1:不分类型)
* method：POST
* output：
* taskName
* isChecked
* programId
* parentId
* --taskId	此参数不需要
*****************************************************************************/

/****************************************************************************
*保存/更新网元的模块
* url：   	URL/deployment/node.ashx					
* input：
*   flag(updatetasklist)
*   programId[]					8001:2:taskName	(此处programId是programId:taskid:taskName组成的字符串,taskName可以没有)			
	taskId(网元ID)	
* method：POST
* output：
* success or not									
		(保存成功后，重新加载页面)	
*****************************************************************************/
	
/****************************************************************************
*保存/更新网元的配置项
* url：   	URL/deployment/node.ashx					
* input：
*   flag(updatetaskitem)
*   nodeItems[]					key:key001:1				
*	taskId		
* method：POST
* output：
* success or not									
		(保存成功后，重新加载页面)										
	后台操作：删除原有的所有item，新增。	
*****************************************************************************/
	
	
Js.Center.System.Deployment.DeploymentQueryURL = "URL/deployment/node.ashx";//"test1.jsp";//
Js.Center.System.Deployment.DeploymentQueryURL2 = "test2.jsp";