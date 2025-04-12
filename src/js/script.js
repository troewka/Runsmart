/-----------------------------------------Slider (Tiny-Slider)------------------------------------------/

const slider = tns({
   container: '.carousel__slider',
   controls: false,
   items: 1,
   slideBy: 'page',
   speed: 1000,
   nav: true
});

document.querySelector('.carousel__prev').addEventListener('click', function () {
   slider.goTo('prev')
});

document.querySelector('.carousel__next').addEventListener('click', function () {
   slider.goTo('next')
});

/-----------------------------------------TABS (jQuery)-------------------------------------------------/

$(document).ready(function () {

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
      $(this)
         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
         .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
   });

   function toggleSlide(item) {
      $(item).each(function (i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__box').eq(i).toggleClass('catalog-item__box_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
         })
      })
   }

   toggleSlide('.catalog-item__link');
   toggleSlide('.catalog-item__back');

   /-----------------------------------------MODAL (jQuery)------------------------------------------/

   $('[data-modal=consultation]').on('click', function () {
      $('.lining, #consultation').fadeIn('slow');
   });
   $('.modal__close').on('click', function () {
      $('.lining, #consultation, #order, #thanks').fadeOut('slow');
   });

   $('.button_item').each(function (i) {
      $(this).on('click', function () {
         $('#order .modal__subtitle').text($('.catalog-item__title').eq(i).text())
         $('.lining, #order').fadeIn('slow');
      })
   });

   /-----------------------------------------VALIDATE (jQuery)-----------------------------------------/

   function validateForm(form) {
      $(form).validate({
         rules: {
            name: {
               required: true,
               maxlength: 10
            },
            tel: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: {
               required: "Введите ваше имя",
               maxlength: jQuery.validator.format("Не более {0} символов!")
            },
            tel: "Введите ваш номер телефона",
            email: {
               required: "Введите вашу электронную почту",
               email: "Ваш электронный адрес должен быть в формате name@domain.com"
            }
         }
      });
   }
   validateForm('#consultation-main form');
   validateForm('#consultation form');
   validateForm('#order form');

   /-----------------------------------------Number mask (jQuery)------------------------------------------/

   $('input[name=tel]').mask("+7 (999) 999-99-99");

   /-----------------------------------------POST openserver (jQuery)-------------------------------------/

   $('form').submit(function (e) {
      e.preventDefault();

      if (!$(this).valid()) {
         return;
      }

      $.ajax({ 
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function () {
         $(this).find("input").val("");
         $('#consultation, #order').fadeOut();
         $('.lining, #thanks').fadeIn('slow');
         $('form').trigger('reset');
      });
      return false;
   });

   /-----------------------------------------Scrolling (jQuery)-------------------------------------------/

   $(window).scroll(function () {
      if ($(this).scrollTop() > 1700) {
         $('.pickup').fadeIn();
      } else {
         $('.pickup').fadeOut();
      }
   });

   /-----------------------------------------Smooth Scrolling (jQuery)-----------------------------------/

   $("a").on('click', function (event) {

      if (this.hash !== "") {
         event.preventDefault();
         const hash = this.hash;

         $('html, body').animate({
            scrollTop: $(hash).offset().top
         }, 800, function () {
            window.location.hash = hash;
         });
      }
   });
});