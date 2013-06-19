<?xml version="1.0" encoding="GBK"?>
<submitRouters>
<#if sidRouters?size!=0>
    <#list sidRouters as sidRouter>
        <sidRouter serviceId="${sidRouter.SVCID!}">
            <baseStrategy>
                <gatewayId>${sidRouter.GATEWAYID!}</gatewayId>
                <gatewayType>${sidRouter.GATEWAYTYPE!}</gatewayType>
                <moduleId>${sidRouter.MODULEID!}</moduleId>
                <svcId>${sidRouter.SVCID!}</svcId>
                <serviceCode>${sidRouter.SERVICECODE!}</serviceCode>
                <feeValue>${sidRouter.FEEVALUE!}</feeValue>
                <feeType>${sidRouter.FEETYPE!}</feeType>
                <longCode>${sidRouter.LONGCODE!}</longCode>
            </baseStrategy>
        </sidRouter>
    </#list>
</#if>
<#if routeBases?size != 0>
    <#list routeBases as base>
        <!-- 基本策略 -->
        <submitRouter productId="${base["PRODUCTID"]}" operatorId="${base["OPERATORID"]}"
                      provinceId="${base["PROVICEID"]}" strategyType="${base["STRATEGYTYPE"]}" subcodeFlag="${base["VC2SUBCODEFLAG"]}" filterLevel="${base["NUMDIRTYTYPE"]}">
            <baseStrategy>
                <!-- 网关ID。 -->
                <gatewayId>${base["GATEWAYID"]}</gatewayId>
                <!-- 网关类型。 -->
                <gatewayType>${base["GATEWAYTYPE"]}</gatewayType>
                <!-- 模块ID。 -->
                <moduleId>${base["MODELID"]}</moduleId>
                <!-- 通道ID。 -->
                <svcId>${base["SERVICECODEID"]}</svcId>
                <!-- 通道代码。 -->
                <serviceCode>${base["SERVICECODE"]}</serviceCode>
                <!-- 计费标准。 -->
                <feeValue>${base["FEEVALUE"]}</feeValue>
                <!-- 计费标准。 -->
                <feeType>${base["FEETYPE"]}</feeType>
                <!-- 长号码。 -->
                <longCode>${base["LONGCODE"]}</longCode>
            </baseStrategy>
        </submitRouter>
    </#list>
</#if>

<#if routeAses?size != 0>
    <#list routeAses as routeas>
        <!-- 主备策略。 -->
        <submitRouter productId="${routeas["PRODUCTID"]}" operatorId="${routeas["OPERATORID"]}"
                      provinceId="${routeas["PROVICEID"]}" strategyType="${routeas["STRATEGYTYPE"]}" filterLevel="${routeas["NUMDIRTYTYPE"]}">
            <mainStrategy>
                <!-- 网关ID。-->
                <gatewayId>${routeas["GATEWAYID"]}</gatewayId>
                <!-- 网关类型。 -->
                <gatewayType>${routeas["GATEWAYTYPE"]}</gatewayType>
                <!-- 模块ID。 -->
                <moduleId>${routeas["MODELID"]}</moduleId>
                <!-- 通道ID。 -->
                <svcId>${routeas["SERVICECODEID"]}</svcId>
                <!-- 通道代码。 -->
                <serviceCode>${routeas["SERVICECODE"]}</serviceCode>
                <!-- 计费标准。 -->
                <feeValue>${routeas["FEEVALUE"]}</feeValue>
                <!-- 计费标准。 -->
                <feeType>${routeas["FEETYPE"]}</feeType>
                <!-- 长号码。 -->
                <longCode>${routeas["LONGCODE"]}</longCode>
            </mainStrategy>
            <slaveStrategy>
                <!-- 网关ID。 -->
                <gatewayId>${routeas["GATEWAYID2"]}</gatewayId>
                <!-- 网关类型。 -->
                <gatewayType>${routeas["GATEWAYTYPE2"]}</gatewayType>
                <!-- 模块ID。 -->
                <moduleId>${routeas["MODELID2"]}</moduleId>
                <!-- 通道ID。 -->
                <svcId>${routeas["SERVICECODEID"]}</svcId>
                <!-- 通道代码。 -->
                <serviceCode>${routeas["SERVICECODE2"]}</serviceCode>
                <!-- 计费标准。 -->
                <feeValue>${routeas["FEEVALUE2"]}</feeValue>
                <!-- 计费标准。 -->
                <feeType>${routeas["FEETYPE2"]}</feeType>
                <!-- 长号码。 -->
                <longCode>${routeas["LONGCODE2"]}</longCode>
            </slaveStrategy>
        </submitRouter>
    </#list>
</#if>

<#if routeBalances?size != 0>
    <!-- 均衡策略 -->
    <submitRouter productId="${routeBalanceInfo["PRODUCTID"]}" operatorId="${routeBalanceInfo["OPERATORID"]}"
                  provinceId="${routeBalanceInfo["PROVICEID"]}" strategyType="${routeBalanceInfo["STRATEGYTYPE"]}" filterLevel="${routeBalanceInfo["NUMDIRTYTYPE"]}">
        <#list routeBalances as routeBalance>
            <balanceStrategy>
                <!-- 网关ID。 -->
                <gatewayId>${routeBalance["GATEWAYID"]}</gatewayId>
                <!-- 网关类型。 -->
                <gatewayType>${routeBalance["GATEWAYTYPE"]}</gatewayType>
                <!-- 通道ID。 -->
                <moduleId>${routeBalance["MODELID"]}</moduleId>
                <!-- 通道ID。 -->
                <svcId>${routeBalance["SERVICECODEID"]}</svcId>
                <!-- 通道代码。 -->
                <serviceCode>${routeBalance["SERVICECODE"]}</serviceCode>
                <!-- 计费标准。 -->
                <feeValue>${routeBalance["FEEVALUE"]}</feeValue>
                <!-- 计费标准。 -->
                <feeType>${routeBalance["FEETYPE"]}</feeType>
                <!-- 长号码。 -->
                <longCode>${routeBalance["LONGCODE"]}</longCode>
            </balanceStrategy>
        </#list>
    </submitRouter>
</#if>
</submitRouters>
