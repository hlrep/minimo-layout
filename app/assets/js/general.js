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

  /* scroll-out itaractions */
  ScrollOut({
    targets: '.postcard, .postcard__content'
  });

  /* nav-toggle interactions */
  {
    let header = document.querySelector('.header');
    let toggleBtn = header.querySelector('.nav-toggle');
    let menu = header.querySelector('.menu');
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      menu.classList.toggle('active');
    });
    window.addEventListener('scroll', () => {
      toggleBtn.classList.remove('active');
      menu.classList.remove('active');
    });
  }

}());

/* ajax post request */
function CreateRequest() {
  let request = false;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else if (window.AcriveXObject) {
    try {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    catch (CatchException) {
      request = new ActiveXObject('Msxml2.XMLHTTP');
    }
  }
  if (!request) {
    alert("Невозможно создать XMLHttpRequest");
  }
  return request;
}

/* ajax uploading */
function LoadPosts() {
  /* change button class to loading state */
  let loadmore = document.querySelector('.load-more');
  let loadmoreBtn = loadmore.querySelector('.load-more__btn');
  loadmoreBtn.classList.remove('load-more__btn');
  loadmoreBtn.classList.add('load-more__btn--loading');
  /* try to create request object */
  let request = CreateRequest();
  if (!request) {
      loadmoreBtn.classList.remove('load-more__btn--loading');
      loadmoreBtn.classList.add('load-more__btn');
      return;
  }
  /* sending request */
  request.open('POST', 'posts.json', true);
  request.send();
  /* when request finished */
  request.onreadystatechange = () => {
    /* change button class to normal state */
    loadmoreBtn.classList.remove('load-more__btn--loading');
    loadmoreBtn.classList.add('load-more__btn');
    /* checkout response */
    if (request.readyState != 4) return;
    if (request.status == 200) {
      /* search for last postcard section */
      let section = document.querySelector('.page').querySelectorAll('.page__postcards-section');
      let postcardContainer = section[section.length - 1];
      /* try to parse JSON and create new HTML-elements */
      try {
        let data = JSON.parse(request.responseText);
        let posts;
        for (let i = 0; i < data.length; i++) {
          let post = document.createElement('div');
            post.classList.add('postcard');
          let img = document.createElement('img');
            img.classList.add('postcard__img');
            img.src = data[i].img;
            post.append(img);
          let content = document.createElement('div');
            content.classList.add('postcard__content');
            post.append(content);
          let theme = document.createElement('div');
            theme.classList.add('postcard__theme');
            theme.innerHTML = data[i].theme;
            content.append(theme);
          let title = document.createElement('h2');
            title.classList.add('postcard__title');
            content.append(title);
          let link = document.createElement('a');
            link.classList.add('postcard__link');
            link.innerHTML = data[i].title;
            link.href = data[i].href;
            title.append(link);
          let text = document.createElement('div');
            text.classList.add('postcard__text');
            text.innerHTML = data[i].content;
            content.append(text);
          postcardContainer.append(post);
        }
      }
      catch (e) {
        return;
      }
      /* reindexing elements in ScrollOut() */
      ScrollOut({
        targets: '.postcard, .postcard__content'
      });
    }
  }
}
