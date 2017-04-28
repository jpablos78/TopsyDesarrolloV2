Ext.define('Topsy.store.seguridades.Usuarios', {
    extend: 'Ext.data.Store',
    storeId: 'storeUsuarios',
    pageSize: 10,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'app/data/usuario.php',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        listeners: {
            exception: function (proxy, response, operation) {
                var error = operation.getError();

                if (operation.getError()) {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError().status + ': ' + operation.getError().statusText,
                        //msg: 'Error' + response.status + ": " + response.statusText,
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }

            }
        }
    },
    fields: [
        {
            name: 'US_CODIGO',
            type: 'int'
        },
        {
            name: 'PE_CODIGO',
            type: 'int'
        },
        {
            name: 'PE_DESC',
            type: 'string'
        },
        {
            name: 'US_LOGIN',
            type: 'string'
        },
        {
            name: 'US_NOMBRES',
            type: 'string'
        },
        {
            name: 'US_APELLIDOS',
            type: 'string'
        },
        {
            name: 'US_NOMBRES_APELLIDOS',
            type: 'string'
        },
        {
            name: 'US_EMAIL',
            type: 'string'
        },
        {
            name: 'US_TIPO_US',
            type: 'string'
        },
        {
            name: 'US_ESTADO',
            type: 'string'
        },
        {
            name: 'US_DESC_ESTADO',
            type: 'string'
        },
        {
            name: 'CCI_VENDEDOR',
            type: 'string'
        },
        {
            name: 'US_ES_VEN',
            type: 'string'
        },
        {
            name: 'US_VIS_PED',
            type: 'string'
        },
        {
            name: 'CCI_USUARIO',
            type: 'string'
        }
    ]
});


