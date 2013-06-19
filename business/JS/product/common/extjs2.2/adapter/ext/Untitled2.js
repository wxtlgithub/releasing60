// 创建根节点
var root = new Ext.tree.TreeNode(
{
   text : '菜单根节点',
   href : '12-12-right0.html', // 设置节点对应的连接
   hrefTarget : 'main', // 设置展示连接页面的目标框架
   expanded : true// 默认展开根节点
}
);
// 为根节点添加子节点
root.appendChild(new Ext.tree.TreeNode(
{
   href : '12-12-right1.html',
   hrefTarget : 'main',
   text : '一级菜单A'
}
))
root.appendChild(new Ext.tree.TreeNode(
{
   href : '12-12-right2.html',
   hrefTarget : 'main',
   text : '一级菜单B'
}
))
// 创建Tree面板组件
var tree = new Ext.tree.TreePanel(
{
   title : '树形菜单',
   applyTo : document.body,
   root : root
}
)
// 添加左边
var west = new Ext.Panel(
{
   // 自动收缩按钮
   collapsible : true,
   border : false,
   width : 225,
   layout : "accordion",
   extraCls : "roomtypegridbbar",
   // 添加动画效果
   layoutConfig :
   {
      animate : true
   }
   ,
   region : "west",
   title : 'MARRIOTT MANAGEMENT SYSTEM',
   //
   items : [
   {
      title : "<b>Management Menu</b>",
      autoScroll : true,
      iconCls : "hotelmanageicon",
      items : [tree]
   }
   ]

}
);
// 关闭TabPanel标签
Ext.ux.TabCloseMenu = function()
{
   var tabs, menu, ctxItem;
   this.init = function(tp)
   {
      tabs = tp;
      tabs.on('contextmenu', onContextMenu);
   }
   function onContextMenu(ts, item, me)
   {
      if ( ! menu)
      {
         // create context menu on first right click
         menu = new Ext.menu.Menu([
         {
            id : tabs.id + '-close',
            text : '关闭当前标签',
            iconCls : "closetabone",
            handler : function()
            {
               tabs.remove(ctxItem);
            }
         }
         ,
         {
            id : tabs.id + '-close-others',
            text : '除此之外全部关闭',
            iconCls : "closetaball",
            handler : function()
            {
               tabs.items.each(function(item)
               {
                  if(item.closable && item != ctxItem)
                  {
                     tabs.remove(item);
                  }
               }
               );
            }
         }
         ]);
      }
      ctxItem = item;
      var items = menu.items;
      items.get(tabs.id + '-close').setDisabled( ! item.closable);
      var disableOthers = true;
      tabs.items.each(function()
      {
         if (this != item && this.closable)
         {
            disableOthers = false;
            return false;
         }
      }
      );
      items.get(tabs.id + '-close-others').setDisabled(disableOthers);
      menu.showAt(me.getXY());
   }
}
;
var center = new Ext.TabPanel(
{

   // 距两边间距
   style : "padding:0 5px 0 5px",
   region : "center",
   // 默认选中第一个
   activeItem : 0,
   // 如果Tab过多会出现滚动条
   enableTabScroll : true,
   // 加载时渲染所有
   // deferredRender : false,
   layoutOnTabChange : true,
   items : [
   {
      xtype : "panel",
      id : "index",
      iconCls : "indexicon",
      title : "Home Page",
      html : "<iframe src='HomePage.ashx'scrolling='no' frameborder=0 width=100% height=100%></iframe>"
   }
   ], plugins : new Ext.ux.TabCloseMenu()
}
);
Ext.onReady(function()
{
   Ext.BLANK_IMAGE_URL = '../../extjs2.0/resources/images/default/s.gif';
   new Ext.Viewport(
   {
      title : 'Ext.Viewport示例',
      layout : 'border', // 表格布局
      items : [
      {
         title : 'north Panel',
         html : '上边',
         region : 'north', // 指定子面板所在区域为north
         height : 100
      }
      , west,
      {
         title : 'Main Content',
         html : '中间',
         region : 'center'// 指定子面板所在区域为center
      }
      ]
   }
   );
}
);
