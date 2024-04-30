
/* Affichage Modale */
console.log("modale Contact JS chargé");

$(document).ready(function() {
    const lienContact = $('#menu-item-8');
    const boutonContact = $('#boutonContact');
    const modalOverlay = $('.popup-overlay');
    const referencePhoto = $('#referencePhoto');

    const openModal = function() {
        modalOverlay.css('display', 'flex');

        if (boutonContact.attr('data-reference') && boutonContact.attr('data-reference').trim() !== "") {
            referencePhoto.val(boutonContact.attr('data-reference'));
        }
    };

    const closeModal = function() {
        modalOverlay.css('display', 'none');
    };

    lienContact.on('click', function(event) {
        event.preventDefault();
        openModal();
    });

    boutonContact.on('click', function(event) {
        event.preventDefault();
        openModal();
    });

    $(window).on('click', function(event) {
        if (event.target === modalOverlay[0]) {
            closeModal();
        }
    });
});



/* Navigation menu burger mobile */
console.log("menu Burger JS chargé");

$(document).ready(function () {
    const header = $('header');
    const menuBurger = $('.menu_burger');
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
    const miniPicture = $('#miniPicture');

    $('.arrow-left, .arrow-right').hover(
        function() {
            miniPicture.css({
                visibility: 'visible',
                opacity: 1
            }).html(`<a href="${$(this).data('target-url')}">
                        <img src="${$(this).data('thumbnail-url')}" alt="${$(this).hasClass('arrow-left') ? 'Photo précédente' : 'Photo suivante'}">
                    </a>`);
        },
        function() {
            miniPicture.css({
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
        $("#containerPhoto").html(response);
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
          $("#containerPhoto").load(window.location.href + " #containerPhoto");
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



/* Lightbox */
console.log("Lightbox JS chargé");

$(document).ready(function() {
    var $lightbox = $('#lightbox');
    var $lightboxImage = $('.lightboxImage');
    var $lightboxCategory = $('.lightboxCategorie');
    var $lightboxReference = $('.lightboxReference');
    var currentIndex = 0; 

    function updateLightbox(index) {
        var $images = $('.fullscreen-icon');
        var $image = $images.eq(index);
        
        var categoryText = $image.data('category').toUpperCase();
        var referenceText = $image.data('reference').toUpperCase();

        $lightboxImage.attr('src', $image.data('full'));
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

    $('.fermelightbox').on('click', fermetureLightbox);

    $('.lightboxPrecedent').on('click', function() {
        var $images = $('.fullscreen-icon');
        if (currentIndex > 0) {
            updateLightbox(currentIndex - 1);
        } else {
            updateLightbox($images.length - 1);
        }
    });

    $('.lightboxSuivant').on('click', function() {
        var $images = $('.fullscreen-icon');
        if (currentIndex < $images.length - 1) {
            updateLightbox(currentIndex + 1);
        } else {
            updateLightbox(0);
        }
    });

});

