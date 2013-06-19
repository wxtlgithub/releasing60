/*
需求用例：1、新增程序 2、修改程序 3、删除程序（批量） 4、查询程序 5、查询列表
*/
Ext.namespace('Js.Center.Business');
/*******************************************************************************
*1、新增程序
*url：   URL/business/Program/ProgramUpdate.ashx
*input:
*    flag(insert), 新增标志
*    VC2USERNAME，程序名称
*    VC2PASSWORD，程序密码
*    VC2CLIENTIP，程序IP
*    VC2SUBLONGCODE，下行长号码
*    NUMMAXSENDSPEED，最大下发速度.0 不限制
*    NUMCLIENTLEVEL，程序等级 "0 不限制 >0 下发减去相应级数，直至最低等级"
*    NUMRETURNLEVEL，透传级别.设置透传级别（-1:透传 submitresp.2:透传response.4:透传report.8:透传innerresponse.16:透传innerreport.最后保存值是级别数值相加）

*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/



/*********************************************************************************2、修改程序*
*url：   URL/business/Program/ProgramUpdate.ashx
*input：*
*    flag(update),
*    NUMCLIENTID，程序ID
*    VC2USERNAME，程序名称
*    VC2PASSWORD，程序密码
*    VC2CLIENTIP，程序IP
*    VC2SUBLONGCODE，下行长号码
*    NUMMAXSENDSPEED，最大下发速度.0 不限制
*    NUMCLIENTLEVEL，程序等级 "0 不限制 >0 下发减去相应级数，直至最低等级"
*    NUMRETURNLEVEL，透传级别.设置透传级别（-1:透传 submitresp.2:透传response.4:透传report.8:透传innerresponse.16:透传innerreport.最后保存值是级别数值相加）

*method：POST
*output：{success:'true'} or {success:'false'}
**********************************************************************************/


/********************************************************************************
*3、删除程序（支持批量删除，逗号分隔）
*url：   URL/business/Program/ProgramUpdate.ashx
*input：*
*flag(delete),
*ids，程序ID（多个用，分割）

*method：POST
*output：{success:'true'} or {success:'false'}
*********************************************************************************/

Js.Center.Business.ProgramUpdateURL = 'URL/business/Program/ProgramUpdate.ashx';


/********************************************************************************
*4、查询程序
*url：   URL/business/Program/ProgramQuery.ashx
*input：*
*    flag(selectbykey)*    VC2USERNAME，程序名称
*    start，开始记录数
*    limit，最大记录数
*    
*method：POST
*output：
*    NUMCLIENTID，程序ID
*    VC2USERNAME，程序名称
*    VC2PASSWORD，程序密码
*    VC2CLIENTIP，程序IP
*    VC2SUBLONGCODE，下行长号码
*    NUMMAXSENDSPEED，最大下发速度.0 不限制
*    NUMCLIENTLEVEL，程序等级 "0 不限制 >0 下发减去相应级数，直至最低等级"
*    NUMRETURNLEVEL，透传级别.设置透传级别（-1:透传 submitresp.2:透传response.4:透传report.8:透传innerresponse.16:透传innerreport.最后保存值是级别数值相加）

*********************************************************************************/

/********************************************************************************
*5、查询列表
*url：   URL/business/Program/ProgramQuery.ashx
*input：*
*    flag(selectbycolumn)*    columnlist(numclientid，程序ID；vc2username，程序名称)
*    
*method：POST
*output：
*    columnlist(numclientid，程序ID；vc2username，程序名称)

*********************************************************************************/


/****************************************************************************
*6、链接协议下拉框
*
* url：   URL/business/program/clientprogram.ashx
* input：
*   flag(selectbylinkprotocol)
*   columnlist(numlinkprotocolid,序列号;vc2linkprotocolname，协议名称)
*   
* method：POST
* output：(numlinkprotocolid,序列号;vc2linkprotocolname，协议名称)
*
*****************************************************************************/
Js.Center.Business.ProgramQueryURL = 'URL/business/Program/ProgramUpdate.ashx';

//程序添加时用到这这部门下拉框请求路径
Js.Center.Popedom.DepartmentsQueryURL = 'URL/Temp_Purview/departments/departmentsquery.ashx';