# MongoDB Simplified
This is first article of series **MongoDB Simplified** covering all the basics of MongoDB in th simplest way possible. We will go from understanding What is MongoDB?, How does it work?, Pros and Cons? How to setup on your machine all the way to learning how to perform basic CRUD operations. (Create, Read, Update and Delete). Let's start.
## What is MongoDB?
MongoDB is a database that is based on a document model, a different model from Relational database model where we use ROWS and COLUMNS to store data. Assume RDBMS (Relational DBMS) like a excel sheet with unique ID to identify each row where and multiple fields distributed along the column. Whereas MongoDB (DBMS) is JSON-like document with schema. Example: 
```
{
    "id": "123",
    "name": "Shad Mirza",
    "hobbies": "Coding, Art, Writing"
}
```
## How does it work?
A record in MongoDB is a document, which is a data structure composed of field and value pairs. A MongoDB document is similar to JSON document but uses a variant called BSON (Binary JSON) that accomodates more data types. These documents are inserted seperately which are unaware of other documents.  
It means that records are not restricted to have the same number of columns (which is a must in RDBMS).  
Example: A collection of `Employees` can have multiple documents of each `employee` with different number of `key-value` pairs i.e. one employee can have one phone number while other can have two phone numbers and that is totally fine.
```
    {
        "id: "101",
        "name": "Employee1",
        "personalNumber": "9123456789"
    },
    {
        "id: "102",
        "name": "Employee2",
        "personalNumber": "9123456789",
        "workNumber": "8123456789
    }
```
In case of RDMS, we would have added a column `workNumber` with empty field for `Employee1`. Without the restrictions of columns, developer can add documents however they need without worrying that a little change will break everything.  
MongoDB allows you to structure data in a way that is efficient for computers to process and easily readable for humans providing a natural way of storing and processing data accross the application.  
MongoDB is a distributed database, which means it provides three fundamental features which developers have to implement themselves otherwise. That's why it is so loved by the developers community. Three features are: 
* Fault tolerance: It uses a single master architecture for data consistency, with secondary databases which maintain copies of the primary database. Single server failure doesn't affect the application as you always have multiple copies in which you can rely on.
* Scalabilty: MongoDB scales accross multiple servers to store and process data. So, you can just add more servers as the data volumes and performance grows instead of upgrading the mainframe.
* Data near you: You can move data accross the globe where you have the requirement for faster processing. 

## Understand NoSQL and SQL


## Pros and Cons
MongoDB is not a replacement of Relational Database, it's an alternative. Both have their advantages and disadvantages and we must knows where to use them as per our needs. Let's go through pros and cons quickly.
### Pros
* Data is stored a single blob of JSON object. Insertion and retrieval is easy.
* No need to store NULL values: Every JSON object is independent.
* Flexible Schema: Consider a scenario where you want to add one more column in Person table. Adding new data in SQL database requires some changes to be made like backfilling data, altering schemas. It means that all the already inserted values will get affected too.  
But in case of NoSQL, new data can be easily inserted as it does not require any prior steps. The older collection doesn't know about the next JSON object so you can start adding new fields right away.
* Built for scale: NoSQL databases properly follow Brewers CAP theorem (Consistency, Availability, and Partition tolerance).
* Built for aggregation: We can collect intelligent data like average salary, maximum age, etc.
### Cons
* Not a good choice if you have a lot of updates to perform (for example DELETE followed by INSERT). 
* NoSQL is built for scalability, it means you can store a lot of data efficiently but it is not built for complex queries. Ofcourse you can use NoSQL for heavy transactional purpose. However, it is not the best fit for this. (MongoDB has released it's new version 4.2.0 recently which promises secure transactions so this point might get excluded in future, let's see how it goes.)
* JOINS are harder to perform. If you want matching data from two different collection then you have to manually merge and retreive the data. Whereas SQl (because of relationship between tables) provide inbuilt support for JOINS.
* SQL is an aged technology, it means that it is trusted, has been used in lot of scenarios and it has a huge community support. You will most probably find a solution if you get stuck somewhere whereas NoSQL is comparatively young.

That's it for this article. In the next one, we will learn how to setup MongoDB on our machine and start using it. Please do share if you find this article helpful.  
Shad