import { createElement } from '../../shared/helpers/dom-utilites';
import './about.scss';
import baseLayer from '@image/main-layer.jpg';
import middleLayer from '@image/middle-layer2.png';
import frontLayer from '@image/front-layer.png';
import avatarDonStacky from '@image/don-stacky.jpg';
import avatarGserdg from '@image/gserdg.jpg';
import avatarUser42022 from '@image/user42022.jpg';
import rsschoolLogo from '@image/logo_rs2.svg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const ABOUT_TITLE = createElement({
  tagname: 'h1',
  options: [
    ['classList', 'layers__title'],
    ['textContent', 'Span Team'],
  ],
});

const BASE_LAYER = createElement({
  tagname: 'div',
  options: [
    ['classList', 'layer layers__base'],
    ['style', `background-image: url(${baseLayer});`],
  ],
});

const MIDDLE_LAYER = createElement({
  tagname: 'div',
  options: [
    ['classList', 'layer layers__middle'],
    ['style', `background-image: url(${middleLayer});`],
  ],
});

const FRONT_LAYER = createElement({
  tagname: 'div',
  options: [
    ['classList', 'layer layers__front'],
    ['style', `background-image: url(${frontLayer});`],
  ],
});

const LAYER_WRAPPER = createElement({
  tagname: 'div',
  options: [['classList', 'layers']],
  childElements: [ABOUT_TITLE, BASE_LAYER, MIDDLE_LAYER, FRONT_LAYER],
});

const membersInfo = [
  [
    'Sergey Grebel',
    'https://github.com/gserdg',
    '@gserdg',
    `I'm a front-end developer. After studying at RS School, I can now do everything in a Java script!!! Well, or almost everything. And everything that I cannot achieve, I will achieve as I work on future interesting and probably very entertaining projects.`,
    'created login page',
    'implemented profile page',
    'basket page development',
  ],
  [
    'Andrey Kizilov',
    'https://github.com/user42022',
    '@user42022',
    `Student of the RSSCHOOL stage1 stream 2023. With the desire to continue learning on the React framework.`,
    'created registration page',
    'catalog page development and improvement',
    'implementation of filtering, sorting and search functions',
  ],
  [
    'Sergey Rodnykh',
    'https://github.com/DonStacky',
    '@DonStacky',
    `I want to change my profession and become a frontend developer. I have a higher engineering education, but I have not encountered any development. I love learning new things.`,
    'main page development',
    'implemented product page',
    'created about us page',
  ],
];

const MEMBER_ARTICLES = membersInfo.map((member) => {
  const MEMBER_HEAD = createElement({
    tagname: 'div',
    options: [['className', 'team__text']],
    childElements: [
      createElement({
        tagname: 'h3',
        options: [['textContent', member[0]]],
      }),
      createElement({
        tagname: 'p',
        options: [['textContent', 'Role: Frontend Developer']],
      }),
      createElement({
        tagname: 'p',
        childElements: [
          createElement({
            tagname: 'i',
            options: [
              ['className', 'fa-brands fa-github'],
              ['style', 'color: #fafafa;'],
            ],
          }),
          createElement({
            tagname: 'a',
            options: [
              ['href', member[1]],
              ['className', 'team__link'],
              ['textContent', member[2]],
            ],
          }),
        ],
      }),
    ],
  });

  const MEMBER_BIO = createElement({
    tagname: 'div',
    options: [['className', 'team__text']],
    childElements: [
      createElement({
        tagname: 'h3',
        options: [['textContent', 'Bio']],
      }),
      createElement({
        tagname: 'p',
        options: [['textContent', member[3]]],
      }),
    ],
  });

  let INDEX = 4;
  const MEMBER_IMPACT_ITEMS = Array(3)
    .fill(null)
    .map(() => {
      const MEMBER_IMPACT_ITEM = createElement({
        tagname: 'li',
        options: [['textContent', member[INDEX]]],
      });
      INDEX += 1;
      return MEMBER_IMPACT_ITEM;
    });

  const MEMBER_IMPACT = createElement({
    tagname: 'div',
    options: [['className', 'team__text']],
    childElements: [
      createElement({
        tagname: 'h3',
        options: [['textContent', 'Impact']],
      }),
      createElement({
        tagname: 'ul',
        options: [['className', 'title__impact-list']],
        childElements: [...MEMBER_IMPACT_ITEMS],
      }),
    ],
  });

  const MEMBER_INNER = createElement({
    tagname: 'div',
    options: [['className', 'team__item']],
    childElements: [MEMBER_HEAD, MEMBER_BIO, MEMBER_IMPACT],
  });

  const MEMBER_ARTICLE = createElement({
    tagname: 'div',
    options: [['className', 'team__right']],
    childElements: [MEMBER_INNER],
  });
  MEMBER_ARTICLE.dataset.speed = '1';

  return MEMBER_ARTICLE;
});

const avatars = [avatarGserdg, avatarUser42022, avatarDonStacky];

const MEMEBER_AVATARS = avatars.map((avatar) => {
  const MEMEBER_AVATAR = createElement({
    tagname: 'div',
    options: [['className', 'team__left']],
    childElements: [
      createElement({
        tagname: 'img',
        options: [
          ['className', 'team__avatar team__item'],
          ['src', avatar],
        ],
      }),
    ],
  });
  MEMEBER_AVATAR.dataset.speed = '0.8';

  return MEMEBER_AVATAR;
});

const RSSCHOOL_LOGO = createElement({
  tagname: 'div',
  options: [['classList', 'team__left']],
  childElements: [
    createElement({
      tagname: 'a',
      options: [
        ['className', 'team__rsschool'],
        ['href', 'https://rs.school/'],
      ],
      childElements: [
        createElement({
          tagname: 'img',
          options: [
            ['className', 'team-work__img'],
            ['src', rsschoolLogo],
            ['alt', 'rsschool logo'],
          ],
        }),
      ],
    }),
  ],
});
RSSCHOOL_LOGO.dataset.speed = '0.8';

const COLLABORATION = createElement({
  tagname: 'div',
  options: [['className', 'team__text team__collaboration']],
  childElements: [
    createElement({
      tagname: 'h3',
      options: [['textContent', 'Collaboration']],
    }),
    createElement({
      tagname: 'p',
      options: [
        [
          'innerHTML',
          `&#128198; For effective development of the application we used the scrum methodology.<br>
          &#128246; For convenient interaction with tasks we used the visual tool Trello.<br>
          &#128226; The team used Telegram, GitHub and Google Meet to communicate and discuss work processes.<br>
          &#128200; Regular calls led to ideas and plans.<br>
          &#129488; In the course of the tasks we actively participated in the code reviews, providing constructive feedback and suggestions.`,
        ],
      ],
    }),
  ],
});
COLLABORATION.dataset.speed = '1';

const TEAM = createElement({
  tagname: 'div',
  options: [['className', 'team container-xl']],
  childElements: [
    MEMEBER_AVATARS[0],
    MEMBER_ARTICLES[0],
    MEMEBER_AVATARS[1],
    MEMBER_ARTICLES[1],
    MEMEBER_AVATARS[2],
    MEMBER_ARTICLES[2],
    RSSCHOOL_LOGO,
    COLLABORATION,
  ],
});

const ABOUT_CONTENT = createElement({
  tagname: 'div',
  options: [['className', 'about__content']],
  childElements: [TEAM],
});

const ABOUT_INNER = createElement({
  tagname: 'div',
  options: [['className', 'about__inner']],
  childElements: [LAYER_WRAPPER, ABOUT_CONTENT],
});

const ABOUT_PAGE = createElement({
  tagname: 'div',
  options: [['className', 'wrapper']],
  childElements: [ABOUT_INNER],
});

export default ABOUT_PAGE;

window.addEventListener('scroll', () => {
  document.body.style.cssText += `--scrollTop: ${window.scrollY}px`;
});

gsap.registerPlugin(ScrollTrigger /** , ScrollSmoother */);

function addGsap() {
  gsap.fromTo(
    '.layers',
    { opacity: 1 },
    {
      opacity: 0,
      scrollTrigger: {
        trigger: '.layers',
        start: 'center',
        end: '150%',
        scrub: true,
      },
    }
  );

  const itemsLeft = gsap.utils.toArray('.team__left .team__item');

  itemsLeft.forEach((item) => {
    gsap.fromTo(
      item as Element,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          start: '-300% center',
          end: '250% center',
          trigger: item as Element,
          scrub: true,
        },
      }
    );
  });

  const itemsRight = gsap.utils.toArray('.team__right .team__text');

  itemsRight.forEach((item) => {
    gsap.fromTo(
      item as Element,
      { opacity: 0.5, x: 100 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          start: '-600% center',
          end: '250% center',
          trigger: item as Element,
          scrub: true,
        },
      }
    );
  });

  gsap.fromTo(
    '.team__rsschool',
    { opacity: 0.5, x: -200 },
    {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: '.team__rsschool',
        start: '-500% center',
        end: '0% center',
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    '.team__collaboration',
    { opacity: 0.5, y: 200 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: '.team__collaboration',
        start: '-500% center',
        end: '-180% center',
        scrub: true,
      },
    }
  );
}

const i = setInterval(() => {
  if (
    document.querySelector('.layers') &&
    document.querySelector('.team__text') &&
    document.querySelector('.team__item')
  ) {
    clearInterval(i);
    addGsap();
  }
}, 100);
