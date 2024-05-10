<?php
// Fonction pour générer les options de sélection des termes de taxonomie
function generate_taxonomy_options($taxonomy_slug, $label)
{
    $terms = get_terms($taxonomy_slug);

    if ($terms && !is_wp_error($terms)) {
        echo "<select id='$taxonomy_slug' class='custom-select taxonomy-select'>";
        echo "<option value=''>$label</option>";

        foreach ($terms as $term) {
            echo "<option value='$term->slug'>$term->name</option>";
        }

        echo "</select>";
    }
}

// Affichage des filtres
$taxonomy = [
    'categorie' => 'CATÉGORIES',
    'format' => 'FORMATS',
    'annees' => 'TRIER PAR',
];
?>

<div id="filtrePhoto">
    <div class="left-section">
        <?php foreach ($taxonomy as $taxonomy_slug => $label): ?>
            <?php generate_taxonomy_options($taxonomy_slug, $label); ?>
        <?php endforeach; ?>
    </div>

    <div class="right-section">
        <div class="taxonomy-container">
            <select id="annees" class="custom-select annees-select">
                <option value=""><?php echo $taxonomy['annees']; ?></option>
                <option value="date_asc">A partir des plus récentes</option>
                <option value="date_desc">A partir des plus anciennes</option>
            </select>
        </div>
    </div>
</div>