// Chargement de plus d'images avec Ajax
console.log("ajaxLoadMore : le script est lancé");

(function($) {
    $('#more_images').click(function() {
        var button = $(this),
            data = {
                'action': 'load_more',
                'query': ajaxLoadMore.query_vars,
                'page': button.data('page')
            };

        $.ajax({
            url: ajaxLoadMore.ajaxurl,
            data: data,
            type: 'POST',
            beforeSend: function(xhr) {
                button.text('Chargement...');
            },
            success: function(response) {
                if (response.success) {
                    button.data('page', button.data('page') - 1);
                    $('#block_more_images').before($(response.data.html));
                    button.text('Charger plus');
                    
                    if (response.data.is_last_page) {
                        button.remove();
                    }
                } else {
                    button.text('Plus de photos à charger');
                    button.prop('disabled', true);
                }
            },
            error: function() {
                button.text('Erreur de chargement');
            }
        });
    });
})(jQuery);
