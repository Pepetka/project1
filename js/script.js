'use strickt';

window.addEventListener('DOMContentLoaded', () => {
  function burger() {
    const burger = document.querySelector('.burger-menu'),
      menu = document.querySelector('#menu-box');

    if (window.screen.availWidth <= 768) {
      burger.addEventListener('click', () => {
        if (menu.style.display == 'block') {
          menu.style.display = 'none';
          burger.classList.remove('change');
        } else {
          menu.style.display = 'block';
          burger.classList.add('change');
        }
      });
    }

    window.addEventListener('resize', () => {
      if (window.screen.availWidth > 768) {
        menu.style.display = 'block';
        burger.classList.remove('change');
      } else if (window.screen.availWidth <= 768) {
        menu.style.display = 'none';
        burger.classList.remove('change');
      }
    });
  }

  function sort() {
    const btns = document.querySelectorAll('.portfolio-btn'),
      content = document.querySelectorAll('.portfolio-box'),
      moreBtn = document.querySelector('.more-btn');

    document.querySelector('button.all').classList.add('active');
    let i = 0;
    content.forEach((elem) => {
      if (i < 2) {
        elem.style.display = 'block';
        i++;
      } else {
        elem.style.display = 'none';
      }
    });

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {
          btns.forEach((el) => {
            el.classList.remove('active');
          });

          btn.classList.add('active');

          let i = 0;

          content.forEach((elem) => {
            if (elem.classList.contains(btn.classList[btn.classList.length - 2]) && i < 2) {
              elem.style.display = 'block';
              i++;
            } else {
              elem.style.display = 'none';
            }
          });
        }

        moreBtn.style.display = '';
      });
    });

    moreBtn.addEventListener('click', () => {
      btns.forEach((btn) => {
        if (btn.classList.contains('active')) {
          content.forEach((elem) => {
            if (elem.classList.contains(btn.classList[btn.classList.length - 2])) {
              elem.style.display = 'block';
            }
          });
        }
      });

      moreBtn.style.display = 'none';
    });
  }

  function form() {
    const form = document.querySelector('form'),
      inputs = form.querySelectorAll('[placeholder]'),
      message = {
        saccess: 'Отправлено',
        failture: 'Ошибка...',
        loading: 'Идет отправка...'
      };

    const postData = async (url, data) => {
      document.querySelector('.status').textContent = message.loading;

      let result = await fetch(url, {
        method: 'POST',
        body: data
      });

      return await result.text();
    };

    const clearForms = (inputs) => {
      inputs.forEach((input) => {
        input.value = '';
      });
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let status = document.createElement('div');
      status.classList.add('status');
      form.parentNode.appendChild(status);

      const formData = new FormData(form);

      postData('server.php', formData)
        .then((res) => {
          console.log(res);
          status.textContent = message.saccess;
        })
        .catch(() => {
          status.textContent = message.failture;
        })
        .finally(() => {
          setTimeout(() => {
            clearForms(inputs);
            status.remove();
          }, 5000);
        });
    });
  }

  burger();
  sort();
  form();
});