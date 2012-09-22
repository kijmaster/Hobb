/**
 * Usage examples:
 *
 *  var msg = new Message({'date': '2012-09-12', 'content': 'Hello you!'});
 *  var myPopupView = new PopupView({model: msg});
 *  // Simple modal (content = view's content, header = view's title)
 *  Hobb.modal(myPopupView);
 *
 *  // Same modal but with extra action button in additional footer area
 *  Hobb.complexModal(
 *      myPopupView,
 *      [
 *          (
 *              "label" : "Confirm",
 *              "class" : "magic-button",
 *              "type" : "other",
 *              "callback" : function (){ alert("hello !"); }
 *          )
 *      ]);
 */
define(['underscore',
        'shared/modal/HobbModalComp',
        'shared/view/HobbView'],
    function (_,
              HobbModalComponent,
              AbstractView) {

        return {

            validateView : function (view, func) {
                view instanceof AbstractView ? func() : this.alertModal('HOBB usage exception! Modal component may not work, please contact us');
            },

            removePrevious : function () {
                HobbModalComponent.close();
            },

            // Use a view to display content & attach events if no handlers
            modal : function (contentView, handlers) {
                // remove previous modal if exists
                this.removePrevious();

                // Validate the view type before usage
                this.validateView(contentView, function () {
                    // Open & show modal with view's content
                    var popup = HobbModalComponent.open(contentView.getContent(), handlers);
                    // If no handlers and attachEventsTo function exist from give view, use it
                    if (typeof handlers === 'undefined' && contentView.attachEvent) {
                        contentView.attachEventsTo(popup);
                    }
                });
            },

            // Simply display message with additional buttons given by handlers
            alertModal : function (message, handlers) {
                // remove previous modal if exists
                this.removePrevious();
                // Open & show modal with view's content
                HobbModalComponent.open(message, handlers);
            }
        };

    });


