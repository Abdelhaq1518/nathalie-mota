
console.log("modale Contact JS chargé"); // Affiche un message dans la console pour indiquer que le script a été chargé avec succès.

$(document).ready(function() { // Exécute le code à l'intérieur une fois que le DOM est entièrement chargé.

    const lienContact = $('#menu-item-8'); // Sélectionne l'élément avec l'ID 'menu-item-8' et le stocke dans une variable.
    const boutonContact = $('#boutonContact'); // Sélectionne l'élément avec l'ID 'boutonContact' et le stocke dans une variable.
    const modalOverlay = $('.popup-overlay'); // Sélectionne l'élément avec la classe 'popup-overlay' et le stocke dans une variable.
    const referencePhoto = $('#referencePhoto'); // Sélectionne l'élément avec l'ID 'referencePhoto' et le stocke dans une variable.

    const openModal = function() { // Définit une fonction pour ouvrir la modale.
        modalOverlay.css('display', 'flex'); // Modifie le style CSS pour afficher la modale en utilisant flexbox.

        // Vérifie si l'attribut 'data-reference' du bouton de contact est défini et non vide, puis met à jour la valeur du champ référence photo en conséquence.
        if (boutonContact.attr('data-reference') && boutonContact.attr('data-reference').trim() !== "") {
            referencePhoto.val(boutonContact.attr('data-reference'));
        }
    };

    const closeModal = function() { // Définit une fonction pour fermer la modale.
        modalOverlay.css('display', 'none'); // Modifie le style CSS pour masquer la modale.
    };

    // Ajoute un gestionnaire d'événements pour ouvrir la modale lors du clic sur le lien de contact.
    lienContact.on('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien.
        openModal(); // Appelle la fonction pour ouvrir la modale.
    });

    // Ajoute un gestionnaire d'événements pour ouvrir la modale lors du clic sur le bouton de contact.
    boutonContact.on('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du bouton.
        openModal(); // Appelle la fonction pour ouvrir la modale.
    });

    // Ajoute un gestionnaire d'événements pour fermer la modale lors du clic en dehors de celle-ci.
    $(window).on('click', function(event) {
        if (event.target === modalOverlay[0]) { // Vérifie si l'élément cliqué est égal à la modale.
            closeModal(); // Appelle la fonction pour fermer la modale.
        }
    });
});




/* Navigation menu burger mobile */
console.log("menu Burger JS chargé");

$(document).ready(function () {
    const header = $('header');
    const menuBurger = $('.burgerMenu');
    const nav = $('.navigation');
    const menuLinks = $('.menu_navigation li a');

    menuBurger.on('click', function () {
        const isOpen = header.hasClass('open');

        header.toggleClass('open', !isOpen);
        menuBurger.toggleClass('open', !isOpen);
        nav.toggleClass('open', !isOpen);

    });
});


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


/*les filtres */
console.log("filtres JS chargé");

jQuery(document).ready(function ($) {
  $("#categorie, #format, #annees").on("change", function () {
    // Capturer les valeurs des filtres
    const categorie = $("#categorie").val();
    const format = $("#format").val();
    const years = $("#annees").val();
    console.log(categorie);
    // Vérifier si les valeurs sont les valeurs par défaut
    const isDefaultValues = categorie === "" && format === "" && years === "";

    $.ajax({
      url: ajaxurl,
      type: "post",
      data: {
        action: "filter_photos",
        filter: {
          categorie: categorie,
          format: format,
          years: years,
        },
      },
      success: function (response) {
        // Mettez à jour la section des photos avec les résultats filtrés
        $("#photoContainer").html(response);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
        console.log(ajaxOptions);
        console.log(xhr.responseText);
      },
      complete: function () {
        // Si les valeurs sont les valeurs par défaut, relancer le conteneur photo
        if (isDefaultValues) {
          // Mettez à jour la section des photos avec le contenu par défaut
          $("#photoContainer").load(window.location.href + " #photoContainer");
        }
      },
    });
  });
});

// gestion du select2
console.log("select2 JS chargé");
$(function () {
  // Initialise le plugin Select2 sur les éléments avec la classe ".custom-select"
  $(".custom-select").select2({
    // Définit la position du menu déroulant en dessous
    dropdownPosition: "below",
  });
});

// Ouverture et fermeture de la lightbox//

console.log("Lightbox Ouverture et Fermeture : son js est chargé");

$(document).ready(function() {
    var $lightbox = $('#lightbox');
    var $lightboxImg = $('.lightboxImg');
    var $lightboxCategory = $('.lightboxCategorie');
    var $lightboxReference = $('.lightboxReference');
    var currentIndex = 0; 

    function updateLightbox(index) {
        var $images = $('.fullscreen-icon');
        var $image = $images.eq(index);
        
        var categoryText = $image.data('category').toUpperCase();
        var referenceText = $image.data('reference').toUpperCase();

        $lightboxImg.attr('src', $image.data('full'));
        $lightboxCategory.text(categoryText);
        $lightboxReference.text(referenceText);
        currentIndex = index;
    }

    function openLightbox(index) {
        updateLightbox(index);
        $lightbox.show();
    }

    function fermetureLightbox() {
        $lightbox.hide();
    }

    window.attachEventsToImages = function() {
        var $images = $('.fullscreen-icon');
        $images.off('click', imageClickHandler); 
        $images.on('click', imageClickHandler);
    };

    function imageClickHandler() {
        var $images = $('.fullscreen-icon');
        var index = $images.index($(this).closest('.fullscreen-icon'));
        openLightbox(index);
    }

    attachEventsToImages();

    $('.closeLightbox').on('click', fermetureLightbox);

    $('.lightboxPrevious').on('click', function() {
        var $images = $('.fullscreen-icon');
        if (currentIndex > 0) {
            updateLightbox(currentIndex - 1);
        } else {
            updateLightbox($images.length - 1);
        }
    });

    $('.lightboxNext').on('click', function() {
        var $images = $('.fullscreen-icon');
        if (currentIndex < $images.length - 1) {
            updateLightbox(currentIndex + 1);
        } else {
            updateLightbox(0);
        }
    });

});






