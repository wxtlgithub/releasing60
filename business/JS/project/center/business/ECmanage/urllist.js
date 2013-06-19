 Ext.namespace('Js.Center.Business.ECmanage');
 /*******************************************************************************
 *获取EC客户列表URL(通过多个字段)
* url：  /URL/Business/ECmanage/EcListQuery.ashx
* input：
* flag(selectecbykey),
* limit,
* start
* method：POST
* output：多条
*
********************************************************************************/
Js.Center.Business.ECmanage.EcQueryURL = 'URL/Business/ECmanage/EcListQuery.ashx';

/**
*EC管理，增加、修改URL
*url：  URL/Business/ECmanage/EcUpdate.ashx
*input：
*flag(insert、edit),
*ids
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/
Js.Center.Business.ECmanage.EcUpdateURL = 'URL/Business/ECmanage/EcUpdate.ashx';
/*获取tlecservicecode信息URL(通过ID)
url：   URL/system/tlecservicecode/tlecservicecodequerry.aspx
input：
flag(selectbyid),
id，
limit，
start
method：POST
output：一条
*/

/*获取tlecservicecode信息URL(通过关键字)
url：   URL/system/tlecservicecode/tlecservicecodequerry.aspx
input：
flag(selectbykey),
%tlecservicecodename%，
limit，
start
method：POST
output：多条
*/
Js.Center.Business.ECmanage.ECsvcInfoURL= 'URL/Business/ECservice/EcServiceInfo.ashx';
Js.Center.Business.ECmanage.ECsvcDeleteURL= 'URL/Business/ECservice/EcServiceDelete.ashx';

/*1、添加tlecservicecode信息URL
url：   URL/system/tlecservicecode/tlecservicecodeupdate.aspx
input：
flag(insert),
numecid,
vc2ecid,
numopid,
numsvcid,
numstatus,
numsubcode,
vc2inputtype,
vc2cusip,
vc2feetype,
numsign,
numfeearea,
vc2confeerule,
datinsert,

method：POST
output：{success:'true'} or {success:'false'}
*/

/*2、单字段修改tlecservicecode信息URL
url：   URL/system/tlecservicecode/tlecservicecodeupdate.aspx
input：
flag(update),
id，
field，
value
method：POST
output：{success:'true'} or {success:'false'}
*/

/*3、全字段修改tlecservicecode信息URL
url：   URL/system/tlecservicecode/tlecservicecodeupdate.aspx
input：
flag(updateall)
id,
numecid,
vc2ecid,
numopid,
numsvcid,
numstatus,
numsubcode,
vc2inputtype,
vc2cusip,
vc2feetype,
numsign,
numfeearea,
vc2confeerule,
datinsert,

method：POST
output：{success:'true'} or {success:'false'}
*/

/*4、删除tlecservicecode信息URL(支持批量删除，逗号分隔)
url：   URL/system/tlecservicecode/tlecservicecodeupdate.aspx
input：
flag(delete),
ids
method：POST
output：{success:'true'} or {success:'false'}
*/

Js.Center.Business.ECmanage.ECsvcUpdateURL='URL/Business/ECmanage/EcServiceUpdate.ashx';

/*******************************************************************************
*根据EC编号获取EC报备签名列表URL()
* url：  /URL/Business/ECmanage/EcSignture.ashx
* input：
* flag(selectecsignturebykey),
* numecid,		//EC编号
* limit,
* start,
* method：POST
* output：多条
*
********************************************************************************/

/*******************************************************************************
*添加EC报备签名URL()
* url：  /URL/Business/ECmanage/EcSignture.ashx
* input：
* flag(insert),
* NUMECID,			//EC编号
* NUMTYPEID,		//签名类型
* VC2SIGNTURE		//签名内容
* output：{success:'true'} or {success:'false'}
*
********************************************************************************/

/*******************************************************************************
*修改EC报备签名URL()
* url：  /URL/Business/ECmanage/EcSignture.ashx
* input：
* flag(update),
* NUMID，			//主键id
* NUMECID,			//EC编号
* NUMTYPEID,		//签名类型
* VC2SIGNTURE		//签名内容
* output：{success:'true'} or {success:'false'}
*
********************************************************************************/

/*******************************************************************************
*删除EC报备签名URL()
* url：  /URL/Business/ECmanage/EcSignture.ashx
* input：
* flag(delete),
* ids		//主键id
* output：{success:'true'} or {success:'false'}
*
********************************************************************************/

/*******************************************************************************
*获取EC报备签名类型列表URL()
* url：  /URL/Business/ECmanage/EcSignture.ashx
* input：
* flag(selectallecsigntype),
* colummlist,		//EC编号
* 
* method：POST
* output：多条NUMTYPEID,VC2TYPENAME
*
********************************************************************************/
Js.Center.Business.ECmanage.ECSigntureURL='URL/Business/ECmanage/EcSignture.ashx';