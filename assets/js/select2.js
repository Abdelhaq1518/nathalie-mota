// gestion de select2
console.log("select2 JS est lancé");
$(function () {
  // Initialise le plugin Select2 sur les éléments avec la classe ".selector"
  $(".selector").select2({
    // Définit la position du menu déroulant en dessous
    dropdownPosition: "below",
  });
});
