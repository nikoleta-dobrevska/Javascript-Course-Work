let priceWithoutVat, totalPrice;

const values = document.getElementsByTagName("input");

// resets inputs' values after reload or going back to the page
function resetValues() {
    for (let i = 0; i < values.length; i++) {
        values[i].value = '';
    }

    priceWithoutVat = 0;
    totalPrice = 0;
}

resetValues();

const addButton = document.getElementsByClassName("add-button")[0];
addButton.addEventListener('click', addItem);

const removeButton = document.getElementsByClassName("remove-button")[0];
removeButton.addEventListener('click', removeItemException);

const warning = document.getElementById("removeItemWarning");

function removeItemException() {
    warning.style.visibility = "visible"; 
    warning.innerHTML = "You can't delete the first row!";

    setTimeout(function () {
        warning.style.visibility = "hidden";
    }, 5000);   
}

const main = document.getElementsByTagName("main")[0];
const labels = ["Item:", "Quantity:", "Metric unit:", "Price:"];


//checks whether the input fields are empty or filled with incorrect data
function validateInputs() {
    let isValid = true;

    for (let i = 0; i < values.length-1; i++) {
        if (!values[i].value || parseFloat(values[i].value) <= 0 ) {
            values[i].style.border = "1px solid red";

            warning.style.visibility = "visible"; 
            warning.innerHTML = "Invalid input/s or empty field/s!"

            isValid = false;
        }
    }

    return isValid;
}

//creates a new row with the labels and their respective input fields
function addItem() {
    if (!validateInputs()) {
        return;
    } else {
        warning.style.visibility = "hidden"; 
        warning.innerHTML = "";

        for (let i = 0; i < values.length-1; i++) {
            values[i].style.border = "1px solid grey";
        }
    }

    const newRow = document.createElement("div");
    newRow.classList.add("row");
    main.appendChild(newRow);

    labels.forEach(element => {
        const newLabelHolder = document.createElement("div");
        newLabelHolder.classList.add("label-name");

        const newInput = document.createElement("input");

        const newInputHolder = document.createElement("div");
        newInputHolder.classList.add("input-field");

        const newLabel = document.createElement("label");
        newLabel.innerHTML = element;

        newLabelHolder.appendChild(newLabel);
        newInputHolder.appendChild(newInput);
        newRow.appendChild(newLabelHolder);
        newRow.appendChild(newInputHolder);

        if (element === "Quantity:") {
            newInput.setAttribute("type", "number");
            newInput.setAttribute("step", ".001");
            newInput.classList.add("quantity");
        }

        if (element === "Price:") {
            newInput.setAttribute("type", "number");
            newInput.setAttribute("step", ".01");
            newInput.classList.add("price");
        }
    }); 

    const buttonHolder = document.createElement("div");
    buttonHolder.classList.add("add-and-remove-container");

    const removeButtonIcon = document.createElement("i");
    removeButtonIcon.classList.add("fa");
    removeButtonIcon.classList.add("fa-minus");

    const newRemoveButton = document.createElement("button");
    newRemoveButton.classList.add("remove-button");
    newRemoveButton.appendChild(removeButtonIcon);
    newRemoveButton.addEventListener('click', removeItem);

    removeButton.removeEventListener('click', removeItemException);

    buttonHolder.appendChild(addButton);
    buttonHolder.appendChild(newRemoveButton);
    main.appendChild(buttonHolder);
}

//removes the respective row
function removeItem() {
}

const calculateWithoutVatButton = document.getElementsByClassName("calculate")[0];
calculateWithoutVatButton.addEventListener('click', calculatePriceWithoutVat);

const priceWithoutVatText = document.getElementsByTagName("span")[0];
let bgn = " BGN";

//calculates the total price without added VAT
function calculatePriceWithoutVat() {    
    if (!validateInputs()) {
        return;
    } else {
        warning.style.visibility = "hidden"; 
        warning.innerHTML = "";

        for (let i = 0; i < values.length-1; i++) {
            values[i].style.border = "1px solid grey";
        }
    }

    priceWithoutVat = 0;
    let prices = document.getElementsByClassName("price");
    let quantities = document.getElementsByClassName("quantity");

    for(let i = 0; i < prices.length; i++) {
           let currentQuantity = parseFloat(prices[i].value);
           let currentPrice = parseFloat(quantities[i].value);

            priceWithoutVat += currentQuantity * currentPrice;
    }

    priceWithoutVatText.innerHTML = priceWithoutVat.toFixed(2)  + bgn;
}

const calculateWithVatButton = document.getElementsByClassName("calculate")[1];
calculateWithVatButton.addEventListener('click', calculateTotalPrice);

let totalPriceText = document.getElementsByTagName("span")[1];

let vatField = values[values.length-1];

//validates the VAT field exclusively
function validateVatField() {
    let isValid = true;

    if(!vatField.value || parseFloat(vatField.value) <= 0 || !Number.isInteger(parseFloat(vatField.value))) {        
        vatField.style.border = "1px solid red";

        warning.style.visibility = "visible"; 
        warning.innerHTML = "Invalid input!"

        isValid = false;
    }

    if(!validateInputs()) {
        isValid = false;
    }

    return isValid;
}

//calculates the total price with added VAT
function calculateTotalPrice() {
    calculatePriceWithoutVat();

    if (!validateVatField()) {
        return;
    } else {
        warning.style.visibility = "hidden"; 
        warning.innerHTML = "";

        vatField.style.border = "1px solid grey";
    }

    const vat = document.getElementById("vat").value;

    parseFloat(vat);

    totalPrice = (priceWithoutVat * vat) / 100 + priceWithoutVat;

    totalPriceText.innerHTML = totalPrice.toFixed(2) + bgn;
}
