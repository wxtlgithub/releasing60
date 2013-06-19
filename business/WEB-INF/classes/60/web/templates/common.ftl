<#macro common paraList >
<#if paraList?size != 0>
<#list paraList as modules>
<function>
	<id>${modules["TASKID"]}</id>
	<name>${modules["TASKNAME"]}</name>
	<bean>${modules["TASKNAME"]}</bean>
	<#if items?size != 0>
		<config key="config" desc="配置">
			<![CDATA[
				<function id="${modules["TASKID"]}" name="${modules["TASKNAME"]}" desc="${modules["VC2DESC"]}" bean="${modules["VC2DESC"]}" >
				<#list items as item>
				<item key="${item["VC2KEY"]}" value="${item["ITEMVALUE"]}" desc="${item["VC2DESC"]}" />
				</#list>
				<#-- end items -->
				</function>
			]]>
		</config>
	</#if>
</function>
<#if taskList?size != 0 >
<@common paraList = taskList />
</#if>
</#list>
</#if>
</#macro>



