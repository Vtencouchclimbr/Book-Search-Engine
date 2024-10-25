// import { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

// import { deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { User } from '../models/User';
import { Book } from '../models/Book';

interface UserData {
  me : User;
}

interface RemoveBookData {
  removeBook: Book;
}

const SavedBooks = () => {
  // useQuery hook to execute the GET_ME query
  const { loading, error, data } = useQuery<UserData>(GET_ME);

  // useMutation hook for REMOVE_BOOK
  const [removeBook] = useMutation<RemoveBookData>(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      try {
        // Read the existing data from the cache
        const { me } = cache.readQuery<UserData>({ query: GET_ME });

        if (me) {
        // Write the new data to the cache by filtering out the deleted book
        cache.writeQuery({
          query: GET_ME,
          data: {
            me: {
              ...me,
              savedBooks: me.savedBooks.filter((book: Book) => book.bookId !== removeBook.bookId),
            },
          },
        });
      } else {
        console.error('No me found in cache');
      }
      } catch (e) {
        console.error(e);
      }
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userData = data?.me || { savedBooks: [] };

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Execute the REMOVE_BOOK mutation
      await removeBook({
        variables: { bookId },
      });

      // Remove the book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData.savedBooks.length) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md='4'>
                <Card key={book.bookId} border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
