/* Affichage Miniature */
console.log("Affichage Miniature JS chargé");

$(document).ready(function() {
    const miniature = $('#miniature');

    $('.arrow-left, .arrow-right').hover(
        function() {
            miniature.css({
                visibility: 'visible',
                opacity: 1
            }).html(`<a href="${$(this).data('target-url')}">
                        <img src="${$(this).data('thumbnail-url')}" alt="${$(this).hasClass('arrow-left') ? 'Photo précédente' : 'Photo suivante'}">
                    </a>`);
        },
        function() {
            miniature.css({
                visibility: 'hidden',
                opacity: 0
            });
        }
    );

    $('.arrow-left, .arrow-right').click(function() {
        window.location.href = $(this).data('target-url');
    });
});