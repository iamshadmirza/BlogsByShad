# MongoDB Simplified: Part 1

![cover-image](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/mongodb-simplified/MongoDB-Part1.png)

This is the first article of series **MongoDB Simplified** which will cover all the basics of MongoDB. I will try to keep things as simple as possible.

We will start from understanding **What is MongoDB?**, **How does it work?**, **Pros and Cons?**, **How to set up on your machine** going all the way to learning **how to perform basic CRUD operations**. CRUD is short for Create, Read, Update and Delete if you're wondering. So let's start.

## What is MongoDB?

MongoDB is a database that is **based on document model**. It is a non-relational type database.  

Now, what are relational and non-relational databases? 🤔  

Assume RDBMS (Relational Database Management System) **like an "Excel Sheet"** with **Rows** and **Columns** to save data in the form of tables. This table will have a unique ID to identify each row and where multiple fields are distributed along the column. These types of databases usually have relationships between them, **hence the name "Relational Database"** 💡.  

Whereas **MongoDB** (DBMS) saves data in **JSON-like documents** inside a collection having no relationships with other documents hence they are called "Non-Relationship Database" types. **Example** of JSON like object is shown below 👇🏼:

```json
{
    "id": "123",
    "name": "Shad Mirza",
    "hobbies": "Coding, Art, Writing"
}
```

## How does it work?

**A record in MongoDB is a document.** Now, what's a document? 🤔

A document is a data structure composed of field and value pairs. A MongoDB document is similar to **JSON object** *(see above example)* but uses a variant called **BSON (Binary JSON)** that accommodates more data types. These documents are inserted separately which are unaware of other documents. (Non-Relational type, remember?)

It means that **records are not restricted to have the same number of columns** (which is a must in RDBMS).

**Example:** A collection of `Employees` can have multiple documents of each `employee` with a different number of `key-value` pairs i.e. one employee can have one phone number while other can have two phone numbers and that is totally fine.

```json
{
    "id": "101",
    "name": "Ramesh",
    "personalNumber": "9123456789"
},
{
    "id": "102",
    "name": "Suresh",
    "personalNumber": "9123456788",
    "workNumber": "8123456789",
}
```

Now suppose we are using a relational database, then we are bound to use the same number of columns for each data.

What it means in the current example is that we would have to add a `workNumber` column for all the employees **regardless of whether they need this field or not**. This will result in "Ramesh" having an empty value in `workNumber` column 😓.  

Without the restrictions of columns, the developer can add documents however they need without worrying that a little change will break everything 🤩.

**MongoDB** allows you to structure data in a way that is **efficient for computers to process** and **easily readable for humans** providing a natural way of storing and processing data across the application.  

**MongoDB is a distributed database**, which means it provides three fundamental features that developers have to implement themselves otherwise. That's why it is so loved by the developer's community. Those 3 features are:  

* **Fault tolerance:** This allows **MongoDB** to have multiple copies of data, so if somehow one server fails, you will have the other one to serve the data. Single server failure doesn't affect the application as you always have multiple copies in which you can rely on. It uses a single master architecture for data consistency, with secondary databases that maintain copies of the primary database.
* **Scalability:** MongoDB scales across multiple servers to store and process data. So, you can just add more servers as the data volumes and performance grows instead of upgrading the mainframe.
* **Data availability:** You can move data across the globe where you have the requirement for faster processing.

## Understand NoSQL and SQL

Countless wars ⚔️ have been fought over debating SQL vs NoSQL and answer still stays the same, **"It depends on "**.  
Let's get to the basics. **What's the dedicated purpose of a database?** 🤔

**"Storing Data"** right?. Now in this context, let's understand what are the differences between SQL & NoSQL database and how they store data.

## SQL

* **Structure:** SQL stores data in `tables` which contains `rows` and `columns`. It is well structured and as SQL is *Relational Database*, it usually has some relations between different tables *(Primary Key, Foreign Key, etc)*.
* **Speed:** Because of these relations and * well-defined* structure, SQL avoids *data duplication* and is relatively faster for joins, queries, updates, etc. Sounds good right? But wait...
* **Flexibility:** This also means that you need to plan the structure ahead of time and any changes to that will difficult (relations remember? tables are connected. You can't simply change one and not take care of the other side).
* **Big Data:** Since the changes need to be applied at various places and the data is broken into various logical tables (we will see how in a minute). It requires performing a various read operations on multiple tables to get what we want. Big Data requires data READ and WRITE queries to be fastest, hence SQL might not a better choice for that. Although you can use SQL databases for a large scale deployment because...
* **Community:** SQL is a mature technology, it's been there for ages and there are many experienced developers who understand it very well. This means that there is great support available and you will definitely find help if you get stuck somewhere and you can easily find a lot of independent consultants who can help with the deployment of large scale SQL databases.
* **Scalability:** In almost all situations SQL databases are `vertically scalable`. This means that you can increase the load on a single server by increasing things like RAM, CPU, or SSD. It s robust and it has proven that it can handle possibly anything. It follows [ACID](https://blog.sqlauthority.com/2007/12/09/sql-server-acid-atomicity-consistency-isolation-durability/) properties (Atomicity, Consistency, Isolation, and Durability).

### Example

**Employee Table:**

| employee_id | employee_name | number     | work_number | address |
|-------------|---------------|------------|-------------|---------|
| 1           | Shad          | 9988776655 | 9876543210  | 121     |
| 2           | Vamsi         | 8877665544 | null        | 122     |
| 3           | Girish        | 7766554433 | null        | 123     |

**Address Table:**

| address_id | city     | country | pincode |
|------------|----------|---------|---------|
| 121        | Varanasi | India   | 221000  |
| 122        | Delhi    | India   | 212345  |
| 123        | Hubli    | India   | 564635  |

### 🧐 Few things to notice in this example:

1. The two tables are interconnected with the `FOREIGN KEY` in the `address` column. This key can be used as id to reference the address table.
2. SQL follows a certain structure, hence the column `work_number` is required whether we need it (for a particular row) or not (look at the null value for the second and third-row).
3. To read the information about an employee, we have to query the `employee` table and then `address` table or we have to JOIN these two first and the get the data.

## NoSQL

* **Structure:** NoSQL stores data in a document-based model inside JSON like objects which contain `key-value` pairs. There is no standard schema definition for NoSQL databases and the collections don't have relations between them. You can add chunks of data together without splitting them.
* **Speed:** Because of this, you can insert and retrieve all the data at once. Also, NoSQL databases are specifically designed for unstructured data. A particular data entity is stored together and not partitioned. So performing read or write operations on a single data entity is faster for NoSQL databases as compared to SQL databases.
* **Flexibility:** Dynamic schema enables MySQL databases to change as the user wants. They are not connected and hence you don't need to worry about breaking things whenever to want to add something new.
* **Big Data:** Since the schema is flexible and READ-WRITE queries are much faster, NoSQL suits best for Big Data application. 
* **Community:** NoSQL is comparatively new and support is not as rich as SQL but it's growing at a rapid rate. Also, only limited outside experts are available for setting up and deploying large scale NoSQL deployments.
* **Scalability:** NoSQL databases are `horizontally scalable`. This means that more traffic can be handled by adding more servers. NoSQL database follows the [Brewers CAP theorem](https://howtodoinjava.com/hadoop/brewers-cap-theorem-in-simple-words/) (Consistency, Availability, and Partition tolerance) but ACID properties have also been introduced in the recent version.

### Example

```json
{
    "_id": "1",
    "employeeName": "Shad",
    "number": "9988776655",
    "workNumber": "9876543210",
    "address": {
        "city": "Varanasi",
        "country": "India",
        "pincode": "221000"
    },
},
{
    "_id": "2",
    "employeeName": "Vamsi",
    "number": "8877665544",
    "address": {
        "city": "Delhi",
        "country": "India",
        "pincode": "212345"
    },
},
{
    "_id": "3",
    "employeeName": "Girish",
    "number": "7766554433",
    "address": {
        "city": "hubli",
        "country": "India",
        "pincode": "564635"
    },
    "techStack": [
        {
            "_id": "565",
            "tech": "React",
            "experience": "3 Years",
        },
        {
            "_id": "867",
            "tech": "MobX",
            "experience": "2 Years",
        },
    ]
},
```

### 🧐 Few things to notice in this example:

1. There is no relationship between different objects in a collection. We can start adding new `key-value` pairs as we want. (On adding a new column in SQL, we have to deal with all the rows previously added, they will be assigned null values for the new field added).
2. The collection doesn't need to contain a specific number of values. We don't need `workNumber` in the second and third object so we don't save it at all, no null values.
3. We are eventually going to need all the user info at once (including `address`) and we can easily get it in a single API call by *saving them together*.
4. Having a JSON like an object **allows us to store complex structure** without worrying too much. See the last record where we are storing **"techStack"** in an array of objects 😵. This kind of flexibility comes very handy when you're trying to prototype something really quick.

## Pros and Cons

MongoDB is not a replacement of Relational Database, **it's an alternative**. Both have their advantages and disadvantages and we must know when to use what.

This is the time where we clear that **It depends** debate. Let's go through the pros and cons to understand this better.

### Pros 🥳

* Data is stored in a single blob of a JSON object. Insertion and retrieval is easy.
* No need to store `NULL` values: Every JSON object is independent.
* Flexible Schema: Consider a scenario where you want to add one more column in Person table. Adding new data in SQL database requires some changes to be made like backfilling data, altering schemas. It means that all the already inserted values will get affected too.  
But in case of NoSQL, new data can be easily inserted as it does not require any prior steps. The older collection doesn't know about the next JSON object so you can start adding new fields right away.
* Built for scale: NoSQL databases properly follow Brewers CAP theorem (Consistency, Availability, and Partition tolerance).
* Built for aggregation: We can collect intelligent data like average salary, maximum age, etc.

### Cons 😓

* Not a good choice if you have a lot of updates to perform (for example DELETE followed by INSERT).
* NoSQL is built for scalability, it means you can store a lot of data efficiently but it is not built for complex queries. Ofcourse you can use NoSQL for heavy transactional purpose. However, it is not the best fit for this. (MongoDB has released it's new version 4.2.0 recently which promises secure transactions so this point might get excluded in future, let's see how it goes.)
* JOINS are harder to perform. If you want matching data from two different collection then you have to manually merge and retreive the data. Whereas SQl (because of relationship between tables) provide inbuilt support for JOINS.
* SQL is an aged technology, it means that it is trusted, has been used in lot of scenarios and it has a huge community support. You will most probably find a solution if you get stuck somewhere whereas NoSQL is comparatively young.

That's it for this article and I hope it was helpful. In the next part, we will learn how to setup MongoDB on our machine and start using it. Until then, take care 👋, wear mask and happy coding. 😋  
Shad
