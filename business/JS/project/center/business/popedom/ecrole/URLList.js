Ext.namespace('Js.Center.Popedom.ECRole');

/**********************************************************************************

需求用例：1、新增EC角色 2、修改EC角色信息 3、删除EC角色信息 4、查询EC角色信息 
**********************************************************************************/

/*********************************************************************************
*1、新增EC角色 
*url：   URL/ECRole/ECRole.ashx
*
*说明：*    numcreator,         （创建人）*    datcreatetime,      （创建时间）
*    numlastmodifyuser,  （最后修改人）*    datlastmodifytime,  （最后修改时间）
*    四个字段由后台获取*    vc2roletype, 由后台指定(角色类型：3=EC角色)
*    numdepartid, 由后台指定(EC角色只属于总部)
*    
*input：*    flag(insert),
*    vc2rolename, (功能角色名称)
*    vc2roledesc,(描述)
*    ecids,(ECId多个用都逗号分割)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
**********************************************************************************/

/*********************************************************************************
*2、修改EC角色信息
*url：   URL/ECRole/ECRole.ashx
*
*说明：*    numlastmodifyuser,  （最后修改人）*    datlastmodifytime,  （最后修改时间）
*    两个字段由后台获取*input：*    flag(updateall)
*    numroleid,
*    vc2rolename,(功能角色名称)
*    vc2roledesc,(描述)
*    numdepartid,(部门id)
*    ecids,(ECId多个用都逗号分割)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
**********************************************************************************/

/*********************************************************************************
*3、删除EC角色信息(支持批量删除，逗号分隔)，删除时同时删除授权信息
*url：   URL/ECRole/ECRole.ashx
input：
flag(delete),
ids  (角色ID)

method：POST
output：{success:'true'} or {success:'false'}
**********************************************************************************/

/*********************************************************************************
*4、查询EC角色信息(通过关键字)
*url：   URL/ECRole/ECRole.ashx
*input：
*
*flag(selectbykey),
*%rolename%，  (角色名称)
*limit，
*start
*method：POST
*output：多条
*
**********************************************************************************/
Js.Center.Popedom.ECRoleURL = 'URL/ECRole/ECRole.ashx';

Js.Center.Popedom.ECQueryURL = 'URL/Business/ECmanage/EcListQuery.ashx';