
    ///
    Ext.namespace('Js.Center.System');

    /*获取tlspecialmobile信息URL(通过关键字)
    url：   URL/system/tlspecialmobile/tlspecialmobilequerry.ashx
    input：
    flag(selectbykey),
    tlspecialmobile,	手机号码
    serviceid,			通道ID
    limit，
    start
    method：POST
    output：多条
    */
    Js.Center.System.SpecialMobileURL='URL/system/tlspecialmobile/tlspecialmobilequery.ashx';


    /*1、添加tlspecialmobile信息URL
    url：   URL/system/tlspecialmobile/tlspecialmobileupdate.ashx
    input：
    flag(insert),
    numsvcid,
    mobilelist,
    
    method：POST
    output：{success:'true'} or {success:'false'}
    */

    

    /*4、删除tlspecialmobile信息URL(支持批量删除，逗号分隔)
    url：   URL/system/tlspecialmobile/tlspecialmobileupdate.ashx
    input：
    flag(delete),
    ids
    method：POST
    output：{success:'true'} or {success:'false'}
    */

    Js.Center.System.SpecialMobileUpdateURL='URL/system/tlspecialmobile/tlspecialmobileupdate.ashx';

  