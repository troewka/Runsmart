/-----------------------------------------Slider (Tiny-Slider)------------------------------------------/

const slider = tns({ // Tiny-Slider
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

$(document).ready(function () { // jQuery

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () { // Функція переключення TABS та показ контенту відповідного табу
      $(this)
         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active') // Додавання активного класу для переключення TABS
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

   $('[data-modal=consultation]').on('click', function () { // знаходимо кнопки, по Data-атрибуту (який задали раніше) 
      $('.lining, #consultation').fadeIn('slow'); // показуємо підложку та модальне вікно "консультація" 
   });
   $('.modal__close').on('click', function () { // знаходимо хрестик
      $('.lining, #consultation, #order, #thanks').fadeOut('slow'); // закриваємо клас та всі ID
   });
   //$('.button_item').on('click', function () { // знаходимо кнопки, по класу 
   //   $('.lining, #order').fadeIn('slow'); // показуємо підложку та модальне вікно "купити" 
   //});
   $('.button_item').each(function (i) {
      $(this).on('click', function () {
         $('#order .modal__subtitle').text($('.catalog-item__title').eq(i).text())
         $('.lining, #order').fadeIn('slow');
      })
   });

   /-----------------------------------------VALIDATE (jQuery)-----------------------------------------/

   function validateForm(form) {
      $(form).validate({ // Плагин validate
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

   $('input[name=tel]').mask("+7 (999) 999-99-99"); // знаходимо по тег атрибуту name

   /-----------------------------------------POST openserver (jQuery)-------------------------------------/

   $('form').submit(function (e) {
      e.preventDefault(); // відміняємо стандарне поводження браузера

      if (!$(this).valid()) { // перевірка валідації форм
         return;
      }

      $.ajax({ // відправка форми на сервер
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function () { // після успішної відправки форм:
         $(this).find("input").val(""); // очищаємо поля вводу
         $('#consultation, #order').fadeOut(); // закриваємо модальне вікно (форму відправки)
         $('.lining, #thanks').fadeIn('slow'); // показуємо модальне вікно з успішною відправкою
         $('form').trigger('reset'); // перезавантажуємо форму
      });
      return false;
   });

   /-----------------------------------------Scrolling (jQuery)-------------------------------------------/

   $(window).scroll(function () {
      if ($(this).scrollTop() > 1700) { // Показ кнопки "підйому", якщо прокрутили від top 1700px
         $('.pickup').fadeIn();
      } else {
         $('.pickup').fadeOut();
      }
   });

   /-----------------------------------------Smooth Scrolling (jQuery)-----------------------------------/

   // Add smooth scrolling to all links
   $("a").on('click', function (event) { // Плавна прокрутка сторінки на вверх

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
         // Prevent default anchor click behavior
         event.preventDefault();

         // Store hash
         const hash = this.hash;

         // Using jQuery's animate() method to add smooth page scroll
         // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
         $('html, body').animate({
            scrollTop: $(hash).offset().top
         }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
         });
      } // End if
   });

});