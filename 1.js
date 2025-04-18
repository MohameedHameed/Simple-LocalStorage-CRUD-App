let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let Search=document.getElementById("Search");
let btn_create=document.getElementById("btn_Create");
let btn_serach_By_Title=document.getElementById("btn_serach_By_Title");
let btn_Serach_By_category=document.getElementById("btn_Serach_By_category");

let datap;
let moode="create";
let temp;
if(localStorage.data!=null){
  datap=JSON.parse(localStorage.data);
}
else{
  datap=[];

}

function gettotal(){
  if(price.value=='' ){
    price.value=0;
  }
  if(taxes.value==''){
    taxes.value=0;
  }
  if(ads.value=='' ){
    ads.value=0;
  }
  if(discount.value=='' ){
    discount.value=0;
  }
  if(price.value!='0'){
    
    let result=parseInt(price.value)+parseInt(taxes.value)+parseInt(ads.value)-parseInt(discount.value);
    total.innerHTML=result;
  }
  else{
    total.innerHTML='';
  }
}

btn_create.onclick=function(){
  let pro;
  
    if(title.value!='' && price.value!='' && count.value<100){
      pro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
      }
      if(moode=="create"){
      
      if(count.value>1){
   for(let i=0;i<count.value;i++){
       datap.push(pro);
       console.log(datap)
  
   }
      }else{
        datap.push(pro);
        console.log(datap)
  
      }
      
     
    }
    else{
      datap[temp]=pro;
      btn_create.innerText="create";
      moode="create";
      count.style.display='block';
  }
  

  localStorage.setItem('data',JSON.stringify(datap));
  clearitems();
  showdata();
  total.innerHTML='0';
  }
 

}



function clearitems(){
  title.value='';
  price.value='';
  taxes.value='';
  ads.value='';
  discount.value='';
  total.value='';
  count.value='';
  category.value='';

}

function showdata(){
  let btndeleteall=document.getElementById("deleteall");
  if(datap.length>0){
    let items='';
    for(let i=0;i<datap.length;i++){
      let v=i+1;
      items+=` <tr>
        <td>${v}</td>
        <td>${datap[i].title}</td>
        <td>${datap[i].price}</td>
        <td>${datap[i].taxes}</td>
        <td>${datap[i].ads}</td>
        <td>${datap[i].discount}</td>
        <td>${datap[i].total}</td>
        <td>${datap[i].category}</td>
        <td><button id="update" onclick="UpdateItem(${i})">Update</button></td>
        <td><button id="Delete" onclick="DeleteItem(${i})">Delete</button></td>
  
      </tr>`
  
    }
    let tbody=document.getElementById("tbody");
    tbody.innerHTML=items;
    btndeleteall.style.display='block';

  }
  else{
    btndeleteall.style.display='none';
    tbody.innerHTML='';

  }
 
}

onload=function(){
  showdata();
}


 function DeleteItem(i){
  datap.splice(i,1);
  localStorage.setItem('data',JSON.stringify(datap));
  showdata();

 }

 function DeleteAll(){
  datap.splice(0);
  localStorage.setItem('data',JSON.stringify(datap));
  showdata();

 }

 function UpdateItem(i){
   title.value=datap[i].title;
   price.value=datap[i].price;
   taxes.value=datap[i].taxes;
   ads.value=datap[i].ads;
   discount.value=datap[i].discount;
   category.value=datap[i].category;
   gettotal();
   count.style.display='none';
   btn_create.innerText="update";
   moode="Update";
  temp=i;




 }
 function Serach(id){
  if(id=="btn_serach_By_Title"){
    Search.placeholder="Serach By Title";
    

  }
  else{
    Search.placeholder="Serach By catagory";


  }
   moodesearch=id;
  Search.focus();
  
 }

 let moodesearch="btn_serach_By_Title";
 Search.placeholder="Serach By Title";
 function SerachItems(){
  let items='';
  if(moodesearch=="btn_serach_By_Title"){
   for(let i=0;i<datap.length;i++){
    if(datap[i].title.includes(Search.value)){
      let v=i+1;

      items+=` <tr>
        <td>${v}</td>
        <td>${datap[i].title}</td>
        <td>${datap[i].price}</td>
        <td>${datap[i].taxes}</td>
        <td>${datap[i].ads}</td>
        <td>${datap[i].discount}</td>
        <td>${datap[i].total}</td>
        <td>${datap[i].category}</td>
        <td><button id="update" onclick="UpdateItem(${i})">Update</button></td>
        <td><button id="Delete" onclick="DeleteItem(${i})">Delete</button></td>
  
      </tr>`
    }
   }
  }else{
    for(let i=0;i<datap.length;i++){
      if(datap[i].category.includes(Search.value)){
        items+=` <tr>
          <td>${i}</td>
          <td>${datap[i].title}</td>
          <td>${datap[i].price}</td>
          <td>${datap[i].taxes}</td>
          <td>${datap[i].ads}</td>
          <td>${datap[i].discount}</td>
          <td>${datap[i].total}</td>
          <td>${datap[i].category}</td>
          <td><button id="update" onclick="UpdateItem(${i})">Update</button></td>
          <td><button id="Delete" onclick="DeleteItem(${i})">Delete</button></td>
    
        </tr>`
      }
     }
  }
  let tbody=document.getElementById("tbody");
  tbody.innerHTML=items;
 }