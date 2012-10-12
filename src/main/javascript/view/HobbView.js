/**
 * Extend this abstract view for popup usage;
 * Default implementation of 'render' is no-op
 * So rewrite it to render current view with given data model into 'el' element
 * Required:
 *  - template must be redefined in extended view
 *  - model must be given at creation
 *
 *  Example, extended view 'MyPopup':
 *      define(['backbone',
 *          'messaging/AbstractPopupView',
 *          'hbs!templates/path/myTemplate'],
 *          function(Backbone,
 *                   AbstractPopupView
 *                   MyTemplate){
 *              return AbstractPopupView.extend({
 *                  template: MyTemplate,
 *                  className: 'Message',
 *                  tagName: 'li',
 *              });
 *          });
 */
define(['backbone',
        'underscore'],
    function (Backbone,  _) {
        return Backbone.View.extend({

            title: '',
            backdrop: true,

            initialize: function () {
                this.render();
            },

            render: function () {
                if (typeof this.model === 'undefined') {
                    $(this.el).html(this.template());
                } else {
                    $(this.el).html(this.template(this.model.toJSON()));
                }
                return this;
            },

            getContent: function () {
                return this.$el.html();
            },

            // Overwrite this method to attach events to view's elements
            attachEventsTo: function (element) {
            },

            // No more used - old feature for usage with bootbox
            getOptions: function () {
                return {'header': this.title, 'backdrop': this.backdrop};
            }

        });
    });