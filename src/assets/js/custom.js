$(document).ready(function () {
    $(".forgot-popup").click(function () {
        $("html").addClass("forgot-poup-open");
    });
    $(".close-icon").click(function () {
        $("html").removeClass("forgot-poup-open");
    });

    $(".landing_logo").click(function () {
        $("body").addClass("login-body");
    });

    $('.noti-bell').on('click', function () {
        var $this = $(".notifi_pop").addClass('open');
        window.setTimeout(function () {
            $this.removeClass('open');
        }, 5000);
    });

    $(".contact-poll .poll-link").click(function () {
        $(this).toggleClass("active");
        $(".contact-poll-content").toggleClass("open");
    });

    $(".dot-btn a").click(function () {
        $(this).toggleClass("active");
        $(".emojis-contain").toggleClass("open");
    });

    $("#setting_btn").click(function () {
        $(this).toggleClass("active");
        $(".bottom-side .post-center").toggleClass("setting_modal");
    });

    $('.msg-setting').on('click', function () {
        $(this).siblings('.msg-dropdown').toggle();
    });

    $("#show_pwd").click(function () {
        var type = $('input[name=password]').attr('type');
        if (type == "password") {
            $('input[name=password]').attr('type', 'text')
            document.getElementById('hide_pwd').style.display = 'block';
            document.getElementById('show_pwd').style.display = 'none';
        } else {
            $('input[name=password]').attr('type', 'password')
        }
    });
    $("#hide_pwd").click(function () {
        var type = $('input[name=password]').attr('type');
        if (type == "password") {
            $('input[name=password]').attr('type', 'text')
        } else {
            $('input[name=password]').attr('type', 'password')
            document.getElementById('show_pwd').style.display = 'block';
            document.getElementById('hide_pwd').style.display = 'none';
        }
    });

    $("#show_con_pwd").click(function () {
        var type = $('input[name=con_password]').attr('type');
        if (type == "password") {
            $('input[name=con_password]').attr('type', 'text')
            document.getElementById('hide_con_pwd').style.display = 'block';
            document.getElementById('show_con_pwd').style.display = 'none';
        } else {
            $('input[name=con_password]').attr('type', 'password')
        }
    });
    $("#hide_con_pwd").click(function () {
        var type = $('input[name=con_password]').attr('type');
        if (type == "password") {
            $('input[name=con_password]').attr('type', 'text')
        } else {
            $('input[name=con_password]').attr('type', 'password')
            document.getElementById('show_con_pwd').style.display = 'block';
            document.getElementById('hide_con_pwd').style.display = 'none';
        }
    });

    $("#res_show_con_pwd").click(function () {
        var type = $('input[name=res_con_password]').attr('type');
        if (type == "password") {
            $('input[name=res_con_password]').attr('type', 'text')
            document.getElementById('res_hide_con_pwd').style.display = 'block';
            document.getElementById('res_show_con_pwd').style.display = 'none';
        } else {
            $('input[name=res_con_password]').attr('type', 'password')
        }
    });
    $("#res_hide_con_pwd").click(function () {
        var type = $('input[name=res_con_password]').attr('type');
        if (type == "password") {
            $('input[name=res_con_password]').attr('type', 'text')
        } else {
            $('input[name=res_con_password]').attr('type', 'password')
            document.getElementById('res_show_con_pwd').style.display = 'block';
            document.getElementById('res_hide_con_pwd').style.display = 'none';
        }
    });

    $("#res_show_pwd").click(function () {
        var type = $('input[name=res_password]').attr('type');
        if (type == "password") {
            $('input[name=res_password]').attr('type', 'text')
            document.getElementById('res_hide_pwd').style.display = 'block';
            document.getElementById('res_show_pwd').style.display = 'none';
        } else {
            $('input[name=res_password]').attr('type', 'password')
        }
    });
    $("#res_hide_pwd").click(function () {
        var type = $('input[name=res_password]').attr('type');
        if (type == "password") {
            $('input[name=res_password]').attr('type', 'text')
        } else {
            $('input[name=res_password]').attr('type', 'password')
            document.getElementById('res_show_pwd').style.display = 'block';
            document.getElementById('res_hide_pwd').style.display = 'none';
        }
    });

    $('.owl-carousel').owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        responsive: {
            0: {
                items: 3
            },
            768: {
                items: 3
            },
            1205: {
                items: 8
            }
        }
    });

    /*=====================
    Chat 
    ==========================*/

    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    $('.submit').on('click', function () {
        typingMessage();
        newMessage();
    });
    $(window).on('keydown', function (e) {
        if (e.which == 13) {
            if (!e.target.value) {
                return false
            }
            typingMessage();
            newMessage();
            return false;
        }
    });

    $(".emojis-sub-contain ul li").click(function () {
        var number = $(this).html();
        $("#setemoj").focus().val(function () {
            return this.value + number;
            $(".messages").animate({
                scrollTop: $(document).height()
            }, "fast");
        });
        $('#send-msg').removeClass('disabled').removeAttr("disabled")
    });


    $('#send-msg').addClass('disabled').attr("disabled", "disabled")
    $("#setemoj").keyup(function (e) {
        if (!e.target.value) {
            $('#send-msg').addClass('disabled').attr("disabled", "disabled")
        } else {
            $('#send-msg').removeClass('disabled').removeAttr("disabled")
        }
    });

    function newMessage() {
        var message = $('.message-input textarea').val();
        if ($.trim(message) == '') {
            return false;
        }
        $('<li class="replies"> <div class="media"><div class="media-body"> <div class="contact-name"> <ul class="msg-box"> <li class="msg-setting-main"> <h5>' + message + '</h5> </li></ul><h6>01:42 AM</h6> </div></div></div></li>').appendTo($('.messages .chatappend'));
        $('.message-input textarea').val(null);
        $('.left-chat-main .active .details h6').html('<span>You : </span>' + ' ' + message);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };

    function typingMessage() {
        $('<li class="sent last typing-m"> <div class="media"><div class="media-body"> <div class="contact-name"><ul class="msg-box"> <li class="msg-setting-main"> <h5> <div class="type"> <div class="typing-loader"></div></div></h5> </li></ul> <h6>01:42 AM</h6></div></div></div></li>').appendTo($('.messages .chatappend'));
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
        setTimeout(function () {
            $('.typing-m').hide();
            $('<li class="sent"> <div class="media"><div class="media-body"> <div class="contact-name"><ul class="msg-box"> <li class="msg-setting-main"> <h5>Sorry I busy right now, I will text you later.</h5></li></ul> <h6>01:35 AM</h6> </div></div></div></li>').appendTo($('.messages .chatappend'));
            $(".messages").animate({ scrollTop: $(document).height() }, "fast");
        }, 1000);
    };

    $("a[rel=example_group]").fancybox({
        loop: false,
        helpers: {
            overlay: { closeClick: false } //Disable click outside event
        }
    });

    $(function () {
        var rot = 0, ratio = 1;
        var CanvasCrop = $.CanvasCrop({
            cropBox: ".imageBox",
            imgSrc: "images/about.jpg",
            limitOver: 2
        });


        $('#upload-file').on('change', function () {
            var reader = new FileReader();
            reader.onload = function (e) {
                CanvasCrop = $.CanvasCrop({
                    cropBox: ".imageBox",
                    imgSrc: e.target.result,
                    limitOver: 2
                });
                rot = 0;
                ratio = 1;
            }
            reader.readAsDataURL(this.files[0]);
            this.files = [];
        });

        $("#rotateLeft").on("click", function () {
            rot -= 90;
            rot = rot < 0 ? 270 : rot;
            CanvasCrop.rotate(rot);
        });
        $("#rotateRight").on("click", function () {
            rot += 90;
            rot = rot > 360 ? 90 : rot;
            CanvasCrop.rotate(rot);
        });
        $("#zoomIn").on("click", function () {
            ratio = ratio * 0.9;
            CanvasCrop.scale(ratio);
        });
        $("#zoomOut").on("click", function () {
            ratio = ratio * 1.1;
            CanvasCrop.scale(ratio);
        });

        console.log("ontouchend" in document);
    });

});

