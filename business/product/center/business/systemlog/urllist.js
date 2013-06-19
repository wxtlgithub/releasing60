Ext.namespace('Js.Center.System.SystemLog');
/*****************************************************************************1、得到批次间隔设置：*
* url：   URL/Monitor/QueryConfig.ashx
* input：
*   flag(queryconfig),
*   numconfigid，   //配置编号(1:客户端监控配置;2:网关监控配置;3:批次间隔设置)
* method：POST
* output：
*    numconfigid                            //配置编号(3:批次间隔设置)
*    gtja_special_groupidintervaltime       //批次生成间隔时间			（分钟，大于0数字）*
*****************************************************************************/

Js.Center.System.SystemLog.QueryConfigURL = "URL/Monitor/QueryConfig.ashx";

/*****************************************************************************2、更新批次间隔设置：*
* url：   URL/Monitor/UpdateConfig.ashx
* input：
*   flag(updateGroupTimeConfig),
*   numconfigid，                           //配置编号(1:客户端监控配置;2:网关监控配置;3:批次间隔设置)
*   gtja_special_groupidintervaltime        //批次生成间隔时间（分钟，大于0数字）
* method：POST
* output：*   {success:'true'} or {success:'false'}
*****************************************************************************/

Js.Center.System.SystemLog.UpdateConfigURL = "URL/Monitor/UpdateConfig.ashx";

/*****************************************************************************3、查询系统报警日志：*
* url：   / URL/Monitor/Query.ashx
* input：
*   flag(selectalarmlogbykey),
*   datstart,       //报警日期开始		
*   datend,         //报警日期结束		
*   numtargettype,  //模块类型1:网关; 2:客户端
*   vc2targetname,  //模块名				 
*   vc2mailaddr,    //邮件地址			
*   vc2mobile,      //手机号码			
*   start,          //开始位置			
*   limit,          //显示条数			

* method：POST
* output：
*    datalarmtime,      //报警日期			
*    numtargettype,     //模块类型			
*    vc2targetname,           //模块名				
*    vc2mailaddr,       //邮件地址			
*    vc2mobile,         //手机号码			
*    vc2alarmcontent,   //报警信息			
*
*****************************************************************************/

/*****************************************************************************4、查询系统监控日志：*
* url：   / URL/Monitor/Query.ashx
* input：
*   flag(selectmonitorlogbykey),
*   datstart,       //监控日期开始		
*   datend,         //监控日期结束		
*   numtargettype,  //模块类型1:网关; 2:客户端
*   vc2targetname,        //模块名				 
*   mtargetstatus,  //状态1:正常; 2:异常; 3:无法监控		
*   start,          //开始位置			
*   limit,          //显示条数			

* method：POST
* output：
*    datcreatetime,     //监控日期			
*    umtargettype,      //模块类型1:网关; 2:客户端
*    vc2targetname,           //模块名				 
*    mtargetstatus,     //状态1:正常; 2:异常; 3:无法监控	
*    vc2moinitorcontent,//监控信息			

*
*****************************************************************************/

Js.Center.System.SystemLog.QueryLogURL = "URL/Monitor/Query.ashx";