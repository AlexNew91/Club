(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    
    function f() {
     var v14 = localStorage.getItem("selectedTheme");
      if (v14) {
        var v$ = $("<link rel=\"stylesheet\" href=\"" + v14 + "\">");
        $("body").append(v$);
      }
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
        onRender: function (p5) {
          setTimeout(function () {
            $(".settings-param > div:contains(\"Мои темы\")").parent().insertAfter($("div[data-name=\"interface_size\"]"));
            p5.on("hover:enter", function () {
              setTimeout(function () {
                if ($(".settings-param").length || $(".settings-folder").length) {
                  window.history.back();
                }
              }, 50);
              setTimeout(function () {
                var v15 = Lampa.Storage.get("themesCurrent");
                if (v15 !== "") {
                  var v17 = JSON.parse(JSON.stringify(v15));
                } else {
                  var v17 = {
                    url: "https://alexnew91.github.io/Club/themes/themes.json",
                    title: "Focus Pack",
                    component: "my_themes",
                    page: 1
                  };
                }
                ;
                Lampa.Activity.push(v17);
                Lampa.Storage.set("themesCurrent", JSON.stringify(Lampa.Activity.active()));
              }, 100);
            });
          }, 0);
        }
      });
      function f2(p6) {
        var v18 = new Lampa.Reguest();
        var v19 = new Lampa.Scroll({
          mask: true,
          over: true,
          step: 250
        });
        var v20 = [];
        var v$2 = $("<div></div>");
        var v$3 = $("<div class=\"my_themes category-full\"></div>");
        var v21;
        var v22;
        var v23 = [{
          title: "Focus Pack",
          url: "https://alexnew91.github.io/Club/themes/themes.json"
        }, {
          title: "Color Gallery",
          url: ""
        }];
        this.create = function () {
          var vThis = this;
          this.activity.loader(true);
          v18.silent(p6.url, this.build.bind(this), function () {
            var v24 = new Lampa.Empty();
            v$2.append(v24.render());
            vThis.start = v24.start;
            vThis.activity.loader(false);
            vThis.activity.toggle();
          });
          return this.render();
        };
        this.append = function (p7) {
          var vThis2 = this;
          p7.forEach(function (p8) {
            var v25 = Lampa.Template.get("card", {
              title: p8.title,
              release_year: ""
            });
            v25.addClass("card--collection");
            v25.find(".card__img").css({
              cursor: "pointer",
              "background-color": "#353535a6"
            });
            v25.css({
              "text-align": "center"
            });
            var v26 = v25.find(".card__img")[0];
            v26.onload = function () {
              v25.addClass("card--loaded");
            };
            v26.onerror = function (p9) {
              v26.src = "./img/img_broken.svg";
            };
            v26.src = p8.logo;
            $(".info__title").remove();
            function f3() {
              var v27 = document.createElement("div");
              v27.innerText = "Установлена";
              v27.classList.add("card__quality");
              v25.find(".card__view").append(v27);
              $(v27).css({
                position: "absolute",
                left: "-3%",
                bottom: "70%",
                padding: "0.4em 0.4em",
                background: "#ffe216",
                color: "#000",
                fontSize: "0.8em",
                WebkitBorderRadius: "0.3em",
                MozBorderRadius: "0.3em",
                borderRadius: "0.3em",
                textTransform: "uppercase"
              });
            }
            var v28 = localStorage.getItem("selectedTheme");
            if (v28 && p8.css === v28) {
              f3();
            }
            v25.on("hover:focus", function () {
              v22 = v25[0];
              v19.update(v25, true);
              v21.find(".info__title").text(p8.title);
            });
            var v29 = p8.css;
            v25.on("hover:enter", function () {
              var v30 = Lampa.Controller.enabled().name;
              var v31 = [];
              v31.push({
                title: "Установить"
              });
              v31.push({
                title: "Удалить"
              });
              Lampa.Select.show({
                title: "",
                items: v31,
                onBack: function f4() {
                  Lampa.Controller.toggle("content");
                },
                onSelect: function f5(p10) {
                  if (p10.title == "Установить") {
                    $("link[rel=\"stylesheet\"][href^=\"https://alexnew91.github.io/Club/themes/themes.css/\"]").remove();
                    var v$4 = $("<link rel=\"stylesheet\" href=\"" + v29 + "\">");
                    $("body").append(v$4);
                    localStorage.setItem("selectedTheme", v29);
                    console.log("Тема установлена:", v29);
                    if ($(".card__quality").length > 0) {
                      $(".card__quality").remove();
                    }
                    f3();
                    if (Lampa.Storage.get("background") == true) {
                      var v32 = Lampa.Storage.get("background");
                      Lampa.Storage.set("myBackground", v32);
                      Lampa.Storage.set("background", "false");
                    }
                    if (Lampa.Storage.get("glass_style") == true) {
                      var v33 = Lampa.Storage.get("glass_style");
                      Lampa.Storage.set("myGlassStyle", v33);
                      Lampa.Storage.set("glass_style", "false");
                    }
                    if (Lampa.Storage.get("black_style") == true) {
                      var v34 = Lampa.Storage.get("black_style");
                      Lampa.Storage.set("myBlackStyle", v34);
                      Lampa.Storage.set("black_style", "false");
                    }
                    Lampa.Controller.toggle("content");
                  } else if (p10.title == "Удалить") {
                    $("link[rel=\"stylesheet\"][href^=\"https://alexnew91.github.io/Club/themes/themes.css/\"]").remove();
                    localStorage.removeItem("selectedTheme");
                    $(".card__quality").remove();
                    if (localStorage.getItem("myBackground")) {
                      Lampa.Storage.set("background", Lampa.Storage.get("myBackground"));
                    }
                    localStorage.removeItem("myBackground");
                    if (localStorage.getItem("myGlassStyle")) {
                      Lampa.Storage.set("glass_style", Lampa.Storage.get("myGlassStyle"));
                    }
                    localStorage.removeItem("myGlassStyle");
                    if (localStorage.getItem("myBlackStyle")) {
                      Lampa.Storage.set("black_style", Lampa.Storage.get("myBlackStyle"));
                    }
                    localStorage.removeItem("myBlackStyle");
                    Lampa.Controller.toggle("content");
                  }
                }
              });
            });
            v$3.append(v25);
            v20.push(v25);
          });
        };
        this.build = function (p11) {
          var vThis3 = this;
          Lampa.Background.change("");
          Lampa.Template.add("button_category", "<div id='button_category'><style>@media screen and (max-width: 2560px) {.themes .card--collection {width: 14.2%!important;}.scroll__content {padding:1.5em 0!important;}.info {height:9em!important;}.info__title-original {font-size:1.2em;}}@media screen and (max-width: 385px) {.info__right {display:contents!important;}.themes .card--collection {width: 33.3%!important;}}@media screen and (max-width: 580px) {.info__right {display:contents!important;}.themes .card--collection {width: 25%!important;}}</style><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg> <span>Категории тем</span>\n </div></div>");
          Lampa.Template.add("info_tvtv", "<div class=\"info layer--width\"><div class=\"info__left\"><div class=\"info__title\"></div><div class=\"info__title-original\"></div><div class=\"info__create\"></div></div><div class=\"info__right\">  <div id=\"stantion_filtr\"></div></div></div>");
          var v35 = Lampa.Template.get("button_category");
          v21 = Lampa.Template.get("info_tvtv");
          v21.find("#stantion_filtr").append(v35);
          v21.find(".view--category").on("hover:enter hover:click", function () {
            vThis3.selectGroup();
          });
          v19.render().addClass("layer--wheight").data("mheight", v21);
          v$2.append(v21.append());
          v$2.append(v19.render());
          this.append(p11);
          v19.append(v$3);
          this.activity.loader(false);
          this.activity.toggle();
        };
        this.selectGroup = function () {
          Lampa.Select.show({
            title: "Категории тем",
            items: v23,
            onSelect: function f6(p12) {
              Lampa.Activity.push({
                url: p12.url,
                title: p12.title,
                component: "my_themes",
                page: 1
              });
              Lampa.Storage.set("themesCurrent", JSON.stringify(Lampa.Activity.active()));
            },
            onBack: function f7() {
              Lampa.Controller.toggle("content");
            }
          });
        };
        this.start = function () {
          var vThis4 = this;
          Lampa.Controller.add("content", {
            toggle: function f8() {
              Lampa.Controller.collectionSet(v19.render());
              Lampa.Controller.collectionFocus(v22 || false, v19.render());
            },
            left: function f9() {
              if (Navigator.canmove("left")) {
                Navigator.move("left");
              } else {
                Lampa.Controller.toggle("menu");
              }
            },
            right: function f10() {
              if (Navigator.canmove("right")) {
                Navigator.move("right");
              } else {
                vThis4.selectGroup();
              }
            },
            up: function f11() {
              if (Navigator.canmove("up")) {
                Navigator.move("up");
              } else if (!v21.find(".view--category").hasClass("focus")) {
                Lampa.Controller.collectionSet(v21);
                Navigator.move("right");
              } else {
                Lampa.Controller.toggle("head");
              }
            },
            down: function f12() {
              if (Navigator.canmove("down")) {
                Navigator.move("down");
              } else if (v21.find(".view--category").hasClass("focus")) {
                Lampa.Controller.toggle("content");
              }
            },
            back: function f13() {
              Lampa.Activity.backward();
            }
          });
          Lampa.Controller.toggle("content");
        };
        this.pause = function () {};
        this.stop = function () {};
        this.render = function () {
          return v$2;
        };
        this.destroy = function () {
          v18.clear();
          v19.destroy();
          if (v21) {
            v21.remove();
          }
          v$2.remove();
          v$3.remove();
          v18 = null;
          v20 = null;
          v$2 = null;
          v$3 = null;
          v21 = null;
        };
      }
      Lampa.Component.add("my_themes", f2);
      Lampa.Storage.listener.follow("change", function (p13) {
        if (p13.name == "activity") {
          if (Lampa.Activity.active().component !== "my_themes") {
            $("#button_category").remove();
          }
        }
      });
    }
    if (window.appready) {
      f();
    } else {
      Lampa.Listener.follow("app", function (p14) {
        if (p14.type == "ready") {
          f();
        }
      });
    }
  })();
})();
