Ext.namespace("Js.Center.SendMMS");
/*===============================
需要用到的方法：
/*===================================================

彩信预览
URL：URL/sendMMS/send/smscontentquery.ashx
input：

flag(previewMMSmms)
mmscontentid,   （彩信编号）
method：POST
output：

/*===================================================
发送测试彩信
URL：URL/sendMMS/send/smscontentupdate.ashx
input：

flag(sendtestmms)
numcontentid,   （彩信编号）
vc2mobile,      （测试手机号码）
method：POST
output：true  or false

=====================================================*/
/*===================================================
1、彩信一审查询
URL：URL/sendMMS/check/MMScheckquery.ashx
input：

flag(selectfirstbykey)
datstart,   (开始时间)
datend,     （结束时间）
%mmsname%,  （彩信名称）
creatorid,  （创建人ID）
start,      
limit,

method：POST
output：多条
彩信id，彩信名称、彩信类型、彩信状态、创建人id，创建人name,创建时间，提交发送时间,发送时间，结束时间
numcontentid，vc2name,nummmstype,numstate(0未审核；1通过)，numuserid，numcreattime,datsend,datsrcsendtime(待发表),datsrcendtime（待发表），vc2desc
=====================================================*/

/*===================================================
2、彩信二审查询
URL：URL/sendMMS/check/MMScheckquery.ashx
input：

flag(selectsecendbykey)
datstart,   (开始时间)
datend,     （结束时间）
%mmsname%,  （彩信名称）
creatorid,  （创建人ID）
firstcheckid,（一审审核人ID）
start,      
limit,

method：POST
output：多条
彩信id，彩信名称、彩信类型、彩信状态、创建人id，创建人name,创建时间，提交发送时间，一审通过时间
=====================================================*/


/*===================================================
6、查询彩信资源信息
URL：URL/sendMMS/check/MMScheckquery.ashx
input：

flag(selectresourcebyid)
nummmsid,   （彩信编号）
numtype,    （资源类型:1图片；2音乐；3文字）
method：POST
output：

=====================================================*/


Js.Center.SendMMS.MMScheckQueryURL='URL/sendMMS/check/MMScheckquery.ashx';
//Js.Center.SendMMS.MMScheckQueryURL='test/sendMMS/check/MMScheckquery.ashx';

/*===================================================
4、彩信一审
URL：URL/sendMMS/check/MMScheckUpdate.ashx
input：

flag(firstcheck)
mmscontentid,   （彩信编号）
checkresult,    （审核结果：1审核通过；2资源内容错误；3发送对象号码错误；4内容号码均错误）
checkcomments,  （审核意见）
firstcheckid,   （一审审核人ID，后台获取当前操作用户ID）
firstchecktime, （后台获取当前时间）
nummmsid(彩信编号)
method：POST
output：true  or false
=====================================================*/

/*===================================================
5、彩信二审
URL：URL/sendMMS/check/MMScheckUpdate.ashx
input：

flag(secendcheck)
mmscontentid,   （彩信编号）
checkresult,    （审核结果：1审核通过；2资源内容错误；3发送对象号码错误；4内容号码均错误）
checkcomments,  （审核意见）
secendcheckid,   （一审审核人ID，后台获取当前操作用户ID）
secendchecktime, （后台获取当前时间）
nummmsid(彩信编号)
method：POST
output：true  or false

=====================================================*/

/*===================================================
6、获取彩信发送对象
URL：URL/sendMMS/check/MMScheckquery.ashx
input：

flag(selectsendobject)
mmscontentid,   （彩信内容编号）

method：POST
output：多条
发送对象说明(NUMPRENUMNAME)，发送对象实例(VC2TYPELISTNAME)

=====================================================*/



Js.Center.SendMMS.MMScheckUpdateURL='URL/sendMMS/check/MMScheckUpdate.ashx';
//Js.Center.SendMMS.MMScheckUpdateURL='test/sendMMS/check/MMScheckUpdate.ashx';