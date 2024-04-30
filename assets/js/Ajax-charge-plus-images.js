
//  Chargement de plus d'images avec Ajax
console.log("Chargement de plus d'images avec Ajax : son js est chargé");

(function($) {
    $('#more_images').click(function() {
        var button = $(this),
            data = {
                'action': 'load_more',
                'query': ajaxloadmore.query_vars,
                'page': button.data('page')
            };

        $.ajax({
            url: ajaxurl,
            data: data,
            type: 'POST',
            beforeSend: function(xhr) {
                button.text('Chargement...');
            },
            success: function(data) {
                if (data === 'no_posts') {
                    button.remove();
                } else if(data) {
                    button.data('page', button.data('page') + 1);
                    $('#block_more_images').before($(data));
                    button.text('Charger plus');
                    attachEventsToImages(); 
                } else {
                    button.text('Plus de photos à charger');
                }
            }
        });
    });
})(jQuery);


