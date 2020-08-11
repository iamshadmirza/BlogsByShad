# Setup MongoDB on your machine

![cover](./MongoDB-part2.png)

Hello amazing people, we are back with the MongoDB Simplified series. In the last article, we learned about MongoDB and NoSQl in general, now it's time to setup and get it running on our machine. Let's start!

## Step 1: Download and install MongoDB locally

We are going to download Community Server installed from MongoDb website. This is the free version which let's us test stuff on our machine.

Head over this [download page for Community Server](https://www.mongodb.com/try/download/community) and select your operating system. Hit download and install to the default location when download is finished.

> For Mac user: You will extract the file from `.tgz` package and paste it to your preferred location inside `mongodb` directory.

## Step 2: Setup Environment variable

Once your install it finished, you will see mongodb directory which will contain a `bin` folder with a bunch of other files.  

This `bin` folder is important and we will use the files inside to **execute various operarions like connecting to mongodb server**, importing data, etc. 

Open terminal on Mac or command prompt on windows and type `mongod`. This command is used to connect to mongodb server. You might see a `command not found` error which means our machine can't find the file it needs to connect to mongodb server. 😓

Remember we just talked about the mighty `bin` folder which **has the files needed to connect to mongodb server**. We just need to tell our machine about that location. 

To add `PATH` to that bin folder in **Windows**:

- Go to bin folder inside "Program Files" and copy path to `mongod` file.
- Go to "Edit environment variables" settings either by searching or right clicking on My Computer.
- Choose "Path" variable and add a new entry with the location you just copied

To add `PATH` to that bin folder on a **Mac**:

- Go to bin folder and copy path to `mongod` file by clicking "Get info"
- Go to user folder and search for `.bash_profile`
- Edit it and past this line at end: `export PATH=YOUR_COPIED_PATH:$PATH`

Make sure to replace `YOUR_COPIED_PATH` with location of your bin folder. It will look something like this: `export PATH=/Users/shad/development/mongodb/bin:$PATH`

Once you're done, close the terminal and start again. Type `mongo --version` and you should be able to see the version. 🎉

## Step 3: Setup MongoDB "data" directory

We need a place to store data file and for that, we need to create a data folder. 

- Create a `data` folder at your preffered location.
- Copy path to that location. We have to tell mongodb about it's location.
- Open terminal and type `mongodb --dbpath "/data/db"`.

> Make sure you type your path. For me, it's `"/data/db"`.
