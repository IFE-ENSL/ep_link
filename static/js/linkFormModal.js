/**
 * Create the form modal to query the api
 */
function createLinkFormModal(textIsSelected) {

    // create the modal
    var $formModal = jQuery(
        '<div class="modal fade" role="dialog" aria-labelledby="success" aria-hidden="true">'+
            '<div class="modal-dialog">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                        '<h4 class="modal-title" id="success">Insérer un lien</h4>'+
                    '</div>'+
                    '<div class="modal-body"></div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
    );

    var $linkForm;
    if (textIsSelected) {
        $linkForm = jQuery(
            '<form>'+
                '<p class="info">En mettant une URL sans le préfixe "http://", vous créez un nouveau cahier</p>'+
                '<p><label>URL (http://...)</label><input type="text" name="link_value"/></p>'+
            '</form>'
        );
    } else {
        $linkForm = jQuery(
            '<form>'+
                '<p class="info">En mettant une URL sans le préfixe "http://", vous créez un nouveau cahier</p>'+
                '<p><label>URL (http://...)</label><input type="text" name="link_value"/></p>'+
                '<p><label>Texte du lien</label><input type="text" name="link_text"/></p>'+
            '</form>'
        );
    }
    $formModal.find('.modal-body').append($linkForm);

    // create the validation button
    var $button = jQuery('<button type="button" class="btn btn-primary">Valider</button>');
    $formModal.find('.modal-footer').append($button);

    $formModal.find('.modal-body').append('<div class="error"></div>');

    $button.on('click', function() {
        var padeditor = require('ep_etherpad-lite/static/js/pad_editor').padeditor;
        padeditor.ace.callWithAce(function (ace) {
            rep = ace.ace_getRep();
            var value = $linkForm.find('*[name="link_value"]').val();
            if (value === "") {
                jQuery('.modal-body .error').text("Vous devez ajouter une URL.");
                return;
            }
            // we don't need to add text
            if (textIsSelected) {
                start = rep.selStart;
                end = rep.selEnd;
                ace.ace_doInsertLink(value);
            } else {
                var text = $linkForm.find('*[name="link_text"]').val();
                if (text === "") {
                    jQuery('.modal-body .error').text("Vous devez ajouter du texte pour le lien.");
                    return;
                }
                start = rep.selStart;
                end = [rep.selStart[0], rep.selStart[1]+text.length];
                ace.ace_replaceRange(rep.selStart, rep.selStart, text);
                ace.ace_doInsertLink(value);
            }
            $formModal.modal('hide');
        },'insertLink' , true);
    });

    $formModal.on('hidden.bs.modal', function () {
        jQuery(this).remove();
    });

    return $formModal;
}