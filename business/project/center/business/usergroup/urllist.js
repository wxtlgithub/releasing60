/*
需求：1、产品下拉列表信息

*/
Ext.namespace('Js.Center.Business');
/****************************************************************************
*1、获取信息URL(通过ID)
*
*url：   URL/business/usergroup/usergroupquerry.ashx
*
*input：
*	flag(selectbyid),
*	id，
*	limit，
*	start
*
*method：POST
*
*output：一条
*
*
*****************************************************************************/

/****************************************************************************
*2、获取信息URL(通过关键字)
*
*url：   URL/business/usergroup/usergroupquerry.ashx
*
*input：
*	flag(selectbykey),
*	%usergroupname%，//栏目名称模糊查询
*	numdepartid,//部门编号
*	%vc2username%,//用户名
*	limit，
*	start
*
*method：POST
*
*output：多条
*
*****************************************************************************/

/****************************************************************************
*3、获取子菜单信息URL(全部)：用于栏目下拉列表
*
*url： URL/business/usergroup/usergroupquery.ashx
*
*input：
*flag(selectall), 
*usergrouplist(numusergroupid,vc2usergroupname)
*
*method：POST
*
*output：多条
*
*****************************************************************************/


/****************************************************************************
*4、根据账号数据角色ID和部门ID获取已授权的客户组信息URL
*
*url： URL/business/usergroup/usergroupquery.ashx
*
*input：
*
*flag(selectpermitbyuserroleid), 
*roleid，（账号数据角色ID）
*
*departid，（部门ID）
*
*columnlist(numusergroupid,vc2usergroupname)
*
*method：POST
*
*output：多条
*
*****************************************************************************/

/****************************************************************************
*5、根据账号数据角色ID和部门ID获取未授权的客户组信息URL
*url： URL/business/usergroup/usergroupquery.ashx
*input：
*
*flag(selectnopermitbyuserroleid), 
*roleid，（账号数据角色ID）
*
*departid，（部门ID）
*
*columnlist(numusergroupid,vc2usergroupname)
*method：POST
*output：多条
*
*****************************************************************************/

/****************************************************************************
*5、客户组成员下载（下载为Txt）
*
*url： URL/business/usergroup/usergroupquery.ashx
*input：
*
*flag(selectmemberbyid),
*id,     (客户组id)
*method：POST
*output：多条
*
*****************************************************************************/

/****************************************************************************
*6、客户组黑名单下载（下载为Txt）
*
*url： URL/business/usergroup/usergroupquery.ashx
*input：
*
*flag(selectblackmemberbyid),
*id,     (客户组id)
*method：POST
*output：多条
*
*****************************************************************************/

/****************************************************************************
*7、获取子菜单信息URL(全部)：用于栏目下拉列表
*
*url： URL/business/usergroup/usergroupquery.ashx
*input：
*
*flag(selectallusergroup), 
*columnlist(numusergroupid,vc2usergroupname)
*method：POST
*output：多条
*
*****************************************************************************/


/*****************************************************************************
*8、新增 根据条件查询客户组列表信息(通过关键字)
*url：   URL/business/usergroup/usergroupquerry.ashx
*
*input：
*	flag(selectbysearchkey),
*	%usergroupname%，//客户组名称模糊查询
*	%vc2departname%,//部门名称
*	%vc2username%,//创建人名称
*	limit，
*	start
*
*method：POST
*
*output：多条
*
*****************************************************************************/


/*****************************************************************************
*9、新增（获取客户组信息--根据用户查询属于该用户的客户组信息，部门管理员可看见所有客户组，部门员工只能看见属于自己的客户组）
*url:URL/business/usergroup/usergroupquery.ashx
*input:
*    flag(selectownerusergroup),
*    %usergroupname%，模糊查询客户组名
*
*method:POST,
*output:多条
*****************************************************************************/

/****************************************************************************
*10、新增（根据客户组id，获得客户组需要下载的客户组成员和黑名单信息）
*url:URL/business/usergroup/usergroupquery.ashx
*input:
*    flag(selectownerusergroupbyid),
*    id，客户组id
*method:POST,
*output:多条
*****************************************************************************/

/*****************************************************************************
*11、新增接口（客户组客户详细查询）
*url： URL/business/usergroup/usergroupquery.ashx
*input：
*
*flag(queryusergroupcusdetails),
*usergroupid,     (客户组id)
*usergroupname,(客户组名称)
*method：POST
*output：多条
*
******************************************************************************/


/****************************************************************************
*12、根据角色ID获取已授权的客户组信息[用于显示隐藏位置的信息]
*
*url： URL/business/usergroup/usergroupquery.ashx
*
*input：
*
*flag(selectpermitbyroleids), 
*roleids，（角色ID多个用，分割）
*
*columnlist(numusergroupid,vc2usergroupname)
*
*method：POST
*
*output：多条
*
*****************************************************************************/

/*****************************************************************************13、根据部门ID获取可用的客户组信息[基于部门，角色，客户组之间的授权关系，用于列表选择][2010-4-7新增]*
*url：  URL/business/usergroup/usergroupquery.ashx
*input：*
*flag(selectpermitbydepartid),
*departid,部门ID*
*columnlist(numusergroupid,vc2usergroupname)
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************14、根据用户ID获取可用的客户组信息[基于用户，角色，客户组之间的授权关系，用于列表选择][2010-4-7新增]*
*url：  URL/business/usergroup/usergroupquery.ashx
*input：*
*flag(selectpermitbyuserid),
*userid,用户ID*
*columnlist(numusergroupid,vc2usergroupname)
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************15、根据部门ID和角色ID获取可用的客户组信息[基于部门，角色，客户组之间的授权关系，用于列表选择][2010-4-9新增]*
*url：  URL/business/usergroup/usergroupquery.ashx
*input：*
*flag(selectpermitbydepartidwithroleid),
*departid,部门ID*roleid,角色ID
*columnlist(numusergroupid,vc2usergroupname)
*method：POST
*output：多条*
*****************************************************************************/

//Js.Center.Business.UserGroupURL = 'URL/business/usergroup/usergroupquery.ashx';
Js.Center.Business.UserGroupURL = 'URL/Customer/UserGroup/UserGroupQuery.ashx';



/******************************************************************************
*1、添加信息URL
*url：   URL/business/usergroup/usergroupupdate.ashx
*input：
*
*    flag(insert),
*    numprodid,
*    vc2usergroupname,
*    vc2usergroupdesc,
*
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

/******************************************************************************
*2、单字段修改信息URL
*url：   URL/business/usergroup/usergroupupdate.ashx
*input：
*
*    flag(update),
*    id，
*
*    field，
*
*    value
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

/******************************************************************************
*3、全字段修改信息URL
*url：   URL/business/usergroup/usergroupupdate.ashx
*input：
*
*
*    flag(updateall)
*    id,
*    numprodid,
*    vc2usergroupname,
*    vc2usergroupdesc,
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

/******************************************************************************
*4、删除信息URL(支持批量删除，逗号分隔)
*url：   URL/business/usergroup/usergroupupdate.ashx
*input：
*flag(delete),
*ids
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

Js.Center.Business.UserGroupUpdateURL = 'URL/Customer/UserGroup/UserGroupUpdate.ashx';

/*
需求：1、客户组下拉列表信息 2、部门下拉列表

*/
Ext.namespace('Js.Center.Business');

/******************************************************************************
*1、获取详细成员日志信息URL
*url：   URL/business/usergroupmember/usergroupmemberquerry.ashx
*input：
*
*    flag(selectdesc),
*    id(日志表TL_LOG_COLUMN编号)
*
*method：POST
*output：下载流
*
*******************************************************************************/

/******************************************************************************
*2、获取成员日志信息URL
*url：   URL/business/usergroupmember/usergroupmemberquerry.ashx
*input：
*
*    flag(selectlog),
*    numtypeid,(数据类型 1、添加栏目成员2、退出栏目成员3、添加栏目黑名单4、退出栏目黑名单5、添加客户组成员6、退出客户组成员7、添加客户组黑名单8、退出客户组黑名单)
*    datcreattimestart,(大于DATCREATTIME)
*    datcreattimeend,(小于DATCREATTIME)
*    numdepartid,(部门编号，选择列表)
*    numusergroupid,(客户组编号，选择列表)
*    numuserid（用户编号，选择列表）
*
*
*method：POST
*output：多条
*
*******************************************************************************/

//Js.Center.Business.UserGroupMemberURL = 'URL/business/usergroupmember/usergroupmemberquery.ashx';
Js.Center.Business.UserGroupMemberURL = 'URL/Customer/UserGroupMember/UserGroupMemberQuery.ashx';

/******************************************************************************
*1、添加信息URL
*url：   URL/business/usergroupmember/usergroupmemberupdate.ashx
*input：
*
*    flag(insertbylist),
*    numusergroupid,（客户组编号）
*
*    mobilelist(用换行符分开的手机号码)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

/******************************************************************************
*2、添加信息URL
*url：   URL/business/usergroupmember/usergroupmemberupdate.ashx
*input：
*
*    flag(insertbyfile),
*    numusergroupid,（客户组编号）
*
*    mobilefile(用换行符分开的手机号码文件)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

/******************************************************************************
*3、删除信息URL
*url：   URL/business/usergroupmember/usergroupmemberupdate.ashx
*input：
*
*    flag(deletebylist),
*    numusergroupid,（客户组编号）
*
*    mobilelist(用换行符分开的手机号码)
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

/******************************************************************************
*4、删除信息URL
*url：   URL/business/usergroupmember/usergroupmemberupdate.ashx
*input：
*
*    flag(deletebyfile),
*    numusergroupid,（客户组编号）
*
*    mobilefile(用换行符分开的手机号码文件)
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/

//Js.Center.Business.UserGroupMemberUpdateURL = 'URL/business/usergroupmember/usergroupmemberupdate.ashx';
Js.Center.Business.UserGroupMemberUpdateURL = 'URL/Customer/UserGroupMember/UserGroupMemberUpdate.ashx';
Js.Center.Business.YXTUserGroupMemberURL = 'URL/Customer/CustomerBussiness/CustomerBussinessQuery.ashx';

  
