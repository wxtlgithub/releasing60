Ext.namespace('Js.Center.Popedom');

/**********************************************************************************
需求用例：
1、新增部门 2、修改部门 3、删除部门信息 4、查询部门信息

部门接口：
5、根据当前用户的信息返回部门可用树（1.如果为管理员则所有；2.如果为部门管理员则当前部门以及下级部门；3.普通用户则只返回所属部门；4.包含根据部门ID返回部门树）
6、根据部门ID和角色ID获取本部门未分配部门信息或已分配部门信息【返回直属级信息】
7、根据当前用户的信息返回部门可用列表(用于下拉框)（1.如果为管理员则所有；2.如果为部门管理员则当前部门以及下级部门；3.普通用户则只返回所属部门；4.包含根据部门ID返回部门列表）

**********************************************************************************/
 
 /*********************************************************************************
*1、新增部门
* url：   URL/Temp_Purview/departments/departmentsupdate.ashx
* 说明：*
* 以下四个字段由后台获取
* numcreator,     （创建人）
* datcreatetime,  （创建时间）
* numlastmodifyuser,（最后修改人）
* datlastmodifytime,（最后修改时间）
*
* input：
*
* flag(insert),
* vc2departname,  （部门名称）
* numparentdepart,（上级部门）
* numlevel,       （层级）
* vc2levelpath,   （上下级关系层级路径）
* vc2extendcode,  （扩展号码）
* numdepartsrc,   （部门来源，1=手工录入，2=Excel导入）
* numstate,          （状态，1=启用，0=停用，-1=删除）
* numtype,            （部门类型，1=公司，2=部门）
* numorder,           （显示顺序）
* VC2DCODE,            （柜台部门编号）
* vc2departdesc,		(描述)
* numcheckstate,     (是否需要审核，0=否，1=是)
* vc2Address,(通讯地址)
* vc2PostCode,(邮编)
* vc2HandSet,(手机号码)
* vc2Tel,(电话)
* vc2LinkMan,(联系人姓名)
* NUMORDER,(部门顺序号)
* NUMUSERCOUNT(部门用户个数)
* 
* 
 
*method：POST
*output：{success:'true'} or {success:'false'}
**********************************************************************************/

/*********************************************************************************
*2、修改部门信息
* url：   URL/Temp_Purview/departments/departmentsupdate.ashx
* 说明：*
* 以下两个字段由后台获取
* numlastmodifyuser,（最后修改人）
* datlastmodifytime,（最后修改时间）
* 
* input：
*
* flag(updateall)
* numdepartid,（部门ID）
* vc2departname,  （部门名称）
* numparentdepart,（上级部门）
* numlevel,       （层级）
* vc2levelpath,   （上下级关系层级路径）
* vc2extendcode,  （扩展号码）
* numdepartsrc,   （部门来源，1=手工录入，2=Excel导入）
* numstate,          （状态，1=启用，0=停用，-1=删除）
* numtype,            （部门类型，1=公司，2=部门）
* numorder,           （显示顺序）
* VC2DCODE,            （柜台部门编号）
* vc2departdesc,		(描述)
* numcheckstate,     (是否需要审核，0=否，1=是)
* vc2Address,(通讯地址)
* vc2PostCode,(邮编)
* vc2HandSet,(手机号码)
* vc2Tel,(电话)
* vc2LinkMan,(联系人姓名)
* NUMORDER,(部门顺序号)
* NUMUSERCOUNT(部门用户个数)
*
* 
* 
* method：POST
* output：{success:'true'} or {success:'false'}
**********************************************************************************/

/*********************************************************************************
*3、删除部门信息(支持批量删除，逗号分隔)
* url：   URL/Temp_Purview/departments/departmentsupdate.ashx
* input：
*
* flag(delete),
* ids
* 
* method：POST
* output：{success:'true'} or {success:'false'}
**********************************************************************************/


Js.Center.Popedom.DepartmentsUpdateURL = 'URL/Temp_Purview/departments/departmentsupdate.ashx';
//Js.Center.Popedom.DepartmentsUpdateURL = 'URL/purview/departments/departmentsupdate.ashx';
 

/*********************************************************************************
* 4、查询部门信息(通过关键字)
* url：   URL/Temp_Purview/departments/departmentsquerry.ashx
* input：
*
* flag(selectbykey),
* %vc2departname%，（部门名称）* VC2DCODE，（柜台部门编号）
*
* limit，（最大记录数）
* start（开始记录数）

* method：POST
* output：多条*
*
**********************************************************************************/
 
 
 
/***************************************************************************

*5、根据当前用户的信息返回部门可用树（1.如果为管理员则所有；2.如果为部门管理员则当前部门以及下级部门；3.普通用户则只返回所属部门；4.包含根据部门ID返回部门树）
* url：   URL/Temp_Purview/departments/departmentsquerry.ashx
* input：*
* flag(selectallbycurrentuser),
* parentid,(上级部门ID)
* columnlist(numdepartid，部门ID；vc2departname，部门名称；NUMLEVEL，部门层级数；VC2LEVELPATH，部门层级关系)
* method：POST
* output：多条*
*
**********************************************************************************/


/***************************************************************************

*6、根据部门ID和角色ID获取本部门未分配部门信息或已分配部门信息【返回直属级信息】
* url：   URL/Temp_Purview/departments/departmentsquerry.ashx
* input：
*
* flag(selectbydepartidwithroleid),
* parentid,(上级部门ID)
* roleid,(角色ID)
* columnlist(numdepartid，部门ID；vc2departname，部门名称)
* typeid(数据类型0为未分配1为已分配)
* method：POST
* output：多条*
*
**********************************************************************************/

/***************************************************************************

*7、根据当前用户的信息返回部门可用列表(用于下拉框)（1.如果为管理员则所有；2.如果为部门管理员则当前部门以及下级部门；3.普通用户则只返回所属部门；）
* url：   URL/Temp_Purview/departments/departmentsquerry.ashx
* input：*
* flag(selectalllistbycurrentuser),
* columnlist(numdepartid，部门ID；vc2departname，部门名称；NUMLEVEL，部门层级数；VC2LEVELPATH，部门层级关系)
* method：POST
* output：多条*
*
**********************************************************************************/

/***************************************************************************

*8、//根据当前用户的信息返回子部门可用树（1.如果为管理员则所有；2.如果为部门管理员下级部门）【用于权限管理】
* url：   URL/Temp_Purview/departments/departmentsquerry.ashx
* input：*
* flag(selectallchildbycurrentuser),
* parentid,(上级部门ID)
* columnlist(numdepartid，部门ID；vc2departname，部门名称；NUMLEVEL，部门层级数；VC2LEVELPATH，部门层级关系)
* method：POST
* output：多条*
*
**********************************************************************************/

Js.Center.Popedom.DepartmentsQueryURL = 'URL/Temp_Purview/departments/departmentsquery.ashx';
//Js.Center.Popedom.DepartmentsQueryURL = 'URL/purview/departments/departmentsquery.ashx';
