Ext.define('Topsy.view.seguridades.CambioClave', {
    extend: 'Ext.window.Window',
    alias: 'widget.cambioclave',
    layout: 'fit',
    autoShow: true,
    modal: false,
    bodyStyle: 'padding:5px',
    items: [
        {
            xtype: 'form',
            itemId: 'frmCambioClave',
            frame: true,
            width: 300,
            //layout: 'auto',
            padding: 5,
            border: false,
            defaults: {
                xtype: 'textfield',
                allowBlank: false,
                labelWidth: 120,
                enableKeyEvents: true
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            //id: 'btnGrabar',
                            itemId: 'btnGrabar',
                            text: 'Grabar',
                            iconCls: 'icon-save',
                            action: 'grabar',
                            formBind: true
                        },
                        {
                            //id: 'btnSalir',
                            itemId: 'btnSalir',
                            text: 'Cancelar',
                            iconCls: 'icon-cancel',
                            action: 'cancel'
                        }
                    ]
                }
            ],
            items: [
                {
                    //id: 'txtClave',
                    itemId: 'txtClave',
                    name: 'clave',
                    fieldLabel: 'Contraseña Anterior',
                    inputType: 'password',
                    enableKeyEvents: true
                },
                {
                    //id: 'txtClaveNueva',
                    itemId: 'txtClaveNueva',
                    name: 'clave_nueva',
                    fieldLabel: 'Contraseña Nueva',
                    inputType: 'password',
                    enableKeyEvents: true
                }
            ]
        }
    ]
});


