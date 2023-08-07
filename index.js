const addButton = document.getElementById("addButton");

let popUp = document.getElementById("popUp");

const addItemBtn = document.getElementById("add");


//dealing with table

const table = document.getElementById("table");

const formPop = (receiveData) => {
    const IDD = document.getElementById("id");
    const itemD = document.getElementById("item");
    const quantityD = document.getElementById("Quantity");
    const buyingD = document.getElementById("buying");
    const sellingD = document.getElementById("selling");

    IDD.value = receiveData.id;
    itemD.value = receiveData.item;
    quantityD.value = receiveData.quantity;
    buyingD.value = receiveData.BuyingPrice;
    sellingD.value = receiveData.SellingPrice;

    visibleForm();

}

const visibleForm = () => {popUp.style.visibility = 'visible';}

document.addEventListener('DOMContentLoaded', function(e){
    e.preventDefault();
    popUp.style.visibility = 'hidden';

    addButton.addEventListener('click', function(){
        popUp.style.visibility = 'visible';
    });

    const cancelButton = document.getElementById("cancel");
    cancelButton.addEventListener('click', function(){
        popUp.style.visibility = "hidden";
    })

    

});

    //creating a POST Request

    function postData (){

        
            const ID = document.getElementById("id");
            const item = document.getElementById("item");
            const quantity = document.getElementById("Quantity");
            const buying = document.getElementById("buying");
            const selling = document.getElementById("selling");
    
    
    
            fetch("http://localhost:3000/stock",{
                method:'POST',
                body:JSON.stringify({
                    id:ID,
                    item:item,
                    quantity:quantity,
                    BuyingPrice:buying,
                    SellingPrice:selling
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error))
        
    }


    //creating a GET request

    function addTable (stock){
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <tr>
                <td>${stock.id}</td>
                <td>${stock.item}</td>
                <td>${stock.quantity}</td>
                <td>${stock.BuyingPrice}</td>
                <td>${stock.SellingPrice}</td>
                <td><i class="fa fa-pencil-alt editIcon"aria-hidden="true"></i></td>
                <td><i class="fa-solid fa-trash-alt deleteIcon"></i></td>
            </tr>
        `
        const editIcon = newRow.querySelector(".editIcon");
        
        editIcon.addEventListener('click', function(){
            
            popUp.style.visibility = 'visible';
            fetchDataToUpdate(stock.id);
        })

        const deleteIcon = newRow.querySelector(".deleteIcon");
        deleteIcon.addEventListener('click', ()=> {deleteButton(stock.id)});
        table.appendChild(newRow);
    }

    fetch(" http://localhost:3000/stock")
    .then(response => response.json())
    .then(data => {
        data.sort((a,b) => a.id.localeCompare(b.id))
        data.forEach(stock => addTable(stock))})
    .catch(error => console.log("This is due to",error))

// creating a delete function

    function deleteButton (id){
        fetch("http://localhost:3000/stock"+`/${id}`,{
            method:'DELETE',
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response => response.json())
        .then(data => data)
    }

//creating PUT request 
// first get items to form

let requiredData = null;

const fetchDataToUpdate = async (updateDataId) => {
    const baseUrl = "http://localhost:3000/stock" +`/${updateDataId}`;

    const response = await fetch(baseUrl);
    const displayData = await response.json();
    requiredData = displayData;

    console.log(displayData);
    formPop(requiredData);
}


const updateStock = async () => {
    const IDDnew = document.getElementById("id").value;
    const itemDnew = document.getElementById("item").value;
    const quantityDnew = document.getElementById("Quantity").value;
    const buyingDnew = document.getElementById("buying").value;
    const sellingDnew = document.getElementById("selling").value;

    const newData = {
        id:IDDnew,
        item:itemDnew,
        quantity:quantityDnew,
        BuyingPrice:buyingDnew,
        SellingPrice:sellingDnew
    }

    const newUrl = "http://localhost:3000/stock" + `/${requiredData.id}`;

    const putMethod = {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newData)
    }

    const response = await fetch(newUrl, putMethod);
    const theResponseData = await response.json();
}


// const form = document.getElementById("form");


const handleSubmit = () => {
    if (requiredData){
        updateStock();
    }else{
        postData();
    }

}
addItemBtn.addEventListener('click', () => {handleSubmit});



    



