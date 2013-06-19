
Ext.namespace('Js.Center.SendSMS');

/*******************************************************************************
*
* 需求：1、部门下拉框列表(根据账号数据权限显示)
* 2、栏目下拉框列表(根据账号数据权限显示)
* 3、客户组下拉框列表(根据账号数据权限显示)*
* 4、审核人下拉框列表(根据账号所属部门显示)
* 5、编辑人下拉框列表(根据账号所属部门显示)
* *******************************************************************************/

/*******************************************************************************
*新添加的接口
* 1、根据部门ID获取客户组(用于下拉列表显示)*
* url： URL/business/usergroup/usergroupquery.ashx
* input：*
* flag(selectallbydepartid),
* departid,	(部门id)
* columnlist(numusergroupid,vc2usergroupname)
* method：POST
* output：多条*******************************************************************************/
 
 /********************************************************************************
 *2、根据部门ID获取栏目(用于下拉列表显示)
 *url： URL/business/column/columnquery.ashx
 *input：*
* flag(selectallbydepartid),
* departid,
* columnlist(numcolumnid,vc2columnname)
* method：POST
* output：多条*
********************************************************************************/

/********************************************************************************3、获取当前用户信息(用于下拉列表)*
* url：   URL/purview/user/userquerry.ashx
* input：*
* flag(selectcurentuser),
* columnlist(numuserid,vc2username)
* method：POST
* output：一条*
********************************************************************************/

/*******************************************************************************
*4、获取当前用户所在部门下所有用户信息(用于下拉列表显示)*由后台获取当前用户所在部门ID
* url：   URL/purview/user/userquerry.ashx
* input：*
* flag(selectdepartuser),
* columnlist(numuserid,vc2username)
* method：POST
* output：一条*
********************************************************************************/

/******************************************************************************** 5、获取当前用户所属部门信息(用于下拉列表显示)*
* url：   URL/purview/departments/departmentsquerry.ashx
* input：*
* flag(selectdepartbyuser),
* columnlist(numdepartid,vc2departname)
* method：POST
* output：一条*
********************************************************************************/

/*******************************************************************************
* 6、根据userid获取已授权的栏目信息(用于下拉列表显示)
* ***userid由后台获取当前用户ID
* url： URL/business/column/columnquery.ashx
* input：*
* flag(selectallbyuserid),
* columnlist(numcolumnid,vc2columnname)
* method：POST
* output：多条*
*********************************************************************************/

/*******************************************************************************
*7、根据userid获取已授权的客户组信息(用于下拉列表显示)*
* ***userid由后台获取当前用户ID
* url： URL/business/usergroup/usergroupquery.ashx
* input：*
* flag(selectallbyuserid),
* columnlist(numusergroupid,vc2usergroupname)
* method：POST
* output：多条*
********************************************************************************/

/*******************************************************************************
*  8、发送记录详细页面,下载失败详情调用
* url： URL/sendSMS/sendquery/sendquery.ashx
* input：*
* flag(loadErrorDetails),
* contentid    (内容编号)
* start=0,*
* limit=-1
* method：POST
* 
 *******************************************************************************/
 
 
 
 
 /*******************************************************************************
 *获取下行信息URL(通过多个字段)
* url：   URL/sendSMS/sendquery/sendquery.ashx
* input：*
* flag(selectbykey),
* datstart,  (大于datstart)
* datend, (小于datend)
* departmentid,(部门编号)  --type=1的时候此参数为空
* columnid,(栏目编号)
* groupid,(客户组编号)*
* msgstate,(信息状态,-1=全部,0=待审核,1=一审完成,2=二审完成,3=发送完成)
* firstcheckuserid,(一审审核人编号)*
* secendcheckuserid,(二审审核人编号)*
* edituserid,(编辑人编号)  --type=1的时候此参数为空
* type,	(1:个人；2：系统)
* limit,*
* start
* method：POST
* output：多条*
********************************************************************************/

Js.Center.SendSMS.SendQueryURL = 'URL/SendSMS/SendQuery/SendQuery.ashx';

Js.Center.SendSMS.SmsContentURL = 'URL/SendSMS/Send/SMSContentQuery.ashx';

/*******************************************************************************
*新增 发送记录查询(通过关键字)
*
*url：   URL/sendSMS/sendquery/sendquery.ashx
*
*input：
*	flag(selectbysearchkey),
*	datstart,  (大于datstart)
*    datend, (小于datend)
*    %vc2departmentname%,(部门名称此处指发送部门,模糊查询)
*    %vc2creatername%,(创建人,模糊查询)
*    %numprodid%,(通道组名称)
*    %vc2content%,(短信内容,模糊查询)
*    limit,
*    start
*
*method：POST
*
*output：多条
*
********************************************************************************/

/*******************************************************************************
*新增 下行客户记录查询(通过关键字)

*url：   URL/sendSMS/sendquery/sendquery.ashx
*
*input：
*	flag(selectmtcustomerbysearchkey),
*	datstart,  (大于datstart)
*    datend, (小于datend)
*    vc2desmobile,(手机号码)
*    %vc2content%,(短信内容,模糊查询)
*    limit,
*    start
*
*method：POST
*
*output：多条
*
********************************************************************************/

/*******************************************************************************
*新增 待发信息查询(通过关键字)
*
*url：   URL/sendSMS/sendquery/sendquery.ashx
*
*input：
*	flag(selectwaitsendbysearchkey),
*	datstart,  (大于datstart)
*    datend, (小于datend)
*    
*    vc2desmobile,(手机号码)
*    numdealflag,(发送状态)
*    limit,
*    start
*
*method：POST
*
*output：多条
*手机号码、内容、发送状态、预计发送时间（datstarttime）
*
********************************************************************************/

/*******************************************************************************
*新增 下行记录查询
*
*url：   URL/sendSMS/sendquery/sendquery.ashx
*
*input：
*	flag(selectmtbysearchkey),
*	datstart,  (大于datstart)
*   datend, (小于datend)
*   %vc2content%,(短信内容,模糊查询)
*   VC2DESTMOBILE,(手机号码)
*   NUMRESPONSESTATUS,(发送状态)0成功，其他为失败。
*   NUMREPORTSTATUS,接收状态(状态值:0 成功 1 等待 2 失败)
*   limit,
*   start
*
*method：POST
*
*output：多条
*
* 短信内容，手机号码，服务号码，发送人，部门，提交时间，发送时间，发送状态，接收状态
vc2content,vc2destmobile,VC2SERVICECODE,vc2username,vc2departname,DATCREATE,DATSEND,NUMRESPONSESTATUS,NUMREPORTSTATUS
********************************************************************************/