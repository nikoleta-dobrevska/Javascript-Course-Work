const addButton = document.getElementsByClassName("add-button")[0];
addButton.addEventListener('click', addItem);

const main = document.getElementsByTagName("main")[0];
const labels = ["Item", "Quantity", "Metric unit", "Price"];

const quantityInputs = new Array();
const priceInputs = new Array();

function addItem() {
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    main.appendChild(newRow);
    
    let i = 0;

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

        if(i==0 || i==2) {
            newInput.id = "item";
            newInput.type="text";
        } else if(i==1) {
            newInput.id = "quantity";
            newInput.type="number"
            newInput.step="0.001"
            quantityInputs.push(newInput);
        } else {
            newInput.id = "price"
            newInput.type="number"
            newInput.step="0.01"
            priceInputs.push(newInput);
        }

        i++;
    });

    const buttonHolder = document.createElement("div");
    buttonHolder.classList.add("add-and-remove-container");

    const addButtonIcon = document.createElement("i");
    addButtonIcon.classList.add("fa");
    addButtonIcon.classList.add("fa-plus");

    const removeButtonIcon = document.createElement("i");
    removeButtonIcon.classList.add("fa");
    removeButtonIcon.classList.add("fa-minus");

    const newAddButton = document.createElement("button");
    newAddButton.classList.add("add-button");
    newAddButton.addEventListener('click', addItem);
    newAddButton.appendChild(addButtonIcon);

    const newRemoveButton = document.createElement("button");
    newRemoveButton.classList.add("remove-button");
    newRemoveButton.appendChild(removeButtonIcon);

    buttonHolder.appendChild(newAddButton);
    buttonHolder.appendChild(newRemoveButton);
    main.appendChild(buttonHolder);
}

