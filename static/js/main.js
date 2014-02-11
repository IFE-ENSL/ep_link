/**
 * Launch the form modal on click
 */
jQuery(document).ready(function () {
    var padeditor = require('ep_etherpad-lite/static/js/pad_editor').padeditor;
    var textIsSelected;
    // add link button action
    jQuery(".linkButton").on('click', function () {
        textIsSelected = true;
        padeditor.ace.callWithAce(function (ace) {
            rep = ace.ace_getRep();
            if (rep.selStart[0] == rep.selEnd[0] && rep.selStart[1] == rep.selEnd[1]) {
                textIsSelected = false;
            }
        });
        var $formModal = createLinkFormModal(textIsSelected);
        jQuery('body').append($formModal);
        $formModal.modal();
    });
});