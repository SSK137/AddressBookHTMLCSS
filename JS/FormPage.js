let isUpdate = false;
let addressBookObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    validName();
    validAddress();
    validPhoneNumber();
    checkForUpdate();

});


function validName() {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBook()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            console.error(e);
            textError.textContent = e;
        }

    });

}
function validAddress() {
    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = "";
            return;
        }
        try {
            (new AddressBook()).address = address.value;
            addressError.textContent = "";
        } catch (e) {
            console.error(e);
            addressError.textContent = e;
        }

    });
}
function validPhoneNumber() {
    const phoneNumber = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phoneNumber.addEventListener('input', function () {
        if (phoneNumber.value.length == 0) {
            phoneError.textContent = "";
            return;
        }

        try {
            (new AddressBook()).phoneNumber = phoneNumber.value;
            phoneError.textContent = "";
        } catch (e) {
            console.error(e);
            phoneError.textContent = e;
        }

    });
}

//save method
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        createAddressBookObj();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }
    catch (e) {
        return;
    }

}

//creating Id automatically and storing into the Local storage
const createNewId = () => {
    let addressBookId = localStorage.getItem('addressBookID');
    addressBookId = !addressBookId ? 1 : (parseInt(addressBookId) + 1);
    localStorage.setItem('addressBookID', addressBookId);
    return addressBookId;
}

//getting all tyhe data from form and storing in addressBook object
const createAddressBookObj = () => {

    addressBookObj.name = getInputValueById('#name');
    addressBookObj.phoneNumber = getInputValueById('#phone');
    addressBookObj.address = getInputValueById('#address');
    addressBookObj.city = getInputValueById('#city');
    addressBookObj.state = getInputValueById('#state');
    addressBookObj.zipCode = getInputValueById('#zipcode');
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
//Storing data locally
function createAndUpdateStorage() {

    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList) {
        let addressBookData = addressBookList.find(bookData => bookData._id == addressBookObj._id);
        if (!addressBookData) {
            addressBookList.push(createAddressBook());
            alert("Added Successfully");
        } else {
            const index = addressBookList
                .map(bookData => bookData._id)
                .indexOf(addressBookData._id);
            addressBookList.splice(index, 1, createAddressBook(addressBookData._id));
            alert("Updated Successfully");
        }
    } else {
        addressBookList = [createAddressBook()]
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const createAddressBook = (id) => {
    let addressBookData = new AddressBook();
    if (!id) addressBookData._id = createNewId();
    else addressBookData._id = id;
    setaddressBookData(addressBookData);
    return addressBookData;
}

const setaddressBookData=(addressBookData)=>{

    try {
        addressBookData._name = addressBookObj.name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    addressBookData._address = addressBookObj.address;
    addressBookData._city = addressBookObj.city;
    addressBookData._state = addressBookObj.state;
    addressBookData._zipCode = addressBookObj.zipCode;
    addressBookData._phoneNumber = addressBookObj.phoneNumber;
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#phone', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zipcode', '');

}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id); element.textContent = value;
}

const setForm= () => {
    setValue('#name',addressBookObj._name);
    setValue('#address',addressBookObj._address);
    setValue('#city',addressBookObj._city);
    setValue('#state',addressBookObj._state);
    setValue('#phone',addressBookObj._phoneNumber);
    setValue('#zipcode',addressBookObj._zipCode);
    //alert(addressBookData.toString());
}

const checkForUpdate =() => {
    const addressBookJSON = localStorage.getItem('editBook');
    isUpdate = addressBookJSON ? true : false;
    if(!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJSON);
    setForm();
}