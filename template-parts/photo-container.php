<?php
// Récupération des arguments de la requête
$categorie = isset($_POST['categorie']) ? sanitize_text_field($_POST['categorie']) : '';
$orderby = isset($_POST['orderby']) ? sanitize_text_field($_POST['orderby']) : 'date';
$order = isset($_POST['order']) ? sanitize_text_field($_POST['order']) : 'ASC';

$args = array(
    'post_type' => 'photos',
    'posts_per_page' => 8,
    'orderby' => rand(),
    'order' => 'ASC',
);

// Si une catégorie est spécifiée, ajouter à la requête
if (!empty($categorie)) {
    $args['tax_query'] = array(
        array(
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => $categorie,
        ),
    );
}

$photo_block = new WP_Query($args);

// Lignes de débogage
error_log('Total photos found: ' . $photo_block->found_posts);
error_log('Current args: ' . print_r($args, true));

// Nombre total de photos pour déterminer l'affichage du bouton "Charger plus"
$total_photos = $photo_block->found_posts;

wp_localize_script(
    'ajaxLoadMore',
    'ajaxLoadMore',
    array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'query_vars' => json_encode($args),
        'total_photos' => $total_photos
    )
);

if ($photo_block->have_posts()):

    set_query_var('photo_block_args', array('context' => 'photo_block'));
    while ($photo_block->have_posts()):
        $photo_block->the_post();
        get_template_part('template-parts/photo_block', get_post_format());
    endwhile;
    wp_reset_postdata();
else:
    echo 'Aucune photo trouvée.';
endif;


if ($total_photos >= 8): // Afficher le bouton "Charger plus" si plus de 8 photos
    ?>
    <?php

    ?>
    <div id="block_more_images">
        <button id="more_images" data-page="1" data-url="<?php echo admin_url('admin-ajax.php'); ?>">Charger plus</button>
    </div>
<?php endif; ?>