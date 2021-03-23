let delBtn = document.getElementById("delBtn");
let filtr = document.getElementById("filtr");
let typ = document.getElementById("typ");

let tableContainer = document.getElementById("info");

let nameOfPerson = document.getElementById("nameOfPerson");
let whatBook = document.getElementById("whatBook");
let expectedDate = document.getElementById("expectedDate");
let addBtn = document.getElementById("addBtn");

let idNum = 0;
idNum = localStorage.getItem("recId", idNum);
idNum = idNum == null || idNum < 0 ? 0 : idNum;

let lendBooks = [
   {
       id: 0,
       nameOfPerson: "Jan Novák",
       whatBook: "Day Z", 
       lendDate: "15.2. 2020",
       expectedDate: "15.5. 2021"

     }, 
     
     {
       id: 1,
       nameOfPerson: "Jana Testová",
       whatBook: "Sněhulák", 
       lendDate: "12.12. 2020",
       expectedDate: "20.4. 2021"

     } 
];

let testNum = 0;
testNum = localStorage.getItem("testNumLend", testNum);
testNum = testNum == null || testNum < 0 ? 0 : testNum; 
  
if(testNum == 0)
{  
  localStorage.setItem("lendBooks", JSON.stringify(lendBooks));
 
  idNum = 2;
  localStorage.setItem("recId", idNum);
 
  testNum++;
  localStorage.setItem("testNumLend", testNum);
  
}   

lendBooks = JSON.parse(localStorage.getItem("lendBooks"));
lendBooks = lendBooks == null ? [] : lendBooks;

let savedBorrowedBooks;

function addAndSave()
{
  
  let booksList = JSON.parse(localStorage.getItem("allBooks"));
  let foundAndValid = false;
  
  if(booksList == null || booksList.length < 1 || lendBooks.length >= booksList.length)
  {
    alert("Chyba! Buď nemáte ani jednu knihu v seznamu knih a nebo tímto přidáním by Vaše výpůjčky převyšovaly seznam Vámi vlastněných knih.");
    
  } else {
  
    if(nameOfPerson.value.match(/^ *$/) || whatBook.value.match(/^ *$/) || expectedDate.value.match(/^ *$/))
    {
      alert("Chyba! Nemáte vyplněno (nebo máte špatně vyplněno) buď jedno nebo více polí.");
  
    } else {
    
      for(let i = 0; i < booksList.length; i++)
      {
        if(whatBook.value == booksList[i].nameOfBook && booksList[i].status == "Dostupná")
        {
          foundAndValid = true;
      
        }
    
      }
  
      if(foundAndValid)
      {
        let today = new Date();
        let d = today.getDate();
        let m = today.getMonth() + 1;
        let y = today.getFullYear(); 
        
        let expectedDateOrigVal = new Date(expectedDate.value + " " + today.getHours() + ":" + (today.getMinutes()+1))
        
        if(today.getTime() > expectedDateOrigVal.getTime())
        {
          alert("Chyba! Datum vrácení knihy je špatně nastaveno. Jako nejdřívější datum vrácení knihy lze nastavit to dnešní.");
        
        } else { 
  
          lendBooks.push({
             id: idNum,
             nameOfPerson: nameOfPerson.value,
             whatBook: whatBook.value,
             lendDate: (d + "." + m + "." + y),
             expectedDate: expectedDate.value.split("-").reverse().join(".")
  
          });
      
          for(let j = 0; j < booksList.length; j++)
          {
            if(whatBook.value == booksList[j].nameOfBook) 
            {
              booksList[j].status = "Nedostupná";
              break;
          
            }
          }
     
          localStorage.setItem("lendBooks", JSON.stringify(lendBooks));
          localStorage.setItem("allBooks", JSON.stringify(booksList));
          display();
 
          idNum++;
          localStorage.setItem("recId", idNum);
        
        }
      } else {
    
        alert("Chyba! Buď tato kniha není ve Vašem seznamu knih a nebo existuje, ale je momentálně nedostupná- nelze vypůjčit nedostupnou knihu.")
    
      }
      
    }  
  }

}

addBtn.addEventListener("click", addAndSave); 

function display()
{
  savedLendBooks = JSON.parse(localStorage.getItem("lendBooks"));
  
  savedLendBooks = savedLendBooks == null ? [] : savedLendBooks;

  tableContainer.innerHTML = "";
 
  tableContainer.innerHTML = `<tr>
                                <th>Jméno a příjmení</th>
                                <th>Název vypůjčené knihy</th> 
                                <th>Datum výpůjčky</th>
                                <th>Očekávané datum vrácení knihy</th>
                                <th>Odstranit záznam</th>
                              </tr> `;
          
  savedLendBooks.forEach(function(book){ 
    tableContainer.innerHTML+=`<tr class="parent"> <th class="1">${book.nameOfPerson}</th> <th class="2">${book.whatBook}</th>  <th class="3">${book.lendDate}</th> <th class="4">${book.expectedDate}</th> <th><button id=${book.id} onclick="delRecord(this)">X</button></th></tr>`;
                                                                                    
  })        
     
}

display();

function deleteAll()
{
  let really = confirm("Chcete toto opravdu udělat? Tato akce je nenávratná a smaže opravdu vše.");
  
  if(really)
  {
    lendBooks = [];
    localStorage.setItem("lendBooks", JSON.stringify(lendBooks));
    
    let booksList = JSON.parse(localStorage.getItem("allBooks"));
    
    for(let i = 0; i < booksList.length; i++)
    {
     booksList[i].status = "Dostupná";
    
    }
   
    localStorage.setItem("allBooks", JSON.stringify(booksList));
   
    idNum = 0;
    localStorage.setItem("recId", idNum);
    
    display();
  
  }
  
}
delBtn.addEventListener("click", deleteAll); 

function delRecord(elem)
{
  let recId = elem.id;
  
  let booksList = JSON.parse(localStorage.getItem("allBooks"));
 
  for(let i = 0; i < booksList.length; i++)
  {
    if(lendBooks[recId].whatBook == booksList[i].nameOfBook)
    {
     booksList[i].status = "Dostupná";
     break;
    
    }
  }  
    
  localStorage.setItem("allBooks", JSON.stringify(booksList)); 
  
  lendBooks.splice(recId, 1);
  
  for(let j = 0; j < lendBooks.length; j++)
  {
    lendBooks[j].id = j;

  }
  
  localStorage.setItem("lendBooks", JSON.stringify(lendBooks));
  
  idNum--;
  localStorage.setItem("recId", idNum);
    
  display(); 

}

function filtrate()
{
  let val = filtr.value;
  let allTrTags = document.getElementsByClassName("parent");
  
  let cellClass;
  
  let option = typ.options[typ.selectedIndex].value
  
  if(option == "personName")
  {
    cellClass = "1";
  } 
  
  if(option == "bookName")
  {
    cellClass = "2";
  } 
  
  if(option == "dateLend")
  {
    cellClass = "3";
  } 
  
  if(option == "expec")
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