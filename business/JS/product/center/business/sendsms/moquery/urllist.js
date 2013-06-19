Ext.namespace('Js.Center.SendSMS');



/*******************************************************************************
*获取上行信息URL(通过多个字段)
*url：   URL/sendSMS/MOQuery/MOQuery.ashx
*input：*
*flag(selectbykey),
*datstart，  (开始时间)
*datend， (结束时间)
*
*%vc2content%，（短信内容）
*%vc2mobile%，（手机号码）*VC2SVC（服务号码）
*
*limit，
*start
*
*method：POST
*output：多条*vc2content，（短信内容）
*vc2mobile，（手机号码）*numsvcid，（服务号码）
*datrecv，（收到时间）
*numseqid，（发送序列号）

********************************************************************************/


Js.Center.SendSMS.MOqueryURL = 'URL/sendSMS/MOQuery/MOQuery.ashx';
