$(document).ready(function () {
  // ! Header__burger

  $('.header__burger').on('click', function () {
    $(this).toggleClass('active');
    $('.header__mobile').toggleClass('active');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.header__burger, .header__mobile').length) {
      $('.header__mobile').removeClass('active');
      $('.header__burger').removeClass('active');
    }
    e.stopPropagation();
  });

  //! Header-scroll
  jQuery(document).ready(function ($) {
    var tinyHead = function () {
      $('header').toggleClass('tinyHead', $(document).scrollTop() > 0);
    };
    tinyHead();
    $(window).on('scroll touchmove', tinyHead);
  });

  // ! Questions__body
  $('.questions__header').on('click', function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle();
  });

  // ! Profile-slider
  let profileEmployer;
  function sliderProfileStart() {
    profileEmployer = new Swiper('.profile-slider__container', {
      slidesPerView: 1,
      centeredSlides: true,
      //observer: true,
      //observeParents: true,
      //observeSlideChildren: true,
      loop: true,
      navigation: {
        nextEl: '.profile-slider__next.swiper-button-next',
        prevEl: '.profile-slider__prev.swiper-button-prev',
      },
      pagination: {
        el: '.profile-slider__pagination.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });

  }

  sliderProfileStart();

  // ! ShiftView-slider
  let shiftView;
  function sliderShiftView() {
    shiftView = new Swiper('.shift-view-slider__container', {
      slidesPerView: 3,
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: '.shift-view-slider__next.swiper-button-next',
        prevEl: '.shift-view-slider__prev.swiper-button-prev',
      }
    });
  }
  
  sliderShiftView();
  

  // ! Modal-gallery
  let modalGallery;
  function modalGalleryStart() {
    modalGallery = new Swiper('.modal-gallery__container', {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: '.modal-gallery__next.swiper-button-next',
        prevEl: '.modal-gallery__prev.swiper-button-prev',
      },
      pagination: {
        el: '.modal-gallery__pagination.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }

  // ! Modal-gallery
  $('.modal-slider').on('click', function () {
    setTimeout(function(){
      modalGallery.update();
    }, 1000);
  });

  modalGalleryStart();

  // ! Profile-menu-open
  function profileMenuOpen() {
    $('.button-open').on('click', function () {
      $(this).toggleClass('active');
      $('.profile-menu__big').toggleClass('active');
      $('.profile-menu1').toggleClass('active');
      setTimeout(function(){
        profileEmployer.update();
      }, 1);
    });
  
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.button-open, .button-close, .profile-menu__big, .profile-menu1').length) {
        $('.button-close').removeClass('active');
        $('.profile-menu__big').toggleClass('active');
        $('.button-open').removeClass('active');
        $('.profile-menu1').removeClass('active');
      }

      setTimeout(function(){
        profileEmployer.update();
      }, 1);
      
      e.stopPropagation();
    });
  
    $('.button-close').on('click', function () {
      $(this).toggleClass('active');
      $('.button-close').toggleClass('active');
      $('.profile-menu__big').removeClass('active');
      $('.button-open').toggleClass('active');
      $('.profile-menu1').removeClass('active');
    });
  
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.button-open, .button-close, .profile-menu__big, .profile-menu1').length) {
        $('.button-close').toggleClass('active');
        $('.profile-menu__big').removeClass('active');
        $('.button-open').removeClass('active');
      }
      e.stopPropagation();
    });
  }
  profileMenuOpen()

  // ! Header-profile
  $('.header-profile__choice').on('click', function () {
    $(this).toggleClass('active');
    $('.header-profile__mobi').toggleClass('active');
  });

  // ! Filter
  $('.profile-filter__header').on('click', function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle();
  });

  //! Textarea-height
  let textarea = document.querySelectorAll('.textarea');
  if (textarea) {
    textarea.forEach(function (el) {
      el.addEventListener('keyup', function () {
        if (this.scrollTop > 0) {
          this.style.height = this.scrollHeight + 'px';
        }
      });
    });
  }
    
  //! Dropdown
  $('.header__nav--link a').on('click', function () {
    if ($(window).width() < 767) {
      $(this).toggleClass('active');

      if ($(this).hasClass('active')) {
        $(this).next().toggleClass('active');
      } else {
        $(this).next().removeClass('active');
      }
    }
  });

  //! Color svg
  $('img.img-svg').each(function () {
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(
      imgURL,
      function (data) {
        var $svg = $(data).find('svg');
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
        }
        $img.replaceWith($svg);
      },
      'xml',
    );
  });

  //! Counter time visible
  $('.input-el').on('click', function () {
    $(this).next().addClass('active');
  });

  //! Counter time work
  function changePeriod() {
    $("[data-period-input]").on("input", function (e) {
      const value = $(this).val();
  
      if (!/^\d*$/.test(value)) {
        $(this).val(value.replace(/\D/g, ""));
        return;
      }
    });
  
    $("[data-period-button]").on("click", function (e) {
      e.preventDefault()
      const $period = $(this).closest(".period");
      const $input = $period.find(".period__input");
      const timeType = $period.data("time-type");
      const periodType = $(this).data("period-button");
      const value = +$input.val();
      const isHours = timeType === "hours";
      const isMinutes = timeType === "minutes";
      const isCounter = timeType === "counter";
  
      if (periodType === "plus") {
        if ((isHours && value >= 23) || (isMinutes && value >= 59)) {
          $input.val("00");
          return;
        }

        $input.val(value < 9 ? `0${value + 1}` : value + 1);
      }
  
      if (periodType === "minus") {
        if (value < 1) {
          if (isHours) $input.val(23);
          if (isMinutes) $input.val(59);
          if (isCounter) $input.val(1);
          return;
        }
        $input.val(value <= 10 ? `0${value - 1}` : value - 1);
      }

      if (isCounter) {
        if (periodType === "plus") { 
          $input.val(value + 1);
        }

        if (periodType === "minus") { 
          $input.val(value - 1);
        }
      }
    });
  }
  changePeriod();

  //! Checkbox
  function checkbox() {
    $.each($('.checkbox'), function (index, val) {
      if ($(this).find('input').prop('checked') == true) {
        $(this).addClass('active')
      }
    })
    $(document).on('click', '.checkbox', function (event) {
      if ($(this).hasClass('active')) {
        $(this).find('input').prop('checked', false);
      } else {
        $(this).find('input').prop('checked',true)
      }
      $(this).toggleClass('active')
      return false;
    })
  }
  checkbox()

  //! Radio
  function radio() {
    $.each($('.radiobuttons__item'), function (index, val) {
      if($(this).find('input').prop('checked') == true) {
        $(this).addClass('active')
      }
    })
  
    $(document).on('click', '.radiobuttons__item', function (event) {
      $(this).parents('.radiobuttons').find('.radiobuttons__item').removeClass('active')
      $(this).parents('.radiobuttons').find('.radiobuttons__item input').prop('checked', false)
      $(this).toggleClass('active')
      $(this).find('input').prop('checked', true)
      return false;
    })
  }
  radio()

  //! sliderRange
  if ($('.shift-range-slider').length) {
    const slider = $('.shift-range')
    const totalValue = 3

    slider.find('.shift-range__total').text(totalValue)

    $(".shift-range-slider").slider({
      range: "min",
      value: 0,
      min: 0,
      max: totalValue,
      slide: function (event, ui) {
        slider.find('.shift-range__current').text(ui.value)
        slider.find('.shift-range__amount').text(totalValue - ui.value);
      }
    });
  }

  //! Calendar
  function dateChoice() {
    $( function() {
      $("#datepicker-start").datepicker({
        altField: '#datepicker-start',
        altFormat: 'dd MM yy',
        changeMonth: true,
        changeYear: true,
        duration: 'slow',
      });
    });
    
    $( function() {
      $("#datepicker-finish").datepicker({
        altField: '#datepicker-finish',
        altFormat: 'dd MM yy',
        changeMonth: true,
        changeYear: true,
        duration: 'slow',
      });
    });
  }
  dateChoice()
  
  //! Modal-button-click
  $('.button-switch').click(function (e) {
    e.preventDefault()
    $('.button-switch').removeClass('active');
    $('.cart-modal').removeClass('active')
    $(this).closest('.cart-modal').addClass('active')
    $(this).addClass('active');
    $('.button-del').removeClass('active');
    $(this).next().addClass('active');
  });

  // ! Tabs
  $('[data-tabs-nav]')
  .children()
  .on('click', function () {
    var index = $(this).index()
    $(this).addClass('active').siblings().removeClass('active')
    $(this).parent().next().children().hide().eq(index).fadeIn()

    return false
  })

});
