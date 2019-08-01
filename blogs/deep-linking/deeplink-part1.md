# Deep Linking Simplified Part 1

## Steps involved:-
1. Create Project
2. Edit AndroidManifest.xml
3. Build Project
4. Test 

## Create project
Run in command: 
>`react-native init deeplinkDemo`

## Edit AndroidManifest.xml
We have to add `intent-filter` inside `AndroidManifest.xml` to specify the incoming links to launch this particular app.
```xml
<activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
        android:windowSoftInputMode="adjustResize">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
          <!--Copy & Paste code from here-->
          <intent-filter android:label="@string/app_name">
              <action android:name="android.intent.action.VIEW" />
              <category android:name="android.intent.category.DEFAULT" />
              <category android:name="android.intent.category.BROWSABLE" />
              <data android:scheme="app"
                  android:host="deeplink" />
          </intent-filter>
          <!--To here-->
      </activity>
```
Consider `scheme` as type of incoming link and `host` as the URL.  
Read Google Docs for more info:  
https://developer.android.com/training/app-links/deep-linking

## Build Project
Run this command from the root director:
```shell
react-native run-android
```

## Test
Make sure your app is not in foreground and run this command:  
```shell
adb shell am start -W -a android.intent.action.VIEW -d app://deeplink com.deeplinkdemo
```

If your package has a different name then edit command as follows:
```shell
$ adb shell am start -W -a android.intent.action.VIEW -d <URI> <PACKAGE>
```

*Note: Take a closer look on `app://deeplink`. This is our link added inside `intent-filter` to specify our app.*  
If your App opened successfully then our Deep Linking is working as expected. Yay!

## How to open with URL
Edit `<data />` tag inside `intent-filter` attribute as follows:
```xml
<data android:scheme="https" android:host="www.deeplinkdemo.com" />
```
Run this command:
```shell
 adb shell am start -W -a android.intent.action.VIEW -d https://www.deeplinkdemo.com com.deeplinkdemo
```
Cheers if your app appears in front of you.

### Note
You can use multiple `<data />` tags inside `intent-filter` so something like this totally okay.
```xml
<data android:scheme="app" android:host="deeplink" />
<data android:scheme="https" android:host="www.deeplinkdemo.com" />
```
You can create a html file with these two links to test. Create a basic HTML file like this:
```html
<html>
<a href="app://deeplink">DeepLink with app scheme</a>
<a href="https://www.deeplinkdemo.com">DeepLink with https scheme</a>
</html>
```
Access the file via localhost or place it on device. Click the link and this will hopefully launch your app.  
In Part 2 we will see **How to handle incoming links upon app launch** and **redirect user to a particular screen based on incoming link**.
Do share the article if you find it helpful.  
Shad


