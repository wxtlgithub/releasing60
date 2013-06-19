/*
需求：1、部门列表
*/
Ext.namespace('Js.Center.Statistics.Whitelist');

/*******************************************************************************
*1获取白名单统计部分信息URL(按业务统计)
*url：URL/statistics/whitelist/statisticcustomsquery.ashx
*input：*
*    flag(countbybusi),
*    limit，*
*    start，*
*    numdatetype,(日期类型 1本月 2本周 3自然月 4自定义)
*        如果是3：*
*            datemonth（2009-05）*
*        如果是4
*            datcreattimestart,(大于DATCREATTIME)
*            datcreattimeend,(小于DATCREATTIME)
*    numdepartids (部门编号列表，逗号分隔)
*method：POST
*output：多条*
*    
********************************************************************************/

/*******************************************************************************
*2导出白名单统计部分信息URL(按业务统计)
*url：URL/statistics/whitelist/statisticcustomsquery.ashx
*input：*
*flag(loadbybusi),
*limit，*
*start，*
*    numdatetype,(日期类型 1本月 2本周 3自然月 4自定义)
*    如果是3：*
*    datemonth（2009-05）*
*    如果是4
*    datcreattimestart,(大于DATCREATTIME)
*    datcreattimeend,(小于DATCREATTIME)
*numdepartids (部门编号列表，逗号分隔)
*method：POST
*output：多条*
*    
********************************************************************************/

Js.Center.Statistics.StatisticsWhitelistURL = 'URL/statistics/whitelist/statisticwhitelistquery.ashx';