"use strict";
(function () {
  // Функция для инициализации компонента
  const initExtensionsComponent = () => {
    const componentSelector = '[data-component="mad_store"]';

    // Проверяем, добавлен ли компонент
    if (
      Lampa.Settings.main &&
      !Lampa.Settings.main().render().find(componentSelector).is("*")
    ) {
      console.log("Добавление компонента Mad Store...");

      // HTML компонента
      const componentHTML = $(`
        <div class="settings-folder selector" data-component="mad_store" data-static="true">
          <div class="settings-folder__icon">
            <svg height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="21" height="21" rx="2" fill="white"></rect>
              <mask id="path-2-inside-1_154:24" fill="white">
                <rect x="2" y="27" width="17" height="17" rx="2"></rect>
              </mask>
              <rect x="2" y="27" width="17" height="17" rx="2" stroke="white" stroke-width="6" mask="url(#path-2-inside-1_154:24)"></rect>
              <rect x="27" y="2" width="17" height="17" rx="2" fill="white"></rect>
              <rect x="27" y="34" width="17" height="3" fill="white"></rect>
              <rect x="34" y="44" width="17" height="3" transform="rotate(-90 34 44)" fill="white"></rect>
            </svg>
          </div>
          <div class="settings-folder__name">Расширения :: Mad</div>
        </div>
      `);

      // Обработка события "hover:enter"
      Lampa.Settings.listener.follow("open", (event) => {
        if (event.name === "main") {
          console.log("Главное меню открыто, добавляем обработчик...");
          event.body.find(componentSelector).on("hover:enter", () => {
            console.log("Событие hover:enter сработало");
            Lampa.Extensions.show({
              store: "https://github.com/AlexNew91/Club/blob/main/store.json",
              with_installed: true,
            });
          });
        }
      });

      // Добавляем компонент в интерфейс
      Lampa.Settings.main().render()
        .find('[data-component="plugins"]')
        .after(componentHTML);

      // Обновляем настройки
      Lampa.Settings.main().update();
      console.log("Компонент успешно добавлен!");
    }
  };

  // Запуск компонента при готовности приложения
  if (window.appready) {
    console.log("Приложение готово, инициализация...");
    initExtensionsComponent();
  } else {
    Lampa.Listener.follow("app", (event) => {
      if (event.type === "ready") {
        console.log("Приложение стало готово, инициализация...");
        initExtensionsComponent();
      }
    });
  }
})();
