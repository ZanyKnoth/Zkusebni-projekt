let delBtn = document.getElementById("delBtn");
let filtr = document.getElementById("filtr");
let typ = document.getElementById("typ");

let tableContainer = document.getElementById("info");

let nameOfBook = document.getElementById("nameOfBook");
let releaseDateOfBook = document.getElementById("releaseDate");
let genreOfBook = document.getElementById("genre");
let addBtn = document.getElementById("addBtn");

let oldSave;

let idNum = 0;
idNum = localStorage.getItem("bookId", idNum);
idNum = idNum == null || idNum < 0 ? 0 : idNum;

let allBooks = [
    {
       id: 0,
       nameOfBook: "Othello",
       releaseDate: "1622", 
       genre: "Tragédie",
       status: "Dostupná"

     }, 
     
     {
       id: 1,
       nameOfBook: "Day Z",
       releaseDate: "2012", 
       genre: "Sci-Fi",
       status: "Nedostupná"

     },
    
     {
       id: 2,
       nameOfBook: "Darebák David",
       releaseDate: "2008", 
       genre: "Dětské",
       status: "Dostupná"

     }, 
     
     {
       id: 3,
       nameOfBook: "Sněhulák",
       releaseDate: "2003", 
       genre: "Krimi",
       status: "Nedostupná"

     }    
  ];

let testNum = 0;
testNum = localStorage.getItem("testNum", testNum);
testNum = testNum == null || testNum < 0 ? 0 : testNum; 
  
if(testNum == 0)
{  
  localStorage.setItem("allBooks", JSON.stringify(allBooks));
 
  idNum = 4;
  localStorage.setItem("bookId", idNum);
 
  testNum++;
  localStorage.setItem("testNum", testNum);
  
}   

allBooks = JSON.parse(localStorage.getItem("allBooks"));
allBooks = allBooks == null ? [] : allBooks;

let savedBooks;

function addAndSave()
{   
  let today = new Date();
  let y = today.getFullYear();  
  
  if(nameOfBook.value.match(/^ *$/) || releaseDateOfBook.value.match(/^ *$/) || genreOfBook.value.match(/^ *$/))
  {
    alert("Chyba! Nemáte vyplněno (nebo máte špatně vyplněno) buď jedno nebo více polí.");
  
  } 
  
  else if(y < releaseDateOfBook.value)
  {
    alert("Chyba! Rok vydání knihy je zadán špatně. Jako nejnovější rok vydání knihy lze nastavit aktuální rok.");
        
  
  } else {
  
    let isSame = false;
  
    for(let i = 0; i < allBooks.length; i++)
    {
      if(allBooks[i].nameOfBook == nameOfBook.value)
      {
        isSame = true;
        break;
      }
    }
  
    if(isSame)
    {
      alert("Chyba! Tato kniha už je ve Vašem seznamu knih. Nelze ji proto přidat znovu.");
        
    } else {
  
      allBooks = JSON.parse(localStorage.getItem("allBooks"));
      allBooks = allBooks == null ? [] : allBooks;
  
      allBooks.push({
         id: idNum,
         nameOfBook: nameOfBook.value,
         releaseDate: releaseDateOfBook.value, 
         genre: genreOfBook.value,
         status: "Dostupná"

      });
  
      localStorage.setItem("allBooks", JSON.stringify(allBooks));
  
      display();
 
      idNum++;
      localStorage.setItem("bookId", idNum);
    }
  }
      
}

addBtn.addEventListener("click", addAndSave); 

function display()
{
  
  savedBooks = JSON.parse(localStorage.getItem("allBooks"));
  
  savedBooks = savedBooks == null ? [] : savedBooks;

  tableContainer.innerHTML = "";
 
  tableContainer.innerHTML = `<tr>
                                <th>Název knihy</th>
                                <th>Rok vydání</th> 
                                <th>Žánr</th>
                                <th>Momentální dostupnost</th>
                                <th>Odstranit záznam</th>
                              </tr> `;
          
  savedBooks.forEach(function(book){ 
    tableContainer.innerHTML+=`<tr class="parent"> <th class="1">${book.nameOfBook}</th> <th class="2">${book.releaseDate}</th>  <th class="3">${book.genre}</th> <th class="4" style='${book.status == "Dostupná" ? "color: green" : "color: red"}'>${book.status}</th> <th><button id=${book.id} onclick="delRecord(this)">X</button></th></tr>`;
      
  })    // útoku by šlo zabránit create.Elementama a do nich dát .innerText hodnoty z inputu   
}
       
display();

function deleteAll()
{
  let really = confirm("Chcete toto opravdu udělat? Tato akce je nenávratná a smaže opravdu vše.");
  
  if(really)
  {    
    let lendBooks = JSON.parse(localStorage.getItem("lendBooks"));
    
    if(lendBooks == null)
    {
      alert('Chyba! Prvně musíte načíst stránku "Evidence výpůjček", aby se databáze mezi sebou načetly.');
     
    } else {
    
      let canDeleteAll = true;
    
      for(let i = 0; i < allBooks.length; i++)
      {
        for(let j = 0; j < lendBooks.length; j++)
        {
          if(allBooks[i].nameOfBook == lendBooks[j].whatBook)
          {
            canDeleteAll = false;
            break;
        
          }
        }
      }
    
      if(canDeleteAll)
      {
        allBooks = [];
        localStorage.setItem("allBooks", JSON.stringify(allBooks));
        oldSave = localStorage.setItem("allBooks", JSON.stringify(allBooks)); 
    
        idNum = 0;
        localStorage.setItem("bookId", idNum);
    
        display();
    
      } else {
    
        alert("Chyba! Nemůžete smazat celý seznam knih, protože minimálně jednu z knih máte vypůjčenou. Odstraňte všechny výpůjčky a až po té smažte celý seznam knih.");
    
      }  
    }
  }
  
}
delBtn.addEventListener("click", deleteAll); 

function delRecord(elem)
{
  allBooks = JSON.parse(localStorage.getItem("allBooks"));
    let lendBooks = JSON.parse(localStorage.getItem("lendBooks"));
    
    let recId = elem.id;
  
  if(lendBooks == null)
  {                                                                                                                
    alert('Chyba! Prvně musíte načíst stránku "Evidence výpůjček", aby se databáze mezi sebou načetly.');
     
  } else {
  
    let canDeleteRecord = true;
    
    for(let i = 0; i < lendBooks.length; i++)
    {
      if(allBooks[recId].nameOfBook == lendBooks[i].whatBook)
      {
        canDeleteRecord = false;
        
      }   
    }
    
    if(canDeleteRecord)
    {
      allBooks.splice(recId, 1);
  
      for(let i = 0; i < allBooks.length; i++)
      {
        allBooks[i].id = i;

      }
 
      localStorage.setItem("allBooks", JSON.stringify(allBooks));
      oldSave = localStorage.setItem("allBooks", JSON.stringify(allBooks)); 
           
      idNum--;
      localStorage.setItem("bookId", idNum);
    
      display(); 
  
    } else {
  
      alert("Chyba! Tato kniha je právě vypůjčena, nejde proto smazat. Odstraňte prvně výpůjčku a až po té tuto knihu.");
  
    }

  }
}

function filtrate()
{
  let val = filtr.value;
  let allTrTags = document.getElementsByClassName("parent");
  
  let cellClass;
  
  let option = typ.options[typ.selectedIndex].value
  
  if(option == "bookName")
  {
    cellClass = "1";
  } 
  
  if(option == "bookDate")
  {
    cellClass = "2";
  } 
  
  if(option == "genr")
  {
    cellClass = "3";
  } 
  
  if(option == "avail")
  {
    cellClass = "4";
  } 
  
  for(let i = 0; i < allTrTags.length; i++)
  {
    if(document.getElementsByClassName(cellClass)[i].innerText.includes(val))
    {
      allTrTags[i].style.display="table-row";    
    
    } else {
    
      allTrTags[i].style.display="none";
      
    }
  }

}

filtr.addEventListener("input", filtrate);
typ.addEventListener("change", filtrate);

oldSave = JSON.parse(localStorage.getItem("allBooks"));

setInterval(function(){

  let newSave = JSON.parse(localStorage.getItem("allBooks"));
  oldSave = oldSave == undefined ? [] : oldSave;    // protože se stane, že když smažu poslední záznam, tak oldSave se stane undefined, protože není definován ničím 
  newSave =  newSave == undefined ? [] : newSave;

  for(let i = 0; i < newSave.length; i++)
  {  
    if(oldSave.length != newSave.length || oldSave[i].status != newSave[i].status)    
    {
      oldSave = newSave;
      display();
      
    }
   
  }  

}, 1000);