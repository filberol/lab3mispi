//Menu button action listener
$("button.menu-button").click(function () {
    $("#description").toggleClass("active");
    $("li.header-block").toggleClass("active");
});