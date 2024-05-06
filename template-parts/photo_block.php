<?php
$photo_url = get_the_post_thumbnail_url(null, "large");
$photo_titre = get_the_title();
$post_url = get_permalink();
$reference = get_field('reference');

// Récupération de la catégorie
$categories = get_the_terms(get_the_ID(), 'categorie');
$categorie_name = '';
if ($categories && !is_wp_error($categories)) {
    $categorie_name = $categories[0]->name;
}
?>

<div class="blocPhotoSimilaire">
    <img src="<?php echo esc_url($photo_url); ?>" alt="<?php the_title_attribute(); ?>">

    <div class="overlay">
        <!-- Affichage du titre de la photo et de sa catégorie -->
        <h2 class="Majuscule"><?php echo esc_html($photo_titre); ?></h2>
        <h3 class="Majuscule"><?php echo esc_html($categorie_name); ?></h3>

        <!-- Bouton pour voir la photo -->
        <div class="eye-icon">
            <a href="<?php echo esc_url($post_url); ?>">
                <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/icon_eye.svg"
                    alt="voir la photo">
            </a>
        </div>

        <!-- Bouton pour le mode plein écran -->
        <div class="fullscreen-icon" data-full="<?php echo esc_url($photo_url); ?>"
            data-category="<?php echo esc_attr($categorie_name); ?>"
            data-reference="<?php echo esc_attr($reference); ?>">
            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/fullscreen.svg"
                alt="Icone fullscreen">
        </div>
    </div>
</div>