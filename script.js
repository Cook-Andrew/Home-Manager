$(function() {
    //variables
    console.log( "ready!" );
    var open_content = "#home_content";
    var menu_array = [
        '<li class="menu_item" id="home_menu"> Home </li>',
        '<li class="menu_item" id="meals_menu"> Meal Planning </li>',
        '<li class="menu_item" id="bills_menu"> Bill Manager </li>',
        '<li class="menu_item" id="dev_menu"> Web Development Resources </li>',
        '<li class="menu_item" id="splatoon_menu"> Splatoon Resources </li>'
    ];
    var success = false;
    if (localStorage.getItem("success") != null) {
        success = localStorage.getItem("success");
    }

    //setup functions
    $("#home_content").slideToggle();
    menu_array.forEach(element => {
        $("#top_menu").append(element+"<span> | </span>");
        $("#bottom_menu").append(element);
    });

    // event functions
    /*$("#login").on( "click", function() {
        if (success) {
            $(".login").slideToggle();
        }
    });*/

    $(".menu_item").on("click", function() {
        var id = $(this).attr('id');
        id = id.split('_');
        var new_content = "#"+id[0]+"_content";
        $(open_content).slideToggle();
        $(new_content).slideToggle();
        open_content = new_content;
        $('html, body').animate({ scrollTop: $("main").offset().top - 100 }, 500);
    });
});