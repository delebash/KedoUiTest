//var templateLoader = (function ($, host) {
//    return {
//        loadExtTemplate: function (name, path) {
//            $.ajax({
//                async: false,
//                url: path,
//                cache: false,
//                success: function (result) {
//                    $("body").append(result);
//                },
//                error: function (result) {
//                    alert("Error Loading View/Template -- TODO: Better Error Handling");
//                }
//            });
//        }
//    };
//})(jQuery, document);
//
//$(function () {
//    var views = {};
//    templateLoader.loadExtTemplate("layout", "./views/layout.html");
//    var layout = new kendo.Layout($('#layout').html());
//    layout.render($("#app"));
//
//    var router = new kendo.Router();
//    var addRoute = function (route, name, path, forceRemoteLoad) {
//        forceRemoteLoad = typeof forceRemoteLoad !== "undefined" ? forceRemoteLoad : false;
//        router.route(route, function () {
//            kendo.fx($("#main")).slideInRight().reverse().then(function () { // transition, slide view left
//                var isRemotelyLoaded = false;
//                if (views[name] == null || forceRemoteLoad) {   // check if we have already loaded in cache, could store this in browser local storage for larger apps
//                    isRemotelyLoaded = true;
//                    templateLoader.loadExtTemplate(name, path); // load the view
//                    views[name] = new kendo.View(('#' + name)); // add the view to cache
//                }
//
//                var url = "";
//                if(route == "/")
//                {
//                    url = "#"
//                }
//                else {
//                    url = "#" + route
//                }
//
//                $('.navbar li.active').removeClass('active');
//                $('ul.nav > li > a[href="' + url + '"]').parent().addClass('active');
//
//                layout.showIn("#main", views[name]); // switch view
//
//                $(document).trigger("viewSwtichedEvent", { route: route, name: name, path: path, isRemotelyLoaded: isRemotelyLoaded }); // publish event view has been loaded (EventAggregator pattern)
//                kendo.fx($("#main")).slideInRight().play(); // transition, slide view back to the right (center)
//            });
//        });
//    };
//
//    addRoute("/", "home", "./views/home.html");
//    addRoute("/about", "about", "./views/about.html");
//    addRoute("/contactUs", "contactUs", "./views/contactUs.html");
//    addRoute("/contacts", "contacts", "./views/contacts.html");
//    addRoute("/contactEdit/:id", "contactEdit", "./views/contactEdit.html");
//
//    router.start();
//});


var kendoViews = {};
var templateLoader = (function ($, host) {
    return {
        loadExtTemplate: function (name, path, forceRemoteLoad) {
            var isRemotelyLoaded = false; // was view loaded remotely from server or from cache (e.g. view was loaded for the first time
            if (kendoViews[name] == null || forceRemoteLoad) { // check if we have already loaded in cache, could store this in browser local storage for larger apps
                isRemotelyLoaded = true;
                $.ajax({
                    async: false,
                    url: path,
                    cache: false,
                    success: function (result) {
                        kendoViews[name] = new kendo.View(result); // cache view
                    },
                    error: function (result) {
                        alert("Error Loading View/Template -- TODO: Better Error Handling");
                    }
                });
            }
            return { isRemotelyLoaded: isRemotelyLoaded, view: kendoViews[name] }; //return view that was was from cache or that was just cached
        }
    };
})(jQuery, document);

var router = new kendo.Router();

$(function () {
    //templateLoader.loadExtTemplate();
    var result = templateLoader.loadExtTemplate("layout", "./views/layout.html"); // load the view
    // $("body").append(result.view);
    //   $("body").append(kendoViews["layout"].render());
    // $("#app").append();
    //$("#app").append(result.render());
//                layout.showIn("#viewRegion", result.view); // switch view
    //debugger


    var layout = new kendo.Layout(result.view.render());
    layout.render("#app");
    //   var index = new kendo.View('<span>Hello World!</span>');

    //  index.render("#app");

    var addRoute = function (route, name, path, forceRemoteLoad) {
        forceRemoteLoad = typeof forceRemoteLoad !== "undefined" ? forceRemoteLoad : false;
        router.route(route, function () {
            kendo.fx($("#viewRegion")).slideInRight().reverse().then(function () { // transition, slide view left
                var result = templateLoader.loadExtTemplate(name, path, forceRemoteLoad); // load the view
                layout.showIn("#viewRegion", result.view); // switch view
                $(document).trigger("viewSwtichedEvent", { route: route, name: name, path: path, isRemotelyLoaded: result.isRemotelyLoaded }); // publish event view has been loaded (EventAggregator pattern)
                kendo.fx($("#viewRegion")).slideInRight().play(); // transition, slide view back to the right (center)
            });
        });
    };


    addRoute("/", "home", "./views/home.html");
    addRoute("/about", "about", "./views/about.html");
    addRoute("/contactUs", "contactUs", "./views/contactUs.html");
    addRoute("/contacts", "contacts", "./views/contacts.html");
    addRoute("/contactEdit/:id", "contactEdit", "./views/contactEdit.html");

//    addRoute("/", "home", "/spa/product/home");
//    addRoute("/list", "list", "/spa/product/list");
//    addRoute("/listAsync", "listAsync", "/spa/product/listAsync");
//    addRoute("/edit/:id", "edit", "/spa/product/edit");

    router.start();
});


$(document).ready(function () {
    // $('ul.nav > li').removeClass('active');
//          // var page = $.QueryString("page");
//            var url = window.location;
//           var loc =  document.location.pathname
//           var hash =  document.location.hash
//         //  debugger;
//          //$('ul.nav > li').removeClass('active');
    // $('ul.nav > li > a[href="' + url + '"]').parent().removeClass('active');
// // debugger;
    //$ul.find('li.active').removeClass('active');
//                        $('ul.nav a').filter(function() {
//                            return this.href == url;
//                        }).parent().removeClass('active');
//                        //Will also work for relative and absolute hrefs
//                        $('ul.nav a').filter(function() {
//                            return this.href == url;
//                        }).parent().addClass('active');
//
//            $('ul.nav > li').click(function (e) {
//             //   e.preventDefault();
//                $('ul.nav > li').removeClass('active');
//                $(this).addClass('active');
//            });
});