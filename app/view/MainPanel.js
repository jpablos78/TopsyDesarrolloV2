Ext.define('Topsy.view.MainPanel', {
    extend: 'Ext.tab.Panel',
    id: 'mainpanel',
    itemId: 'mainpanel',
    alias: 'widget.mainpanel',
    autoDestroy: true,
    requires: [
        'Ext.ux.IFrame'
    ],
//    activeTab: 0,
//    items: [
//        {
//            xtype: 'panel',
//            closable: false,
//            iconCls: 'icon-comment',
//            title: 'Publicaciones',
//            layout: 'fit',
//            id: 'panelPublicaciones',
//            loader: {
//                url: 'publicaciones/index.php',
//                renderer: 'component',
//                autoLoad: true,
//                listeners: {
//                    beforeload: function (loader) {
//                        var panel = loader.target;
//
//                        panel.removeAll();
//                    }
//                }
//            },
//            defaults: {
//                border: false,
//                layout: 'fit'
//            },
//            listeners: {
//                afterrender: function (c) {
//                    c.getLoader().startAutoRefresh(5000);
//                }
//            }
//        }
//        {
//            xtype: 'panel',
//            closable: false,
//            iconCls: 'icon-comment',
//            title: 'Publicaciones',
//            layout: 'fit',
//            id: 'panelPublicaciones',
//            autoScroll: true,
//            loader: {
//                //url: 'publicaciones/pixel/html/index.html',
//                //url: 'publicaciones/index.php',
//                //renderer: 'component',
//                autoLoad: true,
//                listeners: {
//                    beforeload: function (loader) {
//                        var panel = loader.target;
//
//                        panel.removeAll();
//                    }
//                }
//            },
//            tbar: [
//                {
//                    id: 'btnPublicaciones',
//                    text: 'txtButton'
//                }
//            ],
//            html: '<iframe id="frame-welcome" src="' + ruta + "?S_se_codigo=" + S_se_codigo + "&S_mn_codigo=" + S_mn_codigo + "&S_tabPanel=" + tabPanel + '" border="0" width="100%" height="100%" style="border:0"></iframe>',
//            html: '<iframe id="frame-welcome" src="publicaciones/index2.php" border="0" width="100%" height="100%" style="border:0"></iframe>'
//            items: [
//                {
//                    xtype: 'uxiframe',
//                    //src: 'http://www.packtpub.com/mastering-ext-javascript/book'
//                    src: 'publicaciones/index.php'
////                    autoLoad: {
////                        url: 'publicaciones/index.php',
////                        startAutoRefresh: 5
////                    }                 
//                }
//            ],
//            listeners: {
//                afterrender: function (c) {
//                    c.getLoader().startAutoRefresh(15000);
//                }
//            }
//        }
//    ]
});


