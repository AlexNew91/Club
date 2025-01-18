(function () {
    'use strict';

    Lampa.Platform.tv();
    (function () {
        "use strict";
        function initializeThemes() {
            // Загружаем выбранную тему из localStorage
            var selectedTheme = localStorage.getItem("selectedTheme");
            if (selectedTheme) {
                var themeLink = $("<link rel=\"stylesheet\" href=\"" + selectedTheme + "\">");
                $("body").append(themeLink);
            }

            // Добавляем новый параметр в настройки
            Lampa.SettingsApi.addParam({
                component: "interface",
                param: {
                    name: "my_themes",
                    type: "static"
                },
                field: {
                    name: "Мои темы",
                    description: "Измени палитру элементов приложения"
                },
                onRender: function (settingsParam) {
                    setTimeout(function () {
                        // Перемещаем параметр в интерфейсе настроек
                        $(".settings-param > div:contains(\"Мои темы\")")
                            .parent()
                            .insertAfter($("div[data-name=\"interface_size\"]"));

                        // Событие на нажатие параметра
                        settingsParam.on("hover:enter", function () {
                            setTimeout(function () {
                                // Проверяем и закрываем текущую активность
                                if ($(".settings-param").length || $(".settings-folder").length) {
                                    Lampa.Activity.pop(); // Корректный возврат
                                }
                            }, 50);

                            // Переход к активности выбора темы
                            setTimeout(function () {
                                var currentThemeActivity = Lampa.Storage.get("themesCurrent");
                                if (!currentThemeActivity) {
                                    currentThemeActivity = {
                                        url: "https://alexnew91.github.io/Club/themes/themes.json",
                                        title: "Focus Pack",
                                        component: "my_themes",
                                        page: 1
                                    };
                                } else {
                                    currentThemeActivity = JSON.parse(currentThemeActivity);
                                }
                                Lampa.Activity.push(currentThemeActivity);
                                Lampa.Storage.set("themesCurrent", JSON.stringify(Lampa.Activity.active()));
                            }, 100);
                        });
                    }, 0);
                }
            });

            // Создаём компонент для работы с темами
            function MyThemesComponent(params) {
                var request = new Lampa.Reguest();
                var scroll = new Lampa.Scroll({
                    mask: true,
                    over: true,
                    step: 250
                });
                var themesList = [];
                var container = $("<div></div>");
                var themeContainer = $("<div class=\"my_themes category-full\"></div>");
                var activeItem;

                // Фиксированная категория с темами
                var defaultThemes = [{
                    title: "Focus Pack",
                    url: "https://alexnew91.github.io/Club/themes/themes.json"
                }];

                this.create = function () {
                    this.activity.loader(true);

                    request.silent(params.url, this.build.bind(this), function () {
                        var emptyPlaceholder = new Lampa.Empty();
                        container.append(emptyPlaceholder.render());
                        this.start = emptyPlaceholder.start;
                        this.activity.loader(false);
                        this.activity.toggle();
                    }.bind(this));

                    return this.render();
                };

                this.append = function (themeData) {
                    themeData.forEach(function (theme) {
                        var themeCard = Lampa.Template.get("card", {
                            title: theme.title,
                            release_year: ""
                        });

                        themeCard.addClass("card--collection");
                        themeCard.find(".card__img").css({
                            cursor: "pointer",
                            "background-color": "#353535a6"
                        }).attr("src", theme.logo);

                        function markAsInstalled() {
                            var installedTag = document.createElement("div");
                            installedTag.innerText = "Установлена";
                            installedTag.classList.add("card__quality");
                            themeCard.find(".card__view").append(installedTag);
                            $(installedTag).css({
                                position: "absolute",
                                left: "-3%",
                                bottom: "70%",
                                padding: "0.4em 0.4em",
                                background: "#ffe216",
                                color: "#000",
                                fontSize: "0.8em",
                                borderRadius: "0.3em",
                                textTransform: "uppercase"
                            });
                        }

                        var currentTheme = localStorage.getItem("selectedTheme");
                        if (currentTheme && theme.css === currentTheme) {
                            markAsInstalled();
                        }

                        themeCard.on("hover:enter", function () {
                            $("link[rel=\"stylesheet\"][href^=\"https://alexnew91.github.io/Club/themes/themes.css/\"]").remove();
                            var newThemeLink = $("<link rel=\"stylesheet\" href=\"" + theme.css + "\">");
                            $("body").append(newThemeLink);
                            localStorage.setItem("selectedTheme", theme.css);

                            console.log("Тема установлена:", theme.css);
                            $(".card__quality").remove();
                            markAsInstalled();
                            Lampa.Controller.toggle("content");
                        });

                        themeContainer.append(themeCard);
                        themesList.push(themeCard);
                    });
                };

                this.build = function (data) {
                    scroll.render().addClass("layer--wheight").data("mheight", "");
                    container.append(scroll.render());
                    this.append(data);
                    scroll.append(themeContainer);

                    this.activity.loader(false);
                    this.activity.toggle();
                };

                this.start = function () {
                    Lampa.Controller.add("content", {
                        toggle: function () {
                            Lampa.Controller.collectionSet(scroll.render());
                            Lampa.Controller.collectionFocus(activeItem || false, scroll.render());
                        }
                    });
                    Lampa.Controller.toggle("content");
                };

                this.render = function () {
                    return container;
                };

                this.destroy = function () {
                    request.clear();
                    scroll.destroy();
                    container.remove();
                    themeContainer.remove();
                };

                // Метод pause (если потребуется)
                this.pause = function () {
                    console.log("Pause method called for MyThemesComponent");
                };
            }

            Lampa.Component.add("my_themes", MyThemesComponent);
        }

        // Инициализируем при готовности приложения
        if (window.appready) {
            initializeThemes();
        } else {
            Lampa.Listener.follow("app", function (event) {
                if (event.type === "ready") {
                    initializeThemes();
                }
            });
        }
    })();
})();
