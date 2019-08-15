# Handling incoming Dynamic Links

This is Part 2 of the series React Native Deep Linking Simplified and in Part 1 we learned How to add Deep Link to awe will make a Reward Referral system by implementing Dynamic Links using `react-native-firebase`.  
Our main goal was to handle incoming links and Reward Referral System looks like a good topic to illustrate this.
We will see how to route the user to a particular screen based on the link he is coming from.  
Let's get started.
### Steps involved:-  
1. Create a React Native project
2. Create an application on firebase console
3. Add react-native-firebase 
4. Add Firebase Dynamic Links
5. Test Dynamic Link

## Create a React Native Project
Follow the steps as described in Part 1 of this series and Add Deep Link first. We will be adding `firebase-invite` support via same Dynamic/Deep Link we created earlier.
>The term **Deep Link** is used for `https` scheme and **Dynamic Link** is used for `app` scheme. We can use both to navigate our user so don't get confused.

## Create an application on firebase console
Let's create an application on the firebase console to use the Firebase SDK. Go [here](https://console.firebase.google.com/) and create an application. 
* Click on Add Project.
* Add iOS and Android app and follow the steps. Make sure the project name in **Register app** section matches with your react-native project (`com.pushnotification` in our case).  
//change image
!['Register App'](https://raw.githubusercontent.com/iamshadmirza/personal-website/push-notification-react-native/src/pages/blog/push-notification-react-native/add-app.png) 
* Download `google-services.json` and paste it inside `/pushnotification/android/app/`. Make sure the location is correct.  
//change image
!['Project structure'](https://raw.githubusercontent.com/iamshadmirza/personal-website/push-notification-react-native/src/pages/blog/push-notification-react-native/project-structure.jpg)
* Add libraries as instructed and Sync Project. This will look something like this:-  
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
        implementation fileTree(dir: "libs", include: ["*.jar"])
        implementation "com.facebook.react:react-native:+"
        implementation 'com.google.firebase:firebase-core:17.0.1' // Add this line
        
        if (enableHermes) {
        def hermesPath = "../../node_modules/hermesvm/android/";
        debugImplementation files(hermesPath + "hermes-debug.aar")
        releaseImplementation files(hermesPath + "hermes-release.aar")
        } else {
        implementation jscFlavor
        }
    }
    //Add to the bottom of the file
    apply plugin: 'com.google.gms.google-services'
    ```
    >Please use the latest firebase dependency available.  
    You can add it from Android Studio also by going to:  
    File -> Project Structure -> Dependencies
## Add react-native-firebase
Go to your project and run this command.
> npm i react-native-firebase --save

(Optional) Link the module if your react-native version is less than 0.60. Run this command.
> react-native link react-native-firebase

React Native version (>0.60) supports [autolinking](https://facebook.github.io/react-native/blog/2019/07/03/version-60#native-modules-are-now-autolinked) but sometimes, it might not work. Follow the Manual Linking guide if you're having any issue with linking `react-native-firebase`.

### Manual Linking for React Native(<0.60)
Check out the official [docs](https://rnfirebase.io/docs/v5.x.x/installation/android) for updated method.
### Android
* Add `react-native-firebase` to App-level `build.gradle`
```java
dependencies {
    implementation project(':react-native-firebase') // Add this line
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation 'androidx.appcompat:appcompat:1.0.0'
    implementation "com.facebook.react:react-native:+"
    implementation 'com.google.firebase:firebase-core:17.0.1'
}
```
* Edit `settings.gradle`
```java
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
* Sync Project

## Add Firebase Dynamic Links:
If you go to the [Firebase Invites Docs](https://firebase.google.com/docs/invites), you will see a warning.

> Firebase Invites is deprecated. You can create cross-platform invitation links that survive app installation using Firebase Dynamic Links. Please see Migration Guide for more details.

It means we are eventually be using [Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links/)

* Add the dependency to `android/app/build.gradle` file:
```java
dependencies {
  // ...
  implementation "com.google.firebase:firebase-invites:17.0.0"
}
```
* Edit `MainApplication.java`:
```java
import ...
import io.invertase.firebase.links.RNFirebaseLinksPackage; // Add this line

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNFirebasePackage(),
        new RNFirebaseLinksPackage() // Add this line
    );
}
```
* Sync Project
> See [official docs](https://rnfirebase.io/docs/v5.x.x/links/android#Configure-Android-Project) for updated method.
## Test Dynamic Link on the device

There are two steps involved in Testing Dynamic Links: -
1. Create a Dynamic Link.
2. Handle the incoming link.

### Create a Dynamic Link
* Click on **Get Started**  
//image
* Add a **Domain**. It will probably take a couple of tries to find a unique domain. Note it down when you find one.
*(example: `https://deeplinkblogdemo.page.link` in my case)*  
//image
* Edit `AndroidManifest.xml`.  
Now just update the `<data />` tag in `intent-filter` with the *Domain* you just created:
```xml
    <data android:scheme="https"
            android:host="deeplinkblogdemo.page.link" />
```
4. Click on **New Dynamic Link** and follow the steps. Here is my setup for reference.
//image  
//image  
//image

Now that we have created our Dynamic Link, we can move on to the next step.

### Handle Incoming link

Follow these steps:-  
1. Import firebase module.  
```javascript
import firebase from 'react-native-firebase';
```
2. Handle incoming links.  
The best place to handle incoming links is when the root file is mounted. Add this function in `App.js`.
```javascript
async componentDidMount() {
    let url = await firebase.links().getInitialLink();
    console.log('incoming url', url);
}
```
3. We can add condition here to check for a certain match in url. On based of that we can write functions as per our need.

Open the created **Dynamic Link** with any browser and check the log. Cheers if you find the incoming url.

