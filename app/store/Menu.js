Ext.define('Topsy.store.Menu', {
    extend: 'Ext.data.TreeStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: "app/data/menu.php",
        //url: "app/data/menuFavoritos.json",
        actionMethods: {
            read: 'POST'
        }
    },
    root: {
        text: 'Sistema',
        expanded: true,
        loaded: true // Se pone este codigo porque el treestore ejecuta el load automaticamente a pesar de que el autoload esta en false, con este codigo se corrige eso.
    },

    fields: [
        {
            name: 'MN_CODIGO',
            type: 'int'
        },

        {
            name: 'MN_COD_PADRE',
            type: 'int'
        },
        {
            name: 'MN_TIPO',
            type: 'string'
        },
        {
            name: 'text',
            type: 'string'
        },

        {
            name: 'iconCls',
            type: 'string'
        },

        {
            name: 'MN_CLASE',
            type: 'string'
        },

        {
            name: 'MN_RUTA',
            type: 'string'
        },

        {
            name: 'leaf'
        },
    ]
});