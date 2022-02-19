
const urlParams = new URLSearchParams(window.location.search)

const path = urlParams.get('path') ? urlParams.get('path') : ""


window.onload = async () => {

    _oldResult = await (await fetch(`/dosyalar?path=${path}`)).json();
    dosyaCek(path);
    currentPath = path;

    const input = document.getElementById('dosyaSec');

    input.onchange = function (e) {

        console.log(input.files[0].name)

        const form = document.getElementById('yukle_form');
        form.action = '/dosyalar?path=' + path;


        document.getElementById("onayla").click();

    };

    setInterval(async () => {
        try {
            let result = await (await fetch(`/dosyalar?path=${path}`)).json();

            if (result.error) { alert("Bu konum bulunamadı."); history.back(); }

            if (JSON.stringify(result) != JSON.stringify(_oldResult)) window.location.reload();
        }
        catch { }

    }, 1000);

}

let _oldResult;
async function dosyaCek(path) {

    let buttons = await (await fetch(`/dosyalar?path=${path}`)).json();

    const type = "button"

    for (let i = 0; i < buttons.length; i++) {

        let button = buttons[i];

        buttonOlustur(
            {
                name: "button",
                type,
                value: button,

                onclick: function () {
                    defaultButtonOnClickEvent(button)
                }
            }
        )
    }
}

function defaultButtonOnClickEvent(button) {
    if (!button.includes('.'))                                // eğer uzantısı yoksa
        document.location = '?path=' + path + "/" + button;

    else {
        location.assign("/uploads" + path + "/" + button)
    }

    hideMenu();
}


async function buttonOlustur({ name, type, value, onclick }) {


    var element = document.createElement("input");


    element.type = type;
    element.name = name;
    element.value = value;

    element.onclick = onclick;

    document.onclick = hideMenu;
    element.oncontextmenu = rightClick;

    document.body.appendChild(element);

}

let tiklananButon, currentPath;
function hideMenu() {
    document.getElementById(
        "contextMenu").style.display = "none"
}

function rightClick(e) {
    e.preventDefault();

    tiklananButon = e.target;

    if (document.getElementById(
        "contextMenu").style.display == "block")
        hideMenu();
    else {
        var menu = document
            .getElementById("contextMenu")

        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}