Ext.define('Topsy.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainviewport',
    requires: [
    //'Sistema.view.Header',
    'Topsy.view.menu.Accordion',
    'Topsy.view.Footer',
    'Topsy.view.MainPanel'
    ],
    layout: {
        type: 'border'
    },
    items: [
    {
        xtype: 'mainmenu',
        id: 'panelEste',
        width: 185,
        collapsible: true,
        region: 'west',
        style: 'background-color: #8FB488'
    },
//    {
//        xtype: 'appheader',            
//        region: 'north'
//    },
    {
        xtype: 'mainpanel',
        region: 'center'
    },
    {
        xtype: 'footer',
        region: 'south'
    }
    ]
});


