document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.getElementsByClassName("download-button");
    var languageSelector = document.getElementById("language-selector");

    function getBrowserLanguage() {
        var userLanguage = navigator.language || navigator.userLanguage;
        if (userLanguage.length > 2) {
            userLanguage = userLanguage.substring(0, 2);
        }
        return userLanguage.toLowerCase();
    }

    var userLanguage = getBrowserLanguage();
    if (!translations.hasOwnProperty(userLanguage)) {
        userLanguage = "pt";
    }

    function updateTranslations() {
        var translationElements = document.querySelectorAll("[data-translate]");
        for (var i = 0; i < translationElements.length; i++) {
            var element = translationElements[i];
            var translationKey = element.dataset.translate;
            element.innerHTML = getTranslation(translationKey);
        }
    }

    function getTranslation(translationKey) {
        var languageTranslations = translations[userLanguage];
        if (languageTranslations && languageTranslations.hasOwnProperty(translationKey)) {
            return languageTranslations[translationKey];
        } else {
            return translationKey;
        }
    }

    updateTranslations();

    languageSelector.addEventListener("change", function () {
        userLanguage = languageSelector.value;
        updateTranslations();
    });

    function startDownload(button) {
        button.disabled = true;
        button.style.display = "none";
        var timerButton = button.nextElementSibling;
        var count = parseInt(button.dataset.seconds);

        var intervalId = setInterval(function () {
            button.style.display = "none";
            timerButton.textContent = count + "s";
            count--;

            if (count < 0) {
                clearInterval(intervalId);
                button.disabled = true;
                timerButton.textContent = "";
                button.style.display = "inline-block";
            }
        }, 1000);

        setTimeout(function () {
            downloadZip(button.dataset.filename);
            button.disabled = true;
            timerButton.style.display = "none";
        }, count * 1000);
    }

    function downloadZip(filename) {
        var link = document.createElement("a");
        link.href = filename;
        link.download = filename;
        link.click();
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            var timerButton = this.nextElementSibling;
            timerButton.style.display = "inline-block";
            startDownload(this);
        });
    }

    var v331Button = document.getElementById('v331');
    v331Button.addEventListener('click', function () {
        Swal.fire({
            title: 'Changelog',
            html: translations[userLanguage].v331t,
            confirmButtonColor: '#4CAF50',
            showCloseButton: true,
            showConfirmButton: false
        });
    });
    var v332Button = document.getElementById('v332');
    v332Button.addEventListener('click', function () {
        Swal.fire({
            title: 'Changelog',
            html: translations[userLanguage].v332t,
            confirmButtonColor: '#4CAF50',
            showCloseButton: true,
            showConfirmButton: false
        });
    });
    var v340Button = document.getElementById('v340');
    v340Button.addEventListener('click', function () {
        Swal.fire({
            title: 'Changelog',
            html: translations[userLanguage].v340t,
            confirmButtonColor: '#4CAF50',
            showCloseButton: true,
            showConfirmButton: false
        });
    });
    var v350Button = document.getElementById('v350');
    v350Button.addEventListener('click', function () {
        Swal.fire({
            title: 'Changelog',
            html: translations[userLanguage].v350t,
            confirmButtonColor: '#4CAF50',
            showCloseButton: true,
            showConfirmButton: false
        });
    });
});