Ext.define('Topsy.view.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',
    //renderTo:"qo-panel",
    requires: [
        'Ext.form.Field'
    ],
    autoShow: true,
    height: 150,
    width: 360,
    layout: {
        type: 'fit'
    },
    iconCls: 'icon-key',
    title: 'Inicio de Sesión',
    closeAction: 'hide',
    closable: false,
    items: [
        {
            xtype: 'form',
            frame: false,
            bodyPadding: 15,
            layout: 'anchor',
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 65,
                allowBlank: false,
                //minLength: 3,
                msgTarget: 'side',
                enableKeyEvents: true
            },
            items: [
                {
                    id: 'txtLogin',
                    itemId: 'txtLogin',
                    name: 'login',
                    fieldLabel: 'Usuario',
                    maxLength: 45
                },
                {
                    inputType: 'password',
                    id: 'txtClave',
                    itemId: 'txtClave',
                    name: 'clave',
                    fieldLabel: 'Contraseña',
                    maxLength: 25
                },

                {
                    xtype: 'hidden',
                    id: 'S_se_codigo'
                },
                {
                    xtype: 'hidden',
                    id: 'S_us_codigo'
                },
                {
                    xtype: 'hidden',
                    id: 'S_pe_codigo'
                },
                {
                    xtype: 'hidden',
                    id: 'S_pe_desc'
                },
                {
                    xtype: 'hidden',
                    id: 'S_mn_codigo'
                },
                {
                    xtype: 'hidden',
                    id: 'S_nombre_perfil'
                },
                {
                    xtype: 'hidden',
                    id: 'S_us_login'
                },
                {
                    xtype: 'hidden',
                    id: 'S_us_nombres_apellidos'
                },
                {
                    xtype: 'hidden',
                    id: 'S_cci_usuario'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            id: 'btnSubmit',
                            itemId: 'btnSubmit',
                            formBind: true,
                            iconCls: 'icon-accept',
                            text: 'Aceptar'
                        },
                        {
                            xtype: 'button',
                            id: 'btnCancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                            text: 'Cancelar'
                        }
                    ]
                }
            ]
        }
    ]
});


