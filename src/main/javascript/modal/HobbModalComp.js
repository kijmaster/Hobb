/**
 * HobbModalComp
 * Used by Hobb.js
 *
 * This object is responsible of building modal and overlay on demand
 * with given content and events
 *
 * Main method is 'open' with two possible arguments:
 *  - data      : contains the content to display
 *  - handlers  : an array of object that must have the following structure
 *      [
 *          {
 *              "label" : "button label",
 *              "class" : "css class to apply",
 *              "type" : "other or close",
 *              "callback" : function
 *          },
 *          {
 *              ...
 *          }
 *      ]
 *
 *    where:
 *      + type: either 'other' or 'close'. If 'close' is given, the script will automatically
 *              replace the given callback method by its own close method to ensure the modal
 *              is correctly closed
 *      + callback: a callback function to apply when the button is pressed
 *      + label: label of the button
 *      + class: css class to apply in addition to the internal css class 'btn' automatically added
 *               (to be removed if not necessary)
 *
 * Second important method is 'close', it's automatically attach to any button with type 'close' given
 * in handlers parameter, and is called by Hobb.js before any new modal display to be sure
 * that no previous modal is present
 */
define(['underscore'],
    function (_) {

        return {

            composeModal : function (modal, content, close) {
                modal.append(content, close);
                return modal;
            },

            createModalElement : function () {
                return $('<div class="hobb-modal"></div>');
            },

            createOverlayElement : function () {
                return $('<div class="hobb-overlay"></div>');
            },

            createCloseElement : function () {
                return $('<a class="hobb-close"></a>');
            },

            createContentElement : function () {
                return $('<div class="hobb-content"></div>');
            },

            createFooterElement : function () {
                return $('<div class="hobb-footer"></div>');
            },

            createActionButtonElement : function (button) {
                var self = this;
                var b = $('<a href="#" class="btn ' + button.class + '">' + button.label + '</a>');
                b.on('click', function (e) {
                    e.preventDefault();
                    // If button label is 'close' apply its close method
                    // rather that external method to ensure the modal will
                    // correctly close
                    if (button.type === 'close') {
                        self.close();
                    } else {
                        button.callback();
                    }
                });
                return b;
            },

            getModalElement : function (from) {
                if (from) {
                    return $('.hobb-modal', from);
                }
                return $('.hobb-modal', $('body'));
            },

            getOverlayElement : function (from) {
                if (from) {
                    return $('.hobb-overlay', from);
                }
                return $('.hobb-overlay', $('body'));
            },

            getContentElement : function (from) {
                if (from) {
                    return $('.hobb-content', from);
                }
                return $('.hobb-content', $('body'));
            },

            center : function (modalEl) {
                var top, left;

                top = Math.max($(window).height() - modalEl.outerHeight(), 0) / 2;
                left = Math.max($(window).width() - modalEl.outerWidth(), 0) / 2;

                modalEl.css({
                    top: top + $(window).scrollTop(),
                    left: left + $(window).scrollLeft()
                });
            },

            handleActionButtons : function (modal, handlers) {
                var self = this;
                var footerEl = this.createFooterElement();
                // Add created footer to the modal
                modal.append(footerEl);
                // Roll on handlers & create buttons
                _.each(handlers, function (button) {
                    footerEl.append(self.createActionButtonElement(button));
                });
            },

            open : function (data, handlers) {

                var self = this;

                // create modal
                var overlayEl = this.createOverlayElement();
                var contentEl = this.createContentElement();
                var closeEl = this.createCloseElement();
                var modalEl = this.composeModal(this.createModalElement(), contentEl, closeEl);

                // Handle handlers if presents
                if (typeof handlers !== 'undefined') {
                    self.handleActionButtons(modalEl, handlers);
                }

                // Bind close event to close button
                closeEl.on('click', function (event) {
                    self.close();
                });

                // Clean / append data into content element
                contentEl.empty().append(data);

                modalEl.css({
                    width: 'auto',
                    height: 'auto'
                });

                $(window).bind('resize.modal', function () {
                    self.center(modalEl);
                });

                // Add modal & overlay to the body
                overlayEl.appendTo("body");
                modalEl.appendTo("body");

                this.center(modalEl);

                // And show
                modalEl.show();
                overlayEl.show();

                return modalEl;
            },

            close : function () {
                var self = this;

                var modalEl = this.getModalElement();
                var overlayEl = this.getOverlayElement();
                var contentEl = this.getContentElement(modalEl);

                modalEl.hide();
                overlayEl.hide();
                contentEl.empty();
                $(window).unbind('resize.modal');

                // Remove modal & overlay from body
                modalEl.remove();
                overlayEl.remove();
            }

        }

    }
);