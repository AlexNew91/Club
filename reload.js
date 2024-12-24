(function () {
    'use strict';

    // Функция отображения модального окна с круговой анимацией загрузки
    function showLoadingModal() {
        const overlay = document.createElement('div');
        overlay.id = 'custom-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const modal = document.createElement('div');
        modal.id = 'custom-modal';
        modal.style.cssText = `
            position: relative;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: conic-gradient(#64e364 0%, #ccc 0%);
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 1.5em;
            font-weight: bold;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        `;

        const innerCircle = document.createElement('div');
        innerCircle.style.cssText = `
            position: absolute;
            width: 80px;
            height: 80px;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const percentage = document.createElement('div');
        percentage.id = 'percentage-text';
        percentage.style.cssText = `
            position: absolute;
            font-size: 1.2em;
        `;
        percentage.textContent = '0%';

        innerCircle.appendChild(percentage);
        modal.appendChild(innerCircle);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Анимация загрузки от 0 до 100
        let progress = 0;
        const interval = setInterval(() => {
            if (progress <= 100) {
                percentage.textContent = `${progress}%`;
                modal.style.background = `conic-gradient(#64e364 ${progress}%, #ccc ${progress}%)`;
                progress++;
            } else {
                clearInterval(interval);
                location.reload(); // Перезагрузка страницы после завершения
            }
        }, 30);
    }

    // Добавление стилей
    const style = document.createElement('style');
    style.type = 'text/css';
    document.head.appendChild(style);

    // Функция добавления кнопки "Перезагрузить"
    function addSettingsParam() {
        Lampa.SettingsApi.addParam({
            component: 'interface',
            param: {
                name: 'Reloadbutton',
                type: 'trigger',
                default: false
            },
            field: {
                name: 'Добавить кнопку перезагрузки',
                description: 'Иконка рядом с часами'
            },
            onChange: function (value) {
                if (value) {
                    $('#RELOAD').removeClass('hide');
                } else {
                    $('#RELOAD').addClass('hide');
                }
            }
        });

        const reloadButtonHTML = `
            <div id="RELOAD" class="head__action selector reload-screen hide">
                <svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z"></path>
                </svg>
            </div>`;
        $('#app > div.head > div > div.head__actions').append(reloadButtonHTML);

        $('#RELOAD').on('hover:enter', function () {
            showLoadingModal();
        });

        if (Lampa.Storage.field('Reloadbutton')) {
            $('#RELOAD').removeClass('hide');
        } else {
            $('#RELOAD').addClass('hide');
        }
    }

    if (window.appready) {
        addSettingsParam();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                addSettingsParam();
            }
        });
    }
})();
