Hobb
====

Hobb is a simple javascript modal component.
For historic this was first working with backbone views and model, therefore there are still pieces of code related
to this framework.
Feel free to remove it on your own if you are not interested in.

Modal is automatically centered and resize.

This is wokring with IE7+, latests version of Chrome & FF.


Important
=========
This code won't work for you until you remove the additional shift from this code line in HobbModalComp.js:

```java
top = Math.max($(window).height() - modalEl.outerHeight(), 0) / 2 - $("#menu").height();
```

Requirements
============
- backbone
- underscore
- handlebars for templating

Next features
=============
- externalize and use a CSS file for internal styles / look & feel

Examples
========

1/ Simple alert popup with no buttons:

```java
Hobb.alertModal("This is a simple message with Hobb!"));
```
2/ Simple alert popup with additional buttons, yes / no question in this example:

```java
Hobb.alertModal("Do you like it ?",
    [
      {
        "b_label": "<label>No</label>",
        "b_class": "newConversation",
        "b_type": "close",
        "b_callback": function () { alert("You shouldn't see this callback message as its automatically " +
                                          "replaced due to given 'close' type"); }
      },
      {
        "b_label": "<label>Yes</label>",
        "b_class": "newConversation",
        "b_type": "other",
        "b_callback": function () { alert("Of course you like it !"); }
      }
    ]
  );
```
3/ Popuping with a backbone view/model and handlebars template:

```java
  var popupView = new ConversationPopupView({model: this.model});
  Hobb.modal(popupView,
    [
      {
        "b_label": "<label>" + Translator.getTranslation("messaging.send") + "</label>",
        "b_class": "newConversation",
        "b_type": "other",
        "b_callback": popupView.newConversation
      }
    ]
  );
```
