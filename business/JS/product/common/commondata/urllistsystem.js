/*********************************************************************************
*获取菜单树信息URL
*url：   URL/treesimple.ashx
*input： parentid
*method：POST
*output：
[{id:"2",parentid:"1",text:"部门管理",leaf:true,iconCls:"sysmanagemenu"
,number:"1",url:"DepartmentInfoManage"},{id:"3",parentid:"1",text:"员工管理",leaf:true,iconCls
:"homemanage",number:"2",url:"EmployeeInfoManage"},{id:"4",parentid:"1",text:"联系人管理"
,leaf:true,iconCls:"allmanagemenu",number:"3",url:"linkmanManage"}]
**********************************************************************************/

var treeData="URL/treesimple.ashx";

/*********************************************************************************
*用户登录URL
*url：   URL/login.ashx
*input： username、password
*method：POST
*output：*
*{success:'true'} 或者 {success:'false'}
**********************************************************************************/

var loginURL="URL/login.ashx";

/*********************************************************************************
*用户获取密码URL
*url：   URL/getPwd.ashx
*input： username
*method：POST
*output：*
*{success:'true'} 或者 {success:'false'}
**********************************************************************************/

var getPwdURL="URL/getPwd.ashx";



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

var getUserURL = 'URL/Temp_Purview/User/UserQuerySimple.ashx';




