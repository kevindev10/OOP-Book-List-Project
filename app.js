

// Book constructor Es5

function Book (title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI constructor Es5

function UI (){}


// Add book to list prototypal method


UI.prototype.addBookToList = function (book){
   

   // create row element
    const row = document.createElement('tr');

    // Add book content to row
     
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>  <a href ='#' id ='delete'> X </a>  </td>
    `


    // Append row to table body

    const bookList = document.querySelector('#book-list');

    bookList.appendChild(row);



}


// Clear input fields prototypal method

 UI.prototype.clearFields = function (){

   document.querySelector('#title').value = '';
   document.querySelector('#author').value = '';
   document.querySelector('#isbn').value = '';

 }



 // Delete book from Booklist prototypal method

 UI.prototype.deleteBookFromList = function(target){
   if(target.id === 'delete'){
    target.parentElement.parentElement.remove();
   }
 
 }

 // Alert message prototypal method

 UI.prototype.alertMessage = function (message, classname){

   // create div element

   const div = document.createElement('div');

   // add classname

   div.className = `alert ${classname}`

   //add message content to div
   const messageContent = document.createTextNode(message);

   div.appendChild(messageContent);

   // insert div before the form

   const container =document.querySelector('.container');
   const bookForm = document.querySelector('#book-form');

   container.insertBefore(div, bookForm);

   setTimeout(function(){
      div.remove()
   }, 5000)


 }


 // Store in local storage static methods Es5


    // Get books from local storage static method

    UI.getBooks = function (){
        let books;
         if(localStorage.getItem('books') === null){
           books = [];
         }else {
           books =  JSON.parse( localStorage.getItem('books'))
         }

         return books;


    }

    // Add books to local storage static method

    UI.addBooks = function (book){
      const books = this.getBooks();
      books.push(book);
     
      localStorage.setItem('books', JSON.stringify(books));
      
    }


     // Display books from local storage static method

     UI.displayBooks = function (){
      const books = this.getBooks();
      books.forEach(function(book){

         
        // instantiate UI

        const ui = new UI();

        ui.addBookToList(book);



      })

     }




     // remove books from local storage static method

      UI.removeBooks = function (isbn){
        const books = this.getBooks();

        books.forEach(function(book, index){
          if(isbn === book.isbn ){

             books.splice(index, 1)
            //console.log(index, book)
          }
        })
        

        localStorage.setItem('books', JSON.stringify(books));

      }







//  display books from local storage on DOMcontentloaded event listener

document.addEventListener(' DOMContentloaded', UI.displayBooks());



// Add book event handler


document.querySelector('#book-form').addEventListener('submit', function(e){
  
  // ui varibles vlaues

  const titleUI = document.querySelector('#title').value;
  const authorUI = document.querySelector('#author').value;
  const isbnUI = document.querySelector('#isbn').value;

    // instantiate book

    const book = new Book (titleUI, authorUI, isbnUI);


    // instantiate UI

    const ui = new UI();

  // Validation

  if( titleUI === '' || authorUI === '' || isbnUI ===''){

    // fill in all details alert message
    ui.alertMessage('Please fill in all the details', 'error' )
  }else{

    

      
      // Add book to list

      ui.addBookToList(book);

    
      //Add book to local storage

      UI.addBooks(book);


      // success adding book alert message

      ui.alertMessage('Book added successfully', 'success' );


      // clear input fields

      ui.clearFields();
  }
 


   e.preventDefault();
})


 // Delete book from Booklist eventListener

document.querySelector('#book-list').addEventListener('click', function(e){

    

       // instantiate UI

       const ui = new UI();

       //delete book from booklist 

       ui.deleteBookFromList(e.target);


       // remove books from local storage

       UI.removeBooks(e.target.parentElement.previousElementSibling.textContent);

        // success delteing book alert message

      ui.alertMessage('Book removed', 'error' );



  //console.log(e.target.parentElement.parentElement);

   

    


 
})

