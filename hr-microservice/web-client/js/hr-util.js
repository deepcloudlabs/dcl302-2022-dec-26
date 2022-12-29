let toSrcImage = function (img) {
    return "data:image/png;base64," + img;
};

let toRawImage = function (img) {
    return img.split(",")[1];
};

let ajaxErrorHandler = function (jqXHR, error, errorThrown) {
    let errorMessage = JSON.parse(jqXHR.responseText);
    let listOfIds = errorMessage.i18nId.split("|");
    console.log(listOfIds);
    for (let i in listOfIds) {
        toastr.error(i18n.t(listOfIds[i]), "", AppConfig.TOASTR_CONFIG);
    }
};