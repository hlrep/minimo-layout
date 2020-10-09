(function () {

  /* header's shadow show */
  {
    let header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        header.classList.add('shadow');
      } else {
        header.classList.remove('shadow');
      }
    });
  }

  /* newsletter focus */
  {
    let newsletter = document.querySelector('.newsletter');
    let form = newsletter.querySelector('.newsletter__form');
    let input = form.querySelector('.newsletter__email');
    input.addEventListener('mouseover', () => {
      input.focus();
    });
    input.addEventListener('focus', () => {
      form.classList.add('active');
    });
    input.addEventListener('blur', () => {
      form.classList.remove('active');
    });
  }

}());
