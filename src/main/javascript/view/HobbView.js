
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