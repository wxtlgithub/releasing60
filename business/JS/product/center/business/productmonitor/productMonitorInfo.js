Ext.namespace('Js.Center.System.ProductMonitor');

Js.Center.System.ProductMonitor.info = function(node){
	node.id="ProductMonitorNode";
	//alert(node.id);
    
    //=========================================================================定义FormPanel
    Js.Center.System.ProductMonitor.ProductMonitorFormPanel = new Ext.form.FormPanel({
        title: '通道监控',
        layout: 'fit',
        frame: true,
        labelWidth: 95,
        height: 200,
        items: [{
            layout: 'form',
            items: [{
                xtype: "textfield",
                name: "TimeDot",
                fieldLabel: "采集时间点",
                //value:Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -3/*减3天*/), 'Y-m-d h-m-s'),
                readOnly: true
            }, {
                xtype: "textfield",
                name: "DataString",
                fieldLabel: "采集速度",
                readOnly: true
            }]
        }]
    });
    var mainPanel = new Ext.Panel({
        frame: true, // 渲染面板
        bodyBorder: false,
        border: false,
        autoScroll: true, // 自动显示滚动条
        layout: "anchor",
        defaults: {
            collapsible: true // 允许展开和收缩
        },
        items: [Js.Center.System.ProductMonitor.ProductMonitorFormPanel]
    });
    
    //============================================================================绑定到center
    GridMain(node, mainPanel, "openroomiconinfo","111");
LoadMonitorInfo(node.id,Js.Center.System.ProductMonitor.ProductMonitorFormPanel);


    
};
