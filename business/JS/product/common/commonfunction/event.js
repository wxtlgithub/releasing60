/////<reference path = "vswd-ext_2.2.js" / >
//关闭TabPanel标签
Ext.namespace("Ext.ux");
Ext.ux.TabCloseMenu = function(){
    var tabs, menu, ctxItem;
    this.init = function(tp){
        tabs = tp;
        tabs.on('contextmenu', onContextMenu);
    }
    function onContextMenu(ts, item, me){
        if (!menu) { // create context menu on first right click
            menu = new Ext.menu.Menu([{
                id: tabs.id + '-close',
                text: '关闭当前标签',
                iconCls: "closetabone",
                handler: function(){
                    tabs.remove(ctxItem);
                }
            }, {
                id: tabs.id + '-close-others',
                text: '除此之外全部关闭',
                iconCls: "closetaball",
                handler: function(){
                    tabs.items.each(function(item){
                        if (item.closable && item != ctxItem) {
                            tabs.remove(item);
                        }
                    });
                }
            }]);
        }
        ctxItem = item;
        var items = menu.items;
        items.get(tabs.id + '-close').setDisabled(!item.closable);
        var disableOthers = true;
        tabs.items.each(function(){
            if (this != item && this.closable) {
                disableOthers = false;
                return false;
            }
        });
        items.get(tabs.id + '-close-others').setDisabled(disableOthers);
        menu.showAt(me.getXY());
    }
};
//内容为Grid
GridMain = function(node, grid, icon, storename,gridFunc){
	//WXTL.Common.showWaitLoading(true);
    var tab = center.getItem("tab"+node.id);
    if(tab){
        if(gridFunc != null){
            tab.name=gridFunc;
        }
        else {
            tab.name=storename;
        }
        tab.add(grid);
	    tab.doLayout();
		
    }
	
	
//    if (!tab) {
//        //OpenNum++;
//    	loadflag = false;
//        var tab = center.add({
//            id: node.id,
//            name: storename,
//            iconCls: icon,
//            xtype: "panel",
//            title: node.text,
//            closable: true,
//            layout: "fit"//,
////            listeners: {
////                click: function(){
////                    if (storename != null && storename != "") {
////                        eval(storename + '.reload()');
////                    }
////                }
////            },
//            //items: [grid]
//        }).show();
//    }
    //center.setActiveTab(tab);
	//WXTL.Common.showWaitLoading(true);
    
	WXTL.Common.showWaitLoading(false);
	//document.body.style.cursor="default";

    //    if (!tab) {
    //        if (center.items.getCount() > 7) {
    //            Ext.MessageBox.confirm("温馨提示", "您将打开第8个窗口，这将占有您的更多的内存，是否继续？", function(yes){
    //                if (yes == "yes") {
    //                    var tab = center.add({
    //                        id: node.id,
    //                        iconCls: icon,
    //                        xtype: "panel",
    //                        title: node.text,
    //                        closable: true,
    //                        layout: "fit",
    //                        items: [grid]
    //                    
    //                    });
    //                    center.setActiveTab(tab);
    //                }
    //            });
    //        }
    //        else 
    //            gridMainCallBack(node, grid, icon);
    //    }
    //    else 
    //       gridMainCallBack(node, grid, icon);

};
gridMainCallBack = function(node, grid, icon){

    var tab = center.getItem(node.id);
    if (!tab) {
        OpenNum++;
        var tab = center.add({
            id: node.id,
            name: node.attributes['url'],
            iconCls: icon,
            xtype: "panel",
            title: node.text,
            closable: true,
            layout: "fit",
            items: [grid]
        });
        
    }
    center.setActiveTab(tab);
};

