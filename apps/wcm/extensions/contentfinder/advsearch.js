{
    "tabTip": CQ.I18n.getMessage("My DAM Search"),
    "id": "cfTab-AdvDamSearch",
    "xtype": "contentfindertab",
    "iconCls": "cq-cft-tab-icon images",
    /*"closable": true,*/
    "ranking": 10,
    "allowedPaths": [
        "/content/*",
        "/etc/scaffolding/*",
        "/etc/workflow/packages/*"
    ],
    "items": [
        CQ.wcm.ContentFinderTab.getQueryBoxConfig({
            "id": "cfTab-AdvDamSearch-QueryBox",
            /*"height": 95,*/
            "items": [
                CQ.wcm.ContentFinderTab.getSuggestFieldConfig({"url": "/bin/wcm/contentfinder/suggestions.json/content/dam"})
                ]
        }),
        CQ.wcm.ContentFinderTab.getResultsBoxConfig({
            "items": {
            	"tpl": '<tpl for=".">' +
                       '<div class="thumb-wrap">' +
                       '<div class="thumb"' +
                       ' style="background-image:url(\'{values.path}\');"' +
                       ' ondblclick="CQ.wcm.ContentFinderTab.resultDblClick(event, \'{id}\',\'{pathEncoded}\',{isFolder},\'{ddGroups}\');"' +
                       ' ext:qtip="<nobr>{[CQ.shared.XSS.getXSSValue(CQ.shared.XSS.getXSSValue(values.title))]}</nobr>{[values.title ? "<br/>" : ""]}<nobr>{[CQ.shared.XSS.getXSSValue(CQ.shared.XSS.getXSSValue(values.name))]}</nobr>"' +
                       '></div>' +
                       '<span>{[CQ.shared.XSS.getXSSValue(values.shortTitle)]}</span>' +
                       '</div>' +
                       '</tpl>' +
                       '<div class="x-clear"></div>',
            },
            "itemsDDGroups": ["myDam"],
            "itemsDDNewParagraph": {
                "path": "myApp/components/image",
                "propertyName": "./fileReference"
            },
            "noRefreshButton": true,
            "tbar": [
                CQ.wcm.ContentFinderTab.REFRESH_BUTTON,
                "->",
                {
                    "toggleGroup": "cfTab-AdvDamSearch-TG",
                    "enableToggle": true,
                    "toggleHandler": function(button, pressed) {
                        var tab = CQ.Ext.getCmp("cfTab-AdvDamSearch");
                        if (pressed) {
                            tab.dataView.tpl = new CQ.Ext.XTemplate('<tpl for=".">' +
                                                                    '<div class="thumb-wrap">' +
                                                                    '<div class="thumb"' +
                                                                    ' style="background-image:url(\'{values.path}\');"' +
                                                                    ' ondblclick="CQ.wcm.ContentFinderTab.resultDblClick(event, \'{id}\',\'{pathEncoded}\',{isFolder},\'{ddGroups}\');"' +
                                                                    ' ext:qtip="<nobr>{[CQ.shared.XSS.getXSSValue(CQ.shared.XSS.getXSSValue(values.title))]}</nobr>{[values.title ? "<br/>" : ""]}<nobr>{[CQ.shared.XSS.getXSSValue(CQ.shared.XSS.getXSSValue(values.name))]}</nobr>"' +
                                                                    '></div>' +
                                                                    '<span>{[CQ.shared.XSS.getXSSValue(values.shortTitle)]}</span>' +
                                                                    '</div>' +
                                                                    '</tpl>' +
                                                                    '<div class="x-clear"></div>');
                            tab.dataView.itemSelector = CQ.wcm.ContentFinderTab.THUMBS_ITEMSELECTOR;
                        }
                        if (tab.dataView.store != null) {
                            tab.dataView.refresh();
                        }
                    },
                    "pressed": true,
                    "allowDepress": false,
                    "cls": "cq-btn-thumbs cq-cft-dataview-btn",
                    "iconCls":"cq-cft-dataview-mosaic",
                    "tooltip": {
                        "text": CQ.I18n.getMessage("Mosaic View"),
                        "autoHide":true
                    }
                },
                {
                    "toggleGroup": "cfTab-AdvDamSearch-TG",
                    "enableToggle": true,
                    "toggleHandler": function(button, pressed) {
                        var tab = CQ.Ext.getCmp("cfTab-AdvDamSearch");
                        if (pressed) {
                            tab.dataView.tpl = new CQ.Ext.XTemplate('<tpl for=".">' +
                                                                    '<div class="cq-cft-search-item" ondblclick="CQ.wcm.ContentFinderTab.resultDblClick(event, \'{id}\', \'{pathEncoded}\', {isFolder}, \'{ddGroups}\');">' +
                                                                    '<div title="{[CQ.shared.XSS.getXSSValue(values.pathEncodedTitle)]}" class="cq-cft-search-thumb" style="background-image:url(\'{values.path}\');"></div>' +
                                                                    '<div class="cq-cft-search-text-wrapper">' +
                                                                    '<div class="cq-cft-search-title">{[CQ.shared.XSS.getXSSValue(values.name)]}</div>' +
                                                                    '{[values.title ? "<div>" + CQ.shared.XSS.getXSSValue(values.title) + "</div>" : ""]}' +
                                                                    '<div>{[CQ.shared.XSS.getXSSValue(values.formattedSize)]}</div>' +
                                                                    '<div>{[CQ.shared.XSS.getXSSValue(values.lastModified)]}</div>' +
                                                                    '</div>' +
                                                                    '<div class="cq-cft-search-separator"></div>' +
                                                                    '</div>' +
                                                                    '</tpl>');
                            tab.dataView.itemSelector = CQ.wcm.ContentFinderTab.DETAILS_ITEMSELECTOR;
                        }
                        if (tab.dataView.store != null) {
                            tab.dataView.refresh();
                        }
                    },
                    "pressed": false,
                    "allowDepress": false,
                    "cls": "cq-btn-details cq-cft-dataview-btn",
                    "iconCls":"cq-cft-dataview-list",
                    "tooltip": {
                        "text": CQ.I18n.getMessage("List View"),
                        "autoHide": true
                    }
                }
            ]
        },{
            "url": "/bin/wcm/contentfinder/mydamsearch/view.json/content/dam"
        }, {
            "baseParams": {
                "defaultMimeType": "image"
                /*"mimeType": "image"*/
            },
            "autoLoad":false,
            "reader": new CQ.Ext.data.JsonReader({
                "totalProperty": "results",
                "root": "hits",
                "fields": [
                    "name", "path", "title", "mimeType", "ddGroups", "size", "lastModified", "ck", "templateParams", "imageWidth", "imageHeight"
                ],
                "id": "path"
            })
        })
    ]
}