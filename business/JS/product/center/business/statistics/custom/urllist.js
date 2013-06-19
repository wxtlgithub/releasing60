/*
需求：1、部门下拉列表
*/
Ext.namespace('Js.Center.Statistics.Custom');

/*******************************************************************************
*1获取客户数统计部分信息URL(按部门)
*url：URL/statistics/custom/statisticsquery.ashx
*input：*
*    flag(countbydepartment),
*    limit，*
*    start，*
*    numdepartid, --add by baoyi
*    datcreattimestart,(大于DATCREATTIME)
*    datcreattimeend,(小于DATCREATTIME)
*method：POST
*output：多条*
********************************************************************************/

/*******************************************************************************
*2导出客户数统计部分信息URL(按部门)
*url：URL/statistics/custom/statisticsquery.ashx
*input：*
*    flag(loadbydepartment),
*    limit，*
*    start，*
*    numdepartid, --add by baoyi
*    datcreattimestart,(大于DATCREATTIME)
*    datcreattimeend,(小于DATCREATTIME)
*method：POST
*output：多条*
********************************************************************************/

Js.Center.Statistics.StatisticsCustomURL = 'URL/statistics/custom/statisticsquery.ashx';

/*******************************************************************************
*新增 客户数按部门统计
*==========================================================
*url：   URL/statistics/custom/statisticsquery.ashx
*==========================================================
*input：
*	flag(countcustomerbydepartment),
*	datstart,  (大于datstart)
*    datend, (小于datend)
*    %vc2departname%,(部门,模糊查询)
*    limit,
*    start
*==========================================================
*method：POST
*==========================================================
*output：多条
*==========================================================
新增 客户数按部门统计*/

/********************************************************************************
**新增 客户数按部门统计
*==========================================================
*url：   URL/statistics/custom/statisticsquery.ashx
*==========================================================
*input：
*	flag(loadcountcustomerbydepartment),
*	datstart,  (大于datstart)
*    datend, (小于datend)
*    %vc2departname%,(部门,模糊查询)
*    limit,
*    start
*==========================================================
*method：POST
*==========================================================
*output：多条
*==========================================================
********************************************************************************/