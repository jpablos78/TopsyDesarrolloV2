Ext.define('Topsy.view.seguridades.Usuarios', {
    extend: 'Ext.window.Window',
    alias: 'widget.usuarios',
    layout: 'fit',
    autoShow: true,
    modal: false,
    bodyStyle: 'padding:5px',
    items: [
        {
            xtype: 'grid',
            itemId: 'grdUsuario',
            store: 'seguridades.Usuarios',
            width: 780,
            height: 300,
            border: true,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Nuevo',
                            itemId: 'btnNuevo',
                            iconCls: 'icon-new',
                            action: 'nuevo'
                        },
                        '->',
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: 'seguridades.Usuarios',
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
            columns: [
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [
                        {
                            iconCls: 'icon-pencil',
                            tooltip: 'Modificar',
                            handler: function (view, rowIndex, colIndex, item, e) {
                                this.fireEvent('itemclick', this, 'modificar', view, rowIndex, colIndex, item, e);
                            }
                        },
                        {
                            iconCls: 'icon-cross',
                            tooltip: 'Eliminar',
                            handler: function (view, rowIndex, colIndex, item, e) {
                                this.fireEvent('itemclick', this, 'eliminar', view, rowIndex, colIndex, item, e);
                            }
                        }
                    ]
                },
                {
                    header: 'Nombre',
                    dataIndex: 'US_NOMBRES_APELLIDOS',
                    width: 200,
                    filter: true
                },
                {
                    header: 'Login',
                    dataIndex: 'US_LOGIN',
                    width: 200,
                    filter: true
                },
                {
                    header: 'Perfil',
                    dataIndex: 'PE_DESC',
                    width: 200,
                    filter: true
                },
                {
                    header: 'Estado',
                    dataIndex: 'US_DESC_ESTADO',
                    width: 100,
                    filter: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.get('estado_usuario') == 'A') {
                            return '<span style="color:green;">' + value + '</span>';
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }

                        return value;
                    }
                }
            ]
        }
    ]
});







//Ext.define('Topsy.view.seguridades.Usuarios', {
//    extend: 'Ext.window.Window',
//    alias: 'widget.usuarios',
//    layout: 'fit',
//    autoShow: true,
//    modal: false,
//    bodyStyle: 'padding:5px',
//    items: [
//        {
//            xtype: 'panel',
//            items: [
//                {
//                    xtype: 'grid',
//                    itemId: 'grdUsuario',
//                    store: 'seguridades.Usuarios',
////            width: 850,
////            height: 400,
////            columnLines: true,
////            viewConfig: {
////                stripeRows: true
////            },
////            dockedItems: [
////                {
////                    xtype: 'toolbar',
////                    dock: 'top',
////                    items: [
////                        {
////                            text: 'Nuevo',
////                            itemId: 'cmdNuevo',
////                            iconCls: 'icon-new',
////                            action: 'nuevo'
////                        },
////                        '->',
////                        {
////                            text: 'Salir',
////                            iconCls: 'icon-cancel',
////                            handler: function () {
////                                this.up('window').close();
////                            }
////                        }
////                    ]
////                },
////                {
////                    xtype: 'pagingtoolbar',
////                    //store: 'Usuarios',
////                    dock: 'bottom',
////                    displayInfo: true
////                }
////            ]
//
//                },
//                {
//                    xtype: 'hidden',
//                    itemId: 'mn_codigo'
//                }
//            ]
//        }
//    ]
//
//});




