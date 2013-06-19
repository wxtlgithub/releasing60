Ext.namespace('Js.Center.Business.ECPrePaid');

/*获取tlecprepaid信息URL(通过关键字)
url：   URL/Business/ECmanage/EcPrePaid.ashx
input：
flag(selectbykey),
numecid，EC编号
numover，是否超量（0没超，1超量）
limit，
start
method：POST
output：多条
*/



/*1、添加tlecprepaid信息URL
url：   URL/Business/ECmanage/EcPrePaid.ashx
input：
flag(insert),
numecid,
numtype,
numsendmax,
numsent,
numover,
datupdatetime,

method：POST
output：{success:'true'} or {success:'false'}
*/



/*3、全字段修改tlecprepaid信息URL
url：   URL/Business/ECmanage/EcPrePaid.ashx
input：
flag(updateall)
numseqid,
numecid,
numtype,
numsendmax,
numsent,
numover,
datupdatetime,

method：POST
output：{success:'true'} or {success:'false'}
*/



Js.Center.Business.ECPrePaid.ECPrePaidURL='URL/Business/ECmanage/EcPrePaid.ashx';

  