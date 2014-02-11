var _, $, jQuery;
var $ = require('ep_etherpad-lite/static/js/rjquery').$;
var _ = require('ep_etherpad-lite/static/js/underscore');

/**
 * aceAttribsToClasses
 *
 * Set the link:'value\text' class where the link attribute is set
 */
function aceAttribsToClasses(hook, context){
  if(context.key == 'mylink'){
    return ['mylink:'+context.value]; // set 'link' class
  }
}

/**
 * aceCreateDomLine
 *
 * Add a a tag with href attributes
 */
function aceCreateDomLine(name, context){
    var cls = context.cls;
    var referenceType = /mylink:.*/.exec(cls); // check if the line contains the wanted class
    if (referenceType) {
        var tag = 'mylink:';
        var value = referenceType[0].substring(tag.length);
        var modifier = {
          extraOpenTags: '<a href="'+value+'">',
          extraCloseTags: '</a>',
          cls: cls
        };

        return [modifier];
    } else {
        return [];
    }
};

/**
 * Insert a link
 * 
 * Find out which lines are selected and assign them the 'link' attribute.
 */
function doInsertLink(value){
    var rep = this.rep;
    documentAttributeManager = this.documentAttributeManager;
    if (!(rep.selStart && rep.selEnd)){
      return;
    }
    documentAttributeManager.setAttributesOnRange(start, end, [
      ['mylink', value]
    ]);
}

/**
 * aceInitialized
 * 
 * Once ace is initialized, we set ace_doInsertLink and bind it to the context
 */
function aceInitialized(hook, context){
  var editorInfo = context.editorInfo;
  editorInfo.ace_doInsertLink = _(doInsertLink).bind(context);
}

// Export all hooks
exports.aceInitialized = aceInitialized;
exports.aceAttribsToClasses = aceAttribsToClasses;
exports.aceCreateDomLine = aceCreateDomLine;