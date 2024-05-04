<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/


 */

get_header();
?>

	<main>

		<section id="header">
					<?php get_template_part('template-parts/hero'); ?>
		</section>

		<section id="filter_photos">
					<?php get_template_part('template-parts/photo-filtre'); ?>
		</section>

		<section id="containerPhoto" class="block_du_catalogue">
					<?php get_template_part('template-parts/photo-container'); ?>
		</section>

    <script>
        var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";
    </script>
    
	</main>

<?php
get_footer();