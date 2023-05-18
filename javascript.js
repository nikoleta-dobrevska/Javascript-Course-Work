let priceWithoutVat = 0;
let totalPrice = 0;
const values = document.getElementsByTagName("input");

// resets inputs' values after reload or going back 
function checkReload() {
    let data = window.performance.getEntriesByType("navigation")[0].type;

    if (data === "reload") {

       for (let i = 0; i < values.length; i++) {
        values[i].value = '';
       }

        priceWithoutVat = 0;
        totalPrice = 0;
    }
}

checkReload();

const addButton = document.getElementsByClassName("add-button")[0];
addButton.addEventListener('click', addItem);

const main = document.getElementsByTagName("main")[0];
const labels = ["Item", "Quantity", "Metric unit", "Price"];

function addItem() {
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

        if (element === "Quantity") {
            newInput.setAttribute("type", "number");
            newInput.setAttribute("step", ".001");
            newInput.classList.add("quantity");
        }

        if (element === "Price") {
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

    buttonHolder.appendChild(addButton);
    buttonHolder.appendChild(newRemoveButton);
    main.appendChild(buttonHolder);
}

const calculateWithoutVatButton = document.getElementsByClassName("calculate")[0];
calculateWithoutVatButton.addEventListener('click', calculatePriceWithoutVat);

const priceWithoutVatText = document.getElementsByTagName("span")[0];

function calculatePriceWithoutVat() {
    var prices = document.getElementsByClassName("price");
    var quantities = document.getElementsByClassName("quantity");

    for(let i = 0; i < prices.length; i++) {
           let currentQuantity = parseFloat(prices[i].value);
           let currentPrice = parseFloat(quantities[i].value);

            priceWithoutVat += currentQuantity * currentPrice;
    }

    priceWithoutVatText.innerHTML = priceWithoutVat;
}

const calculateWithVatButton = document.getElementsByClassName("calculate")[1];
calculateWithVatButton.addEventListener('click', calculateTotalPrice);

let totalPriceText = document.getElementsByTagName("span")[1];

function calculateTotalPrice() {
    const vat = document.getElementById("vat").value;

    totalPrice = (priceWithoutVat * vat) / 100 + priceWithoutVat;

    totalPriceText.innerHTML = totalPrice;
}
