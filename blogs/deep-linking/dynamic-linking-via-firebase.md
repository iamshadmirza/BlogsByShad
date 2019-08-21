# Handling Incoming Dynamic Links
!['cover'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/deep-linking/HIDL-cover.png)
This is Part 2 of the series React Native Deep Linking Simplified and in Part 1 we learned *How to add Deep Links*.  
In this article, our goal is to learn how to handle incoming links like a pro.  
We will also see how to route the user to a particular screen based on the incoming link.
>The term **Deep Link** is used for the `https` scheme and **Dynamic Link** is used for the `app` scheme. We can use both to navigate our user so don't get confused between these two terms.

Let's get started.
# Table of Content
This article is divided into two main sections. We will go through these as follows:
1. Project Setup
2. Test Dynamic Link on the device

# Project Setup
We will use the `react-native-firebase` module to configure Dynamic Links in our React Native Project. It involves 4 simple steps:
### Steps involved:- 
1. Create a React Native project
2. Create an application on firebase console
3. Add react-native-firebase 
4. Add Firebase Dynamic Link module

## Step 1. Create a React Native Project
Follow the steps in Part 1 of this series and add Deep Link as described. We will be adding `firebase-invites` support via the same Dynamic/Deep Link we created earlier.

## Step 2. Create an application on firebase console
Let's create an application on the firebase console to use the Firebase SDK. Follow this [link](https://console.firebase.google.com/) and create an application. 
* Create a project by clicking on **Add Project**. 

* Follow the steps to add Android/iOS app. Make sure the project name in **Register app** section matches with your react-native project (`com.deeplinkdemo` in our case). 
!['Register App'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/deep-linking/image%20(2).png) 
* Download `google-services.json` and paste it inside `/deeplinkdemo/android/app/`. Make sure the location is correct. 
!['Project structure'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/deep-linking/image.png)
* Add libraries as instructed and Sync Project. It will look something like this:- 
 * Project-level build.gradle 
 ```java
 dependencies {
  classpath("com.android.tools.build:gradle:3.4.1")
  classpath 'com.google.gms:google-services:4.3.0' //Add this line
 }
 ```
 * App-level build.gradle
 ```java
 dependendies {
  //...
  implementation 'com.google.firebase:firebase-core:17.0.1' // Add this line
 }
 //Add to the bottom of the file
 apply plugin: 'com.google.gms.google-services'
 ```
 >Please use the latest firebase dependency available. 
 You can add it from Android Studio also by going to:  
 File -> Project Structure -> Dependencies
## Step 3. Add react-native-firebase
Go to your project root directory and run this command:
```shell
npm install react-native-firebase --save
```
(Optional) Link the module if your react-native version is less than 0.60.
```shell
react-native link react-native-firebase
```
>React Native version (>0.60) supports [autolinking](https://facebook.github.io/react-native/blog/2019/07/03/version-60#native-modules-are-now-autolinked)

Follow the Manual Linking guide if you're having any issues with linking `react-native-firebase` or you're using an earlier version of React Native.

## Manual Linking for React Native(<0.60)
Check out the official [docs](https://rnfirebase.io/docs/v5.x.x/installation/android) for updated method.
### Android
* Add `react-native-firebase` to App-level `build.gradle`
```java
dependencies {
 //...
 implementation project(':react-native-firebase') //Add this line
}
```
* Edit `settings.gradle`
```java
//Add these lines
include ':react-native-firebase'
project(':react-native-firebase').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-firebase/android')
```
* Edit `MainApplication.java`
```java
 ...
 import io.invertase.firebase.RNFirebasePackage; // import this

 @Override
 protected List<ReactPackage> getPackages() {
 return Arrays.<ReactPackage>asList(
 new MainReactPackage(),
 new RNFirebasePackage(), // Add this line
 );
 }
```
* Sync Project and we are good to go.

## Step 4. Add Firebase Dynamic Links:
We have to include other modules as the `RNFirebasePackage` we imported earlier provides the core features only.  
If you go to the [Firebase Invites Docs](https://firebase.google.com/docs/invites), you will see a warning.

> Firebase Invites is deprecated. You can create cross-platform invitation links that survive app installation using Firebase Dynamic Links. Please see the Migration Guide for more details.

It means we are eventually be using [Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links/) module in our project.

* Add the dependency to `android/app/build.gradle` file:
```java
dependencies {
 // ...
 implementation "com.google.firebase:firebase-dynamic-links:19.0.0"
}
```
* Edit `MainApplication.java`:
```java
import ...
//import this package
import io.invertase.firebase.links.RNFirebaseLinksPackage;

@Override
protected List<ReactPackage> getPackages() {
 return Arrays.<ReactPackage>asList(
 new MainReactPackage(),
 new RNFirebasePackage(),
 new RNFirebaseLinksPackage() // Add this line
 );
}
```
* Sync Project and we are done. Let's move on to section 2.

If you're running into some dependency issues then `Migrate to AndroidX`. Check **How to solve dependency issues** at the end of this article.
> See [official docs](https://rnfirebase.io/docs/v5.x.x/links/android#Configure-Android-Project) for updated method.
# Test Dynamic Link on the device

There are two steps involved in this section: -
1. Create a Dynamic Link.
2. Handle the Incoming Link.

## Step 1. Create a Dynamic Link
Let's generate a link on the Firebase Console and update our intent filter. This link must be unique and provided by *firebase* itself. Follow these simple steps: 
* Select your app on Firebase Console and click on **Get Started** 
!['get started'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/deep-linking/image%20(7).png)

* Add a **Domain**. It will probably take a couple of tries to find a unique domain. Note it down when you find one.
*(example: `https://deeplinkblogdemo.page.link` in my case)* 
!['add domain'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/deep-linking/image%20(1).png)

* Edit `AndroidManifest.xml` and update the `<data>` tag in `intent-filter` with the *Domain* you just created: 
```xml
 <data android:scheme="https"
 android:host="deeplinkblogdemo.page.link" />
```
* Click on **New Dynamic Link** and follow the steps. Provide both *Deep Link URL* and *Dynamic Link name* under *Setup your Dynamic Link* section.
!['add domain'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/deep-linking/image%20(5).png) 

Now that we have created our Dynamic Link, we can move on to the next step.

## Step 2. Handle the Incoming link
The root file of your project `App.js` is the perfect place to add handling logic. So let's start editing the root file.
Follow these three simple steps:- 
1. Import firebase module. 
```javascript
import firebase from 'react-native-firebase';
```
2. Add the code to watch for incoming links when the root file is mounted.
```javascript
async componentDidMount() {
 let url = await firebase.links().getInitialLink();
 console.log('incoming url', url);
}
```
3. Open the created *Dynamic Link* with any browser and check the log. Cheers if you can see the incoming url.

We can add conditions here to check for a certain match in url. On based of that we can write functions as per our need. For example: 
```javascript
async componentDidMount() {
 let url = await firebase.links().getInitialLink();
 if(url === 'some_condition_here'){
 //code to execute
 }
}
```
Add navigation path or anything as per your need and you're good to go.  
We will build a referral system in our React Native App using this logic because that will a perfect use case to demonstrate Dynamic Links. So don't miss the third and final part of this series.  
## How to solve dependency issue
You might run into some dependency issues because of the recent changes that happened to the `AndroidX` library (because I did) and here is how I solved them:
1. Open your *Project* with Android Studio and select `app` folder.
2. Go to *Refractor -> Migrate to AndroidX -> Do refractor*.
3. Sync Project. If the issues persist follow step 4 and 5. 
4. You will probably see a *list of build issues* in *Build Output* below. Go through each one them and find the conflicting variable.
5. Press `ALT + ENTER` and import the dependency. Remove the old one already present and we are done.

I hope you're able to resolve the issues and successfully implement the Dynamic Links from firebase.  
Share this article if you find it helpful.  
See you in the next article. Shad