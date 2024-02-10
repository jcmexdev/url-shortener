# URL Shortener

The Hexagonal Architecture URL Shortener project is a tool designed to reduce the length of long URLs, converting them into shorter and more shareable links. It follows the principles of hexagonal architecture to achieve separation of concerns and maintainability.

## Implementation:

The Hexagonal Architecture URL Shortener is implemented using the hexagonal architecture pattern, separating the core business logic from the external dependencies. It consists of multiple layers, including the domain layer, application layer, and infrastructure layer. Each layer is designed to be independent and interchangeable, allowing for easy testing and maintenance.

### Benefits:

Modularity: The hexagonal architecture pattern promotes modularity and flexibility, allowing for easy modification and extension of the system's components.

Testability: By decoupling the core business logic from external dependencies, the project is highly testable, with the ability to easily mock external dependencies for testing purposes.

Scalability: The modular and flexible nature of the hexagonal architecture makes it easy to scale the system as needed, allowing for future growth and expansion.

## Tech Stack

NodeJs,
Express,
TypeScript,
Jest

## Run Locally

Clone the project

```bash
  git clone https://github.com/jcmexdev/url-shortener
```

Go to the project directory

```bash
  cd url-shortener
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Start development server

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
npm run test
```

TO run test with coverage run the following command

```bash
npm run test:coverage
```

## Feedback

If you have any feedback, please open a discussion

## API Reference

#### Short URL

```http
  POST /api/v1/short
```

| Attribute | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `url`     | `string` | **Required**. Long url to short |

#### Get item

```http
  GET /:key
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `key`     | `string` | **Required**. url shortcode |
