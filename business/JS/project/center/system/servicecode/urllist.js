Ext.namespace('Js.Center.Business');
/****************************************************************************
*1、获取servicecode信息URL(通过ID)
*url：   URL/business/servicecode/servicecodequerry.ashx
*input：*
*flag(selectbyid),
*id，*
*limit，*
*start
*method：POST
*output：一条*
*****************************************************************************/

/****************************************************************************
*2、获取网关信息URL(通过关键字)
*url：   URL/business/servicecode/servicecodequerry.ashx
*input：*
*flag(selectbykey),
*%vc2svcname%，  （业务名称）
*%vc2svc%,       （业务代码）
*numgwid,        （）网关
*limit，*
*start
*vc2servicetype 彩短类型
*method：POST
*output：多条*
*****************************************************************************/

/****************************************************************************
*3、获取通道信息URL(全部)：用于通道下拉列表
*url：  URL/business/servicecode/servicecodequerry.ashx
*input：*
*flag(selectall), 
*columnlist(numsvcid,vc2svcname)
*method：POST
*output：多条*
*****************************************************************************/

/****************************************************************************
*4、根据产品ID获取已指定通道信息URL
*url：  URL/business/servicecode/servicecodequerry.ashx
*input：*
*flag(selectpermitbypid), 
*productid,
*columnlist(numsvcid,vc2svcname)
*method：POST
*output：多条*
*****************************************************************************/

/****************************************************************************
*4、根据产品ID获取未指定通道信息URL
*url：  URL/business/servicecode/servicecodequerry.ashx
*input：*
*flag(selectnopermitbypid), 
*productid,
*columnlist(numsvcid,vc2svcname)
*method：POST
*output：多条*
*****************************************************************************/


//Js.Center.Business.ServiceCodeURL = 'URL/business/servicecode/servicecode.ashx';
Js.Center.Business.ServiceCodeURL = 'URL/business/servicecode/servicecodeyxt.ashx';
Js.Center.Business.ServiceCodeByGatewayURL='URL/system/gateway/gatewayqueryyxt.ashx';
/****************************************************************************
*1、添加servicecode信息URL
*url：   URL/business/servicecode/servicecodeupdate.ashx
*input：*
*    flag(insert),
*    vc2svc,     （业务编码）
*    vc2svcname, （业务名称）
*    datstart,   （开始时间）
*    datend,     （结束时间）
*    numgwid,    （网关编号，后台需通过网关编号获得运营商编号numopid）*
*    vc2feevalue,（费率）
*    nummonthcnt,（包月下行应发条数）
*    vc2prodseq, （产品流水号）*
*    numstatflag,（是否统计，0=不统计，1=统计）*
*    vc2ischg,   （是否扣费，0=不扣，1=扣）
*    vc2svctype, （业务类型，1=定制，2=点播）*
*    vc2type,    （计费类型，0=免费，1=按条，2=包月）*
*    vc2dsc,     （业务描述）
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*2、单字段修改servicecode信息URL
*url：   URL/business/servicecode/servicecodeupdate.ashx
*input：*
*flag(update),
*id，*
*field，*
*value
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*3、全字段修改servicecode信息URL
*url：   URL/business/servicecode/servicecodeupdate.ashx
*input：*
*    flag(updateall)
*    numsvcid,   （通道编码）*
*    vc2svc,     （业务编码）
*    vc2svcname, （业务名称）
*    datstart,   （开始时间）
*    datend,     （结束时间）
*    numgwid,    （网关编号，后台需通过网关编号获得运营商编号numopid）*
*    vc2feevalue,（费率）
*    nummonthcnt,（包月下行应发条数）
*    vc2prodseq, （产品流水号）*
*    numstatflag,（是否统计，0=不统计，1=统计）*
*    vc2ischg,   （是否扣费，0=不扣，1=扣）
*    vc2svctype, （业务类型，1=定制，2=点播）*
*    vc2type,    （计费类型，0=免费，1=按条，2=包月）*
*    vc2dsc,     （业务描述）
*    
*
*    vc2servicecode,     （通道类型 1=短信 2=彩信）
*   
*
*    vc2long,     （服务代码长号码）
*      
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*4、删除servicecode信息URL(支持批量删除，逗号分隔)
*url：   URL/business/servicecode/servicecodeupdate.ashx
*input：*
*flag(delete),
*ids
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

Js.Center.Business.ServiceCodeUpdateURL = 'URL/business/servicecode/servicecodeyxt.ashx';
Js.Center.Business.ServiceURL='URL/business/servicecode/servicecodeyxt.ashx';
/**
 * 通道批量更新URL
 * flag:
 * querysvcbatchlist 查询通道组通道列表
 * svcbatchupdate 替换通道
 * @type String
 */
Js.Center.Business.SvcBatchURL="URL/business/servicecode/svcbatchyxt.ashx";