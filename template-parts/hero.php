<?php
function display_random_photo_banner()
{
    // Définition des arguments de la requête
    $photo_args = array(
        'post_type' => 'motaphoto',
        'posts_per_page' => 1,
        'orderby' => 'rand',
    );

    // Exécution de la requête
    $photo_query = new WP_Query($photo_args);

    // Vérification s'il y a des photos disponibles
    if ($photo_query->have_posts()) {
        // Boucle sur les résultats de la requête
        while ($photo_query->have_posts()) {
            $photo_query->the_post();
            ?>
            <div class="banner">
                <h1>Photographe event</h1>
                <?php echo get_the_post_thumbnail(get_the_ID(), 'full'); ?>
            </div>
            <?php
        }
        // Réinitialisation des données de la requête
        wp_reset_postdata();
    }
}

// Appel de la fonction pour afficher la bannière avec une photo aléatoire
display_random_photo_banner();
?>