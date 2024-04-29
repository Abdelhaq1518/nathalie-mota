<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<?php wp_head(); ?>
</head>

<body class="mainContainer">
<?php wp_body_open(); ?>

	<header class="site-header">
		<nav id="site-navigation" class="nav_navigation" role="navigation">
			<div class="logo">
				<a href="#">
					<img src="<?php echo get_stylesheet_directory_uri() . '/assets/images/Logo.png'; ?>" alt="Logo">
				</a>
			</div>
	
			<div class="menu_burger">
				<span class="barre"></span>
				<span class="barre"></span>
				<span class="barre"></span>
			</div>
								
			<div class="navigation">
	
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'menu-1',
						'container'      => 'false',
						'menu_class'     => 'menu_navigation',
					)
				);
				?>
			</div>	
		</nav>

	</header>
