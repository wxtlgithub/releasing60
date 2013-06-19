Ext.namespace('Js.Center.Popedom.RoleAdd');

/**********************************************************************************

需求用例：1、新增角色 2、修改角色信息 3、删除角色信息 4、给角色配置部门信息 5、给角色配置用户信息 6、配置角色部门用户关系信息(角色授权) 7、查询角色信息
          8、配置部门角色信息 9、配置用户角色信息
外部接口：
10、根据部门ID获取未分配角色信息和已分配角色信息[如果角色信息为空，则表明没有授权则获取当前用户所在部门具有的角色] 
11、根据用户ID获取未分配角色信息和已分配角色信息[如果角色信息为空，则表明没有授权则获取当前用户所在部门（或选择用户所在部门）具有的角色] 
12、根据角色ID（多个用，分割）返回角色信息权限树【返回功能权限】
13、根据角色ID（多个用，分割）返回角色信息权限树【返回数据权限】【分别返回客户组(UserGroup UrlList.js 节点12)；；通道组信息(Products UrlList.js 节点9)】

**********************************************************************************/

/*********************************************************************************
*1、新增角色 (新增funpermissionids和datapermissionids参数)
*url：   URL/Temp_Purview/userfuncrole/userfuncroleupdate.ashx
*
*说明：*
*    numcreator,         （创建人）*
*    datcreatetime,      （创建时间）
*    numlastmodifyuser,  （最后修改人）*
*    datlastmodifytime,  （最后修改时间）
*    四个字段由后台获取*
*    vc2roletype, 由后台指定(角色类型：1=用户功能角色类型)
*    
*    
*input：*
*    flag(insert),
*    vc2rolename, (功能角色名称)
*    vc2roledesc,(描述)
*    numdepartid,(部门id)
*    funpermissionids,(功能权限信息多个用，分割)
*    productids,(通道组多个用，分割)
*    columnids,(栏目多个用，分割)
*    usergroupids,(客户组多个用，分割)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
**********************************************************************************/

/*********************************************************************************
*2、修改角色信息(新增funpermissionids和datapermissionids参数，部门ID)
*url：   URL/Temp_Purview/userfuncrole/userfuncroleupdate.ashx
*
*说明：*
*    numlastmodifyuser,  （最后修改人）*
*    datlastmodifytime,  （最后修改时间）
*    两个字段由后台获取*
*    
*input：*
*    flag(updateall)
*    numroleid,
*    vc2rolename, (功能角色名称)
*    vc2roledesc,(描述)
*    numdepartid,(部门id)
*    funpermissionids,(功能权限信息多个用，分割)
*    productids,(通道组多个用，分割)
*    columnids,(栏目多个用，分割)
*    usergroupids,(客户组多个用，分割)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
**********************************************************************************/

/*********************************************************************************
*3、删除角色信息(支持批量删除，逗号分隔)，删除时同时删除授权信息
url：   URL/Temp_Purview/userfuncrole/userfuncroleupdate.ashx
input：
flag(delete),
ids  (角色ID)

method：POST
output：{success:'true'} or {success:'false'}
**********************************************************************************/

/**********************************************************************************4、给角色配置部门信息
url：   URL/Temp_Purview/departmentfunrole/departmentfunroleupdate.ashx

input：
flag (updatedepartrightbyroleid)   
   roleid （角色ID）
   bigdepartid （所属部门ID）
   selectdepartid（已分配部门ID）
   noselectdepartid（未分配部门ID）
   
method：POST
output：{success:'true'} or {success:'false'}
**********************************************************************************/

/**********************************************************************************5、给角色配置用户信息url：   URL/Temp_Purview/departmentfunrole/departmentfunroleupdate.ashx

input：
flag (updateuserrightbyroleid)   
   roleid （角色ID）
   bigdepartid （所属部门ID）
   selectuserid（已分配用户ID）
   noselectuserid（未分配用户ID）
   
method：POST
output：{success:'true'} or {success:'false'}
**********************************************************************************/

/**********************************************************************************6、配置角色部门用户关系信息(角色授权)
url：   URL/Temp_Purview/departmentfunrole/departmentfunroleupdate.ashx

input：
flag (updatedepartuserrightbyroleid)   
   roleid （角色ID）
   bigdepartid （所属部门ID）
   selectdepartid（已分配部门ID）
   noselectdepartid（未分配部门ID）
   selectuserid（已分配用户ID）
   noselectuserid（未分配用户ID）
   
method：POST
output：{success:'true'} or {success:'false'}
**********************************************************************************/


/**********************************************************************************7、配置部门角色信息
url：   URL/Temp_Purview/departmentfunrole/departmentfunroleupdate.ashx

input：
flag (updatedepartrolebyroleids)   
   roleids （已选择角色ID；多个用，分割）
   departid （所属部门ID）
   
method：POST
output：{success:'true'} or {success:'false'}
**********************************************************************************/
/**********************************************************************************8、配置用户角色信息
url：   URL/Temp_Purview/departmentfunrole/departmentfunroleupdate.ashx

input：
flag (updateuserrolebyroleids)   
   roleids （已选择角色ID；多个用，分割）
   userid （用户ID）
   
method：POST
output：{success:'true'} or {success:'false'}
**********************************************************************************/

Js.Center.Popedom.UserFuncRoleUpdateURL = 'URL/Temp_Purview/userfuncrole/userfuncroleupdate.ashx';

/*********************************************************************************
*9、查询角色信息(通过关键字)
*url：   URL/Temp_Purview/userfuncrole/userfuncrolequerry.ashx
*input：*
*flag(selectbykey),
*%rolename%，  (角色名称)
*departid,	(创建者部门ID)
*limit，*
*start
*method：POST
*output：多条*
**********************************************************************************/

/**********************************************************************************10、根据部门ID获取未分配角色信息和已分配角色信息[如果角色信息为空，则表明没有授权则获取当前用户所在部门具有的角色] *
*url：   URL/Temp_Purview/userfuncrole/userfuncrolequerry.ashx
*input：*
*flag(selectallbydepartid), 
*departid,(可能需要增加所属部门ID参数；用于确定可分配角色的集合)
*columnlist(numroleid,vc2rolename)
*type (0为未分配的角色信息1为已分配的角色信息)
*method：POST
*output：多条*
**********************************************************************************/

/**********************************************************************************11、根据用户ID获取未分配角色信息和已分配角色信息[如果角色信息为空，则表明没有授权则获取当前用户所在部门（或选择用户所在部门）具有的角色] *
*url：   URL/Temp_Purview/userfuncrole/userfuncrolequerry.ashx
*input：*
*flag(selectallbyuserid), 
*userid,
*columnlist(numroleid,vc2rolename)
*type (0为未分配的角色信息1为已分配的角色信息)
*method：POST
*output：多条*
**********************************************************************************/

/***************************************************************************

*12、根据角色ID返回功能权限树
* url：   URL/Temp_Purview/userfuncrole/userfuncrolequerry.ashx
* input：*
* flag(selectfuncpermitbyroleids),
* roleids,(角色ID多个用，分割)

* method：POST
* output：多条*
*
**********************************************************************************/

/***************************************************************************

*13、根据角色ID和部门ID获取权限树，并已checked区分已授权和未授权
* url：   URL/Temp_Purview/userfuncrole/userfuncrolequerry.ashx
* input：*
* flag(queryallrightsbyroleid),
* roleid,(角色ID)
* parentid,(父级ID)
* departid,(部门ID)

* method：POST
* output：多条*
*
**********************************************************************************/

/**********************************************************************************14、根据部门ID获取未分配角色信息和已分配角色信息[如果角色信息为空，则表明没有授权则获取当前用户所在部门具有的角色]*
*url：   URL/Temp_Purview/userfuncrole/userfuncrolequerry.ashx
*input：*
*flag(selectallbydepartidwithcurrentuser), 
*departid,(可能需要增加所属部门ID参数；用于确定可分配角色的集合)
*columnlist(numroleid,vc2rolename)
*method：POST
*output：多条*
**********************************************************************************/

Js.Center.Popedom.UserFuncRoleURL='URL/Temp_Purview/UserFuncRole/UserFuncRoleQuery.ashx';

//Js.Center.Popedom.UserFuncRoleURL = 'Test/userfuncrole/userfuncrolequery.ashx';

