function findAccountById(accounts, id) {
 const foundAccountById = accounts.find(account => account.id === id )
 return foundAccountById;
}

function sortAccountsByLastName(accounts) {
 accounts.sort((accountA, accountB) =>
  accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1
 );
 return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  books.forEach(book => {
    const borrowedById = borrowsById(book, account);
    count += borrowedById.length;
  });
  return count;
}

//helper function for getTotalNumberOfBorrows
function borrowsById (book, {id}) {
  return book.borrows.filter(borrow => borrow.id === id);
}

function getBooksPossessedByAccount(account, books, authors) {
 let result = [];
 let borrowMatch = [];
 books.forEach((item) => {
  const borrowed = item.borrows;
  const book = {
   id: item.id,
   title: item.title,
   genre: item.genre,
   authorId: item.authorId,
   author: {},
   borrows: {}
  };
  const { id, title, genre, authorId, author, borrows } = book;
  borrowed.forEach((borrow) => {
   if (borrow.id === account.id && borrow.returned === false) {
    result.push(book);
    borrowMatch.push(borrow);
    book.borrows = borrowMatch;
    book.author = authors.filter((auth) => auth.id === book.authorId)[0];
   }
  });
 });
 return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
