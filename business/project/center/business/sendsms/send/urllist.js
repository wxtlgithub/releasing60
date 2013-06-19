/*
需求：1、产品下拉列表 2、栏目下拉列表 3、客户组下拉列表
*/
Ext.namespace('Js.Center.SendSMS');
 
/*******************************************************************************
*获取tl_sms_content信息URL(通过类型获取本人发布的信息)
*url：   URL/sendSMS/send/smscontentquery.ashx
*input：*
*flag(selectbykey),
*%vc2content%，*
*state，（0、待审 1、一审 2、二审 3、草稿和驳回）*
*numsendtype,(类型编号用逗号分隔)（发送号码数据类型1、栏目2、客户组3、持仓股票 4、手机号码 5、按文件发送）
*limit，*
*start
*method：POST
*output：多条*
********************************************************************************/

/*******************************************************************************
*新增-信息类型列表
*url：   URL/sendSMS/send/smscontentquery.ashx
*input:
*    flag(selectsmsclass),
*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/




Js.Center.SendSMS.SmsContentURL = 'URL/SendSMS/Send/SMSContentQuery.ashx';

/*******************************************************************************
*YXT-短信客户组查询
*url：  URL/SendSMS/Send/YXTSMSContentQuery.ashx
*input: flag(selectsmsclass),smscontentid(queryusergroupdetailbycontentid)
*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/
Js.Center.SendSMS.YXTSmsContentURL = 'URL/SendSMS/Send/YXTSMSContentQuery.ashx';

/********************************************************************************
*1、提交到一审（提交一审操作）
*url：   URL/sendSMS/send/smscontentupdate.ashx
*input：*
*    flag(submit),
*    numcontentid，（隐藏域 空：插入 不空：修改）
*    vc2content,（内容）
*    nummessageformat,（内容类型：15：短信（需要处理）、31：wappush、32：长短信）*
*    numsendmethod,（1=立即发送  2=定时发送）
*    vc2detail,
*    datpresend,（拟发送时间）
*    numsendtype,（发送号码数据类型1、栏目2、客户组3、持仓股票 4、手机号码 5、按文件发送）
*        //四种操作
*        //1栏目：取变量numcolumnid 栏目编号 单选*
*        //2客户组：取变量numusergroupids 客户组编号 多选*
*        //3持仓股票：取变量vc2stockcode 股票代码
*		//4文件：取变量mobilefile 号码列表
*        //5号码：取变量mobilelist 号码列表
*		
*    --numstate,（审核状态 0 待审）*
*    --vc2status,（1=已生成发送数据）
*    --numpriority,（0：群发 ）*
*    numcheck,（一期自建短信不需要审核 1=需要  2=不需要）（这里做了一下修改，增加了该字段）*
*    --vc2reason,（驳回原因）
*    --numprenum,（拟发送量）*
*    --numsource,（来源）
*    numprivacystate (隐私状态0：全不共享1：全共享,为新增字段，默认勾选)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*********************************************************************************/

//-----------------------新增提交到二审-----------------------------
/********************************************************************************
*新提交到一审（提交一审操作）
*url：   URL/sendSMS/send/smscontentupdate.ashx
*input：*
*    flag(submitsms),
*    numcontentid，（隐藏域 空：插入 不空：修改）
*    vc2content,（内容）
*    nummessageformat,（内容类型：15：短信（需要处理）、31：wappush、32：长短信）**
*    numsendmethod,（1=立即发送  2=定时发送）
*    vc2detail,
*    datpresend,（拟发送时间）
*    numsendtype,（发送号码数据类型1、栏目2、客户组3、持仓股票 4、手机号码 5、按文件发送）
*        //四种操作
*        //1栏目：取变量numcolumnid 栏目编号 单选*
*        //2客户组：取变量numusergroupids 客户组编号 多选*
*        //3持仓股票：取变量vc2stockcode 股票代码
*		//4文件：取变量mobilefile 号码列表
*        //5号码：取变量mobilelist 号码列表
*		
*    --numstate,（审核状态 0 待审）*
*    --vc2status,（1=已生成发送数据）
*    --numpriority,（0：群发 ）*
*    numcheck,（一期自建短信不需要审核 1=需要  2=不需要）（这里做了一下修改，增加了该字段）*
*    --vc2reason,（驳回原因）
*    --numprenum,（拟发送量）*
*    --numsource,（来源）
*    numprivacystate (隐私状态0：全不共享1：全共享,为新增字段，默认勾选)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*********************************************************************************/


/*********************************************************************************2、保存草稿（保存操作）*
*url：   URL/sendSMS/send/smscontentupdate.ashx
*input：*
*    flag(save),
*    numcontentid，（隐藏域 空：插入 不空：修改）
*    vc2content,（内容）
*    nummessageformat,（内容类型：15：短信（需要处理）、31：wappush、32：长短信）*
*    numsendmethod,（1=立即发送  2=定时发送）
*    vc2detail,
*    datpresend,（拟发送时间）
*    numsendtype,（发送号码数据类型1、栏目2、客户组3、持仓股票 4、手机号码 5、按文件发送）
*        //四种操作
*        //1栏目：取变量numcolumnid 栏目编号 单选*
*        //2客户组：取变量numusergroupids 客户组编号 多选*
*        //3持仓股票：取变量vc2stockcode 股票代码
*		//4文件：取变量mobilefile 号码列表
*        //5号码：取变量mobilelist 号码列表
*		
*    --numstate,（审核状态 4 草稿）*
*    --vc2status,（1=已生成发送数据）
*    --numpriority,（0：群发 ）*
*    --numcheck,（一期自建短信不需要审核 1=需要  2=不需要）
*    --vc2reason,（驳回原因）
*    --numprenum,（拟发送量）*
*    --numsource,（来源）
*    
*method：POST
*output：{success:'true'} or {success:'false'}
**********************************************************************************/


/********************************************************************************
*3、删除tl_sms_content信息URL(支持批量删除，逗号分隔)
*url：   URL/sendSMS/send/smscontentupdate.ashx
*input：*
*flag(delete),
*ids
*method：POST
*output：{success:'true'} or {success:'false'}
*********************************************************************************/

/********************************************************************************
*4、一审通过
*url：   URL/sendSMS/send/smscontentupdate.ashx
*input：*
*    flag(firstcheck),
*    numcontentid，（隐藏域 信息编号）*
*    --numstate,（审核状态 2 二审）*
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*********************************************************************************/

/********************************************************************************
*5、二审通过
*url：   URL/sendSMS/send/smscontentupdate.ashx
*input：*
*    flag(secondcheck),
*    numcontentid，（隐藏域 信息编号）*
*    --numstate,（审核状态 3 通过）*
*        
*method：POST
*output：{success:'true'} or {success:'false'}
*********************************************************************************/

/*********************************************************************************6、二审驳回*
*url：   URL/sendSMS/send/smscontentupdate.ashx
*input：*
*    flag(rejectcheck),
*    numcontentid，（隐藏域 信息编号）*
*    vc2reason， (驳回原因)
*
*        
*method：POST
*output：{success:'true'} or {success:'false'}
*********************************************************************************/

/*********************************************************************************7、一审驳回*
*url：   URL/sendSMS/send/smscontentupdate.ashx
*input：*
*    flag(rejectcheckbyfirst),
*    numcontentid，（隐藏域 信息编号）*
*    vc2reason， (驳回原因)
*
*        
*method：POST
*output：{success:'true'} or {success:'false'}
*********************************************************************************/

/********************************************************************************
*新增发送测试短信息
*url：   URL/sendSMS/send/smscontentupdate.ashx
*input：*
*    flag(sendtest),
*    vc2mobile(手机号),
*    vc2smscontent(测试内容),
*    nummessageformat,（内容类型：15：短信（需要处理）、31：wappush、32：长短信）*
*        
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/


/*******************************************************************************
*新增复核
*url：   URL/sendSMS/send/smscontentupdate.ashx
*input：*
*    flag(selectcheckuser),
*    vc2username,(用户名)
*    vc2userpwd（密码）
*        
*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/


Js.Center.SendSMS.SmsContentUpdateURL = 'URL/sendSMS/send/smscontentupdate.ashx';

Js.Center.SendSMS.YXTSmsContentSubmitURL = 'URL/sendSMS/send/yxtsmscontentupdate.ashx';
Js.Center.Business.YXTUserGroupURL = 'URL/Customer/UserGroup/UserGroupQuery.ashx';




