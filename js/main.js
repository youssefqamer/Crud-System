var nameInput = document.getElementById('ProductName');
var categoryInput = document.getElementById('ProductCategory');
var priceInput = document.getElementById('ProductPrice');
var descriptionInput = document.getElementById('ProductDescription');
var tbody=document.getElementById("tbody")
var add=document.getElementById("add")
var searchInput=document.getElementById("search")
var fAlert=document.querySelector('.f-alert')
var sAlert=document.querySelector('.s-alert')
var required=document.querySelector('.required')
var allInputsRequired=document.querySelector('.all-inputs')
var cAlert=document.querySelector('.category-alert')
var mood="add"
var helper;

var productsList ; 
if(localStorage.getItem("productData")===null){
productsList=[]
}else{
   productsList= JSON.parse(localStorage.getItem("productData"))
   showData()
}
function createProduct(){
    var product={
        pname:nameInput.value,
        category:categoryInput.value,
        price:priceInput.value,
        describtion:descriptionInput.value,
    }
    if(validateProduct() && validatePrice() && validateCategory()&& 
    descriptionInput.value!=""){
        if(mood=="add"){
            productsList.push(product)
        }else{
            productsList[helper]=product;
            add.innerHTML="add product"
            mood="create"
        }
        var data=JSON.stringify(productsList)
        localStorage.setItem("productData",data)
        clearForm()
        showData()
        allInputsRequired.classList.add('d-none')
    }else{
        allInputsRequired.classList.remove('d-none')
    }
}

function showData(){
    var trs="";
    for(var i=0; i<productsList.length; i++){
        trs+=`<tr>
        <td>${i}</td>
        <td>${productsList[i].pname}</td>
        <td>${productsList[i].category}</td>
        <td>${productsList[i].price}</td>
        <td>${productsList[i].describtion}</td>
        <td>
            <button class="btn btn-outline-warning" onclick="updateData(${i})">
                <i class="fa-solid fa-pen"></i>
            </button>
        </td>
        <td>
            <button class="btn btn-outline-danger" onclick=" deleteProduct(${i})">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>
    </tr>`
}
tbody.innerHTML=trs
}
function clearForm(){
    descriptionInput.value=null
    nameInput.value=null
    categoryInput.value=""
    priceInput.value=""
    nameInput.classList.remove('is-invalid')
    nameInput.classList.remove('is-valid')
    fAlert.classList.add('d-none')
    sAlert.classList.add('d-none')
    priceInput.classList.remove('is-invalid')
    priceInput.classList.remove('is-valid')
    categoryInput.classList.remove('is-invalid')
    categoryInput.classList.remove('is-valid')
    cAlert.classList.add('d-none')
    }
function deleteProduct(index){
productsList.splice(index,1)
localStorage.setItem("productData",JSON.stringify(productsList))
showData()
console.log(productsList)
}
function updateData(i){
    nameInput.value=productsList[i].pname
    categoryInput.value=productsList[i].category
    priceInput.value=productsList[i].price
    descriptionInput.value=productsList[i].describtion
    add.innerHTML="Update"
    mood="update"
    helper=i;
}
function searchData(){
    var trs="";
    for(var i=0; i<productsList.length; i++){
        if(productsList[i].pname.toLowerCase().includes(searchInput.value.toLowerCase())){
            trs+=`<tr>
            <td>${i}</td>
            <td>${productsList[i].pname}</td>
            <td>${productsList[i].category}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].describtion}</td>
            <td>
                <button class="btn btn-outline-warning" onclick="updateData(${i})">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-outline-danger" onclick=" deleteProduct(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>`
        }
}
tbody.innerHTML=trs
}
function validateProduct(){
    var regexPname=/^[A-Z][a-z]{1,}[0-9]{0,4}$/
    var pname=nameInput.value
    // if(regexPname.test(pname)){
    //     nameInput.classList.remove('is-invalid')
    //     fAlert.classList.add('d-none')
    //     nameInput.classList.add('is-valid')
    //     return true
    // }else{
    //     nameInput.classList.remove('is-valid')
    //     nameInput.classList.add('is-invalid')
    //     fAlert.classList.remove('d-none')
    //     return false
    // }
    // 
    if(/^[A-Z]/.test(pname)){
        nameInput.classList.remove('is-invalid')
        nameInput.classList.add('is-valid')
        fAlert.classList.add('d-none')
        sAlert.classList.add('d-none')
        required.classList.add('d-none')
            if(/[a-z]{1,}/.test(pname)){
                nameInput.classList.remove('is-invalid')
                nameInput.classList.add('is-valid')
                sAlert.classList.add('d-none')
                return true
                // alertP.classList.add('d-none')
             } else{
                   sAlert.classList.remove('d-none')
                   nameInput.classList.add('is-invalid')
                }
             
    }   else if(nameInput.value==""){
        // required.classList.remove('d-none')
        nameInput.classList.remove('is-invalid')
        nameInput.classList.remove('is-valid')
        fAlert.classList.add('d-none')
        sAlert.classList.add('d-none')
        // nameInput.classList.add('is-invalid')
    } else{
        fAlert.classList.remove('d-none')
        nameInput.classList.remove('is-valid')
            nameInput.classList.add('is-invalid')
            return false
    }
}
nameInput.addEventListener('blur',validateProduct)
priceInput.addEventListener('blur',validatePrice)
categoryInput.addEventListener('blur',validateCategory)

function validateCategory(){
    var category=categoryInput.value
if(/[a-z A-Z]{2,}/.test(category)){
    categoryInput.classList.add('is-valid')
    categoryInput.classList.remove('is-invalid')
    cAlert.classList.add('d-none')
    return true
}
else{
    categoryInput.classList.add('is-invalid')
    categoryInput.classList.remove('is-valid')
    cAlert.classList.remove('d-none')
    return false
}
}
function validatePrice(){
    var pPrice=priceInput.value
if(/[0-9]$/.test(pPrice)){
    priceInput.classList.add('is-valid')
    priceInput.classList.remove('is-invalid')
    return true
}

else{
    priceInput.classList.add('is-invalid')
    priceInput.classList.remove('is-valid')
    return false
}
}