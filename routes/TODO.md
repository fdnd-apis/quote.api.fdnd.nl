# TODO

## Add specification

We need to add a specification according to the OpenAPI standard, the way to go
seems to be stoplight studio. The file to expand upon is called `/docs/openapi.json`.

## Implementent all kinds of search/sort on get

Here are a few examples of search/sort routes we need to implement, feel free to
add to this list.

```
.get('/v1/:searchString', async (req, res, next) => {})
.get('/v1/quotes/length/asc', async (req, res, next) => {})
.get('/v1/quotes/length/desc', async (req, res, next) => {})
.get('/v1/quotes/alphabetical/asc', async (req, res, next) => {})
.get('/v1/quotes/alphabetical/desc', async (req, res, next) => {})
```

## Other REST requests

For the quotes API to be fully administrable, we need the following routes implemented

```
.patch('/v1/quotes/', async (req, res, next) => {})
.put('/v1/quotes/', async (req, res, next) => {})
.delete('/v1/quotes/', async (req, res, next) => {})
```

## Change the DB setup

Make the db more normalised through the following changes:

#### Table quote

Holds the quotes and links to an author, the internal column tags is externalised

```
+----------+
| quote    |
+----------+
| quoteId  |
| authorId |
| text     |
+----------+
```

#### Table tag

Represents unique tags in the system, both columns are mandatory unique

```
+-------+
| tag   |
+-------+
| tagId |
| text  |
+-------+
```

### Table quoteTag

Links tags to quotes

```
+---------+
| quoteTag |
+---------+
| quoteId |
| tagId   |
+---------+
```
