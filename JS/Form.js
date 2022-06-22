window.addEventListener('DOMContentLoaded', (event) => {
    NameVaidation();
    MobNoValidation();
    AddressValidation();
})
//Validation Of Name
function NameVaidation() {
    const text = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    text.addEventListener('input', function () {
        let nameRgx = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(text.value.length==0)
        textError.textContent="";
        else
        if (nameRgx.test(text.value))
            textError.textContent = "";
        else textError.textContent = "Name Is Incorrect";
    });
}

// Validation Of Phone Number
function MobNoValidation() {
    const tel = document.querySelector('#phone');
    const telError = document.querySelector('.phone-error');
    tel.addEventListener('input', function () {
        let telRgx = RegExp('^[0-9]{2}\\s{0,1}[0-9]{10}$');
        if(tel.value.length==0)
        telError.textContent="";
        else
        if (telRgx.test(tel.value))
            telError.textContent = "";
        else telError.textContent = "Number Is Incorrect";
    });
}

//Validation Of Address
function AddressValidation() {
    const address = document.querySelector('#address');
    const addresserroe = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        let addressRgx = RegExp('^([A-Za-z0-9]{3,}.)+$');
        if(address.value.length==0)
        addresserroe.textContent="";
        else
        if (addressRgx.test(address.value))
            addresserroe.textContent = "";
        else
            addresserroe.textContent = "Address Is Incorrect";
    })
}