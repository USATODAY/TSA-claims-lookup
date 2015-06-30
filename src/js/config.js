define([
    'jquery'
], function(jQuery) {
    var isMobile, fb_app_id;
    var isTablet = false;

    var staticInfo = JSON.parse(jQuery(".staticinfo").html());

    if (staticInfo.platform == "desktop") {
        isMobile = false;
    } else {
        isMobile = true;
    }

    if (isMobile === false) {
        if (Modernizr.touch && window.innerWidth < 1100) {
            isTablet = true;
        }
    }

    fb_app_id = staticInfo.facebook.app_id;

    return {
        'image_path': 'http://www.gannett-cdn.com/experiments/usatoday/2015/06/tsa/img/',
        shareImage: 'http://www.gannett-cdn.com/experiments/usatoday/2015/06/tsa/img/fb-post.jpg',
        staticInfo: staticInfo,
        fb_app_id: fb_app_id,
        isMobile: isMobile,
        isTablet: isTablet
    };
});
