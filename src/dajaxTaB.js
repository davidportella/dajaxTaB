/**
 * @license dobled.ajaxTab.bootstrap  0.0.1 - DobleD AjaxTab Bootstrap
 * Copyright (c) 2014, David Portella, dobled@dobled.info
 * Licensed under the GPL licenses
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;
(function ($, window, undefined) {

    /**
     * Este metodo se ejecuta despues de agregar la funcionalidad
     * al stock de metodos Jquery ($) configura y gatilla init
     *
     * @param elem
     * @param options
     * @constructor
     */
    var DajaxTaB = function (elem, options) {

        this.elem = elem;
        this.$elem = $(elem);

        if (this.init) {
            this.init(options);
        }
    };

    /**
     * Prototype del objeto DajaxTab
     * @type {{defaults: {caption: string, datatype: string, viewrecords: boolean, height: number, rowNum: number, cmTemplate: {sortable: boolean}, autowidth: boolean, shrinkToFit: boolean, headertitles: boolean, sortable: boolean}, init: init, getPager: getPager, columnChooser: columnChooser, excelButton: excelButton, extraButtons: extraButtons}}
     */
    DajaxTaB.prototype = {

        init         : function (options) {

            var that = this;
            that.$elem.after('<div class="tab-content"></div>');

            _.each(options.links, function (j) {

                that.$elem.append(
                    '<li>' +
                        '<a ' +
                        'data-id="' + j.id + '" ' +
                        'data-url="' + j.url + '" ' +
                        'href="#' + j.id + '" ' +
                        'role="tab" ' +
                        'data-toggle="tab"> ' +
                        j.title +
                        '</a>' +
                        '</li>'
                );

                $('.tab-content').append(
                    '<div ' +
                        'class="tab-pane face" ' +
                        'id="' + j.id + '">' +
                        '<div class="content-tab"></div>' +
                        '</div>'
                )

            });

            $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

                var id = $(this).data('id'),
                    url = $(this).data('url'),
                    $container = $('#' + id).children('.content-tab')
                    ;

                if($container.is(':empty')){
                    $.post(url)
                        .done(function (data) {
                            $container.html(data);

                            $container.attr('data-load','1');
                        });
                }

            });

            $('a[data-toggle="tab"]:first').trigger('click');

        }
    };

    /**
     * Se agrega el plugin al stock de jquery
     *
     * En caso de que el llamado se haga a un metodo
     * Caso contrario si es un objeto el que viene
     * Finalmente un mensaje de error
     *
     * @param options
     * @returns {$.fn}
     */
    $.fn.dajaxTaB = function (options) {

        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            var dajaxTaB = this.data('dajaxTaB') ?
                this.data('dajaxTaB') :
                new DajaxTaB(this);

            if (dajaxTaB[options]) {
                dajaxTaB[options].apply(dajaxTaB, args);
            }
        } else if (typeof options == 'object' || !options) {
            this.data('dajaxTaB', new DajaxTaB(this, options));
        } else {
            $.error('Error, parámetro pasado es incorreto');
        }

        return this;
    };

})(jQuery, window);