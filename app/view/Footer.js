Ext.define('Topsy.view.Footer', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.footer',
    items: [
    {
        xtype: 'button',
        id: 'btnSalirSistema',
        itemId: 'btnSalirSistema',
        text: 'Salir',
        iconCls: 'icon-stop'
    },
    {
        xtype: 'tbfill'
    },
    {        
        id: 'btnUsuarioMain',
        iconCls: 'icon-user'
    },
    {
        xtype: 'tbfill'
    },
    {
        text: (Ext.Date.format(new Date(), 'd/m/Y')),
        id: 'txtFecha',
        iconCls: 'icon-calendar'
    },
    {
        xtype: 'tbseparator'
    },
    {
        text: (Ext.Date.format(new Date(), 'G:i:s')),
        id: 'txtReloj'
    },
    {
        xtype: 'hidden',
        itemId: 'auxBtn',
        value: 'N'
    }
    ]
});


