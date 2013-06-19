<?xml version="1.0" encoding="GBK"?>
<gateways>
<#list gateWays as gateway>
    <${gateWayType["${gateway.numgwtypeid?c}"]} id="${gateway.numgwid?c}" type="1">
    <operatorConfig>
        <!-- 网关名称 -->
        <gatewayName>${gateway.vc2gatewayname!}</gatewayName>
        <!-- 运营商编号 -->
        <operatorId>${gateway.numopid?c}</operatorId>
        <!-- IP地址 -->
        <serverIP>${gateway.vc2gwip!}</serverIP>
        <!-- 端口 -->
        <serverPort>${gateway.vc2gwport!}</serverPort>
        <!-- mo IP地址 -->
        <moServerIP>${gateway.vc2moip!}</moServerIP>
        <!-- mo端口 -->
        <moServerPort>${gateway.vc2moport!}</moServerPort>
        <!-- 网关企业代码 -->
        <spID>${gateway.vc2spid!}</spID>
        <!-- 网关服务代码 -->
        <spNumber>${gateway.vc2spnum!}</spNumber>
        <!-- 用户名 -->
        <spUserName>${gateway.vc2gwusername!}</spUserName>
        <!-- 密码 -->
        <spPassWord>${gateway.vc2gwpassword!}</spPassWord>
        <!-- 批次手机号码数量 -->
        <numGroupMemberMax>${gateway.numgroupmembermax?c}</numGroupMemberMax>
        <!-- 流速控制 -->
        <speeder>${gateway.vc2speed!}</speeder>
    </operatorConfig>
    <extendData>
    <#--非mas和mm7扩展公共部分-->
        <#if gateWayType["${gateway.numgwtypeid}"]!="mas" && gateWayType["${gateway.numgwtypeid}"]!="mm7">
            <!-- 滑动窗口大小 -->
            <controlSize>${gateway.extendConfMap.controlSize!}</controlSize>
            <!-- 进程数 -->
            <countProcessor>${gateway.extendConfMap.countProcessor!}</countProcessor>
            <!-- 协议入口缓冲区大小 -->
            <sizeInBuffer>${gateway.extendConfMap.sizeInBuffer!}</sizeInBuffer>
            <!-- 协议出口缓冲区大小 -->
            <sizeOutBuffer>${gateway.extendConfMap.sizeOutBuffer!}</sizeOutBuffer>
            <!--协议连接无反馈重试时间，单位秒 -->
            <connectIdleTime>${gateway.extendConfMap.connectIdleTime!}</connectIdleTime>
            <!--协议连接失败的重试时间，单位秒 -->
            <connectRepeatTime>${gateway.extendConfMap.connectRepeatTime!}</connectRepeatTime>
            <!--协议连接失败的重试次数 -->
            <connectRepeatCount>${gateway.extendConfMap.connectRepeatCount!}</connectRepeatCount>
            <!--信息发送失败的重试时间，单位秒 保留目前未启用 -->
            <messageRepeatTime>${gateway.extendConfMap.messageRepeatTime!}</messageRepeatTime>
            <!--信息发送失败的重试次数 保留目前未启用 -->
            <messageRepeatCount>${gateway.extendConfMap.messageRepeatCount!}</messageRepeatCount>
            <!--协议滑动窗口清理时间 -->
            <controlClearTime>${gateway.extendConfMap.controlClearTime!}</controlClearTime>
            <!-- 短信签名类型:1=>运营商网关签名; 2=>利信通网关签名; 3=>用户签名 -->
            <signType>${gateway.extendConfMap.signType!}</signType>
            <!-- 短信签名内容 -->
            <signMessage>${gateway.extendConfMap.signMessage!}</signMessage>
        </#if >
    <#--扩展定制部分-->
    <#--cmpp30-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="cmpp30">
            <!-- 0 下行 1上行一般情况下填写0，当连接为亚信网关时，需要两条链接，才用到1的情况 -->
            <socketSymbol>${gateway.extendConfMap.socketSymbol!}</socketSymbol>
        </#if>
    <#--cmpp20-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="cmpp20">
            <!-- 该字段正常时和spid内容一致，但如国信等部分通道要求使用自己的编号，请自行配置内容 -->
            <msgSrc>${gateway.extendConfMap.msgSrc!}</msgSrc>
            <!-- 0 下行 1上行一般情况下填写0，当连接为亚信网关时，需要两条链接，才用到1的情况 -->
            <socketSymbol>${gateway.extendConfMap.socketSymbol!}</socketSymbol>
        </#if>
    <#--sgip-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="sgip">
            <!-- 节点ID -->
            <nodeID>${gateway.extendConfMap.nodeID!}</nodeID>
            <!-- 付费号码 -->
            <chargeNumber>${gateway.extendConfMap.chargeNumber!}</chargeNumber>
            <!-- 登录类型 默认填写1 -->
            <socketSymbol>${gateway.extendConfMap.socketSymbol!}</socketSymbol>
            <!-- MO网关用户名 -->
            <moSpUserName>${gateway.extendConfMap.moSpUserName!}</moSpUserName>
            <!-- MO网关密码 -->
            <moSpPassWord>${gateway.extendConfMap.moSpPassWord!}</moSpPassWord>
        </#if>
    <#--smgp-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="smgp">
            <!--客户端支持的版本号 -->
            <socketVersion>${gateway.extendConfMap.socketVersion!}</socketVersion>
            <!-- smgp协议需要配置loginMode -->
            <loginMode>${gateway.extendConfMap.loginMode!}</loginMode>
        </#if>
    <#--empp-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="empp">

        </#if>
    <#--cbip-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="cbip">
            <!-- 客户端ID -->
            <clientId>${gateway.extendConfMap.clientId!}</clientId>
            <!-- 是否加密 -->
            <security>${gateway.extendConfMap.security!}</security>
        </#if>
    <#--mas-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="mas">
            <jdbcUrl>${gateway.extendConfMap.jdbcUrl!}</jdbcUrl>
            <seqIdPrefix>${gateway.extendConfMap.seqIdPrefix!}</seqIdPrefix>
            <srcClientID>${gateway.extendConfMap.srcClientID!}</srcClientID>
            <!-- Rpt处理开始时间 -->
            <beginTime>${gateway.extendConfMap.beginTime!}</beginTime>
            <!-- Mt批处理的个数 -->
            <mtSize>${gateway.extendConfMap.mtSize!}</mtSize>
            <mtWaitTime>${gateway.extendConfMap.mtWaitTime!}</mtWaitTime>
            <!-- Mt批处理所需时间，超过这个时间没有达到处理的个数也进行下面的操作 -->
            <mtMaxTime>${gateway.extendConfMap.mtMaxTime!}</mtMaxTime>
            <moSize>${gateway.extendConfMap.moSize!}</moSize>
            <moWaitTime>${gateway.extendConfMap.moWaitTime!}</moWaitTime>
            <beforeDay>${gateway.extendConfMap.beforeDay!}</beforeDay>
        </#if>
    <#--mm7-->
        <#if gateWayType["${gateway.numgwtypeid}"]=="mm7">
            <!-- 上行地址 彩信网关特有 -->
            <mmscURL>${gateway.extendConfMap.mmscURL!}</mmscURL>
            <!-- 彩信中心编号 -->
            <mmscID>${gateway.extendConfMap.mmscID!}</mmscID>
        </#if>
    <#--非mas和mm7扩展smSplit公共部分-->
        <#if gateWayType["${gateway.numgwtypeid}"]!="mas" && gateWayType["${gateway.numgwtypeid}"]!="mm7">
            <smSplit>
                <!--splitType 短信拆分规则 0 不拆分 1普通短信拆分 -->
                <normalSplit splitType="${gateway.extendConfMap.smSplit_normalSplit_splitType!}">
                    <!-- 普通短信长度 -->
                    <smLength>${gateway.extendConfMap.smSplit_normalSplit_smLength!}</smLength>
                    <!-- 拆分短信长度 -->
                    <smSplitLength>${gateway.extendConfMap.smSplit_normalSplit_smSplitLength!}</smSplitLength>
                    <!-- 拆分内容的形式如:(1/2) -->
                    <smSplitType>${gateway.extendConfMap.smSplit_normalSplit_smSplitType!}</smSplitType>
                    <!-- 拆分总数 -->
                    <splitCount>${gateway.extendConfMap.smSplit_normalSplit_splitCount!}</splitCount>
                    <!-- 拆分序号 -->
                    <splitIndex>${gateway.extendConfMap.smSplit_normalSplit_splitIndex!}</splitIndex>
                </normalSplit>
                <longSplit splitType="${gateway.extendConfMap.smSplit_longSplit_splitType!}"
                           headType7="${gateway.extendConfMap.smSplit_longSplit_headType7!}"
                           smLastSplitCount="${gateway.extendConfMap.smSplit_longSplit_smLastSplitCount!}"/>
            </smSplit>
        </#if>
    </extendData>
</${gateWayType["${gateway.numgwtypeid}"]}>
</#list>
        </gateways>