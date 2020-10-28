function scroll_to(clicked_link, nav_height) {
    var element_class = clicked_link.attr('href').replace('#', '.');
    var scroll_to = 0;
    if (element_class != '.top-content') {
        element_class += '-container';
        scroll_to = $(element_class).offset().top - nav_height;
    }
    if ($(window).scrollTop() != scroll_to) {
        $('html, body').stop().animate({ scrollTop: scroll_to }, 1000);
    }
}

const updateProperties = (elem, state) => {
    elem.style.setProperty('--x', `${state.x}px`)
    elem.style.setProperty('--y', `${state.y}px`)
    elem.style.setProperty('--width', `${state.width}px`)
    elem.style.setProperty('--height', `${state.height}px`)
    elem.style.setProperty('--radius', state.radius)
    elem.style.setProperty('--scale', state.scale)
}

jQuery(document).ready(function() {

    /*
        Navigation
    */
    $('a.scroll-link').on('click', function(e) {
        e.preventDefault();
        scroll_to($(this), $('nav').outerHeight());
    });
    // toggle "navbar-no-bg" class
    $('.top-content .text').waypoint(function() {
        $('nav').toggleClass('navbar-no-bg');
    });

    /*
        Background slideshow
    */
    $('.top-content').backstretch("assets/img/backgrounds/back.png");
    $('.call-to-action-container').backstretch("assets/img/backgrounds/1.jpg");
    $('.testimonials-container').backstretch("assets/img/backgrounds/1.jpg");

    $('#top-navbar-1').on('shown.bs.collapse', function() {
        $('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function() {
        $('.top-content').backstretch("resize");
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function() {
        $('.testimonials-container').backstretch("resize");
    });

    /*
        Wow
    */
    new WOW().init();

});


jQuery(window).load(function() {

    /*
    	Hidden images
    */
    $(".testimonial-image img").attr("style", "width: auto !important; height: auto !important;");

    document.querySelectorAll('.cursor').forEach(cursor => {

        let onElement

        const createState = e => {
            const defaultState = {
                x: e.clientX,
                y: e.clientY,
                width: 30,
                height: 30,
                radius: '50%'
            }

            const computedState = {}

            if (onElement != null) {
                const { top, left, width, height } = onElement.getBoundingClientRect()
                const radius = window.getComputedStyle(onElement).borderTopLeftRadius

                computedState.x = left + width / 2
                computedState.y = top + height / 2
                computedState.width = width
                computedState.height = height
                computedState.radius = radius
            }

            return {
                ...defaultState,
                ...computedState
            }
        }

        document.addEventListener('mousemove', e => {
            const state = createState(e)
            updateProperties(cursor, state)
        })

        document.querySelectorAll('a, button').forEach(elem => {
            elem.addEventListener('mouseenter', () => (onElement = elem))
            elem.addEventListener('mouseleave', () => (onElement = undefined))
        })
    })

});