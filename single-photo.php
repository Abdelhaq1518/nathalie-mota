
<?php
/*
Template Name: Single
*/

get_header();
?>

<?php

//ACF
$photo_url = get_field('photos');
$reference = get_field('reference');
$type = get_field('type');

// Taxo
$annee =  get_the_terms(get_the_ID(), 'anneee');
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

<section class="cataloguePhotos">
    <div class="galleryPhotos" >
        <div class="detailPhoto">

            <div class="containerPhoto">
                     <img   src="<?php echo $photo_url; ?>" alt="<?php the_title_attribute(); ?>">
                          <div class="singlePhotoOverlay">
                               <div class="fullscreen-icon" data-full="<?php echo esc_url($photo_url); ?>" data-category="<?php echo esc_attr($categorie_name); ?>" data-reference="<?php echo esc_attr($reference); ?>">
                                     <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/fullscreen.svg" alt="Icone fullscreen">
                               </div>
                          </div>
            </div>

            <div class="selecteurK">
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
    </div>

    <div class="contenairContact">
    	<div class="contact">
    		<p class="interesser"> Cette photo vous intéresse ? </p>
    		<button id="boutonContact" data-reference="<?php echo $reference ?>">Contact</button>
    	</div>

    	<div class="naviguationPhotos">

      	<!-- Conteneur pour la miniature -->
      	<div class="miniPicture" id="miniPicture">
      	  <!-- La miniature sera chargée ici par JavaScript -->
      	</div>

      	<div class="naviguationArrow">
      	 <?php if (!empty($previousPost)) : ?>
      	     <img class="arrow arrow-left" src="<?php echo get_theme_file_uri() . '/assets/images/left.png'; ?>" alt="Photo précédente" data-thumbnail-url="<?php echo $previousThumbnailURL; ?>" data-target-url="<?php echo esc_url(get_permalink($previousPost->ID)); ?>">
      	 <?php endif; ?>

      	 <?php if (!empty($nextPost)) : ?>
      	    <img class="arrow arrow-right" src="<?php echo get_theme_file_uri() . '/assets/images/right.png'; ?>" alt="Photo suivante" data-thumbnail-url="<?php echo $nextThumbnailURL; ?>" data-target-url="<?php echo esc_url(get_permalink($nextPost->ID)); ?>">
      	 <?php endif; ?>
      	</div>

      </div>
    </div>
</section>

<section>
	<div class="titreVousAimerezAussi">
	     <h3>VOUS AIMEREZ AUSSI</h3>
	</div>

	<div class="twins_photo">

	  <?php

	  $categories = get_the_terms(get_the_ID(), 'categorie');
	     if ($categories && !is_wp_error($categories)) {
	           $category_ids = wp_list_pluck($categories, 'term_id');
	               $args = array(
	                   'post_type' => 'motaphoto',
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

	           $compteur = 0;
	           $related_block = new WP_Query($args);
						     while ($related_block->have_posts()) {
						               $related_block->the_post();
						               $photo_url = get_the_post_thumbnail_url(null, "large");
						               $reference = get_field('reference');
						               $categorie_name = isset($categories[0]) ? $categories[0]->name : '';

						      get_template_part('template-parts/photo_block');
						      $compteur++;
						     }
	           
						   if ($compteur ===0) {
						     echo "<p class='photoNotFound'> Pas de photo similaire trouvée pour la catégorie ''" . $categorie_name . "'' </p>"; 
						     }
	     } 
	  ?>

	</div>
	<!--
	<button id="toutesLesPhotos" class="bouton">
		<a href="<?php echo home_url(); ?>#containerPhoto">Toutes les photos</a>
	</button>
	-->
	
     <button id="toutesLesPhotos">Toutes les photos</button>

		<?php
		$chemin_projet = ABSPATH;
		$nom_repertoire = basename($chemin_projet);
		//echo "Nom du répertoire du projet WordPress : " . $nom_repertoire;
		?>
		
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const monBouton = document.getElementById('toutesLesPhotos');
            
            if (monBouton) {
                monBouton.addEventListener('click', function() {
                    window.location.assign('<?php echo "http://localhost/". $nom_repertoire; ?>');
                });
            } else {
                console.error("L'élément monBouton n'existe pas dans le document.");
            }
        });
    </script>



     </div>
	
</section>


<?php get_footer(); ?>



