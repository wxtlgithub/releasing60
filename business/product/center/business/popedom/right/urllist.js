Ext.namespace('Js.Center.Purview');
/***************************************************************************
*Description：   获取right信息URL(通过ID)
*url：           URL/purview/right/rightquerry.ashx
*input：         
*    flag(selectbyid),
*    id，
*    limit，
*    start
*method：POST
*output：一条
*****************************************************************************/

/***************************************************************************
*Description：获取right信息URL(通过关键字)
*url：   URL/purview/right/rightquerry.ashx
*input：
*        flag(selectbykey),
*        %rightname%，
*        limit，
*        start
*method：POST
*output：多条
*****************************************************************************/

/***************************************************************************
*获取right信息URL(根据角色ID)
*url：   URL/purview/right/rightquerry.ashx
*input：
*flag(selectbyroleid),
*roleid，
*parentid
*method：POST
*output：所有权限的树形结构，根据角色ID获取已授权的被选中
*****************************************************************************/

//Js.Center.Purview.RightURL = 'URL/purview/right/rightquery.ashx';
Js.Center.Purview.RightURL = 'URL/Temp_Purview/Right/RightQuery.ashx';

/***************************************************************************
*1、添加right信息URL
*url：   URL/purview/right/rightupdate.ashx
*input：
*    flag(insert),
*    vc2rightname,(权限名称)
*    vc2rolecode,(权限码)
*    vc2enabledflag,(有效标志，1=有效，0=无效)
*    vc2rightdesc,(权限描述)
*    vc2codegroupurl,(当权限类别为功能是有效，表示此权限对应的程序集url)
*    vc2codegroupmodule,（用户访问页面时，使用此编码鉴权）*
*    numparentid,(父级id)
*    numorder,(权限排序)
*    vc2type,(权限类别，0=目录，1=功能)
    
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*2、单字段修改right信息URL
*url：   URL/purview/right/rightupdate.ashx
*input：
*flag(update),
*id，
*field，
*value
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*3、全字段修改right信息URL
*url：   URL/purview/right/rightupdate.ashx
*input：
*    flag(updateall)
*    numrightid
*    vc2rightname,(权限名称)
*    vc2rolecode,(权限码)
*    vc2enabledflag,(有效标志，1=有效，0=无效)
*    vc2rightdesc,(权限描述)
*    vc2codegroupurl,(当权限类别为功能是有效，表示此权限对应的程序集url)
*    vc2codegroupmodule,（用户访问页面时，使用此编码鉴权）
*    numparentid,(父级id)
*    numorder,(权限排序)
*    vc2type,(权限类别，0=目录，1=功能)
    
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*4、删除right信息URL(支持批量删除，逗号分隔)
*url：   URL/purview/right/rightupdate.ashx
*input：
*flag(delete),
*ids
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

//Js.Center.Purview.RightUpdateURL = 'URL/purview/right/rightupdate.ashx';
Js.Center.Purview.RightUpdateURL = 'URL/Temp_Purview/Right/RightUpdate.ashx';

  