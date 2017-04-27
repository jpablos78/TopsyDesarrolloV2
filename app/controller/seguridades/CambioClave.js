Ext.define('Topsy.controller.seguridades.CambioClave', {
    extend: 'Ext.app.Controller',
    views: ['seguridades.CambioClave'],
    init: function () {
        this.control({
            'cambioclave textfield': {
                specialkey: this.onSpecialKeyTextfield
            },
            'cambioclave button[itemId=btnGrabar]': {
                click: this.onClickBtnGrabar
            },
            'cambioclave button[itemId=btnSalir]': {
                click: this.onClickBtnSalir
            },
            'cambioclave': {
                close: this.onClose
            }
        });
    },
    onSpecialKeyTextfield: function (field, e, options) {
        if (e.getKey() == e.ENTER) {
            switch (field.itemId) {
                case 'txtClave':
                    var txtClaveNueva = Ext.ComponentQuery.query('cambioclave textfield#txtClaveNueva')[0];

                    txtClaveNueva.focus();
                    break;
                case 'txtClaveNueva':
                    var btnGrabar = Ext.ComponentQuery.query('cambioclave button#btnGrabar')[0];

                    btnGrabar.fireEvent('click', btnGrabar, e, options);
                    break;
            }
        }
    },
    onClickBtnGrabar: function (button, e, options) {
        var formPanel = button.up('form');

        //alert(Ext.ClassManager.getName(this));
        //alert(Ext.ClassManager.getDisplayName(this));
        
        //alert(this.mn_codigo);
        
        //alert(this.alias);

        if (formPanel.getForm().isValid()) {
            var clave = Topsy.util.MD5.encode(Ext.ComponentQuery.query('cambioclave textfield#txtClave')[0].getValue());
            var clave_nueva = Topsy.util.MD5.encode(Ext.ComponentQuery.query('cambioclave textfield#txtClaveNueva')[0].getValue());

            Ext.Ajax.request({
                url: 'app/data/cambioclave.php',
                params: {
                    action: 'cambioClave',
                    S_se_codigo: Ext.getCmp('S_se_codigo').getValue(),
                    S_us_codigo: Ext.getCmp('S_us_codigo').getValue(),
                    mn_codigo: Ext.ComponentQuery.query('cambioclave hidden#mn_codigo')[0].getValue(),
                    us_codigo: Ext.getCmp('S_us_codigo').getValue(),
                    us_login: Ext.getCmp('S_us_login').getValue(),
                    us_pass: clave,
                    us_new_pass: clave_nueva
                },
                success: function (conn, response, options, eOpts) {
                    var result = Topsy.util.Util.decodeJSON(conn.responseText);
                    if (result.success) {
                        if (result.data[0].OK == 'S') {
                            //Topsy.util.Util.showOkMsg(result.message.reason);
                            Ext.Msg.show({
                                title: 'Mensaje del Sistema',
                                msg: 'Se cambio la clave correctamente, se procedera a salir del sistema para que ingrese al mismo con su nueva clave.',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO,
                                fn: function () {
                                    Ext.ComponentQuery.query('footer hidden#auxBtn')[0].setValue('S');
                                    Ext.ComponentQuery.query('button#btnSalirSistema')[0].fireEvent('click', Ext.ComponentQuery.query('button#btnSalirSistema')[0]);
                                }
                            });
                        } else {
                            //Topsy.util.Util.showErrorMsg(result.message.reason);
                            Topsy.util.Util.showErrorMsg(result.message.reason);
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
    },
    onClickBtnSalir: function (button, e, options) {
        button.up('cambioclave').destroy();
        var tabPanel = window.parent.Ext.getCmp('mainpanel');
        tabPanel.remove(tabPanel.activeTab, true);
    },
    onClose: function (panel, eOpts) {
        var btnSalir = Ext.ComponentQuery.query('cambioclave button#btnSalir')[0];

        btnSalir.fireEvent('click', btnSalir);
    }
});