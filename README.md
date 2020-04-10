# Gologolo 2, 2 Electric Boogaloo

## Queries:

* `allLogos` : Returns List\[logo\] for all logos
* `logo(id)` : Returns a single logo, or null if id not matched

```graphql
query allLogos {
  logos {
    _id
    fontSize
    text
    borderColor
    borderThickness
    margin
    padding
    borderRadius
    backgroundColor
    color
  }
}

# try changing id to one from allLogos:
# (if using a new database)
query getOne {
  logo (id: "5e8f73a718f34c0aee14d94e") {
    _id
    text
    fontSize
  }
}

```

## Mutations:

An example of props can be gotten from looking at the schema on GraphiQL, or matching to the examples given below

* `addLogo(...props)` : Returns List\[logo\] for all logos in the database
* `updateLogo(id, ...props)` : Returns a single logo, or null if id not matched
* `removeLogo(id)` Deletes the logo with the given ID, and returns the logo fields pre-deletion

```gql

mutation makeNew {
  addLogo(
    text: "fortnit2e"
    color:"#000fff"
    borderColor: "#000080"
    backgroundColor: "#007000"
    borderRadius: 34
    borderThickness: 34
    fontSize: 4
    padding: 100
    margin: 100
  ) {
    _id
    text
  }
}


mutation update($id: String!) {
  updateLogo(
    id: $id
    text: "fortnit1e"
    color:"#000fff"
    borderColor: "#000080"
    backgroundColor: "#007900"
    borderRadius: 34
    borderThickness: 34
    fontSize: 0
    padding: 100
    margin: 100
  ) {
    backgroundColor
    borderRadius
  }
}

mutation delete($id: String!) {
  removeLogo(id: $id) {
    _id
    text
    borderColor
  }
}
```