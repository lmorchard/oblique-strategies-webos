/**
 * @fileOverview Home scene assistant
 * @author <a href="http://decafbad.com">l.m.orchard@pobox.com</a>
 * @version 0.1
 */
/*jslint laxbreak: true */
/*global Decafbad, BlockChalk, Mojo, $, $L, $A, $H, SimpleDateFormat */
function HomeAssistant() {
}

HomeAssistant.prototype = (function () { /** @lends HomeAssistant# */

    return {

        /**
         * Setup the application.
         */
        setup: function () {

            this.controller.setupWidget(
                Mojo.Menu.appMenu, 
                { omitDefaultItems: true }, 
                {
                    visible: true,
                    items: [
                        Mojo.Menu.editItem,
                        { label: "About", command: 'MenuAbout' }
                    ]
                }
            );

            this.controller.setupWidget(
                Mojo.Menu.commandMenu, {}, { items: [
                    {items: [ 
                        /*{ command:'1', label: '#1', shortcut: '1' },
                         { command:'2', label: '#2', shortcut: '2' }*/
                    ]},
                    {items: [ 
                        /*{ command:'All', label: $L('Refresh'), 
                         icon: 'refresh', shortcut: 'A' }*/
                    ]},
                    {items: [ 
                        /*{ command:'3', label: '#3', shortcut: '3' },
                         { command:'4', label: '#4', shortcut: '4' }*/
                    ]}
                ]}
            );

            this.showNewStrategy();
        },

        /**
         * React to card activation.
         */
        activate: function (ev) {
            Decafbad.Utils.setupListeners([
                ['strategy', Mojo.Event.tap, function () {
                    this.showNewStrategy();
                }],
                [this.controller.document, 'shaking', function () {
                    this.showNewStrategy();
                }]
            ], this);
        },

        /**
         * React for card deactivation.
         */
        deactivate: function (ev) {
            Decafbad.Utils.clearListeners(this);
        },

        /**
         * Handle ultimate card clean up.
         */
        cleanup: function (ev) {
        },

        /**
         * Menu command dispatcher.
         */
        handleCommand: function (event) {
            if (event.type === Mojo.Event.command) {
                if ('MenuAbout' === event.command) {
                    this.showAbout();
                } else if ('All' === event.command) {
                    return this.showNewStrategy();
                } else if (parseInt(event.command, 10)) {
                    return this.showNewStrategy(event.command - 1);
                }
            }
        },

        /**
         * Show the about dialog.
         */
        showAbout: function () {
            this.controller.showAlertDialog({
                onChoose: function(value) {},
                title: $L("Oblique Strategies"),
                message: [
                    "BRIAN ENO/PETER SCHMIDT;",
                    "http://www.rtqe.net/ObliqueStrategies/;",
                    "http://minimaldesign.net/downloads/projects/oblique-strategies;",
                    "http://decafbad.com/"
                ].join('\n'),
                choices: [
                    {label:$L("OK"), value:""}
                ]
            });
        },

        /**
         * Launch new chalk composition card.
         */
        showNewStrategy: function (edition_num) {
            var editions = ObliqueStrategies.strategies;
            if (!edition_num) {
                edition_num = Math.floor(Math.random() * editions.length);
            }
            var edition  = editions[edition_num],
                strategy = edition[Math.floor(Math.random() * edition.length)];

            this.controller.get('strategy').update(strategy);
        },

        EOF:null
    };
}());
