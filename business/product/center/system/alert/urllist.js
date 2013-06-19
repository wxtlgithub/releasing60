/**
 * @author Zhaoyanhua
 * 监控预警接口
 */
Ext.namespace('Js.Center.Alert');
//==========获取报警列表=========Start===============
/****************************************************************************
*1、得到网关监控列表
* url：   URL/Alert/AlertQuery.ashx
* input：
*   flag(selectgatewaymonitorinfo)
*   
* method：POST
* 
* output：
* 
* numtaskid，			模块ID
* numgwid				网关id
* vc2gatewayname		网关名称、
* module_status			运行状态（0正常、1停止）、
* connection_status		连接状态（0连接、1断开）、
* response_count		今日发送总数（当天，0点开始）、
* submit_speed			发送速度（当前秒）
* numstate				报警状态（1存在；2消亡）
*****************************************************************************/

/****************************************************************************
*2、得到Response失败率监控列表
* url：   URL/Alert/AlertQuery.ashx
* input：
*   flag(selectresponsefailmonitorinfo)
*   
* method：POST
* 
* output：
* 
* numtaskid，			模块ID
* numgwid				网关ID
* vc2gatewayname		网关名称、
* response_count		发送总数、
* response_error		失败数
* response_error_pct	失败率
* numstate				报警状态（1存在；2消亡）
*****************************************************************************/

/****************************************************************************
*3、得到Report失败率监控列表
* url：   URL/Alert/AlertQuery.ashx
* input：
*   flag(selectreportfailmonitorinfo)
*   
* method：POST
* 
* output：
* 
* numtaskid，			模块ID
* numgwid				网关id
* vc2gatewayname		网关名称、
* rpt_count				发送总数、
* rpt_fail_count		失败数
* rpt_error_pct			失败率
* numstate				报警状态（1存在；2消亡）
*****************************************************************************/

/****************************************************************************
*4、得到延时监控列表
* url：   URL/Alert/AlertQuery.ashx
* input：
*   flag(selectdelaymonitorinfo)
*   
* method：POST
* 
* output：
* 
* numtaskid，			模块ID
* numgwid				网关id
* vc2gatewayname		网关名称、
* sms_delay_average		平均延时、
* sms_delay				最新延时
* numstate				报警状态（1存在；2消亡）
*****************************************************************************/

//==========获取报警列表=========End===============
/****************************************************************************
*1、网关报警设置
* url：   URL/Alert/AlertUpdate.ashx
* input：
*   flag(updategwalert)
*   GatewayStateRule_duration		报警规则,连续断开多少分钟报警
*   GatewayStateRule_mode			报警方式（0：界面；1：短信；2：邮件）
*   GatewayStateRule_times			报警次数
*   GatewayStateRule_interval		重复报警时间间隔
*   GatewayStateRule_message		报警内容格式
*   --GatewayStateRule_gwid			报警网关ID，多个逗号隔开
*   --GatewayStateRule_gwname		报警网关名称，多个逗号隔开
* method：POST
* 
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*2、Response失败率报警设置
* url：   URL/Alert/AlertUpdate.ashx
* input：
*   flag(updateresponsealert)
*   ResponseRule_duration			报警时间段,最近某个时间段内
*   ResponseRule_failurerate		Reponse失败率
*   ResponseRule_sendvolume			累计发送量
*   ResponseRule_mode				报警方式（0：界面；1：短信；2：邮件）
*   ResponseRule_times				报警次数
*   ResponseRule_interval			重复报警时间间隔
*   ResponseRule_message			报警内容格式
*   	--ResponseRule_alertgwids			报警网关ID，多个逗号隔开
*   	--ResponseRule_alertgwnames		报警网关名称，多个逗号隔开
* method：POST
* 
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*3、Report失败率报警设置
* url：   URL/Alert/AlertUpdate.ashx
* input：
*   flag(updatereportalert)
*   ReportRule_duration			报警时间段,最近某个时间段内
*   ReportRule_failurerate		Report失败率
*   ReportRule_sendvolume		累计发送量
*   ReportRule_mode				报警方式（0：界面；1：短信；2：邮件）
*   ReportRule_times			报警次数
*   ReportRule_interval			重复报警时间间隔
*   ReportRule_message			报警内容格式
*   	--ReportRule_alertgwids			报警网关ID，多个逗号隔开
*   	--ReportRule_alertgwnames		报警网关名称，多个逗号隔开
* method：POST
* 
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*4、延时报警设置
* url：   URL/Alert/AlertUpdate.ashx
* input：
*   flag(updatedelayalert)
*   SendTimelagRule_duration			报警时间段,最近某个时间段内
*   SendTimelagRule_timelagduration		延时超过时间
*   SendTimelagRule_mode				报警方式（0：界面；1：短信；2：邮件）
*   SendTimelagRule_times				报警次数
*   SendTimelagRule_interval			重复报警时间间隔
*   SendTimelagRule_message				报警内容格式
*   	--SendTimelagRule_alertgwids			报警网关ID，多个逗号隔开
*   	--SendTimelagRule_alertgwnames		报警网关名称，多个逗号隔开
* method：POST
* 
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*5、邮件设置
* url：   URL/Alert/AlertUpdate.ashx
* input：
*   flag(updatealertmailset)
*   8001_sender			发送人姓名
*   8001_server			发送服务器
*   8001_user			发送人
*   8001_password		邮件密码
*   8001_subject		默认邮件主题
*   8001_receiverlist	接收报警邮件地址，多个用换行符隔开
* method：POST
* 
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*6、手机号码设置
* url：   URL/Alert/AlertUpdate.ashx
* input：
*   flag(updatealertmobileset)
*   8001_defaultproduct		通道组ID
*   8001_mobilelist			手机号码列表，多个逗号隔开
* method：POST
* 
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*8、查询报警设置
* url：   URL/Alert/AlertQuery.ashx
* input：
*   flag(selectalertsetall)
* method：POST
* 
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

//==========报警设置=========Start=============

Js.Center.Alert.AlertMonitorQueryURL = 'cmd.ashx';//?cmd=-U1 -Clistt

Js.Center.Alert.AlertQueryURL = 'URL/Alert/AlertQuery.ashx';//'test1.jsp';//
Js.Center.Alert.AlertUpdateURL = 'URL/Alert/AlertUpdate.ashx';//'test.jsp';//