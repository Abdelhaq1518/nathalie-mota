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
