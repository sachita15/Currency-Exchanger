const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");

const btn= document.querySelector("form button");

const fromcur= document.querySelector(".from select");
const tocur= document.querySelector(".to select");

const msg= document.querySelector(".msg");

for(let select of dropdowns){
    for(curCode in countryList){
        let newoption= document.createElement("option");
      
        newoption.innerText=curCode;
        newoption.value=curCode;
        
        if(select.name==="from" && curCode === "USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && curCode === "INR"){
            newoption.selected="selected";
        }
        
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    
    let curCode=element.value;
   
    let countrycode= countryList[curCode];
    
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    
    let img= element.parentElement.querySelector("img");
    img.src= newsrc;
};

btn.addEventListener("click",(evt)=>{

    evt.preventDefault();
    updateExchangeRate();
}
);


 const updateExchangeRate= async()=>{

    let amount=document.querySelector(".amount input");
    let amtval= amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
 
    const url=`${base_url}/${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`;
    
    let response= await fetch(url);
    
    let data= await response.json();
    
    let rate= data[tocur.value.toLowerCase()];
    
    let finalamt= amtval*rate;
    
    msg.innerText=`${amtval}${fromcur.value}= ${finalamt}${tocur.value}`;
 };


window.addEventListener("load",()=>{
    updateExchangeRate();
})
