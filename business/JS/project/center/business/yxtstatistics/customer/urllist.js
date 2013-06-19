Ext.namespace('Js.Center.YXTStatistics.Mt');

/*******************************************************************************
*2011-10-13 彩信统计
*==========================================================
*url：URL/MMSStatistics/mt/MMSStatisticMTQuery.ashx
*==========================================================
*input：
*	flag(loadbyusergroup),
*    %vc2departname%,(部门,模糊查询)
*    limit，
*    start，
*    numdatetype,(日期类型 1本月 2本周 3自然月 4自定义)--后台指定默认值
*        如果是3：
*        datemonth（2009-05）
*        如果是4
*        datcreattimestart,(大于DATCREATTIME)
*        datcreattimeend,(小于DATCREATTIME)
*    numsmstype， (信息类型 1短信 2长短信 3、WapPush)
*==========================================================
*method：POST
*==========================================================
*output：多条
*==========================================================
********************************************************************************/

Js.Center.MMSStatistics.MMSStatisticsMtURL  = 'URL/MMSStatistics/mt/MMSStatisticMTQuery.ashx';
Js.Center.MMSStatistics.YXTMMSStatisticsMtURL  = 'URL/MMSStatistics/mt/YXTMMSStatisticMTQuery.ashx';

/*******************************************************************************
*2010-9-15新增 导出发送量按客户组统计
*==========================================================
*url：URL/statistics/mt/statisticmtquery.ashx
*==========================================================
*input：
*	flag(loadbyusergroup),
*    %vc2departname%,(部门,模糊查询)
*    limit，
*    start，
*    numdatetype,(日期类型 1本月 2本周 3自然月 4自定义)--后台指定默认值
*        如果是3：*
*        datemonth（2009-05）
*        如果是4
*        datcreattimestart,(大于DATCREATTIME)
*        datcreattimeend,(小于DATCREATTIME)
*    numsmstype， (信息类型 1短信 2长短信 3、WapPush)
*==========================================================
*method：POST
*==========================================================
*output：多条
*==========================================================
********************************************************************************/

Js.Center.Statistics.StatisticsMtURL  = 'URL/statistics/mt/statisticmtquery.ashx';
Js.Center.Statistics.YXTStatisticsMtURL  = 'URL/statistics/mt/YXTStatisticMtQuery.ashx';
