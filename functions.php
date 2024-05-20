<?php

function theme_enqueue_styles()
{
    // Chargement du style.css du theme
    wp_enqueue_style('theme-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array(), filemtime(get_stylesheet_directory() . '/assets/css/style.css'));

}

// Action qui permet de charger des scripts dans notre theme
add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

/* Ajout de la librairie */
function AjoutLibrairie()
{
    /* librairie JQuery  */
    wp_enqueue_script('JQuery-js', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js', array('jquery'), '3.7.1', true);

    // Bibliotheque Select2 pour les selects de tri
    wp_enqueue_script('select2-js', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js', array('jquery'), '4.0.13', true);
    wp_enqueue_style('select2-css', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css', array());
}
add_action('wp_enqueue_scripts', 'AjoutLibrairie');

/* Chargement des script JS du theme */
function mesScriptsJS()
{

    // script pour Mota (script JQuery)
    wp_enqueue_script('ScriptsJS', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('jquery'), '1.0.0', true);

    // Chargement de plus d'images avec Ajax (script JQuery)
    wp_enqueue_script('ajaxLoadMore', get_stylesheet_directory_uri() . '/assets/js/ajaxLoadMore.js', array('jquery'), '1.0.0', true);

    // Localisation du script pour AJAX
    wp_localize_script(
        'ajaxLoadMore',
        'ajaxLoadMore',
        array(
            'ajaxurl' => admin_url('admin-ajax.php'),

        )
    );
}
add_action('wp_enqueue_scripts', 'mesScriptsJS');


// Astuce pour eviter d'avoir des <p> partout dans CF7
add_filter('wpcf7_autop_or_not', '__return_false');

function enregistrement_nav_menus()
{

    register_nav_menus(
        array(
            'menu-1' => esc_html__('Primaire', 'mota'),
            'menu-2' => esc_html__('Secondaire', 'mota'),
        )
    );
}
add_action('after_setup_theme', 'enregistrement_nav_menus');


/* Chargement photos Ajax load more */
function load_more_photos()
{
    $paged = isset($_POST['page']) ? intval($_POST['page']) + 1 : 1;
    $query_vars = json_decode(stripslashes($_POST['query']), true);

    $query_vars['paged'] = $paged;
    $query_vars['posts_per_page'] = 8;

    $photos = new WP_Query($query_vars);

    if ($photos->have_posts()) {
        ob_start();
        while ($photos->have_posts()) {
            $photos->the_post();
            get_template_part('template-parts/photo_block', null);
        }
        wp_reset_postdata();
        $output = ob_get_clean();

        $is_last_page = $photos->max_num_pages <= $paged;

        wp_send_json_success(array('html' => $output, 'is_last_page' => $is_last_page));
    } else {
        wp_send_json_error('no_posts');
    }

    wp_die();
}
add_action('wp_ajax_nopriv_load_more', 'load_more_photos');
add_action('wp_ajax_load_more', 'load_more_photos');

/* Filtres */
function filter_photos_function()
{
    // Initialisation des variables de filtrage et de pagination
    $filter = isset($_POST['filter']) ? $_POST['filter'] : array();
    $page = isset($_POST['page']) ? intval($_POST['page']) : 1;

    // Définition des arguments de la requête
    $args = array(
        'post_type' => 'photos',
        'posts_per_page' => 8,
        'paged' => $page,
        'tax_query' => array(
            'relation' => 'AND',
        ),
        'meta_query' => array(),
    );

    // Filtrage par catégorie
    if (!empty($filter['categorie'])) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => $filter['categorie'],
        );
    }

    // Filtrage par format
    if (!empty($filter['format'])) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format',
            'field' => 'slug',
            'terms' => $filter['format'],
        );
    }

    // Tri par années (taxonomie)
    if (!empty($filter['years'])) {
        $order = ($filter['years'] == 'date_desc') ? 'ASC' : 'DESC';

        // Ajout de la meta_query pour trier par la taxonomie "annee"
        $args['meta_query'][] = array(
            'key' => 'annee_photo', // Nom du champ ACF pour l'année
            'type' => 'NUMERIC',
        );

        $args['orderby'] = array(
            'meta_value_num' => $order, // Trier par la valeur du champ ACF
        );
    }

    // Exécution de la requête
    $query = new WP_Query($args);

    ob_start();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            // Utilisation du template-part photo_block
            get_template_part('template-parts/photo_block', null);
        }
        wp_reset_postdata();
    } else {
        echo '<p class="critereFiltrage">Aucune photo ne correspond aux critères de filtrage</p>';
    }

    // Vérification de la pagination et affichage du bouton "Charger plus"
    if ($query->max_num_pages > $page) {
        $next_page = $page + 1;
        echo '<div id="block_more_images">';
        echo '<button id="more_images" data-page="' . $next_page . '" data-url="' . admin_url('admin-ajax.php') . '" data-filtered="1">Charger plus</button>';
        echo '</div>';
    }

    $response = ob_get_clean();
    echo $response;

    die();
}

add_action('wp_ajax_filter_photos', 'filter_photos_function');
add_action('wp_ajax_nopriv_filter_photos', 'filter_photos_function');
