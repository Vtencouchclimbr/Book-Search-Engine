
  ![License](https://img.shields.io/badge/license-mit-blue.svg)
  
## Description
The Book Search App is a robust and user-centric platform built with the MERN stack, seamlessly integrated with the Google Books API to deliver a comprehensive and dynamic book exploration experience. Leveraging Apollo for efficient state management and GraphQL queries, the app ensures a streamlined and responsive interface. User authentication is implemented via JSON Web Token to provide secure, personalized access, allowing users to save their favorite book searches, create a saved books list, and curate personal reading collections. With a focus on both backend efficiency and front-end responsiveness, this application exemplifies modern web development practices, offering an intuitive and secure environment for book enthusiasts.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Video](#video)
- [Tests](#tests)
- [Questions](#questions)

## Installation
1. Clone the repository: `git clone <your-repo-url>` and navigate to the project directory: `cd <your-repo-directory>`
2. Install dependencies and compile the application: `npm run render-build`
3. Start the application in dev: `npm run develop`

## Usage
The Book Search App enables users to search for books via the Google Books API and manage favorite lists and reading collections. With secure user authentication, saved searches, and Apollo-driven responsiveness, this MERN stack app ensures an intuitive book exploration experience.

## Features

Resolver to handle requests for logged in user, and corresponding query. 
``` Resolver to handle requests for logged in user, and corresponding query. 
me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },

------------------------------------------------------

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
```

Resolver to save book, and corresponding mutation.
``` saveBook: async (_parent: any, { input }: AddBookArgs, context: any) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: { ...input },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },

------------------------------------------------------

export const SAVE_BOOK = gql`
  mutation SaveBook($input: BookInput!) {
    saveBook(input: $input) {
      bookId
      description
      title
      authors
      image
      link
      createdAt
    }
  }
`;
```

## Contributing
At this time, contributions are not being accepted for this project.

## License
This project is licensed under the MIT license.

## Video
[Watch the walkthrough video using this Google Drive Link](https://drive.google.com/file/d/1_7ppcImWtVgELZwz62kRjjDnUo42qc-v/view?usp=drive_link)

## Tests
There are currently no tests written for this application.

## Questions
If you have any questions, please reach out to me:
- Github: [vtencouchclimbr](https://github.com/vtencouchclimbr)
- Email: lmntrylmnt@gmail.com
  