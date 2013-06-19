<?xml version="1.0" encoding="utf-8" ?>
<function id="${taskId}" name="default" desc="默认配置文件">
	<#if items?size != 0>
	<#list items as item>
	<item key="${item["VC2KEY"]}" value="${item["ITEMVALUE"]}" desc="${item["ITEMDESC"]?if_exists}" />
	</#list>
	</#if>
	<#list tasks as task>
	<component id="${task["PROGRAMID"]}" name="${task["TASKNAME"]}" desc="${task["TASKNAME"]?if_exists}">
		<#if task["items"]?size != 0>
		<#list task["items"] as item>
		<item key="${item["VC2KEY"]?if_exists}" value="${item["ITEMVALUE"]?if_exists}" desc="${item["ITEMDESC"]?if_exists}" />
		</#list>
		</#if>
	</component>
	</#list>
</function>
