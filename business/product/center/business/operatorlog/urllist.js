Ext.namespace('Js.Center.System');


/*******************************************************************************
*获取所有平台操作日志操作类型信息，用于下拉列表显示
*url：   URL/system/operatorlog/operatorlogquerry.ashx
*input： flag = selectopertype;
*        columnlist (numopertypeid, vc2opername)
*    
*method：GET
*output：多条*
********************************************************************************/

/*******************************************************************************
*获取操作日志信息URL(通过关键字)
*url：   URL/system/operatorlog/operatorlogquerry.ashx
*input：*
*flag(selectbykey),
*datstart，  （开始时间）
*datend，    （结束时间）
*vc2content, （内容）
*numopertypeid，（操作类型）*vc2username，（操作人）=========================新添加搜索条件
*limit，*
*start
*method：POST
*output：多条*
********************************************************************************/

Js.Center.System.OperatorLogURL = 'URL/system/operatorlog/operatorlogquerry.ashx';