Ext.Loader.setConfig({
    enabled: true,
    paths: {

    }
});

Ext.application({
    name: 'Topsy',
    requires: [
        'Topsy.util.Util'
    ],
    views: [],
//    stores: [
//        'StaticStore'
//    ],
    controllers: [
        'Login',
        'Menu',
        'seguridades.CambioClave',
        'seguridades.Usuarios',
    ],
    init: function () {
        console.log('init');
        splashscreen = Ext.getBody().mask('Inicializando Aplicacion ...', 'splashscreen');
    },
    launch: function () {
        console.log('launch');
        Ext.tip.QuickTipManager.init();
        var task = new Ext.util.DelayedTask(function () {
            Ext.util.Format.decimalSeparator = '.';
            Ext.util.Format.thousandSeparator = ',';

            //Fade out the body mask
            splashscreen.fadeOut({
                duration: 1000,
                remove: true
            });

            //Fade out the icon and message
            splashscreen.next().fadeOut({
                duration: 1000,
                remove: true,
                listeners: {
                    afteranimate: function (el, startTime, eOpts) {
                        console.log('run');
                        Ext.widget('login');
                    }
                }
            });
        });

        task.delay(2000);
    }
});