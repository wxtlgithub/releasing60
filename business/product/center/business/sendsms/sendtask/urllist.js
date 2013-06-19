
Ext.namespace('Js.Center.SendSMS');
 
/********************************************************************************新增 发送记录查询(通过关键字)**url：   URL/sendSMS/sendquery/sendquery.ashx**input：*	flag(selecttaskbykey),*	datstart,  (datstart)*    %vc2content%,(短信内容,模糊查询)*    %vc2destmobile%,(手机号码)*    numcontentid,(批次号)*    numdealstatus,(处理状态)* 	 numproductid(通道组)*    limit,*    start**method：POST**output：多条*********************************************************************************/

Js.Center.SendSMS.SendTaskQueryURL = 'URL/SendSMS/SendQuery/SendQuery.ashx';