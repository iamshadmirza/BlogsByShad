# Nodejs Lesson 4: NPM Package Structure

Hey everyone, this lesson is going to be all about the node package and its structure. We will understand what the  `package.json` file actually is and its characteristics. We will learn what does those mighty properties inside `package.json` denotes and why they are important. Let's start.

## What is `package.json`

This file is one stop for you to know all the information about the package you're currently dealing with. It's a JSON file with a bunch of properties and each property tells us something about the package.

This JSON file is present at the root of the package and holds metadata about the package. Node actually uses this file to manage the versioning of our project, handle dependencies. It also contains info to identify the project itself like name, description, and version of the package. Let's talk about these properties in detail.

## Properties of `package.json`

Let's go through the common properties that you're most likely to see in the nodejs projects.

### 1. name

A package must have a unique name, it tells the user about the package and used as an identifier when publishing to the node package library. Ideally, you should add the name and version of the package but it's optional if you're not planning to publish it.

There are some rules regarding naming your npm package:

- It should be unique.
- It should not be the same as node core modules.
- It should be less than or equal to 214 characters.
- The name can't start with a dot or underscore.
- New packages must not have uppercase letters in the name.
- The name ends up being part of a URL, an argument on the command line, and a folder name. Therefore, the name can’t contain any non-URL-safe characters.

You should preferably choose a shorter, easy to recall name so that the user find it easier to use your package.

### 2. version

This is how you're going to manage updates to your package. When publishing, this field will be essential as it will tell the state of the package at any given time. Changes to the package go together with the change in version. It's unique and you can't publish a package with any version twice.

The name and version together form an identifier that is assumed to be completely unique. You will have to update the version whenever there is any significant change done to the package. The JavaScript ecosystem usually follows [semantic versioning scheme](https://semver.org/). Following the semantic versioning spec helps other developers who depend on your code understand the extent of changes in a given version, and adjust their own code if necessary.

Semantic versioning suggests that your package version should start with `1.0.0`. After the first release, you can follow the below principle while updating the package version:

- **Patch release**: Bug fixes increments the third digit provided that it's backward compatible and you are not introducing any breaking changes. Example: `1.0.1`
- **Minor release**: New feature increments the second digit provided that it's backward compatible and you are not introducing any breaking changes. Example: `1.1.0`
- **Major release**: Changes that break backward compatibility increments the first digit Example: `2.0.0`

### 3. description

Just a string that helps people discover the package. Add a short description of your package here. It’s listed in the npm search.

### 4. main

This field specifies the primary entry point of the module. Your package's main module’s exports object will be returned whenever a user require your package by `require("package-name")`

### 5. script

It's an object containing different scripts that can be run during the development/usage of the package. It contains key-value pairs where the key is the lifecycle event, and the value is the command to run at that point.

### 6. config

It's an object that contains configuration metadata of your package. An example can be the port address to run the package.

```json
{
    "config": { "port": "8080" }
}
```

### 7. keyword

It’s an array of strings. This also helps people discover your package as it’s listed in the npm search.

```json
{
    "keywords": ["node", "util", "react"]
}
```

### 8. author and contributors

Both contain an object of information about the person. `author` is one person object whereas `contributors` is an array of person object. One object can contain info like name, email, url.

```json
{ "name" : "Shad Mirza",
  "email" : "shad@example.com",
  "url" : "http://blog.soshace.com/"
}
```

### 9. dependencies

This field is the reason why npm can handle your packages and their specific version very efficiently. It's an object where each key is a package name mapped to a value of the package version. This field contains only those packages on which your project directly depends on. Example:

```json
{
  "name": "foo",
  "version": "0.0.0",
  "dependencies": {
    "express": "expressjs/express",
    "mocha": "mochajs/mocha#4727d357ea",
    "module": "user/repo#feature\/branch"
  }
}
```

### 10. devDependencies

Some packages are not directly needed by the end-user but they help the developer in development. Those additional development helping packages go under devDependencies. They won't be downloaded when the user installs your package. An example could be packages that help the developer in testing or documentation.

### 11. peerDependencies

This field is used to state the compatibility of our package with some particular version of the package that it might need. It will show a warning during `npm install` if the peer dependencies don't meet the requirement mentioned inside this field.

### 12. license

This contains the usage of information about your packages. It helps the user to know whether your project has any restrictions while using it.

```json
{
    "license": "MIT"
}
```

If your package uses more than one license, you can follow this syntax:

```json
{ "license": "(MIT OR Apache-2.0)" }
```

Make sure your project contains a license file associated with the license you specified here.

### 13. repository

This points to the location where your code is present. It's an object with key-value pair containing two properties: `type` and `url`

```json
"repository": {
  "type" : "git",
  "url" : "https://github.com/npm/cli.git"
}

"repository": {
  "type" : "svn",
  "url" : "https://v8.googlecode.com/svn/trunk/"
}
```

### 14. homepage

This contains url to the project homepage. It helps the user to find you on the internet.

```json
"homepage": "https://github.com/owner/project#readme"
```

### 15. bugs

Usually contains a string or an object to report or track issues. These are helpful for people who encounter issues with your package. Example:

```json
{
 "url" : "https://github.com/owner/project/issues",
 "email" : "project@hostname.com"
}
```

So, we talked about the properties of `package.json`. You might remember from the previous lesson where we generated this file `package.json`. Let's look at that to complete our knowledge base.

## How to generate `package.json`

You can go to any directory in the command-line and type `npm init`. This command will ask you a bunch of questions, mainly the properties we just talked about, and fill it for you. After it is done, your directory will be initialized and you will a `package.json` file generated with the answers you gave.  
If you are in hurry and just want to initialize with all the default options. You can type:

```sh
npm init --yes
```

This will skip the QA and generate the `package.json` file right away.

## Summary

- We learned what is `package.json` and how it's structured
- We learned about the different properties of `package.json`.
- We looked at `dependencies`, `devDependencies`, and `peerDependencies` and got to learn how npm is so efficient in managing packages.
- We learned the module entry point which is specified with `main` property.
- We learned about the script, repository, and other helpful fields.

That's it for this lesson. I hope you learned something and this was helpful. We will talk about global modules in the next lesson so stay tuned for that.
