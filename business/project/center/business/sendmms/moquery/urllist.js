Ext.namespace("Js.Center.SendMMS");
/*===================================================
1、彩信发送查询
URL：URL/sendMMS/Query/MMSquery.ashx
input：

flag(selectsendbykey)
datstart,   (开始时间)
datend,     （结束时间）
columnid,   （栏目ID）
usergroupid,（客户组ID）
firstcheckid,（一审审核人id）
secondcheckid,（二审审核人ID）
mmsState,   （彩信状态）
start,      
limit,

method：POST
output：多条
彩信id，彩信名称、彩信类型、彩信状态、创建时间，发送时间
以下为不再显示字段
（拟发送量，实际发送量，成功量，失败量，未知状态，成功率）
=====================================================*/

/*===================================================
2、系统彩信发送查询
URL：URL/sendMMS/Query/MMSquery.ashx
input：

flag(selectsyssendbykey)
ddatstart,   (开始时间)
datend,     （结束时间）
columnid,   （彩信名称）
usergroupid,（创建人ID）
firstcheckid,（一审审核人id）
cecondcheckid,（二审审核人ID）
mmsState,   （彩信状态）
start,      
limit,

method：POST
output：多条
彩信id，彩信名称、彩信类型、彩信状态(发送状态
-1=彩信过期
1=未发送
2=正在发送
3=已发送)、创建时间，发送时间
以下为不再显示字段
（拟发送量，实际发送量，成功量，失败量，未知状态，成功率）
=====================================================*/


/*===================================================
3、查看发送详情
URL：URL/sendMMS/Query/MMSquery.ashx
input：

flag(selectsenddetails)
mmscontentid,   （彩信id）
start,      
limit,

method：POST
output：多条
彩信id，彩信名称、彩信类型、彩信状态、创建人id，创建人name,创建时间，提交发送时间，一审通过时间
=====================================================*/

/*===================================================
4、查看发送详情发送统计信息
URL：URL/sendMMS/Query/MMSquery.ashx
input：

flag(querydetailbycontentid)
mmscontentid   （彩信内容id）
start,      
limit

method：POST
output：单条
实际发送量(NUMMTCNT)，发送成功量[response状态](NUMRESP_SUCCNT)，发送失败量[response状态]（NUMRESP_FAICNT），未知状态[response状态]（NUMRESP_NOCNT），
发送成功量[report状态]（NUMREP_SUCCNT），发送失败量[report状态]（NUMREP_FAICNT），未知状态[report状态]（NUMREP_NOCNT）
成功率(numsuc_rate)，内容ID（隐藏）（NUMSENDBATCH ）
=====================================================*/

Js.Center.SendMMS.MMSQueryURL='URL/sendMMS/Query/MMSquery.ashx';


/*******************************************************************************
*新增 下行记录查询
*
*url：   URL/sendMMS/Query/MMSMTQuery.ashx
*
*input：
*	flag(selectmtbysearchkey),
*	datstart,  (大于datstart)
*   datend, (小于datend)
*   %vc2mmstitle%,(彩信标题,模糊查询)
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
* 历史彩信ID，手机号码,彩信标题,彩信类型（5：个性化彩信;其它：普通彩信；)，服务号码，发送人，部门，提交时间，审核时间，发送时间，发送状态，接收状态,(操作：查看彩信)
NUMMMSID,VC2DESTMOBILE,VC2MMSTITLE,NUMSENDTYPE,VC2SERVICECODE,vc2username,vc2departname,DATCREATETIME,DATSEND,DATCHECK2,NUMRESPONSESTATUS,NUMREPORTSTATUS
********************************************************************************/
Js.Center.SendMMS.MMSMTQueryURL="URL/sendMMS/Query/MMSMTQuery.ashx";

/*******************************************************************************
*获取上行信息URL(通过多个字段)
*url：    URL/sendMMS/Query/MMSMOQuery.ashx
*input：*
*flag(selectbykey),
*datstart，  (开始时间)
*datend， (结束时间)
*
*%vc2mmstitle%，（彩信标题）
*%vc2mobile%，（手机号码）*longcode（子通道号码）*
*limit，
*start
*
*method：POST
*output：多条*vc2mmstitle，（彩信标题）
*vc2mobile，（手机号码）*longcode，（子通道号码）
*datrecv，（收到时间）
*numseqid，（发送序列号）

********************************************************************************/
Js.Center.SendMMS.MMSMOQueryURL="URL/sendMMS/Query/MMSMOQuery.ashx";
Js.Center.SendMMS.YXTMMSMOQueryURL="URL/sendMMS/Query/YXTMMSMOQuery.ashx";



Js.Center.SendMMS.MMScheckQueryURL='URL/sendMMS/check/MMScheckquery.ashx';
