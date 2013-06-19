Ext.namespace('Js.Center.Popedom');
/*********************************************************************************

需求用例：
1、新增用户 2、修改用户信息 3、修改用户基本信息 4、删除用户信息 5、查询用户信息

用户接口：
6、根据部门ID获取用户信息：用于用户下拉列表（后台自动判断权限信息，只显示一级信息）
7、根据部门ID和角色ID获取本部门未分配用户信息或已分配的用户信息【返回直属级信息】

**********************************************************************************/

/*********************************************************************************
*1、新增用户
*url：   URL/Temp_Purview/user/userupdate.ashx
*说明：numcreator,   （创建人编号）*
*    datcreatetime,  （创建时间）
*    numlastmodifyuser,（最后修改人编号）*
*    datlastmodifytime,（最后修改时间）
*    四个字段由后台获取*
*input：*
*    flag(insert),
*    vc2username,    （用户姓名）
*    vc2uaccount,    （用户账号，即登录名）*
*    vc2upassword,   （用户密码）
*    vc2mobile,      （手机号码）
*    vc2email,       （电子邮箱）
*    numdepartid，   （用户编号）
*    vc2phone,		(电话号码)
*    numroleid,		(功能角色编号)
*    numdroleid,		(数据角色编号)
*    vc2extendcode,  （用户长号码）*
*    vc2ordercode,   （用户指令）
*    numtype，       （用户类型 1:管理员；2 普通账号）
*    vc2signature    （签名）
*    numcheckstate   （是否需要审核 0否 1是）
*    
*    //vc2usercode,    （用户编码）
*    //numusrc,        （用户来源，1=手工录入，2=excel导入）*
*    //numtotallimit,  （用户发送总限量）
*    //nummonthlimit,  （用户发送月限量）*
*    //numweeklimit,   （用户发送周限量）*
*    //numdaylimit,     （用户发送日限量）*
*    //numstate,       （用户状态，1=启用，0=停用，-1=删除）*
*    //numbusinessid,  （默认业务）
*    //vc2isfirstlogin，（是否首次登录，Y=是，N=否，默认否）
*    //numpositionid，   （岗位编号）
*    //numemployeeid， （关联员工）
*    
*    
*method：POST
*output：{success:'true'} or {success:'false'}
**********************************************************************************/

/*********************************************************************************
*2、修改用户信息
*url：   URL/Temp_Purview/user/userupdate.ashx
*input：*
*    flag(updateall)
*    id,
*    vc2username,    （用户姓名）
*    vc2uaccount,    （用户账号，即登录名）*
*    vc2upassword,   （用户密码）
*    vc2mobile,      （手机号码）
*    vc2email,       （电子邮箱）
*    numdepartid，   （用户编号）
*    vc2phone,		(电话号码)
*    numroleid,		(功能角色编号)
*    numdroleid,		(数据角色编号)
*    vc2extendcode,  （用户长号码）*
*    vc2ordercode,   （用户指令）
*    numtype，       （用户类型 1:管理员；2 普通账号）
*    vc2signature    （签名）
*    numcheckstate   （是否需要审核 0否 1是）
*    
     //vc2usercode,    （用户编码）
    //numusrc,        （用户来源，1=手工录入，2=excel导入）
    //numtotallimit,  （用户发送总限量）
    //nummonthlimit,  （用户发送月限量）
    //numweeklimit,   （用户发送周限量）
    //numdaylimit,     （用户发送日限量）
    //numstate,       （用户状态，1=启用，0=停用，-1=删除）
    //numbusinessid,  （默认业务）
    //vc2isfirstlogin，（是否首次登录，Y=是，N=否，默认否）
    //numpositionid，   （岗位编号）
    //numemployeeid， （关联员工）
    
method：POST
output：{success:'true'} or {success:'false'}
**********************************************************************************/

/**********************************************************************************3、修改用户基本信息*
*url：   URL/Temp_Purview/user/userupdate.ashx
*input：*
*    flag(updateuserinfo)
*    vc2username,    （用户姓名）
*    vc2upassword,   （用户旧密码）*
*    vc2upasswordnew,（用户新密码）*
*    vc2mobile,      （手机号码）
*    vc2email,       （电子邮箱）
*    vc2phone,		(电话号码)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*
**********************************************************************************/

/*********************************************************************************
*4、删除用户信息(支持批量删除，逗号分隔)
*url：   URL/Temp_Purview/user/userupdate.ashx
*input：*
*flag(delete),
*ids
*method：POST
*output：{success:'true'} or {success:'false'}
**********************************************************************************/

Js.Center.Popedom.UserUpdateURL = 'URL/Temp_Purview/User/UserUpdate.ashx';


/*********************************************************************************
*5、查询用户信息(通过关键字)
*url：   URL/Temp_Purview/user/userquerry.ashx
*input：*
*flag(selectbykey)，
*%username%，（用户姓名）
*numdepartid，   （部门编号）
*%vc2uaccount%,    （用户账号，即登录名）*
*limit，（最大记录数）
*start（开始记录数）
*
*method：POST
*output：多条*
**********************************************************************************/

/**********************************************************************************6、根据部门ID获取用户信息：用于用户下拉列表*
*url：   URL/Temp_Purview/user/userquerry.ashx
*input：*
*flag(selectallbydepartid), 
*departid,   (部门ID)
*columnlist(numuserid,vc2username,vc2email)
*method：POST
*output：多条*
**********************************************************************************/


/**********************************************************************************7、根据部门ID和角色ID获取本部门未分配用户信息或已分配的用户信息【返回直属级信息】*
*url：   URL/Temp_Purview/user/userquerry.ashx
*input：*
*flag(selectbydepartidwithroleid), 
*departid,   (部门ID)
*roleid,(角色ID)
*typeid,(数据类型0为未分配1为已分配)
*columnlist(numuserid,vc2username,vc2email)
*method：POST
*output：多条*
**********************************************************************************/


/**********************************************************************************8、根据部门ID，获取用户信息：用于用户下拉列表【用于分配角色】*
*url：   URL/Temp_Purview/user/userquerry.ashx
*input：*
*flag(selectallbydepartidforrole), 
*departid,   (部门ID)
*columnlist(numuserid,vc2username,vc2email)
*method：POST
*output：多条*
**********************************************************************************/

Js.Center.Popedom.UserURL = 'URL/Temp_Purview/User/YXTUserQuery.ashx';