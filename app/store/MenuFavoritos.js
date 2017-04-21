Ext.define('Topsy.store.MenuFavoritos', {
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
        name: 'mn_codigo', 
        type: 'int'
    },

    {
        name: 'mn_cod_padre', 
        type: 'int'
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
        name: 'ruta',  
        type: 'string'
    },

    {
        name: 'leaf'
    },
    ]
});