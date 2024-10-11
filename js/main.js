let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let disccount = document.getElementById("disccount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let mood="create";
let tmp;

// get total
function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +disccount.value;
        total.innerHTML = result; 
        total.style.backgroundColor = "#004";
    } else {
        total.innerHTML = " ";
        total.style.backgroundColor = "#257180";
    }
}

//create product
let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product)
}
else{
    dataPro=[];
}
create.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        disccount:disccount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    let result=document.getElementById("result");
    result.style.background="#821131";
    result.style.display="inline-block";
    result.style.padding="10px 430px";
    result.style.fontSize="18px";
    result.style.transition="ease-in 0.2s";
    result.setAttribute("class","alert text-capitalize ")
    //clean data
    if(title.value==""){
        result.innerHTML="Enter title";
    }
    else if(price.value==""){
        result.innerHTML="Enter price";
    }
    else if(count.value>100){
        result.innerHTML="Enter count of less than 101"
    }
    else if(category.value==""){
        result.innerHTML="Enter category";
    }
    else{
        result.style.display="none";
        if(mood==="create"){
            //count
        if(newPro.count>1){
            for(let i=0; i<newPro.count; i++){
                dataPro.push(newPro);
            }
        }
        else{
            dataPro.push(newPro);
        }
        }
        else{
            dataPro[tmp]=newPro;
            mood="create";
            create.innerHTML="Create";
            count.style.display="block";
        }
        clearData();
    }
    //save localStorage
    localStorage.setItem("product",JSON.stringify(dataPro));
    // console.log(dataPro);
    showData();
}

//clear input
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    disccount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}

//read
function showData(){
    getTotal();
    let table="";
    for(var i=0; i<dataPro.length; i++){
        // table=dataPro[i];
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].disccount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="updata" onclick="updataData(${i})">updata</button></td>
            <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById("deleteAll")
    if(dataPro.length > 0){
        btndelete.innerHTML=`<button id="deleteAll" onclick="deleteAll()">delete all (${dataPro.length})</button>`
        // btndelete.style.display="block";
    }
    else{
        btndelete.innerHTML="";
        // btndelete.style.display="none"
    }
}
showData();
// delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData();
}
function deleteAll(){
    localStorage.clear;
    dataPro.splice(0);
    showData();
}

//update
function updataData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    disccount.value=dataPro[i].disccount;
    getTotal();
    count.style.display="none";
    category.value=dataPro[i].category;
    create.innerHTML="update";
    mood="updata";
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search
let searchMood='title';
function getSearchMood(id){
    let search=document.getElementById("search");
    if(id=="searchTitle"){
        searchMood="title";
    }
    else{
        searchMood="category";
    }
    search.placeholder="Search By " + searchMood;
    search.focus();
    showData();
}
function searchData(value){
    let table="";
    for(var i=0; i<dataPro.length; i++){
        if(searchMood=="title"){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].disccount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="updata" onclick="updataData(${i})">updata</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>`
            }
        }
        else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].disccount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="updata" onclick="updataData(${i})">updata</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}


