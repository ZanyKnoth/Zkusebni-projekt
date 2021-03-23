let path = window.location.href;
path = path.split("/");
path = path[path.length-1];

let list = document.getElementsByClassName("navList");

for(let i = 0; i < list.length; i++)
{
   if(list[i].href.indexOf(path) > -1)
   {
      list[i].parentNode.style.backgroundColor = "red";
      
   }
   
}

let stripes = document.getElementById("stripes");
let nav = document.getElementById("navmenu"); 

function show()
{  
  nav.classList.toggle("active"); 
  
}  
stripes.addEventListener("click", show);

           
let switchThing = document.getElementsByTagName("input")[0];  

function darkAndLight()
{  
  let allDivs = document.getElementsByTagName("div");
  let wholePage = document.getElementsByClassName("wholePage")[0];
  let body = document.getElementsByTagName("body")[0];
  let table = document.getElementById("info");
  let num = 1;

            
  if (switchThing.checked) 
  {
    for(let i = 0; i < allDivs.length; i++)
    {
       if(allDivs[i].className == "category" + num || allDivs[i].className == "categoryIndividual")
       {
         allDivs[i].style.backgroundColor = "#4b4c4d";
         allDivs[i].style.color = "white";
         allDivs[i].style.transition = "all 1s";
         num++;
       }        
    }
    wholePage.style.transition = "all 1s";
    body.style.transition = "all 1s";
    info.style.transition = "all 1s";
    
    wholePage.style.backgroundColor = "black";
    body.style.backgroundColor = "black";
    info.style.color = "white";

  } else { 
    
    for(let i = 0; i < allDivs.length; i++)
    {
       if(allDivs[i].className == "category" + num || allDivs[i].className == "categoryIndividual")
       {
         allDivs[i].style.backgroundColor = "white";
         allDivs[i].style.color = "black";
         allDivs[i].style.transition = "all 1s";
         num++;
       }        
    }
    wholePage.style.transition = "all 1s";
    body.style.transition = "all 1s"; 
    info.style.transition = "all 1s";
   
    wholePage.style.backgroundColor = "grey";
    body.style.backgroundColor = "grey";
    info.style.color = "black";

  }    
}
switchThing.addEventListener("click", darkAndLight);

darkAndLight();