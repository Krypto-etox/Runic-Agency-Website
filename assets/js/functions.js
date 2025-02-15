jQuery(document).ready(function ($) {
    "use strict";
    if ($('.panel-section').length > 0) {
        let panelSection = gsap.utils.toArray(".panel-section");
        let panelWrap = $(this).find('.panel-wrap');
        let end = parseInt(panelWrap.length * 150)+"%";
        ScrollTrigger.matchMedia({
            "(min-width:992px)": function() {
                if(panelWrap.length > 1) {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: panelSection,
                            end: "+="+end,
                            scrub: true,
                            pin: true,
                            snap: 1 / (panelWrap.length - 1)
                        }
                    });
                    for (let i = 1; i < panelWrap.length; i++) {
                        tl.from(panelWrap.eq(i), 1, {xPercent: 100}, "+=0.5");
                    }
                }
            }
        });
    }

    function mobileOnlySlider($slidername, $dots, $arrows, $breakpoint) {
        var slider = $($slidername);
        var settings = {
            mobileFirst: true,
            dots: $dots,
            arrows: $arrows,
            infinite: false,
            responsive: [
                {
                    breakpoint: $breakpoint,
                    settings: "unslick"
                }
            ]
        };
        slider.slick(settings);
        $(window).on("resize", function () {
            if ($(window).width() > $breakpoint) {
                return;
            }
            if (!slider.hasClass("slick-initialized")) {
                return slider.slick(settings);
            }
        });
    }

    if ($(".blog-list.slider").length > 0) {
        mobileOnlySlider(".blog-list.slider", true, true, 767);
    }

    if ($('.na-list').length > 0) {
        $('.na-list').slick({
            infinite: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            arrows: true,
            dots: true
        });
    }

    if ($('.slide-video').length > 0) {
        $('.slide-video').simpleLightboxVideo();
    }
    function runSplit() {
        let textRun = new SplitType('.text-run', {types: 'line, works'});
        $('.line').append('<div class="line-mask"></div>');
        $(".line").each(function (index) {
            let triggerElement = $(this);
            let targetElement = $(this).find('.line-mask');

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "top center",
                    end: "bottom center",
                    scrub: true
                }
            });
            tl.to(targetElement, {width: "0%"})
        });
    }
    if ($('.text-run').length > 0) {
        runSplit();
    }
    if ($('.text-opacity').length > 0) {
        $(".text-opacity").each(function () {
            gsap.to($(this), {
                autoAlpha: 1,
                ease: "power1.in",
                scrollTrigger: {
                    trigger: $(this),
                    pin: false,
                    scrub: true
                }
            });
        });
    }
    if ($('.tabs-transform').length > 0) {
        $(".tabs-transform").each(function () {
            let tabsTransform = gsap.utils.toArray($(this));
            let tabsWidth = $(this).find('.tabs-width');
            let tabsBorder = $(this).find('.tabs-border');
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: tabsTransform,
                    scrub: 1,
                    start: "top center",
                    end: "+=120px",
                    pin: false,
                    pinSpacing: false
                }
            });
            tl.to(tabsWidth, {width: "100%"})
                .to(tabsBorder, 1, {borderWidth: 0}, "-=0.5")
        })
    }
    $(document).on('click', '.s-tabs-menu .tab-link', function () {
        $('.s-tabs-menu .tab-link').removeClass('s-current');
        $(this).addClass('s-current');
        let currentTab = $(this).attr('href');
        $('.s-tab-content .s-tab-pane').removeClass('s-tab-active');
        $(currentTab).addClass('s-tab-active');
        if ($(".tabs-sticky").length > 0) {
            $('html,body').animate({
                scrollTop: $('.tabs-section').offset().top - 40
            }, 1000);
        }
        if ($(".s-tab-active .tabs-pin").length > 0) {
            ScrollTrigger.matchMedia({
                "(min-width:992px)": function() {
                    $(".s-tab-active .tabs-pin").each(function () {
                        let tabsPin = $(this);
                        gsap.to(tabsPin, {
                            scrollTrigger: {
                                trigger: tabsPin,
                                toggleActions: "play none none reverse",
                                pin: true,
                                pinSpacing: false
                            }
                        });
                    });
                }
            });
        }
        return false;
    });
    if ($('.tabs-section').length > 0) {
        let tabsSection = gsap.utils.toArray(".tabs-section");
        let tabsSticky = $(this).find('.tabs-sticky');
        ScrollTrigger.matchMedia({
            "(min-width:992px)": function() {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: tabsSection,
                        scrub: 1,
                        end: "75%",
                        pin: tabsSticky,
                        pinSpacing: false
                    }
                });
                $(".s-tab-active .tabs-pin").each(function () {
                    let tabsPin = $(this);
                    gsap.to(tabsPin, {
                        scrollTrigger: {
                            trigger: tabsPin,
                            toggleActions: "play none none reverse",
                            pin: true,
                            pinSpacing: false
                        }
                    });
                });
            }
        });
    }
    if ($('.overview-pin').length > 0) {
        ScrollTrigger.matchMedia({
            "(min-width:992px)": function() {
                $(".overview-pin").each(function () {
                    let overviewPin = $(this);
                    gsap.to(overviewPin, {
                        scrollTrigger: {
                            trigger: overviewPin,
                            toggleActions: "play none none reverse",
                            pin: true,
                            pinSpacing: false
                        }
                    });
                });
            }
        });
    }
    if ($('.marquee-wrap').length > 0) {
        let marqueeWrap = $('.marquee-wrap');
        let marqueeToLeft = $(this).find('.marquee-toleft');
        let marqueeToRight = $(this).find('.marquee-toright');
        let toLeft = gsap.to(marqueeToLeft, {
            xPercent: -100,
            repeat: -1,
            duration: 40,
            ease: "linear"
        }).totalProgress(0.5);
        let toRight = gsap.to(marqueeToRight, {
            xPercent: 100,
            repeat: -1,
            duration: 37,
            ease: "linear"
        }).totalProgress(0.5);
        gsap.set(marqueeWrap, {xPercent: -150});
        gsap.to(toLeft, {
            timeScale: 1
        });
        gsap.to(toRight, {
            timeScale: 1
        });
    }
    if ($('.zoom-wrap').length > 0) {
        let zoomWrap = gsap.utils.toArray(".zoom-wrap");
        let zoomTop = $(this).find('.zoom-top');
        let zoomTriangle = $(this).find('.zoom-triangle');
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: zoomWrap,
                scrub: 1,
                start: "top top",
                end: "bottom bottom",
                pin: zoomTop,
                pinSpacing: false,
                snap: 1
            }

        });
        tl.to(zoomTriangle, {
            width: "calc(300vh + 300vw)",
            height: "calc(300vh + 300vw)",
            backgroundSize: "calc(100vh + 100vw)"
        });
    }

    const showAnim = gsap.from('.header', {
        yPercent: -100,
        paused: true,
        duration: 0.4
    }).progress(1);

    ScrollTrigger.create(
        {
            start: "top top",
            end: 99999,
            toggleClass: {className: 'sticky', targets: '.header'},
            onUpdate: (self) => {
            if(self.direction === -1){
                showAnim.play();
            } else {
                showAnim.reverse();
            }
        }
    });

    $(".mc4wp-form").validate({
        submitHandler: function() {
            $(".mc4wp-response").show();
        }
    });
    $(".wpcf7-form").validate({
        submitHandler: function() {
            $(".wpcf7-response-output").show();
        }
    });

    $(document).on('click', '.dropdown-accordion .dropdown-toggle', function () {
        var dropdownAccordion = $(this).parents('.dropdown-accordion');
        var dropDown = $(this).parents('.dropdown');
        if (dropDown.hasClass("active")) {
            dropDown.removeClass("active").find('.dropdown-list').slideUp();
        } else {
            dropdownAccordion.find('.dropdown.active .dropdown-list').slideUp();
            dropdownAccordion.find('.dropdown.active').removeClass("active");
            dropDown.addClass("active").find(".dropdown-list").slideDown();
        }
        return false;
    });

    if ($('.content-sticky .detail-left').length > 0) {
        $('.content-sticky .detail-left').theiaStickySidebar({
            additionalMarginTop: 82
        });
    }
    if ($('.world-slide').length > 0) {
        const worldSlide = new Swiper('.world-slide', {
            loop: false,
            slidesPerView: 2.25,
            spaceBetween: 30,
            slideToClickedSlide: false,
            observer: true,
            observeParents: true,
            breakpoints: {
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 30
                },
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 20
                }
            }
        });
    }
    $(window).resize(function () {
        if ($('.text-run').length > 0) {
            runSplit();
        }
    });
});
