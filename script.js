"use strict"

var Library = {
  myLibrary : [],

  addBook: function(title, author, pages, didRead) {
    this.myLibrary.push({
    title,
    author,
    pages,
    didRead
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
    var status;
    if(statusVal.value == 'true'){ status = true;}
    if(statusVal.value == 'false'){ status = false;}
    Library.addBook(titleVal.value, authorVal.value, pagesVal.value, status);
    render.refresh();
    render.displayBooks();
  },
  deleteBook: function(position){
    Library.deleteBook(position);
    render.displayBooks();
  },
 toggleRead: function(position){
    Library.toggleRead(position);
    render.displayBooks();
   }
};


var render = {
  displayBooks: function(){
    var libraryDiv = document.querySelector('.container');
    libraryDiv.innerHTML = '';
    for(var i = 0; i < Library.myLibrary.length;i++){
      var bookCard = document.createElement('div');
      bookCard.classList.add('text-area');
      var book = Library.myLibrary[i];
      bookCard.textContent = (book.title + '\n' + book.author + '\n' + book.pages + ' pages' + '\n' + 'Status: ');
      var toggleButton = document.createElement('button');
      toggleButton.classList.add('toggle-button');
      toggleButton.value = i;
      var completion;
      if (book.didRead === true){
        completion = 'Read';
        toggleButton.classList.add('active');
        toggleButton.classList.remove('passive');
      } else {
        completion = 'Unread';
        toggleButton.classList.add('passive');
        toggleButton.classList.remove('active');
      }
      toggleButton.textContent = completion;
      toggleButton.addEventListener('click', function(e){
        handlers.toggleRead(e.target.value);
      });
      var img = document.createElement("img");
      img.classList.add('delete-img');
      img.src = "./images/delete.png";
      img.style.width = '38px';
      img.style.height = '38px';
      img.value = i;
      img.addEventListener('click', function(e){
        handlers.deleteBook(e.target.value);
      });
      bookCard.appendChild(toggleButton); 
      bookCard.appendChild(img);
      libraryDiv.appendChild(bookCard);
    }
  },
  showForm: function(){
    var viewForm = document.getElementById('view-form');
    var form = document.getElementById('form');
    form.style.display = 'block';
    viewForm.style.display = 'none';
  },
  cancelForm: function(){
    var viewForm = document.getElementById('view-form');
    var form = document.getElementById('form');
    viewForm.style.display = 'block';
    form.style.display = 'none';
  },
  refresh: function(){
    var viewForm = document.getElementById('view-form');
    var form = document.getElementById('form'); 
    var titleVal = document.getElementById('title');
    var authorVal = document.getElementById('author');
    var pagesVal = document.getElementById('pages');
    var statusVal = document.getElementById('status');
    titleVal.value= '';
    authorVal.value= '';
    pagesVal.value= '';
    statusVal.value = 'true';
    form.style.display = 'none';
    viewForm.style.display = 'block';
  }
};

(function initial(){
form.style.display = 'none';
Library.addBook('You Dont Know Js', 'Kyle Simpson', '1142', true);
Library.addBook('Eloquent JavaScript', 'Marijn Haverbeke', '472', false);
Library.addBook('Blood of Elves', 'Andrzej Sapkowski', '416', true);
render.displayBooks();
})();
