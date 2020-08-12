# Setup MongoDB on your machine

![cover](./MongoDB-part2.png)

Hello amazing people, we are back with the MongoDB Simplified series. In the [last article](https://iamshadmirza.com/mongodb-simplified-part-1-what-why-and-how-ckdk9gmqv031cz2s12bqz8r1c), we learned about MongoDB and NoSQL in general, now it's time to set up and get it running on our machine. Let's start!

## Step 1: Download and install MongoDB locally

We are going to download the Community Server from MongoDb website. This is the free version that lets us test stuff on our machine.

Head over to [download page for Community Server](https://www.mongodb.com/try/download/community) and select your operating system. Hit download and install to the default location when the download is finished.

> For Mac user: You will extract the file from `.tgz` package and paste it to your preferred location inside the `mongodb` directory.

## Step 2: Setup Environment variable

Once your install is finished, you will see the "mongodb" directory which will contain a `bin` folder with a bunch of other files.  

This `bin` folder is important and we will use the files inside to **execute various operations like connecting to MongoDB server**, importing data, etc. 

Open the terminal on Mac or command prompt on windows and type `mongod`. This command is used to connect to the MongoDB server. You might see a `command not found` error which means our machine can't find the file it needs to connect to MongoDB server. 😓

Remember we just talked about the mighty `bin` folder which **has the files needed to connect to MongoDB server**. We just need to tell our machine about that location. 

To add `PATH` to that bin folder in **Windows**:

- Go to the bin folder inside "Program Files" and copy the path to `mongod` file.
- Go to "Edit environment variables" settings either by searching or right-clicking on My Computer.
- Choose the "Path" variable and add a new entry with the location you just copied

To add `PATH` to that bin folder on a **Mac**:

- Go to the bin folder and copy the path to `mongod` file by clicking "Get info"
- Go to user folder and search for `.bash_profile`
- Edit it and paste this line at the end: `export PATH=YOUR_COPIED_PATH:$PATH`

Make sure to replace `YOUR_COPIED_PATH` with the location of your bin folder. It will look something like this: `export PATH=/Users/shad/development/mongodb/bin:$PATH`

Once you're done, close the terminal and start again. Type `mongo --version` and you should be able to see the version. 🎉

## Step 3: Setup MongoDB "data" directory

We need a place to store data and for that, we need to create a data folder. 

- Create a `data` folder at your preferred location.
- Copy path to that location (we have to tell MongoDB about its location).
- Open terminal and type `mongodb --dbpath "/data/db"`.

> Make sure you type your path. For me, it's `"/data/db"`.

That's it 🎉. I hope you successfully finished the setup and able to get it running. 

In the next article, we will build a TODO application with Node and MongoDB from scratch (no prior knowledge needed -- I will explain everything from the very basics). Stay tuned for Part 3 of MongoDB Simplified and take care.  
[Shad](https://www.twitter.com/iamshadmirza)
