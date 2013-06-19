Ext.namespace('Js.Center.ClientSMS');



/*******************************************************************************
*获取接口短信审核信息URL(通过多个字段)
*url：  URL/clientSms/clientSmsCheck/clientSmsCheckQuery.ashx
*input：
*
*flag(selectbykey),
*datstart，  (开始时间)
*datend， (结束时间)
*
*numclientid，（客户端）
*vc2departname（EC）
*
*limit，
*start
*
*method：POST
*
*output：多条
*vc2content，（短信内容）
*numclientid，（客户端）
*numdepartid（EC）
*vc2departname
*numcheckstate，（审核状态）
*numcheckid，（审核人）
*numsendstate （发送状态）
*datchecktime （审核时间）
*datcreatetime （创建时间）
*

********************************************************************************/


/*******************************************************************************
*更新接口短信审核信息URL(通过多个字段)
*url：  URL/clientSms/clientSmsCheck/clientSmsCheckUpdate.ashx
*input：
*
*flag(selectbykey),
*datstart，  (开始时间)
*datend， (结束时间)
*
*numclientid，（客户端）
*numdepartid（EC）
*
*limit，
*start
*
*method：POST
*
*output：多条
*vc2content，（短信内容）
*numclientid，（客户端）
*numdepartid（EC）
*numcheckstate，（审核状态）
*numcheckid，（审核人）
*numsendstate （发送状态）
*datchecktime （审核时间）
*datcreatetime （创建时间）
*

********************************************************************************/


Js.Center.ClientSMS.ClientSMSCheckQueryURL = 'URL/clientSms/clientSmsQuery/clientSmsQuery.ashx';
Js.Center.ClientSMS.ClientSMSCheckUpdateURL = 'URL/clientSms/clientSmsQuery/clientSmsQuery.ashx';

