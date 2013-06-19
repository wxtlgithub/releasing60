Ext.namespace('Js.Center.Customer');


/******************************************************************************
*3、获取客户白名单产品信息URL(通过手机号码)
*url：   URL/customer/customerbusiness/customerbusinessquerry.ashx
*input：*
*flag(selectwhitebymobile),
*vc2mobile，
*limit，*
*start
*method：POST
*output：多条*
*******************************************************************************/

/******************************************************************************
*4、获取客户黑名单产品信息URL(通过手机号码)
*url：   URL/customer/customerbusiness/customerbusinessquerry.ashx
*input：*
*flag(selectblackbymobile),
*vc2mobile，
*limit，*
*start
*method：POST
*output：多条*
*******************************************************************************/



/*******************************************************************************
*6、获取客户客户组产品信息URL(通过手机号码)
*url：   URL/customer/customerbusiness/customerbusinessquerry.ashx
*input：*
*flag(selectcusgroupbymobile),
*vc2mobile，*

*limit，*
*start
*method：POST
*output：多条*
*******************************************************************************/






Js.Center.Customer.CustomerBusinessURL = 'URL/Customer/CustomerBussiness/CustomerBussinessQuery.ashx';






/******************************************************************************
*9、退出白名单
*url：   URL/BlackWhilteList/WhilteUpdate.ashx
*input：*
*flag(deletebylist),
*numsvcid 通道ID（先不用管，传默认的"1"即可，方便以后扩展）
*mobilelist
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/
Js.Center.Customer.WhiteUpdateURL = 'URL/BlackWhilteList/WhilteUpdate.ashx';
/******************************************************************************
*10、退出黑名单
*url：   URL/BlackWhilteList/BlackUpdate.ashx
*input：*
*flag(deletebylist),
*numsvcid 通道ID（先不用管，传默认的"1"即可，方便以后扩展）
*mobilelist, （手机号）
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/
Js.Center.Customer.BlackUpdateURL = 'URL/BlackWhilteList/BlackUpdate.ashx';
/******************************************************************************
*10、退出用户黑名单
*url：   URL/BlackWhilteList/MyBlackUpdate.ashx
*input：*
*flag(deletebylist),
*numsvcid 通道ID（先不用管，传默认的"1"即可，方便以后扩展）
*mobilelist, （手机号）
*method：POST
*output：{success:'true'} or {success:'false'}
*******************************************************************************/
Js.Center.Customer.MyBlackUpdateURL = 'URL/BlackWhilteList/MyBlackUpdate.ashx';
/*******************************************************************************
*退出客户组
*url：   URL/Customer/UserGroupMember/UserGroupMemberUpdate.ashx
*input：*
*flag(deletebylist),
*numusergroupid 客户组编号
*mobilelist 客户手机号
*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/
Js.Center.Customer.UserGroupMemberUpdateURL = 'URL/Customer/UserGroupMember/UserGroupMemberUpdate.ashx';

