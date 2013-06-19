Ext.namespace('Js.Center.Business');
/*
需求用例：1、新增上行路由 2、修改上行路由 3、删除上行路由（批量） 4、查询上行路由
*/

/*******************************************************************************
*1、新增上行路由
*url：   URL/business/MORouter/MORouterUpdate.ashx
*input:
*    flag(insert)， 新增标志
*    VC2LCMATCH，长号码匹配标志,1=>精确,0=>模糊
*    VC2CMDMATCH，指令匹配标志,1=>精确,0=>模糊
*    VC2LONGCODE，长号码
*    VC2CMD，指令 
*    NUMRPGMID，程序编号
*    VC2DSC，路由描述

*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/



/*********************************************************************************2、修改上行路由*
*url：   URL/business/MORouter/MORouterUpdate.ashx
*input：*
*    flag(update),--修改标示
*    NUMROUTEID， 长代码指令组合编号
*    VC2LCMATCH，长号码匹配标志,1=>精确,0=>模糊
*    VC2CMDMATCH，指令匹配标志,1=>精确,0=>模糊
*    VC2LONGCODE，长号码
*    VC2CMD，指令 
*    NUMRPGMID，程序编号
*    VC2DSC，路由描述   

*method：POST
*output：{success:'true'} or {success:'false'}
**********************************************************************************/


/********************************************************************************
*3、删除上行路由（支持批量删除，逗号分隔）
*url：   URL/business/MORouter/MORouterUpdate.ashx
*input：*
*flag(delete),--删除标示
*ids ， 长代码指令组合编号（多个用，分割）

*method：POST
*output：{success:'true'} or {success:'false'}
*********************************************************************************/
Js.Center.Business.MORouterUpdateURL="URL/business/morouter/morouter.ashx";
/********************************************************************************
*4、查询上行路由
*url：   URL/business/morouter/morouter.ashx
*input：*
*    flag(selectbykey)--查询标示*    VC2LONGCODE，长号码*    VC2CMD，指令 
*    NUMRPGMID，程序编号 
*    start，开始记录数
*    limit，最大记录数
*    
*method：POST
*output：
*    NUMROUTEID， 长代码指令组合编号
*    VC2LCMATCH，长号码匹配标志,1=>精确,0=>模糊
*    VC2CMDMATCH，指令匹配标志,1=>精确,0=>模糊
*    VC2LONGCODE，长号码
*    VC2CMD，指令 
*    NUMRPGMID，程序编号
*    VC2DSC，路由描述
*    NUMRPGMNAME，程序名称
*********************************************************************************/
Js.Center.Business.MORouterQueryURL="URL/business/morouter/morouter.ashx";

Js.Center.Business.YXTMORouterUpdateURL="URL/business/morouter/morouteryxt.ashx";

Js.Center.Business.YXTClients = "URL/Common/Data/IndustryQuery.ashx";
	
Js.Center.Business.YXTMORouterQueryURL="URL/business/morouter/morouteryxt.ashx";