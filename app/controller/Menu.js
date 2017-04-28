Ext.define('Topsy.controller.Menu', {
    extend: 'Ext.app.Controller',
    requires: [
        'Topsy.store.MenuFavoritos',
        'Topsy.store.Menu'
    ],
    views: [
        'menu.Accordion',
        'menu.Item'
    ],
    refs: [
        {
            ref: 'mainPanel',
            selector: 'mainpanel'
        }
    ],
    init: function () {
        this.control({
            'mainmenu': {
                render: this.onPanelRender
            },
            'mainmenuitem': {
                itemclick: this.onTreepanelItemClick
            }
        });
    },
    onPanelRender: function (abstractcomponent, options) {
        console.log('onPanelRender');

        var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];
        var storeMenuFavoritos = this.getStore('MenuFavoritos');
        var storeMenu = this.getStore('Menu');

        storeMenuFavoritos.load({
            params: {
                us_codigo: Ext.getCmp('S_us_codigo').getValue(),
                action: 'getMenuFavoritos'
            },
            callback: function (records, operation, success) {
                var result = operation.request.proxy.reader.rawData;
                if (success) {
                    //console.log('ok');
                    //console.log(Ext.get("S_us_codigo").dom.value);

                } else {
                    Topsy.util.Util.showErrorMsg(result.message.reason);
                }
            }
        });

        var menu = Ext.create('Topsy.view.menu.Item', {
            title: 'Favoritos',
            store: storeMenuFavoritos
        });

        menuPanel.add(menu);


        storeMenu.load({
            params: {
                us_codigo: Ext.getCmp('S_us_codigo').getValue(),
                action: 'getMenu'
            },
            callback: function (records, operation, success) {
                var result = operation.request.proxy.reader.rawData;
                if (success) {
                    //console.log('ok');
                    //console.log(Ext.get("S_us_codigo").dom.value);

                } else {
                    Topsy.util.Util.showErrorMsg(result.message.reason);
                }
            }
        });

        menu = Ext.create('Topsy.view.menu.Item', {
            title: 'Opciones',
            store: storeMenu
        });

        menuPanel.add(menu);



        //        menu = Ext.create('Topsy.view.menu.Item', {
        //            title: 'Favoritos',
        //            store: storeMenuFavoritos
        //        });
        //                                
        //        menuPanel.add(menu);

        //var storeMenu = this.getStore('Menu');

        //        storeMenuFavoritos.load({
        //            params: {
        //                action: 'getMenuFavoritosUsuario',
        //                id_institucion: Ext.getCmp('S_id_institucion').getValue(),
        //                id_usuario: Ext.getCmp('S_id_usuario').getValue()
        //            },
        //            callback: function (records, operation, success) {
        //                var result = operation.request.proxy.reader.rawData;
        //                if (success) {
        //                //                    var menu = Ext.create('Topsy.view.menu.Item', {
        //                //                        title: 'Favoritos',
        //                //                        store: storeMenuFavoritos
        //                //                    });
        //                //
        //                //
        //                //                    menuPanel.add(menu);
        //                } else {
        //                    Topsy.util.Util.showErrorMsg(result.message.reason);
        //                }
        //            }
        //        });

        //        storeMenu.load({
        //            params: {
        //                action: 'getMenuUsuario',
        //                id_institucion: Ext.getCmp('S_id_institucion').getValue(),
        //                id_usuario: Ext.getCmp('S_id_usuario').getValue()
        //            },
        //            callback: function (records, operation, success) {
        //                var result = operation.request.proxy.reader.rawData;
        //                if (success) {
        //                //                    var menu = Ext.create('Topsy.view.menu.Item', {
        //                //                        title: 'Favoritos',
        //                //                        store: storeMenuFavoritos
        //                //                    });
        //                //
        //                //
        //                //                    menuPanel.add(menu);
        //                } else {
        //                    Topsy.util.Util.showErrorMsg(result.message.reason);
        //                }
        //            }
        //        });


        //            var menu = Ext.create('Topsy.view.menu.Item', {
        //                title: 'Favoritos',
        //                store: storeMenuFavoritos
        //            });
        //    
        //    
        //            menuPanel.add(menu);



        //        menu = Ext.create('Topsy.view.menu.Item', {
        //            title: 'Opciones',
        //            //iconCls: root.get('iconCls'),
        //            store: storeMenu
        //        });
        //
        //
        //        menuPanel.add(menu);


    },
    onTreepanelItemClick: function (view, record, item, index, event, options) {
        console.log('onTreepanelItemClick');
        this.onTreepanelSelect(view, record, index, options);
    },
    onTreepanelSelect: function (selModel, record, index, options) {
        console.log('onTreepanelSelect');
        console.log(record.get('MN_CLASE'));
        if (record.get('MN_TIPO') == 'O') {
            var mainPanel = this.getMainPanel();

            var newTab = mainPanel.items.findBy(
                    function (tab) {
                        return tab.title === record.get('text');
                    });

            if (!newTab) {

                Ext.Ajax.request({
                    url: 'app/data/sesion.php',
                    params: {
                        action: 'verificarSesionValida',
                        se_codigo: Ext.getCmp('S_se_codigo').getValue()
                    },
                    success: function (conn, response, options, eOpts) {
                        var result = Topsy.util.Util.decodeJSON(conn.responseText);

                        if (result.success) {
                            if (result.data[0]['OK'] == 'S') {
                                if (record.get('MN_CLASE') != '') {
                                    if (record.get('MN_RUTA') == '') {
                                        newTab = mainPanel.add({
                                            closable: true,
                                            iconCls: record.get('iconCls'),
                                            title: record.get('text'),
                                            bodyStyle: {"background-color": "white"},
                                            layout: {
                                                type: 'vbox',
                                                align: 'center',
                                                pack: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: record.get('MN_CLASE'),
                                                    title: record.get('text'),
                                                    iconCls: record.get('iconCls')
                                                }
                                            ]
                                        });
                                    } else {
                                        newTab = mainPanel.add({
                                            closable: true,
                                            iconCls: record.get('iconCls'),
                                            title: record.get('text'),
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'uxiframe',
                                                    src: record.get('MN_RUTA')
                                                }
                                            ]
                                        });
                                    }

                                    var mn_codigo = record.get('MN_CLASE') + " hidden#mn_codigo";

                                    Ext.ComponentQuery.query(mn_codigo)[0].setValue(record.get('MN_CODIGO'));

                                    mainPanel.setActiveTab(newTab);
                                }
                            } else {
                                Topsy.util.Util.showErrorMsg('Atención la sesión fue cerrada y no es válida, por favor salga del sistema y vuelva a ingresar...');
                            }
                        } else {
                            Topsy.util.Util.showErrorMsg(result.message.reason);
                        }
                    },
                    failure: function (conn, response, options, eOpts) {
                        Topsy.util.Util.showErrorMsg(conn.responseText);
                    }
                });



            }
            mainPanel.setActiveTab(newTab);
        }
    }
});


