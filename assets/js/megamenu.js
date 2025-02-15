(function (a) {
    function h() {
        var i = jQuery("body").innerWidth();
        i += c();
        if (i > 991) {
            a(".runic-menu-wapper").each(function () {
                if (a(this).length > 0) {
                    var j = a(this);
                    if (j != "undefined") {
                        var l = 0, k = j.offset();
                        l = j.innerWidth();
                        setTimeout(function () {
                            a(".main-menu .item-megamenu").each(function (p, o) {
                                a(o).children(".megamenu").css({"max-width": l + "px"});
                                var v = a(o).children(".megamenu").outerWidth(), r = a(o).outerWidth(), m = k.left,
                                    n = (m + l), q = a(o).offset().left, t = (v / 2 > (q - m)), u = ((v / 2 + q) > n);
                                a(o).children(".megamenu").css({left: "-" + (v / 2 - r / 2) + "px"});
                                if (t) {
                                    var s = (q - m);
                                    a(o).children(".megamenu").css({left: -s + "px"})
                                }
                                if (u && !t) {
                                    var s = (q - m);
                                    s = s - (l - v);
                                    a(o).children(".megamenu").css({left: -s + "px"})
                                }
                            })
                        }, 100)
                    }
                }
            })
        }
    }

    function b() {
        var i = parseInt(a(".container").innerWidth()) - 30;
        a(".runic-menu-wapper.vertical.support-mega-menu").each(function () {
            var j = parseInt(a(this).actual("width")), k = (i - j);
            if (k > 0) {
                a(this).find(".megamenu").each(function () {
                    var l = a(this).attr("style");
                    l = (l == undefined) ? "" : l;
                    l = l + " max-width:" + k + "px;";
                    a(this).attr("style", l)
                })
            }
        })
    }

    function c() {
        var i = jQuery('<div style="width:100%;height:200px;">test</div>'),
            j = jQuery('<div style="width:200px;height:150px;position:absolute;top:0;left:0;visibility:hidden;overflow:hidden;"></div>').append(i),
            k = i[0], l = j[0];
        jQuery("body").append(l);
        var m = k.offsetWidth;
        j.css("overflow", "scroll");
        var n = l.clientWidth;
        j.remove();
        return (m - n)
    }

    function f() {
        if (!a(".runic-menu-clone-wrap").length && a(".runic-clone-mobile-menu").length > 0) {
            a("body").prepend('<div class="runic-menu-clone-wrap"><div class="runic-menu-panels-actions-wrap"><a class="runic-menu-close-btn runic-menu-close-panels" href="#">x</a></div><div class="runic-menu-panels"></div></div>')
        }
        var j = 0, k = Array();
        if (!a(".runic-menu-clone-wrap .runic-menu-panels #runic-menu-panel-main").length) {
            a(".runic-menu-clone-wrap .runic-menu-panels").append('<div id="runic-menu-panel-main" class="runic-menu-panel runic-menu-panel-main"><ul class="depth-01"></ul></div>')
        }
        a(".runic-clone-mobile-menu").each(function () {
            var i = a(this), p = i, m = p.attr("id"), l = "runic-menu-clone-" + m;
            if (!a("#" + l).length) {
                var n = i.clone(true);
                n.find(".menu-item").addClass("clone-menu-item");
                n.find("[id]").each(function () {
                    n.find('.vc_tta-panel-heading a[href="#' + a(this).attr("id") + '"]').attr("href", "#" + e(a(this).attr("id"), "runic-menu-clone-"));
                    n.find('.runic-menu-tabs .tabs-link a[href="#' + a(this).attr("id") + '"]').attr("href", "#" + e(a(this).attr("id"), "runic-menu-clone-"));
                    a(this).attr("id", e(a(this).attr("id"), "runic-menu-clone-"))
                });
                n.find(".runic-menu-menu").addClass("runic-menu-menu-clone");
                var o = a(".runic-menu-clone-wrap .runic-menu-panels #runic-menu-panel-main ul");
                o.append(n.html());
                d(o, j)
            }
        })
    }

    function d(j, k) {
        if (j.find(".menu-item-has-children").length) {
            j.find(".menu-item-has-children").each(function () {
                var m = a(this);
                d(m, k);
                var i = "runic-menu-panel-" + k;
                while (a("#" + i).length) {
                    k++;
                    i = "runic-menu-panel-" + k
                }
                m.prepend('<a class="runic-menu-next-panel" href="#' + i + '" data-target="#' + i + '"></a>');
                var l = a("<div>").append(m.find("> .submenu").clone()).html();
                m.find("> .submenu").remove();
                a(".runic-menu-clone-wrap .runic-menu-panels").append('<div id="' + i + '" class="runic-menu-panel runic-menu-sub-panel runic-menu-hidden">' + l + "</div>")
            })
        }
    }

    function e(j, i) {
        return i + j
    }

    function g(i, k) {
        var j = new RegExp(i + "=([^&]*)", "i").exec(k);
        return j && j[1] || ""
    }

    a(document).ready(function () {
        h();
        b();
        a(document).on("click", ".menu-toggle", function () {
            a(".runic-menu-clone-wrap").addClass("open");
            return false
        });
        a(document).on("click", ".runic-menu-clone-wrap .runic-menu-close-panels", function () {
            a(".runic-menu-clone-wrap").removeClass("open");
            return false
        });
        a(document).on("click", function (i) {
            if (i.offsetX > a(".runic-menu-clone-wrap").width()) {
                a(".runic-menu-clone-wrap").removeClass("open")
            }
        });
        a(document).on("click", ".runic-menu-next-panel", function (j) {
            var i = a(this), n = i.closest(".menu-item"), o = i.closest(".runic-menu-panel"), m = i.attr("href");
            if (a(m).length) {
                o.addClass("runic-menu-sub-opened");
                a(m).addClass("runic-menu-panel-opened").removeClass("runic-menu-hidden").attr("data-parent-panel", o.attr("id"));
                var l = n.find(".runic-menu-item-title").attr("title"), k = "";
                if (a(".runic-menu-panels-actions-wrap .runic-menu-current-panel-title").length > 0) {
                    k = a(".runic-menu-panels-actions-wrap .runic-menu-current-panel-title").html()
                }
                if (typeof l != "undefined" && typeof l != false) {
                    if (!a(".runic-menu-panels-actions-wrap .runic-menu-current-panel-title").length) {
                        a(".runic-menu-panels-actions-wrap").prepend('<span class="runic-menu-current-panel-title"></span>')
                    }
                    a(".runic-menu-panels-actions-wrap .runic-menu-current-panel-title").html(l)
                } else {
                    a(".runic-menu-panels-actions-wrap .runic-menu-current-panel-title").remove()
                }
                a(".runic-menu-panels-actions-wrap .runic-menu-prev-panel").remove();
                a(".runic-menu-panels-actions-wrap").prepend('<a data-prenttitle="' + k + '" class="runic-menu-prev-panel" href="#' + o.attr("id") + '" data-cur-panel="' + m + '" data-target="#' + o.attr("id") + '"></a>')
            }
            j.preventDefault()
        });
        a(document).on("click", ".runic-menu-prev-panel", function (k) {
            var i = a(this), j = i.attr("data-cur-panel"), n = i.attr("href");
            a(j).removeClass("runic-menu-panel-opened").addClass("runic-menu-hidden");
            a(n).addClass("runic-menu-panel-opened").removeClass("runic-menu-sub-opened");
            var m = a(n).attr("data-parent-panel");
            if (typeof m == "undefined" || typeof m == false) {
                a(".runic-menu-panels-actions-wrap .runic-menu-prev-panel").remove();
                a(".runic-menu-panels-actions-wrap .runic-menu-current-panel-title").remove()
            } else {
                a(".runic-menu-panels-actions-wrap .runic-menu-prev-panel").attr("href", "#" + m).attr("data-cur-panel", n).attr("data-target", "#" + m);
                var l = a("#" + m).find('.runic-menu-next-panel[data-target="' + n + '"]').closest(".menu-item").find(".runic-menu-item-title").attr("data-title");
                l = a(this).data("prenttitle");
                if (typeof l != "undefined" && typeof l != false) {
                    if (!a(".runic-menu-panels-actions-wrap .runic-menu-current-panel-title").length) {
                        a(".runic-menu-panels-actions-wrap").prepend('<span class="runic-menu-current-panel-title"></span>')
                    }
                    a(".runic-menu-panels-actions-wrap .runic-menu-current-panel-title").html(l)
                } else {
                    a(".runic-menu-panels-actions-wrap .runic-menu-current-panel-title").remove()
                }
            }
            k.preventDefault()
        })
    });
    a(window).on("resize", function () {
        h();
        b()
    });
    a(window).load(function () {
        f()
    })
})(jQuery);