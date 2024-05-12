<?php
/*
Template Name: Single
*/

get_header();
?>

<?php

//Champs ACF
$photo_url = get_field('photos');
$reference = get_field('reference');
$type = get_field('type');

// Taxonomies
$annee = get_the_terms(get_the_ID(), 'annee');
$annee_name = $annee[0]->name;

$categories = get_the_terms(get_the_ID(), 'categorie');
$categorie_name = $categories[0]->name;

$formats = get_the_terms(get_the_ID(), 'format');
$formats_name = $formats[0]->name;


// Définissez les URLs des vignettes pour le post précédent et suivant
$nextPost = get_next_post();
$previousPost = get_previous_post();
$previousThumbnailURL = $previousPost ? get_the_post_thumbnail_url($previousPost->ID, 'thumbnail') : '';
$nextThumbnailURL = $nextPost ? get_the_post_thumbnail_url($nextPost->ID, 'thumbnail') : '';

?>

<section class="catalogue">
	<div class="gallerie">
		<div class="photoDetails">

			<div class="photoContainer">
				<img src="<?php echo $photo_url; ?>" alt="<?php the_title_attribute(); ?>">
			</div>

			<div class="selectCategories">
				<h2><?php echo get_the_title(); ?></h2>

				<div class="taxonomies">
					<p class="Majuscule">RÉFÉRENCE : <?php echo $reference ?></p>
					<p class="Majuscule">CATÉGORIE : <?php echo $categorie_name ?></p>
					<p class="Majuscule">FORMAT : <?php echo $formats_name ?> </p>
					<p class="Majuscule">TYPE : <?php echo $type ?> </p>
					<p>ANNÉE : <?php echo $annee_name ?> </p>
				</div>
			</div>
		</div>

		<div class="contactContainer">
			<div class="contact">
				<p class="interesser"> Cette photo vous intéresse ? </p>
				<button id="boutonContact" data-reference="<?php echo $reference ?>">Contact</button>
			</div>

			<div class="photosNav">

				<!-- Conteneur pour la miniature -->
				<div class="miniature" id="miniature">
					<!-- La miniature sera chargée ici par JavaScript -->
				</div>

				<div class="flecheNav">
					<?php if (!empty($previousPost)): ?>
						<img class="arrow arrow-left" src="<?php echo get_theme_file_uri() . '/assets/images/left.png'; ?>"
							alt="Photo précédente" data-thumbnail-url="<?php echo $previousThumbnailURL; ?>"
							data-target-url="<?php echo esc_url(get_permalink($previousPost->ID)); ?>">
					<?php endif; ?>

					<?php if (!empty($nextPost)): ?>
						<img class="arrow arrow-right"
							src="<?php echo get_theme_file_uri() . '/assets/images/right.png'; ?>" alt="Photo suivante"
							data-thumbnail-url="<?php echo $nextThumbnailURL; ?>"
							data-target-url="<?php echo esc_url(get_permalink($nextPost->ID)); ?>">
					<?php endif; ?>
				</div>

			</div>
		</div>
	</div>

	<section>
		<div class="vousAimerezAussi">
			<h3>VOUS AIMEREZ AUSSI</h3>
		</div>

		<div class="photoSimilaire">

			<?php

			$categories = get_the_terms(get_the_ID(), 'categorie');
			if ($categories && !is_wp_error($categories)) {
				$category_ids = wp_list_pluck($categories, 'term_id');
				$args = array(
					'post_type' => 'photos',
					'posts_per_page' => 2,
					'orderby' => 'rand',
					'post__not_in' => array(get_the_ID()),
					'tax_query' => array(
						array(
							'taxonomy' => 'categorie',
							'field' => 'term_id',
							'terms' => $category_ids,
						),
					),
				);

				$query = new WP_Query($args);

				if ($query->have_posts()) {
					while ($query->have_posts()) {
						$query->the_post();
						// Afficher les détails de la photo
						$photo_url = get_the_post_thumbnail_url(null, "large");
						$reference = get_field('reference');
						$categorie_name = isset($categories[0]) ? $categories[0]->name : '';

						get_template_part('template-parts/photo_block');
					}
					wp_reset_postdata(); // Réinitialiser la requête
				} else {
					// Aucune photo similaire trouvée
					echo "<p class='photoNotFound'> Pas de photo similaire trouvée pour la catégorie '" . $categorie_name . "' </p>";
				}
			}
			?>

		</div>
	</section>
</section>

<?php get_footer(); ?>