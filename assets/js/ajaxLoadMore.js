// Chargement de plus d'images avec Ajax
console.log("ajax JS chargé");

jQuery(document).ready(function ($) {
    function loadMorePhotos(paged) {
        const page = paged ? $("#more_images").data("page") : 1;
        const query_vars = $("#photoContainer").data("query_vars");

        $.ajax({
            url: ajaxLoadMore.ajaxurl,
            type: "post",
            data: {
                action: "load_more",
                query_vars: JSON.stringify(query_vars),
                page: page
            },
            success: function (response) {
                if (response.success) {
                    if (paged) {
                        $("#photoContainer").append(response.data.html);
                        $("#more_images").data('page', page + 1); // Increment page number
                    } else {
                        $("#photoContainer").html(response.data.html);
                        $("#more_images").data('page', 2); // Reset page number
                    }

                    if (response.data.is_last_page) {
                        $("#more_images").hide();
                    } else {
                        $("#more_images").show();
                    }
                } else {
                    $("#more_images").hide();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr.responseText);
            }
        });
    }

    $(document).on('click', '#more_images', function () {
        loadMorePhotos(true);
    });

    // Initial load
    const initialQueryVars = {
        post_type: 'photos',
        posts_per_page: 8,
        paged: 1,
    };
    $("#photoContainer").data("query_vars", initialQueryVars);
});
