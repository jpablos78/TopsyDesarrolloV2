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

        //var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];
        //var storeMenuFavoritos = this.getStore('MenuFavoritos');
        //var storeMenu = this.getStore('Menu');

        //        storeMenuFavoritos.load({
        //            params: {
        //                action: 'getMenuFavoritosUsuario',
        //                us_codigo: Ext.getCmp('S_us_codigo').getValue()
        //            },
        //            callback: function (records, operation, success) {
        //                var result = operation.request.proxy.reader.rawData;
        //                if (success) {
        //                    var menu = Ext.create('SAC.view.menu.Item', {
        //                        title: 'Favoritos',
        //                        store: storeMenuFavoritos
        //                    });
        //                        
        //                        
        //                    menuPanel.add(menu);
        //                } else {
        //                    Topsy.util.Util.showErrorMsg(result.message.reason);
        //                }
        //            }
        //        });

        //                var menu = Ext.create('Topsy.view.menu.Item', {
        //                    title: 'Favoritos',
        //                    store: storeMenuFavoritos
        //                });


        //        var store = Ext.create('Ext.data.TreeStore', {
        //            root: {
        //                expanded: true,
        //                children: [
        //                {
        //                    text: "detention", 
        //                    leaf: true
        //                },
        //                {
        //                    text: "homework", 
        //                    expanded: true, 
        //                    children: [
        //
        //                    {
        //                        text: "book report", 
        //                        leaf: true
        //                    },
        //                    {
        //                        text: "algebra", 
        //                        leaf: true
        //                    }
        //                    ]
        //                },
        //                {
        //                    text: "buy lottery tickets", 
        //                    leaf: true
        //                }
        //                ]
        //            }
        //        });
        //
        //        var menu = Ext.create('Ext.tree.Panel', {
        //            title: 'Simple Tree',
        //            width: 200,
        //            height: 150,
        //            store: store,
        //            rootVisible: false,
        //            renderTo: Ext.getBody()
        //        });
        //
        //        menuPanel.add(menu);



        var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];
        var storeMenuFavoritos = this.getStore('MenuFavoritos');
        var storeMenu = this.getStore('Menu');

        //variables = Topsy.util.Variables;

        //delete storeMenuFavoritos.getProxy().extraParams['includes']
        //        storeMenuFavoritos.getProxy().extraParams = {
        //            us_codigo: variables.S_us_codigo,
        //            action: 'getMenuFavoritosUsuario'
        //        };

        //        storeMenuFavoritos.load();

        //        storeMenuFavoritos.getProxy().extraParams.us_codigo = Ext.getCmp('S_us_codigo').getValue();
        //        storeMenuFavoritos.getProxy().extraParams.action = 'getMenuFavoritosUsuario';



        //alert(variables.S_us_codigo);

        //        storeMenuFavoritos.on('beforeload', function (store, operation, eOpts) {
        //            alert('xxx');
        //            operation.params.us_codigo = variables.S_us_codigo;//Ext.getCmp('S_us_codigo').getValue();
        //            operation.params.action = 'getMenuFavoritosUsuario';
        //        //            var proxy = store.getProxy();
        //        //            proxy.setExtraParam('CCI_EMPRESA', Ext.getCmp('cmbEmpresa').getValue());
        //        //            proxy.setExtraParam('CCI_SUCURSAL', Ext.getCmp('txtCodigoSucursal').getValue());
        //        //            proxy.setExtraParam('action', 'listarVendedoresComisionValidos');            
        //        });

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
        alert('x');
        this.onTreepanelSelect(view, record, index, options);
    },
    onTreepanelSelect: function (selModel, record, index, options) {
        //console.log(record.raw.className);
        //console.log(record.raw.text);       
        if (record.get('tipo') == 'O') {
            var mainPanel = this.getMainPanel();

            var newTab = mainPanel.items.findBy(
                    function (tab) {
                        return tab.title === record.get('text');
                    });

            //console.log(record.raw.className);

            if (!newTab) {
                if (record.get('ruta') == '') {
                    newTab = mainPanel.add({
                        //xtype: record.raw.className,
                        //xtype: Ext.create('Topsy.view.cambioClave.CambioClave'),
                        //xtype: 'cambioclave',
                        closable: true,
                        iconCls: record.get('iconCls'),
                        title: record.get('text'),
                        layout: {
                            type: 'vbox',
                            align: 'center',
                            pack: 'center'
                        },
                        items: [
                            {
                                xtype: record.get('clase'),
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
                                src: record.get('ruta')
                            }
                        ]
                    });
                }
            }
            mainPanel.setActiveTab(newTab);
        }
    }
});


