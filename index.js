const addButton = document.getElementById("addButton");

let popUp = document.getElementById("popUp");

const addItemBtn = document.getElementById("add");


//dealing with table

const table = document.getElementById("table");



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
    const form = document.getElementById("form");

    form.addEventListener('submit', function(event){
        event.preventDefault();
        const ID = document.getElementById("id").value;
        const item = document.getElementById("item").value;
        const quantity = document.getElementById("Quantity").value;
        const buying = document.getElementById("buying").value;
        const selling = document.getElementById("selling").value;



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
    })

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
        })

        const deleteIcon = newRow.querySelector(".deleteIcon");
        deleteIcon.addEventListener('click', ()=> {deleteButton(stock.id)});
        table.appendChild(newRow);
    }

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




    
    fetch(" http://localhost:3000/stock")
    .then(response => response.json())
    .then(data => {
        data.sort((a,b) => a.id.localeCompare(b.id))
        data.forEach(stock => addTable(stock))})
    .catch(error => console.log("This is due to",error))


