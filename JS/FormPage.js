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
        let nameRgx = RegExp('^([A-Z]{1}[a-z]{2,}\\s{0,1})+$');
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
//save method
const save = (event) => {
    alert("Save Button Fired");
    // const data = new FormData(event.target);
    // const formJSON = Object.fromEntries(data.entries());
    // alert(JSON.stringify(formJSON));
    let addressBookData=createAddressBook();
    alert(addressBookData.toString());
    

}

const createNewId = () => {
    let addressBookId = localStorage.getItem('addressBookID');
    addressBookId = !addressBookId ? 1 : (parseInt(addressBookId) + 1);
    localStorage.setItem('addressBookID', addressBookId);
    return addressBookId;
}

const createAddressBook=()=>{
   let addressBook=new AddressBook();
    addressBook.id=createNewId();
    try {
        addressBook.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    addressBook.phone = getInputValueById('#phone');
    addressBook.address = getInputValueById('#address');
    addressBook.city = getInputValueById('#city');
    addressBook.state = getInputValueById('#state');
    addressBook.zipCode = getInputValueById('#zipcode');
    return addressBook;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

//reset method
const resetForm = () => {
    setValue('#name','');
    setValue('#phone','');
    setValue('#address','');
    setValue('#city','');
    setValue('#state','');
    setValue('#zipcode','');
    alert("Reset Button Fired");
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}