/*
需求：用户黑名单接口
*/
Ext.namespace('Js.Center.Business');

/*****************************************************************************
*1、获取处理详情(显示列表时用）
*url：   URL/BlackWhilteList/MyBlackQuery.ashx
*input：*
*    flag(selectlog),
*    datcreattimestart,(大于DATCREATTIME)
*    datcreattimeend,(小于DATCREATTIME)  
*method：POST
*output：logid(hide）,总数，成功数，处理状态id(hide)，处理状态，操作类型，操作人，操作时间，操作         numlogid   numtotalnum   numsuccessnum   numstate    stateText   opationType    vc2username     datcreattime           sql:
 "select log.numlogid
,log.numtotalnum
,log.numsuccessnum
,log.numstate
,case log.numstate when 0 then '正在处理' else  '处理完成' end as stateText
,case log.numtype when 0 then '添加' else '退出' end as opationType 
,us.vc2username
,log.datcreattime
from 
tl_ec_log_blacklist_user log left  outer join 
tl_user us on log.numuserid=us.numuserid"*****************************************************************************/


/****************************************************************************
*1、获取详细成员日志信息URL
*url：   URL/BlackWhilteList/MyBlackQuery.ashx
*input：*
*    flag(selectdesc),
*    logid(日志表tl_ec_log_blacklist_user编号)
*
*method：POST
*output：下载流
*****************************************************************************/
Js.Center.Business.MyBlackURL = 'URL/BlackWhilteList/MyBlackQuery.ashx';

/******************************************************************************
*用户黑名单增加（按列表)
*url:URL/BlackWhilteList/MyBlackUpdate.ashx
*input：
*  flag(insertbylist),* 
*  mobilelist(or mobilefile)（手机列表，用换行符分开)
*method：POST
*output：{success:'true'} or {success:'false'}


******************************************************************************/

/******************************************************************************
*用户黑名单增加(按文件)
*url:URL/BlackWhilteList/MyBlackUpdate.ashx
*input：
*  flag(insertbyfile),* 
*  mobilefile（上传文件)
*method：POST
*output：{success:'true'} or {success:'false'}


******************************************************************************/

/******************************************************************************
*用户黑名单删除(按列表)
*url:URL/BlackWhilteList/MyBlackUpdate.ashx
*input：
*  flag(deletebylist),* 
*  mobilelist(or mobilefile)（上传文件列表或是手机列表，用换行符分开)
*method：POST
*output：{success:'true'} or {success:'false'}
******************************************************************************/

/******************************************************************************
*用户黑名单删除(按文件)
*url:URL/BlackWhilteList/MyBlackUpdate.ashx
*input：
*  flag(deletebyfile),* 
*  mobilefile（上传文件列表或是手机列表，用换行符分开)
*method：POST
*output：{success:'true'} or {success:'false'}
******************************************************************************/
Js.Center.Business.MyBlackUpdateURL = 'URL/BlackWhilteList/MyBlackUpdate.ashx';











