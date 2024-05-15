
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
// Fonction principale exécutée lorsque le DOM est prêt
$(function () {
    // Sélection des éléments du DOM nécessaires
    const $lightbox = $("#lightbox");
    const $lightboxImage = $(".lightboxImg");
    const $lightboxCategory = $(".lightboxCategorie");
    const $lightboxReference = $(".lightboxReference");
    let currentIndex = 0; // Indice de l'image actuellement affichée dans la lightbox
  
    // Fonction pour mettre à jour le contenu de la lightbox en fonction de l'index de l'image
    function updateLightbox(index) {
      const $images = $(".fullscreen-icon");
      const $image = $images.eq(index);
  
      // Récupération des données associées à l'image
      const categoryText = $image.data("category").toUpperCase();
      const referenceText = $image.data("reference").toUpperCase();
  
      // Mise à jour des éléments de la lightbox avec les nouvelles données
      $lightboxImage.attr("src", $image.data("full"));
      $lightboxCategory.text(categoryText);
      $lightboxReference.text(referenceText);
      currentIndex = index;
    }
  
    // Fonction pour ouvrir la lightbox avec une image spécifique (index)
    function openLightbox(index) {
      updateLightbox(index);
      $lightbox.show();
    }
  
    // Fonction pour fermer la lightbox
    function closeLightbox() {
      $lightbox.hide();
    }
  
    // Fonction pour attacher les événements aux images
    
    function attachEventsToImages() {
      console.log ("imagesLightbox est lancé")
      const $images = $(".fullscreen-icon");
      $images.off("click", imageClickHandler);
      $images.on("click", imageClickHandler);
    }
  
    // Gestionnaire d'événement pour le clic sur une image
    function imageClickHandler() {
      const $images = $(".fullscreen-icon");
      const index = $images.index($(this).closest(".fullscreen-icon"));
      openLightbox(index);
    }
  
    // Attachement des événements aux images lors du chargement initial
    attachEventsToImages();
  
    // Gestionnaire d'événement pour le clic sur le bouton de fermeture
    $(".closeLightbox").on("click", closeLightbox);
  
    // Gestionnaire d'événement pour le clic sur le bouton précédent
    $(".lightboxPrevious").on("click", function () {
      const $images = $(".fullscreen-icon");
      currentIndex = currentIndex > 0 ? currentIndex - 1 : $images.length - 1;
      updateLightbox(currentIndex);
    });
  
    // Gestionnaire d'événement pour le clic sur le bouton suivant
    $(".lightboxNext").on("click", function () {
      const $images = $(".fullscreen-icon");
      currentIndex = currentIndex < $images.length - 1 ? currentIndex + 1 : 0;
      updateLightbox(currentIndex);
    });
  
    // Gestionnaire d'événement pour le changement de sélection des catégories
    $(".taxonomy-select").on("change", function() {
      const selectedCategory = $(this).val();
      const $images = $(".fullscreen-icon");
  
      // Filtrer les images en fonction de la catégorie sélectionnée
      const $filteredImages = $images.filter(`[data-category="${selectedCategory}"]`);
  
      // Si des images correspondent à la catégorie sélectionnée, ouvrir la lightbox avec la première image
      if ($filteredImages.length > 0) {
        openLightbox($images.index($filteredImages.first()));
      }
    });
  
    // Réattachez les gestionnaires d'événements après le chargement dynamique du contenu
    $(document).ajaxComplete(function () {
      attachEventsToImages();
    });
  });
  

