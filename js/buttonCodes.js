const sil = async(path) => {

    const result = await (await fetch('/dosyalar?path=' + path,{
        method: 'DELETE'
    })).text();

    console.log(result);

    window.location.reload();
}

const yenidenAdlandir = async(path) => {

    const newPath = prompt("Yeni İsim", path.split('/')[path.split('/').length - 1]);

    if(!newPath) return;

    const result = await (await fetch(`/rename?path=${path}&newName=${newPath}`)).text();

    console.log(result);

    window.location.reload();

}


const yeniKlasor = async(path) => {

    const dirName = prompt("Klasör Adı", "");

    if(!dirName) return;

    const result = await (await fetch('/yeniKlasor?path=' + path + "/" + dirName)).text();

    console.log(result);

    window.location.reload();


}