Ext.namespace('Js.Center.System');

/*******************************************************************************
*获取当前用户信息URL(通过ID)
*url：   URL/system/updatepassword/updatepasswordquerry.ashx
*说明：ID由后台获取当前用户ID
*input：*
*flag(selectbyid),
*limit，*
*start
*method：POST
*output：一条*
********************************************************************************/

/*******************************************************************************
*3、全字段修改dirtyword信息URL
*url：   URL/system/updatepassword/updatepasswordquerry.ashx
*说明：用户ID由后台获取当前用户ID
*input：*
*    flag(updateall)
*    vc2username,（用户姓名）
*    vc2mobile,（手机号码）
*    vc2upassword,（密码）
*    numdepartid,（部门编码）
*    vc2mobilelist（测试号码列表）
*    
*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/

Js.Center.System.UpdatePwdURL = 'URL/getPwd.ashx';//'URL/system/updatepassword/updatepasswordquerry.ashx';


  