// red.js

document.addEventListener("DOMContentLoaded", function () {
  // Add styles for the voting element
  const style = document.createElement('style');
  style.innerHTML = `
    .card__vote {
      position: absolute;
      right: 0.0em;
      bottom: 0.0em;
      background: rgba(255, 68, 68);
      color: #000;
      font-size: 1.1em;
      font-weight: 700;
      padding: 0.1em 0.5em;
      border-top-left-radius: 0.9em;
      border-top-right-radius: 0em;
      border-bottom-right-radius: 0.9em;
      border-bottom-left-radius: 0em;
      z-index: 3;
      box-shadow: 0 0 0 0.2em #ff4444;
      transition: box-shadow 0.3s ease;
    }

    .card__vote::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 -960 960 960'%3E%3Cpath fill='%23ffffff' d='M349.923-241.308 480-320.077l131.077 79.769-34.615-148.307 115.384-99.924L540.077-502 480-642.308 420.923-503l-151.769 13.461 115.384 99.693-34.615 148.538ZM283-150.076l52.615-223.539-173.923-150.847 229.231-18.846L480-754.693l90.077 211.385 228.231 18.846-173.923 150.847L677-150.076 480-268.923 283-150.076Zm197-281.616Z'/%3E%3C/svg%3E");
      width: 18px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
      line-height: 1;
    }

    .card.focus .card__vote,
    .card.hover .card__vote {
      box-shadow: 0 0 0 0.3em #ff4444;
    }

    .card.focus, .card.hover {
      z-index: 2;
      transform: scale(1.1);
      outline: none;
    }

    .card.focus .card__view::after,
    .card.hover .card__view::after {
      content: "";
      position: absolute;
      top: -0.5em;
      left: -0.5em;
      right: -0.5em;
      bottom: -0.5em;
      border: 0.3em solid transparent;
      border-radius: 1.4em;
      z-index: 1;
      pointer-events: none;
      animation: border-draw 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes border-draw {
      0% {
        border-color: transparent;
        clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%);
      }
      25% {
        border-color: #ff4444;
        clip-path: polygon(0% 0%, 50% 0%, 0% 0%, 0% 0%);
      }
      50% {
        clip-path: polygon(0% 0%, 100% 0%, 50% 100%, 0% 0%);
      }
      75% {
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%);
      }
      100% {
        clip-path: none;
        border-color: #ff4444;
      }
    }

    .card__quality {
      position: absolute;
      left: -0.8em;
      bottom: 3em;
      padding: 0.4em 0.4em;
      background: #fff816;
      color: rgb(0 0 0);
      font-size: 0.8em;
      border-radius: 0.3em;
      text-transform: uppercase;
      z-index: 3;
    }

    .menu__item.focus, .menu__item.traverse, .menu__item.hover {
      background-color: #ff4444;
      color: #000;
    }

    .menuitem.focus.red, .menuitem.traverse.red, .menu__item.hover.red {
      background-color: #ff4444;
      color: #fff;
    }

    .settings-folder.focus {
      background-color: #ff4444;
      border-radius: 0em;
    }

    .head__action.focus, .head__action.hover {
      background-color: #ff4444;
      color: #fff;
    }

    .settings__content {
      position: fixed;
      top: 5%;
      left: 100%;
      transition: transform 0.2s;
      background-color: rgba(38, 40, 41, 0.9);
      width: 35%;
      display: flex;
      flex-direction: column;
      will-change: transform;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }

    .extensions__cub {
      position: absolute;
      top: 1em;
      right: 1em;
      background-color: rgb(34 229 10 / 32%);
      border-radius: 0.3em;
      padding: 0.3em 0.4em 0.4em;
      font-size: 0.78em;
    }

    .extensions__item.focus:after {
      content: "";
      position: absolute;
      top: -0.5em;
      left: -0.5em;
      right: -0.5em;
      bottom: -0.5em;
      border: 0.3em solid #ff4444;
      border-radius: 1.4em;
      z-index: -1;
      pointer-events: none;
    }

    .full-start__button {
      margin-right: 0.75em;
      font-size: 1.3em;
      background-color: rgb(255 68 68 / 30%);
      padding: 0.3em 1em;
      display: flex;
      align-items: center;
      border-radius: 1em;
      height: 2.8em;
      flex-shrink: 0;
    }

    .full-start__button.focus {
      background-color: #ff4444c4;
      color: #000;
    }

    .tag-count.focus {
      background-color: #ff4444d1;
      color: #000;
    }

    .full-episode.focus::after {
      content: "";
      position: absolute;
      left: -0.5em;
      top: -0.5em;
      right: -0.5em;
      bottom: -0.5em;
      border: 0.3em solid #f4444;
      border-radius: 1.4em;
      pointer-events: none;
    }

    .activity__loader {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      z-index: 1000;
    }

    .activity__loader::before,
    .activity__loader::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 5px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
    }

    .activity__loader::before {
      width: 100px;
      height: 100px;
      border-top-color: #ffffff;
      animation: spin-large 1.5s linear infinite;
    }

    .activity__loader::after {
      width: 70px;
      height: 70px;
      border-top-color: #ff62717;
      animation: spin-small 1s linear infinite reverse;
    }

    @keyframes spin-large {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    @keyframes spin-small {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(-360deg);
      }
    }

    .head__action.active::after {
      content: "";
      display: block;
      width: 0.5em;
      height: 0.5em;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #EA4E4E;
      border: 0.15em solid #43f015;
      border-radius: 100%;
    }

    .settings-param.focus {
      background-color: #ff4444;
      color: #fff;
    }

    .activity__tags button.hover {
      background-color: #ff4444;
      color: #fff;
    }

    .activity__tags button.focus {
      background-color: #ff4444;
      color: #fff;
    }
  `;
  document.head.appendChild(style);
});
