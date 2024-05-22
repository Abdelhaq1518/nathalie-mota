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
  

