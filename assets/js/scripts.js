
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
  function handleFilter(paged) {
      const categorie = $("#categorie").val();
      const format = $("#format").val();
      const years = $("#annees").val();
      const page = paged ? $("#more_images").data("page") : 1;

      $.ajax({
          url: ajaxLoadMore.ajaxurl,
          type: "post",
          data: {
              action: "filter_photos",
              filter: {
                  categorie: categorie,
                  format: format,
                  years: years,
              },
              page: page
          },
          success: function (response) {
              if (paged) {
                  $("#photoContainer").append(response);
              } else {
                  $("#photoContainer").html(response);
              }

              const moreImages = $("#block_more_images");
              if (moreImages.length && !paged) {
                  moreImages.show();
              } else {
                  moreImages.hide();
              }
          },
          error: function (xhr, ajaxOptions, thrownError) {
              console.log(xhr.status);
              console.log(thrownError);
              console.log(ajaxOptions);
              console.log(xhr.responseText);
          }
      });
  }

  $("#categorie, #format, #annees").on("change", function () {
      handleFilter(false);
  });

  $(document).on('click', '#more_images', function () {
      handleFilter(true);
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

