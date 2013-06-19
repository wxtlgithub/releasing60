<node>
	<id>${ids}</id>
	<#if list?size != 0>
	<#list list as ls>
		<${ls["VC2KEY"]}>${ls["ITEMVALUE"]}</${ls["VC2KEY"]}>
	</#list>
	</#if>
	<#--公共模块列表 2-->
	<#if commonModulesList?size != 0>
	<commonModuleList>
	<@common paraList=commonModulesList />
	</commonModuleList>
	</#if>
	<#--通讯模块列表 3 -->
	<#if communicateModulesList?size != 0>
	<moduleList>
	<@common paraList=communicateModulesList />
	</moduleList>
	</#if>
	<#--功能模块列表  4 -->
	<#if functionModulesList?size != 0>
	<functionModuleList>
	<@common paraList=functionModulesList />
	</functionModuleList>
	</#if>
	<#--任务模块列表 5 -->
	<#if taskModulesList?size != 0>
	<taskListSchedule>
	<@common paraList=taskModulesList />
	</taskListSchedule>
	</#if>
</node>
<#macro common paraList >
<#if paraList?size != 0>
<#list paraList as modules>
<function>
	<id>${modules["TASKID"]}</id>
	<name>${modules["TASKNAME"]}</name>
	<bean>${modules["TASKNAME"]}</bean>
	
	<#if itemMap?keys?size != 0>
	<#list itemMap?keys as key>
	<#assign items = itemMap[key]>
	<#if items?size != 0>
		<config key="config" desc="配置">
			<![CDATA[
				<function id="${modules["TASKID"]}" name="${modules["TASKNAME"]}" >
				<#list items as item>
				<item key="${item["VC2KEY"]}" value="${item["ITEMVALUE"]}" desc="${item["VC2DESC"]}" />
				</#list>
				<#-- end items -->
				</function>
			]]>
		</config>
	</#if>
	</#list>
	</#if>
</function>

<#if listMap?size != 0>
<#list listMap?keys as ky>
<#assign taskList = listMap[ky]>
<#if taskList?size != 0 >
<@common paraList = taskList />
</#if>
</#list>
</#if>

</#list>
</#if>
</#macro>