<%@page session="false"%><%--


  Image component

  Draws an image. 

--%><%@ page import="com.day.cq.commons.Doctype,
    com.day.cq.wcm.api.components.DropTarget,
    com.day.cq.wcm.foundation.Image, com.day.cq.wcm.foundation.Placeholder,  org.apache.sling.api.resource.ValueMap" %><%
%><%@include file="/libs/foundation/global.jsp"%><%
        ValueMap myProperties = resource.adaptTo(ValueMap.class);
        String href = myProperties.get("fileReference", "defaultValue");
    String divId = "cq-image-jsp-" + resource.getPath();
    %><div id="<%= xssAPI.encodeForHTMLAttr(divId) %>"> <img src="<%= href %>"> </div><%
    %><cq:text property="jcr:description" placeholder="" tagName="small" escapeXml="true"/>
    

