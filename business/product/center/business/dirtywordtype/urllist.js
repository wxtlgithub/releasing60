Ext.namespace('Js.Center.System');
/*******************************************************************************
*获取所有关键字类别
*url：   URL/system/dirtywordtype/dirtywordtypequery.ashx
*input： flag = selectall;
*        columnlist (numdirtytype, vc2name)
*    
*method：GET
*output：*
    [{'vc2name':'A','value':'0'},{'vc2name':'B','value':'1'}]
********************************************************************************/
Js.Center.System.DirtyWordTypeQueryURL = 'URL/system/dirtywordtype/dirtywordtypequery.ashx';