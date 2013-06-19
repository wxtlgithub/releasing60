Ext.namespace('Js.Center.Common');


//==============================================================所有网元下拉列表数据定义
Js.Center.Common.NodeStore =new Ext.data.Store({
 proxy: new Ext.data.HttpProxy({
        url: Js.Center.Common.NodeStoreURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numnodeid','vc2nodename'],
        root: 'data',
        id: 'numnodeid'
    }),
    baseParams: {
        flag: 'querynode',
        columnlist: 'numnodeid,vc2nodename'
    }
});

//==============================================================EC下拉数据定义
Js.Center.Common.EcListStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Common.ECListURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numecid','vc2ecname','vc2fullname'],
        root: 'data',
        id: 'numecid'
    }),
    baseParams: {
        flag: 'queryec',
        columnlist: 'numecid,vc2ecname'
    }
});
//==============================================================业务管理网关下拉列表数据定义
Js.Center.Common.BusinessGatewayStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.BusinessGatewayURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numgwid','vc2gatewayname'],
        root: 'data',
        id: 'numgwid'
    }),
    baseParams: {
        flag: 'gatawayselectall',
        columnlist: 'numgwid,vc2gatewayname'
    }
});

//==============================================================分公司下拉列表数据定义
Js.Center.Common.BranchCompanyStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Common.BranchCompanyURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numbranchcompany','vc2branchcompany'],
        root: 'data',
        id: 'numbranchcompany'
    }),
    baseParams: {
        flag: 'querybranchcompany',
        columnlist: 'numbranchcompany,numbranchcompany'
    }
});
//==============================================================行业下拉列表数据定义
Js.Center.Common.IndustryStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Common.IndustryURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numindustry','vc2industry'],
        root: 'data',
        id: 'numindustry'
    }),
    baseParams: {
        flag: 'queryindustry',
        columnlist: 'numindustry,vc2industry'
    }
});
//==============================================================网关所在地下拉列表数据定义
Js.Center.Common.GatewayAreaStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Common.GatewayAreaURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numinstid','vc2name'],
        root: 'data',
        id: 'numinstid'
    }),
    baseParams: {
        flag: 'querygatewayarea',
        columnlist: 'numinstid,vc2name'
    }
});
//==============================================================签约主体下拉列表数据定义
Js.Center.Common.SignStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Common.SignURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numsign','vc2sign'],
        root: 'data',
        id: 'numsign'
    }),
    baseParams: {
        flag: 'querysign',
        columnlist: 'numsign,vc2sign'
    }
});
//==============================================================部门下拉列表数据定义(获取当前用户所属部门及下级部门信息)
Js.Center.Common.DepartmentStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Purview.DepartmentsURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numdepartid','vc2departname'],
        root: 'data',
        id: 'numdepartid'
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numdepartid,vc2departname'
    }
});
//==============================================================柜台编码下拉列表数据定义
Js.Center.Common.DepartmentCodeStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Purview.DepartmentsURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['vc2branchcode','vc2departname'],
        root: 'data',
        id: 'vc2branchcode'
    }),
    baseParams: {
        flag: 'selectallcode',
        columnlist: 'vc2branchcode,vc2departname'
    }
});
//==============================================================用户下拉列表数据定义
Js.Center.Common.UserStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Purview.UserURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numuserid','vc2username'],
        root: 'data',
        id: 'numuserid'
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numuserid,vc2username'
    }
});

//=============================================================用户下拉列表数据定义（根据部门ID）

Js.Center.Common.UserStoreByDepariId = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Purview.UserURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numuserid','vc2username'],
        root: 'data',
        id: 'numuserid'
    }),
    baseParams: {
        flag: 'selectallbydepartid',
		departid:'',
        columnlist: 'numuserid,vc2username'
    }
});

//=================================================获取当前用户所在部门下所有用户信息（用于下拉列表显示）

// ***由后台获取当前用户所在部门ID
Js.Center.Common.DepartUserStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Purview.UserURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numuserid','vc2username'],
        root: 'data',
        id: 'numuserid'
    }),
    baseParams: {
        flag: 'selectdepartuser',
        columnlist: 'numuserid,vc2username'
    }
});

//=============================================================栏目下拉列表数据定义
Js.Center.Common.ColumnStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.ColumnURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numcolumnid','vc2columnname'],
        root: 'data',
        id: 'numcolumnid'
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numcolumnid,vc2columnname'
    }
});

//=============================================================根据当前用户获取已授权的栏目下拉列表数据定义
Js.Center.Common.ColumnStoreByUser = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.ColumnURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numcolumnid','vc2columnname'],
        root: 'data',
        id: 'numcolumnid'
    }),
    baseParams: {
        flag: 'selectallbyuserid',
        columnlist: 'numcolumnid,vc2columnname'
    }
});

//=============================================================客户组下拉列表数据定义

Js.Center.Common.UserGroupStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.UserGroupURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numusergroupid','vc2usergroupname'],
        root: 'data',
        id: 'numusergroupid'
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numusergroupid,vc2usergroupname'
    }
});

//=============================================================根据当前用户获取已授权的客户组下拉列表数据定义

Js.Center.Common.UserGroupStoreByUser = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.UserGroupURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numusergroupid','vc2usergroupname'],
        root: 'data',
        id: 'numusergroupid'
    }),
    baseParams: {
        flag: 'selectallbyuserid',
        columnlist: 'numusergroupid,vc2usergroupname'
    }
});
//==============================================================产品下拉列表数据定义
Js.Center.Common.ProductStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.ProductURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numprodid','vc2name'],
        root: 'data',
        id: 'numprodid'
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numprodid,vc2name'
    }
});
//==============================================================产品下拉列表数据定义（根据部门编号，部门编号为空时为当前用户所属部门）
Js.Center.Common.ProductStoreByDepartment = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.ProductURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numprodid', 'vc2name'],
        root: 'data',
        id: 'numprodid'
    }),
    baseParams: {
        flag: 'selectbycurdepart',
        columnlist: 'numprodid,vc2name',
        departid:''
    }
});
//==============================================================产品下拉列表数据定义（根据当前用户获取）
Js.Center.Common.ProductStoreByUser = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.ProductURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numprodid', 'vc2name'],
        root: 'data',
        id: 'numprodid'
    }),
    baseParams: {
        flag: 'selectallpermit',
        columnlist: 'numprodid,vc2name'
    }
});
//==============================================================通道下拉列表数据定义

Js.Center.Common.ServiceCodeStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.RoutestraURL,//Js.Center.Business.ServiceCodeURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: [ 'numsvcid','vc2svcname','numinstid','numopid'],
        root: 'data',
        id: 'numsvcid'
    }),
    baseParams: {
        flag: 'addrotestarbalancestore',//'selectall',
        columnlist: 'numsvcid,vc2svcname,numinstid,numopid'
    }
});
//==============================================================通道下拉(根据运营商ID)列表数据定义

Js.Center.Common.ServiceCodeByOPIDStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Common.ServiceCodeQueryOpidURL,//Js.Center.Business.ServiceCodeURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: [ 'numsvcid','vc2svcname'],
        root: 'data',
        id: 'numsvcid'
    }),
    baseParams: {
        flag: 'queryservicecodebyopid'
    }
});
//==============================================================为产品已指定的通道下拉列表数据定义
Js.Center.Common.ProducyPermitSvcStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.ServiceCodeURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: [ 'numsvcid','vc2svcname'],
        root: 'data',
        id: 'numsvcid'
    }),
    baseParams: {
        flag: 'selectpermitbypid',
        productid:'',
        columnlist: 'numsvcid,vc2svcname'
    }
});

//==============================================================为产品未指定的通道下拉列表数据定义
Js.Center.Common.ProducyNoPermitSvcStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.ServiceCodeURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: [ 'numsvcid','vc2svcname'],
        root: 'data',
        id: 'numsvcid'
    }),
    baseParams: {
        flag: 'selectnopermitbypid',
        productid:'',
        columnlist: 'numsvcid,vc2svcname'
    }
});
//==============================================================运营商下拉列表数据定义

Js.Center.Common.OperatorStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.OperatorURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numopid','vc2name'],
        root: 'data',
        id: 'numopid'
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numopid,vc2name'
    }
});

Js.Center.Common.StatOperatorStore = new Ext.data.SimpleStore({
    fields: ["vc2name", "numopid"],
    data: [["-=请选择=-", ""], ["中国移动", "1"], ["中国联通", "2"], ["中国电信", "3"]]
});

//==============================================================机构下拉列表数据定义
Js.Center.Common.InstStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.InstURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numinstid','vc2name'],
        root: 'data',
        id: 'numinstid'
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numinstid,vc2name'
    }
});

//==============================================================网关下拉列表数据定义
Js.Center.Common.GatewayStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.GatewayURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numgwid','vc2gatewayname'],
        root: 'data',
        id: 'numgwid'
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numgwid,vc2gatewayname'
    }
});

//==============================================================权限下拉列表数据定义
Js.Center.Common.RightTypeStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Purview.RightURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numrightid','vc2rightname'],
        root: 'data',
        id: 'numrightid'
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numrightid,vc2rightname'
    }
});

//======================================用户菜单角色下拉框

Js.Center.Common.UserFuncRoleStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Purview.UserFuncRoleURL,
        method: "POST"
    
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numroleid','vc2rolename'],
        root: "data",
        id: "numroleid"
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numroleid,vc2rolename'
    }
});


//=========================================用户数据角色下拉框

Js.Center.Common.UserdataRoleStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Purview.UserDataRoleURL,
		method: "POST"
    }),
    reader: new Ext.data.JsonReader({
		fields: ['numdroleid','vc2drolename'],
        root: "data",
        id: "numdroleid"
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numdroleid,vc2drolename'
    }
});
//======================================部门菜单角色下拉框

Js.Center.Common.DepartFuncRoleStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Purview.DepartmentFunRoleURL,
        method: "POST"
    
    }),
    reader: new Ext.data.JsonReader({
        fields: [ 'numroleid','vc2rolename'],
        root: "data",
        id: "numroleid"
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numroleid,vc2rolename'
    }
});


//=========================================部门数据角色下拉框

Js.Center.Common.DepartDataRoleStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Purview.DepartmentDataRoleURL,
		method: "POST"
    }),
    reader: new Ext.data.JsonReader({
		fields: ['numdroleid','vc2drolename'],
        root: "data",
        id: "numdroleid"
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numdroleid,vc2drolename'
    }
});

//=========================================短信类型下拉框

Js.Center.Common.SmsClassStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.SendSMS.SmsContentURL,
		method: "POST"
    }),
    reader: new Ext.data.JsonReader({
		fields: ['numclassid','vc2classname'],
        root: "data",
        id: "numclassid"
    }),
    baseParams: {
        flag: 'selectsmsclass',
        columnlist: 'numclassid,vc2classname'
    }
});

//=========================================短信类型下拉框

Js.Center.Common.ProgramStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: "URL/business/program/clientprogram.ashx",
		method: "POST"
    }),
    reader: new Ext.data.JsonReader({
		fields: ['numclientid','vc2clientname'],
        root: "data",
        id: "numclientid"
    }),
    baseParams: {
        flag: 'selectbycolumn',
        columnlist: 'numclientid,vc2clientname'
    }
});

/***********************************
*根据部门ID获取未分配角色信息和已分配角色信息
*[如果角色信息为空，则表明没有授权则获取当前用户所在部门具有的角色] 
************************************/
Js.Center.Common.RoleByDepartIdStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Popedom.UserFuncRoleURL,
		method: "POST"
    }),
    reader: new Ext.data.JsonReader({
		fields: ['numroleid','vc2rolename'],
        root: "data",
        id: "numroleid"
    }),
    baseParams: {
        flag: 'selectallbydepartidwithcurrentuser',
        columnlist: 'numroleid,vc2rolename',
        typeid:1
    }
});
//=========================================消息类型下拉框
        Js.Center.Common.MessageTypeStore = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Message.MessageQueryURL ,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ['nummessagetypeid', 'vc2messagetypename'],
                root: "data",
                id: "nummessagetypeid"
            }),
            baseParams: {
                flag: 'getallmessagetype',
                columnlist: 'nummessagetypeid,vc2messagetypename'
                
            }
        });

//=========================================彩信基金账单账单文件列表
Js.Center.Common.BillFilesStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.MMSFundBills.MMSFundBillUpdateURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['billvalue','billname'],
        root: "data",
        id: "billvalue"
    }),
    baseParams: {
        flag: 'queryBillFiles',
        columnlist: 'billvalue,billname'
        
    }
});


//=========================================链接协议下拉列表
Js.Center.Common.LinkProtocolStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.ProgramQueryURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numlinkprotocolid','vc2linkprotocolname'],
        root: "data",
        id: "numlinkprotocolid"
    }),
    baseParams: {
        flag: 'selectbylinkprotocol',
        columnlist: 'numlinkprotocolid,vc2linkprotocolname'
        
    }
});
//=========================================网关协议协议下拉列表
Js.Center.Common.GatewayTypeStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.GatewayURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numgwtypeid','vc2gwtypename'],
        root: "data",
        id: "numgwtypeid"
    }),
    baseParams: {
        flag: 'queryallgatewaytype',
        columnlist: 'numgwtypeid,vc2gwtypename'
        
    }
});

Js.Center.Common.UserGroupSelectStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.ProductSelURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numprodid','vc2name'],
        root: 'data',
        id: 'numprodid'
    }),
    baseParams: {
        flag: 'selectall',
        columnlist: 'numprodid,vc2name'
    }
});

//==============================================================EC签名类型下拉数据定义
Js.Center.Common.EcSignTypeStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: Js.Center.Business.ECmanage.ECSigntureURL,
        method: "POST"
    }),
    reader: new Ext.data.JsonReader({
        fields: ['numtypeid','vc2typename'],
        root: 'data',
        id: 'numtypeid'
    }),
    baseParams: {
        flag: 'selectallecsigntype',
        columnlist: 'numtypeid,vc2typename'
    }
});