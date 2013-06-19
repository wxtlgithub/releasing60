///<reference path = "vswd-ext_2.2.js" / >
Ext.form.Field.prototype.msgTarget = 'side';
Ext.namespace('Js.Center.Common');
Ext.MessageBox.minWidth = 150;
Ext.QuickTips.init();
if (!Ext.grid.GridView.prototype.templates) {
    Ext.grid.GridView.prototype.templates = {};
}
Ext.grid.GridView.prototype.templates.cell = new Ext.Template('<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} x-selectable {css}" style="{style}" tabIndex="0" {cellAttr}>', '<div class="x-grid3-cell-inner x-grid3-col-{id}" {attr}>{value}</div>', '</td>');
// 重载 Ext.data.Store.prototype.applySort 函数以修复 DataStore 对汉字排序异常的问题
// var _applySort = Ext.data.Store.prototype.applySort;
//如有需要，保存原 applySort 函数的引用
Ext.data.Store.prototype.applySort = function(){ //重载 applySort
    if (this.sortInfo && !this.remoteSort) {
    
        var s = this.sortInfo, f = s.field;
        
        var st = this.fields.get(f).sortType;
        
        var fn = function(r1, r2){
        
            var v1 = st(r1.data[f]), v2 = st(r2.data[f]);
            
            // 添加:修复汉字排序异常的Bug
            
            if (typeof(v1) == "string") { //若为字符串，
                return v1.localeCompare(v2);//则用 localeCompare 比较汉字字符串, Firefox 与 IE 均支持
            }
            
            // 添加结束
            
            return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
            
        };
        
        this.data.sort(s.direction, fn);
        
        if (this.snapshot && this.snapshot != this.data) {
        
            this.snapshot.sort(s.direction, fn);
            
        }
        
    }
    
};

//============================================================================定义菜单树

var rootsid = "-1";
var root = new Ext.tree.AsyncTreeNode({
    id: rootsid,
    text: "短信发送平台",
    loader: new Ext.tree.TreeLoader({
        url: treeData,
        listeners: {
            "beforeload": function(treeloader, node){
                treeloader.baseParams = {
                    parentid: node.id,
                    method: 'POST'
                };
            }
        }
    })
});

var index = -1;
var tree = new Ext.tree.TreePanel({
    // title : '树形菜单',
    border: false,
    applyTo: document.body,
    root: root,
    rootVisible: false,
    listeners: {
        "click": function(node, event){
            //叶子节点点击不进入链接
            if (node.isLeaf()) {
                eval(node.attributes['url'] + '(node)');
            }
            else {
                //不是叶子节点不触发事件
                
                event.stopEvent();
                //点击时展开
                node.toggle();
            }
            return false;
        }
    }
});
tree.expand();
// west
var west = new Ext.Panel({
    // 自动收缩按钮    
    collapsible: true,
    border: false,
    autoScroll: true,
    width: 195,
    layout: "accordion",
    extraCls: "roomtypegridbbar",
    layoutConfig: {
        activeOnTop: false,
        fill: true,
        hiddencollapseTool: true,
        titlecollapse: false,
        animate: false
    },
    region: "west",
    title: '<div style="height:44px; padding: 7px 0px 0px 60px; width:100%; *background:url(jspack/product/common/Images/menu_bg.gif) repeat-x scroll 0 0 transparent;">菜单导航</div>' //'菜单导航'//,
    //items:[menuPanel]
    //items: [{
    //    title: "<b>管理菜单</b>",
    //    autoScroll: true,
    //    iconCls: "hotelmanageicon",
    //    items: [tree]
    //}]
});
/******************************************
 * 功能描述：左侧菜单点击事件，在center中添加Tab
 * nodeId：center中添加Tab的ID
 * nodeText：center中添加Tab的标题
 * url:center中添加Tab加载函数
 ******************************************/
function menuClick(nodeId, nodeText, url){
    //var nodeTitle = nodeText;
    if (nodeText.length > 1) {
        nodeText = nodeText.substring(1, nodeText.length);
    }
    var node = eval({
        "id": nodeId,
        "text": nodeText,
        "url": url
    });
    var tab = center.getItem("tab" + node.id);
    if (!tab) {
        //OpenNum++;
        loadflag = false;
        tab = center.add({
            id: "tab" + node.id,
            //name: storename,
            iconCls: 'openroomiconinfo',
            xtype: "panel",
            title: node.text,
            closable: true,
            layout: "fit"//,
            //            listeners: {
            //                click: function(){
            //                    if (storename != null && storename != "") {
            //                        eval(storename + '.reload()');
            //                    }
            //                }
            //            },
            //items: [grid]
        }).show();
        WXTL.Common.showWaitLoading(true);
        eval(url + '(node)');
        //WXTL.Common.showWaitLoading(false);
    }
    
    center.setActiveTab(tab);
    
    
}


//遍历加载所有菜单（一次返回所有的菜单，json串中分层级）
function viewLeftMenu(jsonObject, parentPanel){
    if (jsonObject != null) {
        if (jsonObject.data != null) {
            if (jsonObject.data.length > 0) {
                for (var i = 0; i < jsonObject.data.length; i++) {
                    var menuPanel = new Ext.Panel({
                        //border: false,
                        //width: 180,
                        //collapsible: true,
                        ctCls: "x-panel-body-bg",
                        collapsed: true,
                        autoHeight: true,
                        //id: jsonLeftMenuObject[i].id,
                        title: '<div style="font-size:12px; padding:1px 0px 0px 15px;"><img src="jspack/product/common/Images/icons/' + jsonObject.data[i].id + '.png" onerror=\'this.src="jspack/product/common/Images/icons/s342.png"\'>&nbsp;<b>' + jsonObject.data[i].text + '</b></div>'
                        //id:jsonObject[i].id
                        //autoScroll: true,
                        //iconCls: "hotelmanageicon"
                    });
                    if (jsonObject.data[i].leaf) {
                        menuPanel = new Ext.Panel({
                            border: false,
                            items: [{
                                xtype: 'ClickLabel',
                                id: jsonObject.data[i].id,
                                ctCls: "x-panel-body-noheader-left",
                                overCls: "x-panel-body-noheader-left-mouseover",
                                style: 'font-size:12px;padding:5px 0px 0px 25px;height:23px;cursor:pointer;overflow:hidden;width:100%;display:block;',
                                text: '• ' + jsonObject.data[i].text,
                                //html:'<a href="#" class="lefttexta" onclick="menuClick(\''+ jsonObject.data[i].id +'\', \'• '+ jsonObject.data[i].text +'\',\' '+ jsonObject.data[i].url +'\')">• ' + jsonObject.data[i].text + '</a>',
                                url: jsonObject.data[i].url,
                                listeners: {
                                    "click": function(){
                                        menuClick(this.getId(), this.text, this.url);
                                    }
                                }
                                //ctCls: "x-panel-body-noheader-left",
                                //html: '<div style="padding:5px 0px 5px 25px;height:18px;" ><a href="#" class="lefttexta" onclick="menuClick(\'' + jsonObject.data[i].id + '\',\'' + jsonObject.data[i].text + '\',\'' + jsonObject.data[i].url + '\');">• ' + jsonObject.data[i].text + '</a></div>' 
                            }]
                        });
                    }
                    viewLeftMenu(jsonObject.data[i], menuPanel);
                    parentPanel.add(menuPanel);
                }
            }
        }
    }
}

//加载左侧菜单（一次返回所有的菜单，json串中分层级）
function getLeftMenu(){
    var jsonLeftMenuObject = eval(doSynRequest(treeData + "?flag=selectall"));
    viewLeftMenu(jsonLeftMenuObject, west);
}

getLeftMenu();
//============================================================================ center

//============================================================================定义欢迎panel
var SetWinHeight = function(obj){
    var win = obj;
    if (document.getElementById) {
        if (win && !window.opera) {
            if (win.contentDocument && win.contentDocument.body.offsetHeight) {
                win.height = win.contentDocument.body.offsetHeight;
                win.width = win.contentDocument.body.offsetWidth;
            }
            else 
                if (win.Document && win.Document.body.scrollHeight) {
                    win.height = win.Document.body.scrollHeight;
                    win.width = win.Document.body.scrollWidth;
                }
        }
    }
}



var loadflag = false;
/******************************************************
 *功能：动态加载欢迎首页信息
 *******************************************************/
function loadWelcome(){


    //==============================================================用户信息
    loadCurrentUserinfo();
    if (Js.Center.Common.userData != null) {
        var userData = Js.Center.Common.userData;
       // var checkbycurrentuserData = Js.Center.Common.selectcheckbycurrentuserData;
        //mmsname: '',
        //              creatorid: ''
       /* var checkCountSMSFirst = eval(doSynRequest(Js.Center.SendSMS.SmsContentURL + "?flag=selectbykey&start=0&limit=12&state=0&numsendtype=1,2,3,4,5,9"));
        var checkCountSMSSecend = eval(doSynRequest(Js.Center.SendSMS.SmsContentURL + "?flag=selectbykey&start=0&limit=12&state=1&numsendtype=1,2,3,4,5,9"));
        
        
        var checkCountMMSFirst = eval(doSynRequest("URL/sendMMS/check/MMScheckquery.ashx?flag=selectfirstbykey&datstart=" + Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7), 'Y-m-d') + "&datend=" + Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d') + "&mmsname=&creatorid="));
        var checkCountMMSSecend = eval(doSynRequest("URL/sendMMS/check/MMScheckquery.ashx?flag=selectsecendbykey&datstart=" + Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7), 'Y-m-d') + "&datend=" + Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d') + "&mmsname=&creatorid="));
        */
        var javaStr = '';
        var userType = "";
        javaStr = javaStr + '<div class="bg"></div>';
        javaStr = javaStr + '<div class="content">';
        if (userData.data.length > 0) {
            if (userData.data[0].numtype == -1) {
                userType = "系统管理员";
            }
            if (userData.data[0].numtype == 1) {
                userType = "管理员";
            }
            if (userData.data[0].numtype == 2) {
                userType = "普通用户";
            }
            javaStr = javaStr + '<dl>';
            javaStr = javaStr + '	<dt><span>账户信息</span></dt>';
            javaStr = javaStr + '    <dd><span>账户名：</span><label id="userAccountId"></label>' + userData.data[0].vc2uaccount + '</dd>';
            javaStr = javaStr + '    <dd><span>用户名：</span>' + userData.data[0].vc2username + '</dd>';
            javaStr = javaStr + '    <dd><span>部门：</span>' + userData.data[0].vc2departname + '</dd>';
            javaStr = javaStr + '    <dd><span>账户类型：</span>' + userType + '</dd>';
            javaStr = javaStr + '    <dd><a href="#" onClick="menuClick(\'s49\',\' 个人信息管理\',\'js.loadjs.loadsystemupdatepwd\')">个人信息修改</a></dd>';
            javaStr = javaStr + '</dl>';
        }
        /*
        javaStr = javaStr + '<dl>';
        javaStr = javaStr + '	<dt><span>代办事项</span></dt>';
        
        javaStr = javaStr + '    <dd><span>短信审核：</span>';
        
        if (checkbycurrentuserData.data[0].smsfirstcheck == 1) {
            javaStr = javaStr + '最新短信一审<a class="ch" href="#" onClick="menuClick(\'s26\',\'• 短信一审\',\'js.loadjs.loadsendSMSfirstcheck\')">' + checkCountSMSFirst.totalCount + '条</a>';
        }
        else {
            javaStr = javaStr + '没有短信一审权限';
            
        }
        javaStr = javaStr + '</dd>';
        if (checkbycurrentuserData.data[0].smssecondcheck == 1) {
            javaStr = javaStr + '    <dd>最新短信二审<a class="ch" href="#" onClick="menuClick(\'s27\',\'• 短信二审\',\'js.loadjs.loadsendSMSsecondcheck\')">' + checkCountSMSSecend.totalCount + '条</a></dd>';
        }
        else {
            javaStr = javaStr + '    <dd>没有短信二审权限</dd>';
            
        }
        
        javaStr = javaStr + '<div style="height:0;font-size:0;clear:both;over-flow:hidden;"></div>';
        javaStr = javaStr + '    <dd><span>彩信审核：</span>';
        
        if (checkbycurrentuserData.data[0].mmsfirstcheck == 1) {
            javaStr = javaStr + '最新彩信一审<a class="ch" href="#" onClick="menuClick(\'s12\',\'• 彩信发送一审\',\'js.loadjs.loadsendMMSfirstcheck\')">' + checkCountMMSFirst.totalCount + '条</a>';
        }
        else {
            javaStr = javaStr + '没有彩信一审权限';
            
        }
        javaStr = javaStr + '</dd>';
        
        if (checkbycurrentuserData.data[0].mmssecondcheck == 1) {
            javaStr = javaStr + '    <dd>最新彩信二审<a class="ch" href="#" onClick="menuClick(\'s13\',\'• 彩信发送二审\',\'js.loadjs.loadsendMMSsecondcheck\')">' + checkCountMMSSecend.totalCount + '条</a></dd>';
        }
        else {
            javaStr = javaStr + '    <dd>没有彩信二审权限</dd>';
            
        }
       
        
        
        
        javaStr = javaStr + '</dl>'; */
        //  javaStr = javaStr + '<dl>';
        //    javaStr = javaStr + '	<dt><span>最新统计</span></dt>';
        //    javaStr = javaStr + '    <dd class="matter"><span>发送量：</span>2010年4月8日短息发送量10条<a class="ch" href="javascript://">查看</a></dd>';
        //    javaStr = javaStr + '    <dd class="matter"><span>订购关系：</span>最近订购关系<a class="ch" href="javascript://">查看</a></dd>';
        //    javaStr = javaStr + '</dl>';
        //	javaStr = javaStr + '<dl>';
        //    javaStr = javaStr + '	<dt><span>消息提醒</span></dt>';
        //    javaStr = javaStr + '    <dd class="matter">您有4条新的短信新短信功能审核，请及时查看处理。</dd>';
        //    javaStr = javaStr + '    <dd class="matter">您的最新短信功能修改已通过审核</dd>';
        //    javaStr = javaStr + '    <dd class="matter">MAS运营日报</dd>';
        //    javaStr = javaStr + '    <dd class="matter">您的最新短信功能修改已通过审核</dd>';
        //    javaStr = javaStr + '</dl>';
        javaStr = javaStr + '</div>';
        
        return javaStr;
    }
    
};
//为解决IE8首次登录不能加载成功，在此稍作等待
setTimeout(function(){
}, 100);
var welcomepanel = new Ext.Panel({
    autoScroll: true,
    id: "index",
    iconCls: "indexicon",
    title: "平台首页",
    items: [{
        html: loadWelcome()
    }]
});
//var welcomeHtlm = loadWelcome();

Js.Center.Common.timeInterval = null;
var center = new Ext.TabPanel({

    // 距两边间距
    
    style: "padding:0 0px 0 5px",
    region: "center",
    // 默认选中第一个
    
    activeItem: 0,
    // 如果Tab过多会出现滚动条
    enableTabScroll: true,
    // 加载时渲染所有
    
    // deferredRender : false,
    layoutOnTabChange: true,
    listeners: {
        tabchange: function(TabPanel, Panel, EventObject){
            if (Panel.name != null && Panel.name != "" && loadflag) {
                if (Panel.id == 'ProductMonitorNode') {
                    LoadMoniytttttorInfo(Panel.id, Js.Center.System.ProductMonitor.ProductMonitorFormPanel);
                }
                else {
                    if (Panel.name.indexOf("(") > 0) {
                        eval(Panel.name);
                    }
                    else {
                        eval(Panel.name + '.reload()');
                    }
                }
                
            }
            if (Panel.title != " 网关监控") {
				if (Js.Center.Common.timeInterval != "undefined" && Js.Center.Common.timeInterval != null) {
					window.clearInterval(Js.Center.Common.timeInterval);
					Js.Center.Common.timeInterval = null;
				}
			}
			else 
				if (Js.Center.Common.timeInterval == null) 
					if (!Ext.isEmpty(Js.Center.Monitor)) 
						Js.Center.Common.timeInterval = setInterval("Js.Center.Monitor.GatewayMonitorManage.monitorRoloadWithoutAmount()", 3000);
            
            loadflag = true;
        }
    },
    items: [welcomepanel    //    ,{
    //        autoScroll: true,
    //        xtype: "panel",
    //        id: "index",
    //        iconCls: "indexicon",
    //        title: "平台首页",
    //        html: welcomeHtlm//loadWelcome()//'<iframe id="frameright" name="" frameBorder="0" scrolling="auto" src="welcome.htm" width="100%" height="100%"></iframe>'
    //    }
    ],
    plugins: new Ext.ux.TabCloseMenu()
});
function doExit(){
    Ext.Ajax.request({
        url: "URL/Exit.ashx?flag=exit",
        method: "POST",
        success: function(form, action){
            var obj = Ext.util.JSON.decode(form.responseText);
            var falg = obj.success;
            if (falg == true) {
                //Ext.Msg.alert("提示", "已经退出!");
                window.location.href = "login.htm";
            }
            else 
                Ext.Msg.alert('提 示', obj.info);
            
        },
        failure: function(form, action){
            Ext.Msg.alert('提 示', '系统忙，请稍候...');
        }
    });
}

//定时查询监控速度
function LoadMonitorInfo(nodeID, panel){
    if (center.getActiveTab().id == nodeID) {
/*        Ext.Ajax.request({
            url: Js.Center.System.ProductMonitorURL + "?flag=selectmonitorbyproduct",
            method: "POST",
            success: function(form, action){
                obj = Ext.util.JSON.decode(form.responseText);
                var falg = obj.success;
                if (falg == true) {
                    panel.items.items[0].items.items[0].setValue(obj.data[0].TimeDot);
                    panel.items.items[0].items.items[1].setValue(obj.data[0].DataString);
                    //Ext.Msg.alert('温馨提示', obj.data);
                }
                else 
                    Ext.Msg.alert('温馨提示', obj.info);
                
            },
            failure: function(form, action){
                Ext.Msg.alert('温馨提示', obj.info);
            }
        })*/
    	panel.reload();
        setTimeout(function(){
            LoadMonitorInfo(nodeID, panel);
        }, 5000);
    }
    else {
        return;
    }
    
}

function loadCurrentUserinfo(){
    Js.Center.Common.userData = doSynRequest(getUserURL + "?flag=selectcuruserall");
    //Js.Center.Common.selectcheckbycurrentuserData = doSynRequest(getUserURL + "?flag=selectcheckbycurrentuser");
    Js.Center.Common.getUserRecord = function(){
        if (Js.Center.Common.userData != null) {
            var reader = new Ext.data.JsonReader({
                totalProperty: 'totalProperty',
                root: 'data',
                fields: ["numuserid", "vc2username", "vc2uaccount", "vc2upassword", "vc2mobile", "vc2email", "numdepartid", "vc2departname", "vc2phone", "numroleid", "vc2rolename", "numdroleid", "vc2drolename", "numcreator", "datcreatetime", "vc2extendcode", "vc2ordercode", "numtype", "vc2signature", "vc2mobilelist"]
            });
            if (Js.Center.Common.userData.info == null) {
                if (Js.Center.Common.userData.totalCount == 0) {
                    window.location.href = "login.htm";
                }
                else {
                    var responses = reader.readRecords(Js.Center.Common.userData);
                    var userRecord = responses.records["0"];
                    return userRecord;
                }
            }
            else {
                window.location.href = "login.htm";
            }
        }
    }
    if (Js.Center.Common.getUserRecord() != null) {
        Js.Center.Common.userName = Js.Center.Common.getUserRecord().data.vc2username;
        Js.Center.Common.userMobile = Js.Center.Common.getUserRecord().data.vc2mobile;
        Js.Center.Common.userSignature = Js.Center.Common.getUserRecord().data.vc2signature;
        Js.Center.Common.userDepartId = Js.Center.Common.getUserRecord().data.numdepartid;
        Js.Center.Common.userDepartName = Js.Center.Common.getUserRecord().data.vc2departname;
        if (Js.Center.Common.getUserRecord().data.vc2mobilelist != "") {
            Js.Center.Common.userMobile = Js.Center.Common.getUserRecord().data.vc2mobile + ';' + Js.Center.Common.getUserRecord().data.vc2mobilelist;
        }
    }
    else {
        Js.Center.Common.userName = null;
        Js.Center.Common.userMobile = null;
        Js.Center.Common.userSignature = null;
        Js.Center.Common.userDepartId = null;
        Js.Center.Common.userDepartName = null;
    }
}

function ChangeTheme(){
    WXTL.Common.Theme.winStyle.show();//更改主题
}

/******************************************************
 *功能：动态填充弹出消息系统内容
 *******************************************************/
function MessagePop(){
    var jsonMessageObject = eval(doSynRequest(Js.Center.Message.MessageQueryURL + "?flag=getmessagebywhere&status=0&start=0&ruserid=1"));
    var javastr = '';
    if (jsonMessageObject.data.length > 0) {
        //javastr = '';
        javastr = javastr + '  <div class="title">';
        javastr = javastr + '  		<span class="close" onclick="popMsgWin()">X</span></div>';
        javastr = javastr + '			<div class="con">';
        javastr = javastr + '				<h1>';
        javastr = javastr + '					您有' + jsonMessageObject.data.length + '条消息，请及时查看！</h1>';
        javastr = javastr + '<ul>';
        for (var i = 0; i < jsonMessageObject.data.length; i++) {
            javastr = javastr + '<li><a href="#" onclick="menuClick(\'s252\',\'消息系统管理\',\'js.loadjs.loadmessage\')">' + jsonMessageObject.data[i].vc2title + '</a></li>';
        }
        //javastr = javastr + '<li><a href="#">2.您的最新短信功能修改已通过审核</a></li>';
        //javastr = javastr + '<li><a href="#">3.MAS运营日报</a></li>';
        //javastr = javastr + '<li><a href="#">4.您的最新短信功能修改已通过审核</a></li>';
        javastr = javastr + '</ul>';
        javastr = javastr + '</div>';
        //popmsg(javastr);
    }
    //popTop = 50;
    return javastr;
    
    //setTimeout("CheckReminder()", 5 * 60 * 1000);//5分钟提醒一次
}

/******************************************************
 *功能：定时弹出消息系统内容
 *******************************************************/
function popMsgWin(){
    var msgContent = MessagePop();
    if (msgContent != '') {
        var MsgPop = document.getElementById("winpop");//获取窗口这个对象,即ID为winpop的对象
        MsgPop.innerHTML = '';
        MsgPop.innerHTML = msgContent;
        var popH = parseInt(MsgPop.style.height);//用parseInt将对象的高度转化为数字,以方便下面比较
        if (popH == 0) { //如果窗口的高度是0
            MsgPop.style.display = "block";//那么将隐藏的窗口显示出来
            show = setInterval("changeH('up')", 2);//开始以每0.002秒调用函数changeH("up"),即每0.002秒向上移动一次
        }
        else { //否则
            hide = setInterval("changeH('down')", 2);//开始以每0.002秒调用函数changeH("down"),即每0.002秒向下移动一次
        }
    }
    setTimeout("popMsgWin()", 300000); //3秒后调用popMsgWin()这个函数
}

function changeH(str){
    var MsgPop = document.getElementById("winpop");
    var popH = parseInt(MsgPop.style.height);
    if (str == "up") { //如果这个参数是UP
        if (popH <= 176) { //如果转化为数值的高度小于等于100
            MsgPop.style.height = (popH + 4).toString() + "px";//高度增加4个象素
        }
        else {
            clearInterval(show);//否则就取消这个函数调用,意思就是如果高度超过100象度了,就不再增长了
        }
    }
    if (str == "down") {
        if (popH >= 4) { //如果这个参数是down
            MsgPop.style.height = (popH - 4).toString() + "px";//那么窗口的高度减少4个象素
        }
        else { //否则
            clearInterval(hide); //否则就取消这个函数调用,意思就是如果高度小于4个象度的时候,就不再减了
            MsgPop.style.display = "none"; //因为窗口有边框,所以还是可以看见1~2象素没缩进去,这时候就把DIV隐藏掉
        }
    }
}


window.onload = function(){ //加载
    //var msgContent = MessagePop();
    //document.getElementById('winpop').style.height = '0px';//我不知道为什么要初始化这个高度,CSS里不是已经初始化了吗,知道的告诉我一下
    //popMsgWin();
    //setTimeout("popMsgWin()", 800); //3秒后调用popMsgWin()这个函数
}

Ext.onReady(function(){

    //加载效果
    //setTimeout(function(){
    //    Ext.get('loading').remove();
    //    Ext.get('loading-mask').fadeOut({
    //        remove: true
    //    });
    //}, 200);
    Ext.BLANK_IMAGE_URL = 'extjs2.2/resources/images/default/s.gif';
    //Ext.util.CSS.swapStyleSheet("style", 'extjs2.2/resources/css/xtheme-slate.css');  
    //Ext.util.CSS.getRule('.x-panel-body', true).style.background = 'url(head)';
    new Ext.Viewport({
        title: '整体布局',
        loadMask: {
            msg: '正在加载数据...'
        },
        layout: 'border', // 表格布局        
        items: [{
            border: false,
            region: 'north', // 指定子面板所在区域为north
            height: 55,
            items: [{
                xtype: 'toolbar',
                border: false,
                cls: "x-toolbar-top",
                items: [new Ext.Toolbar.TextItem({
                    text: '<img id="imgLogo" src="jspack/product/common/Images/icon-slate-theme.gif" />'
                }), '->',//new WXTL.Widgets.CommonForm.ThemeCycleButton,
 new Ext.Toolbar.TextItem({
                    text: '<img id="imgLogo" src="jspack/product/common/Images/right_btn.png" /><font class="x-btn-text-toplefticon">' + Js.Center.Common.userName + '欢迎使用!</font>'
                }), '->', new Ext.Toolbar.Button({
                    icon: "jspack/product/common/Images/exit_btn.png",
                    iconCls: "x-btn-text-toprighticon",
                    height: 20,
                    text: '退出系统',
                    handler: doExit
                })]
            }]
        }, west, center, {
            //title : 'south Panel',
            bodyStyle: "background-image: url(jspack/product/common/Images/bg_pgd n.gif);",
            border: false,
            region: 'south', // 指定子面板所在区域为south
            height: 25,
            items: [{
                xtype: 'toolbar',
                height: '25',
                border: false,
                items: ['->', new Ext.Toolbar.TextItem({
                    text: '<font class="x-btn-text-bottomrighticon">版权所有©北京无线天利移动信息技术有限公司</font>'
                })]
            }]
        }]
    });
    Ext.get('loading').remove();
    Ext.get('loading-mask').fadeOut({
        remove: true
    });
});
