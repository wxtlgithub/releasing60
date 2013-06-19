Ext.namespace('Js.Center.Message');

/*******************************************************************************
*获取messageURL(通过ID，标题，内容，状态，创建开始时间，结束时间，消息类型)
*url：   URL/message/messagequerry.ashx
*input：*
*flag(getmessagebywhere),
*%messageid%,消息id*%messagetitle%，消息标题*%messagecontent%，消息内容
*%status%，消息状态
*%stime%，消息创建的开始时间
*%etime%，消息创建的结束时间
*%messagetype%，消息类型
*%ruserid%，消息接收人id
*%suserid%，消息发送人id
*limit，
*start
*method：POST
*output：一条或多条*
/*******************************************************************************
*获取message所有类型URL()
*url：   URL/message/messagequerry.ashx
*input：*
*flag(getallmessagetype),
*limit，*
*start
*method：POST
*output：一条或多条*
********************************************************************************/

Js.Center.Message.MessageQueryURL = 'URL/Message/MessageQuery.ashx';


/*******************************************************************************
*1、设置message已读状态URL
*url：   URL/message/MessageUpdate.ashx
**
*    *
*input：*
*    flag(setread),
*    messageid,（消息id）
*    status,（消息状态）
*    
*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/

/*******************************************************************************
*2、删除消息URL
*url：   URL/message/MessageUpdate.ashx
*input：*
*flag(deletemessage),
*messageid（消息id）*

*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/

Js.Center.Message.MessageUpdateURL = 'URL/Message/MessageUpdate.ashx';

  