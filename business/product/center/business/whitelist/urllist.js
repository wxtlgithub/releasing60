/*
需求：1、通道下拉列表信息 2、部门下拉列表
*/
Ext.namespace('Js.Center.Business');

/******************************************************************************
*1、获取详细成员日志信息URL
*url：   URL/BlackWhilteList/whitequerry.ashx
*input：*
*    flag(selectdesc),
*    id(日志表TL_LOG_BWLIST编号)
*
*method：POST
*output：下载流
*
********************************************************************************/

/******************************************************************************
*2、获取成员日志信息URL
*url：   URL/BlackWhilteList/whitequerry.ashx
*input：*
*    flag(selectlog),
*    datcreattimestart,(大于DATCREATTIME)
*    datcreattimeend,(小于DATCREATTIME)
*    numsvcid,(业务编号，选择列表)
*    vc2username（用户名称）
*
*method：POST
*output：多条*
*******************************************************************************/

Js.Center.Business.WhiteURL = 'URL/BlackWhilteList/WhilteQuery.ashx';

/******************************************************************************
*1、添加信息URL
*url：   URL/BlackWhilteList/WhilteUpdate.ashx
*input：*
*    flag(insertbylist),
*    numsvcid,（业务编号）
*    mobilelist(用换行符分开的手机号码)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

/******************************************************************************
*2、添加信息URL
*url：   URL/BlackWhilteList/WhilteUpdate.ashx
*input：*
*    flag(insertbyfile),
*    numsvcid,（业务编号）
*    mobilefile(用换行符分开的手机号码文件)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

/******************************************************************************
*3、删除信息URL
*url：   URL/BlackWhilteList/WhilteUpdate.ashx
*input：*
*    flag(deletebylist),
*    numsvcid,（业务编号）
*    mobilelist(用换行符分开的手机号码)
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

/******************************************************************************
*4、删除信息URL
*url：   URL/BlackWhilteList/WhilteUpdate.ashx
*input：*
*    flag(deletebyfile),
*    numsvcid,（业务编号）
*    mobilefile(用换行符分开的手机号码文件)
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

Js.Center.Business.WhiteUpdateURL = 'URL/BlackWhilteList/WhilteUpdate.ashx';

  