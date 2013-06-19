Ext.namespace('Js.Center.System');

/*******************************************************************************
*获取dirtyword信息URL(通过ID)
*url：   URL/system/dirtyword/dirtywordquerry.ashx
*input：*
*flag(selectbyid),
*id，*
*limit，*
*start
*method：POST
*output：一条*
********************************************************************************/

/*获取dirtyword信息URL(通过关键字)
*url：   URL/system/dirtyword/dirtywordquerry.ashx
*input：*
*flag(selectbykey),
*%dirtywordname%，*
*limit，*
*start
*method：POST
*output：多条*
********************************************************************************/


Js.Center.System.SvcDirtyWordURL = 'URL/system/svcDirtyWord/svcdirtywordquery.ashx';

/*******************************************************************************
*1、添加dirtyword信息URL
*url：   URL/system/dirtyword/dirtyWordUpdate.ashx
**
*说明：numcreaterid,（创建人编号）*
*    datcreatetime,（创建时间）
*    nummodifierid,（修改人编号）*
*    datlastmodifytime,（修改时间）
*    四个字段由后台自动获取*
*input：*
*    flag(insert),
*    vc2dirtyword,（词汇）
*    numdirtytype,（类别）
*    
*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/

/*******************************************************************************
*2、单字段修改dirtyword信息URL
*url：   URL/system/dirtyword/dirtyWordUpdate.ashx
*input：*
*flag(update),
*id，*
*field，*
*value
*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/

/*******************************************************************************
*3、全字段修改dirtyword信息URL
*url：   URL/system/dirtyword/dirtyWordUpdate.ashx
**
*说明：nummodifierid,（修改人编号）*
*    datlastmodifytime,（修改时间）
*    两个个字段由后台自动获取
*    numcreaterid,（创建人编号）*
*    datcreatetime,（创建时间）不再修改
*input：*
*    flag(updateall)
*    numdirtywordid,
*    vc2dirtyword,（词汇）
*    numdirtytype,（类别）
*    
*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/

/*******************************************************************************
*4、删除dirtyword信息URL(支持批量删除，逗号分隔)
*url：   URL/system/dirtyword/dirtyWordUpdate.ashx
*input：*
*flag(delete),
*ids
*method：POST
*output：{success:'true'} or {success:'false'}
********************************************************************************/

/*******************************************************************************
*5、导入关键字信息
* url:URL/system/dirtyword/dirtyWordUpdate.ashx
* input：*
* flag(import),
* filepath,
* method：POST
* output：{success:'true'} or {success:'false'}
******************************************************************************* */

Js.Center.System.SvcDirtyWordUpdateURL = 'URL/system/svcDirtyWord/dirtyWordUpdate.ashx';

  