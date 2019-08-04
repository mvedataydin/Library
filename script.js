"use strict"


var Library = {
  myLibrary : [],

  addBook: function(title, author, pages, didRead) {
    this.myLibrary.push({
    title : title,
    author : author,
    pages : pages,
    didRead : didRead
    });
  },

  deleteBook: function(position){
    this.myLibrary.splice(position,1);
  },

  toggleRead: function(position) {
    this.myLibrary[position].didRead = !this.myLibrary[position].didRead;
  },
};



var handlers = {
   
  addBook: function() {
    var titleVal = document.getElementById('title');
    var authorVal = document.getElementById('author');
    var pagesVal = document.getElementById('pages');
    var statusVal = document.getElementById('status');
    var viewForm = document.getElementById('view-form');
    var form = document.getElementById('form'); 
    var status;
    if(statusVal.value == 'true'){ status = true;}
    if(statusVal.value == 'false'){ status = false;}
    Library.addBook(titleVal.value, authorVal.value, pagesVal.value, status);
    
    titleVal.value= '';
    authorVal.value= '';
    pagesVal.value= '';
    statusVal.value = 'true';
    form.style.display = 'none';
    viewForm.style.display = 'block';
    render.displayBooks();
  },
  
  deleteBook: function(position){
    Library.deleteBook(position);
    render.displayBooks();
  },
 toggleRead: function(position){
    Library.toggleRead(position);
    render.displayBooks();
   }, 
};

var render = {

  displayBooks: function(){
    var libraryDiv = document.querySelector('.container');
    libraryDiv.innerHTML = '';
    for(var i = 0; i < Library.myLibrary.length;i++){
      var bookCard = document.createElement('div');
      bookCard.classList.add('text-area');
      var book = Library.myLibrary[i];
      var completion;
        if (book.didRead === true){
          completion = 'Read';
        } else {
          completion = 'Unread';
        }
      bookCard.textContent = (book.title + '\n' + book.author + '\n' + book.pages + '\n' + 'Status: ' + completion);
      var toggleButton = document.createElement('button');
      toggleButton.classList.add('toggle-button');
      toggleButton.value = i;
      toggleButton.addEventListener('click', function(e){
        handlers.toggleRead(e.target.value);
      });
      var deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.value = i;
      deleteButton.addEventListener('click', function(e){
        handlers.deleteBook(e.target.value);
      });
      bookCard.appendChild(deleteButton);
      bookCard.appendChild(toggleButton); 
      libraryDiv.appendChild(bookCard);
    }
  },
  showForm: function(){
    var viewForm = document.getElementById('view-form');
    var form = document.getElementById('form');
    form.style.display = 'block';
    viewForm.style.display = 'none';
  }
};

(function initial(){
form.style.display = 'none';
Library.addBook('You Dont Know Js', 'Kyle Simpson', '1142', true);
Library.addBook('Eloquent JavaScript', 'Marijn Haverbeke', '472', false);
Library.addBook('Blood of Elves', 'Andrzej Sapkowski', '416', true);
Library.addBook('You Dont Know Js', 'Kyle Simpson', '1142', true);
Library.addBook('Eloquent JavaScript', 'Marijn Haverbeke', '472', false);
Library.addBook('Blood of Elves', 'Andrzej Sapkowski', '416', true);
Library.addBook('You Dont Know Js', 'Kyle Simpson', '1142', true);
Library.addBook('Eloquent JavaScript', 'Marijn Haverbeke', '472', false);
Library.addBook('Blood of Elves', 'Andrzej Sapkowski', '416', true);
render.displayBooks();
})();
