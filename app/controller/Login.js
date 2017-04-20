//todo: no olvidar lo de validar la empresa para que no vayan valorea quemados

Ext.define('Topsy.controller.Login', {
    extend: 'Ext.app.Controller',
    requires: [
        'Topsy.util.MD5',
        'Topsy.util.SessionMonitor'
    ],
    //stores: [
    //    'modulo_sac.Institucion'
    //],
    views: [
        'Login'//,
                //    'Footer'
    ],
    init: function () {
        this.control({
            'login form textfield': {
//                //keypress: this.onKeyPressTextfield
                specialkey: this.onSpecialKeyTextfield,
                change: this.onChangeTextfield
            },
            'login button[itemId=btnSubmit]': {
                click: this.onClickBtnSubmit
            },
            'login button[itemId=btnCancel]': {
                click: this.onClickBtnCancel
            },
//            'footer': {
//                render: this.onRenderFooter
//            },
//            'footer button[itemId=btnSalirSistema]': {
//                click: this.onClickBtnSalirSistema
//            }
        });
    },
//    onAfterrender: function (abstractcomponent, options) {    
////        console.log('en onAfterrender');
////        var cmbInstitucion = Ext.ComponentQuery.query('login combobox#cmbInstitucion')[0];
////        var storeInstitucion = cmbInstitucion.getStore();                
////
////        storeInstitucion.on('beforeload', function () {
////            var proxy = storeInstitucion.getProxy();            
////            proxy.setExtraParam('action', 'getAllInstituciones');
////        });
////        storeInstitucion.load({
////            callback: function (records, operation, success) {
////                if (success) {
////                    cmbInstitucion.setValue(records[0].get('id_institucion'));
////                } else {
////                    var result = operation.request.proxy.reader.rawData;
////                    Topsy.util.Util.showErrorMsg(result.message.reason);
////                }
////            }
////        });
//
//    },
    onSpecialKeyTextfield: function (field, e, options) {
        if (e.getKey() == e.ENTER) {
            switch (field.itemId) {
                case 'txtLogin':
                    var txtClave = Ext.ComponentQuery.query('login textfield#txtClave')[0];
                    txtClave.focus();
                    break;
                case 'txtClave':
                    var btnSubmit = Ext.ComponentQuery.query('login button#btnSubmit')[0];
                    btnSubmit.fireEvent('click', btnSubmit, e, options);
                    break;
            }
        }
    },
    onChangeTextfield: function (field, newValue, oldValue, eOpts) {
        if (field.id == 'txtLogin') {
            field.setRawValue(newValue.toUpperCase());
        }
    },
    onClickBtnSubmit: function (button, e, options) {
        var formPanel = button.up('form');
        var login = button.up('login');
        if (formPanel.getForm().isValid()) {
            var login_user = Ext.ComponentQuery.query('login textfield#txtLogin')[0].getValue();
            var clave = Ext.ComponentQuery.query('login textfield#txtClave')[0].getValue();
            clave = Topsy.util.MD5.encode(clave);
            Ext.get(login.getEl()).mask("Conectandose ...", "procesando");

            Ext.Ajax.request({
                url: 'app/data/login.php',
                method: 'POST',
                timeout: 99999999,
                params: {
                    action: 'login',
                    login: login_user,
                    clave: clave
                },
                listeners: {
                    requestexception: function (conn, response, options, eOpts) {

                    }
                },
                success: function (conn, response, options, eOpts) {
                    Ext.get(login.getEl()).unmask();

                    var result = Topsy.util.Util.decodeJSON(conn.responseText);
                    
                    if (result.success) {                        
                        Ext.getCmp('S_us_codigo').setValue(result.us_codigo);
                        Ext.getCmp('S_se_codigo').setValue(result.se_codigo);
                        Ext.getCmp('S_us_login').setValue(result.us_login);
                        Ext.getCmp('S_pe_codigo').setValue(result.pe_codigo);
                        Ext.getCmp('S_pe_desc').setValue(result.pe_desc);
                        //Ext.getCmp('S_login').setValue(result.login);
                        Ext.getCmp('S_us_nombres_apellidos').setValue(result.us_nombres_apellidos);
                        Ext.getCmp('S_cci_usuario').setValue(result.cci_usuario);
                        login.close();
                        //Ext.create('Topsy.view.MyViewport');
                        Topsy.util.SessionMonitor.start();
                    } else {
                        Topsy.util.Util.showErrorMsg(result.message.reason);
                    }

                },
                failure: function (conn, response, options, eOpts) {
                    Ext.get(login.getEl()).unmask();
                    //alert(conn.statusText);    
                    //alert(conn.status);    
                    Topsy.util.Util.showErrorMsg(conn.responseText);
                }
            });
        }
    },
    onClickBtnCancel: function (button, e, options) {
        var txtLogin = Ext.ComponentQuery.query('login textfield#txtLogin')[0];
        button.up('form').getForm().reset();
        txtLogin.focus();
    },
    onRenderFooter: function () {
        //var cmbEmpresa = Ext.ComponentQuery.query('login combobox#cmbEmpresa')[0];
        //var us_nombresApellidos = Ext.ComponentQuery.query('login hidden#us_nombresApellidos')[0].getValue();

        Ext.TaskManager.start({
            run: function () {
                var txtFecha = Ext.ComponentQuery.query('footer button#txtFecha')[0];
                var txtReloj = Ext.ComponentQuery.query('footer button#txtReloj')[0];
                txtFecha.setText(Ext.Date.format(new Date(), 'd/m/Y'));
                txtReloj.setText(Ext.Date.format(new Date(), 'G:i:s'));
                //Ext.getCmp('txtFecha').setText(Ext.Date.format(new Date(), 'd/m/Y'));
                //Ext.getCmp('txtReloj').setText(Ext.Date.format(new Date(), 'G:i:s'));
                //Ext.getCmp('btnUsuarioMain').setText('xxx..');
                Ext.ComponentQuery.query('footer button#btnUsuarioMain')[0].setText('USUARIO: ' + Ext.getCmp('S_nombres_apellidos').getValue() + ' -> PERFIL: ' + Ext.getCmp('S_nombre_perfil').getValue());
            },
            interval: 1000
        });
    },
    onClickBtnSalirSistema: function (button, e, options) {
        var me = this;
        if (Ext.ComponentQuery.query('footer hidden#auxBtn')[0].getValue() == 'N') {
            Ext.MessageBox.confirm('Pregunta', 'Esta seguro de que desea cerrar la sesion?', function (btn) {
                if (btn == 'yes') {
                    me.salirSistema(button);
                }
            });
        } else {
            me.salirSistema(button);
        }
    },
    salirSistema: function (button) {
        Ext.Ajax.request({
            url: 'app/data/login.php',
            params: {
                action: 'cerrarSesionActual',
                id_institucion: Ext.getCmp('S_id_institucion').getValue(),
                id_sesion: Ext.getCmp('S_id_sesion').getValue()
            },
            success: function (conn, response, options, eOpts) {
                var result = Topsy.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    button.up('mainviewport').destroy();
                    window.location.reload();
                } else {
                    Topsy.util.Util.showErrorMsg(result.message.reason);
                }
            },
            failure: function (conn, response, options, eOpts) {
                Topsy.util.Util.showErrorMsg(conn.responseText);
            }
        });
    }
});


