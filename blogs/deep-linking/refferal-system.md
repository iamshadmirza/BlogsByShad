# Reward Referrals in React Native
This is the third article of series *React Native Deep Linking Simplified* and in the first two blogs, we learned how to add Deep Link in our app and how to handle it gracefully.  
In this article, we will setup a referral system and get the most out this amazing feature. 
>Offering in-app rewards for successful referrals to both the referrer and the recipient is an effective way to encourage users to use your app. 

There are five simple steps that we will be going through. Let's get started.
##  Steps involved:
1. Setup Firebase Project and SDK
2. Create invititation link
3. Send the invitaion link
4. Retrieve the link
5. Grant reward

## Step 1. Setup Firebase Project and SDK
We have already covered this section in [Part 1]() and [Part 2]() of this series. Please go through them first then continue from Step 2. 

## Step 2. Create invitation link
We already learned how to create Dynamic Link from Firebase Console. This time, we will be generating the *invitation link* at the sender's part and attach a `payload` along with it. This `payload` will specify the sender's user account ID at the receiving end. It will look something like this:
```https
https://www.deeplinkdemo.com?invitedby=SENDER_UID
```
I will using a random SENDER_UID just for this article. You can call `getUid()` on Firebase user or generate the ID as you like.
```javascript
//import firebase
import { firebase } from '@react-native-firebase/dynamic-links';
//Generate unique user ID here
const SENDER_UID = 'USER1234';
//build the link
const link = await firebase.dynamicLinks().buildLink({
  link: `https://www.deeplinkdemo.com?invitedby=${SENDER_UID}`,
  domainUriPrefix: 'https://deeplinkblogdemo.page.link',
  analytics: {
    campaign: 'banner',
  }
});

```
Visit this [link](https://invertase.io/oss/react-native-firebase/v6/dynamic-links/reference/dynamiclink) to read more about the *parameters* available.

## Step 3. Send the invitation link
Now that we have created the link, we can include it in an invitation. This invitation can be an email, SMS message, or any other medium, depending on what is most appropriate for your app and audience. Example: 
```javascript
const INVITATION = 'Shad has invited you to try this app. Use this referral link: ' + link;
//send this String as you link
```
## Step 4. Retrieve the link
There are mainly use cases that can happen when the recipient open the app with the invitation link:  
1. If the app isn't already installed, they will be directed to Play Store or App Store to install the app.
2. If the app is installed, they will open our app for the first time and we can retrieve the referral information included in the Dynamic Link.

Remember when we added `SENDER_UID` as a payload in our invitation link? We are going to retrive that info to specify the user and grant reward. We want to check that the app has been launched from a Dynamic Link or not.
```javascript
    //add the code to the root file of your app
    componentDidMount(){
        const initialLink = await firebase.dynamicLinks().getInitialLink();

        if (initialLink) {
            // Handle dynamic link inside your own application

        //Assuming "?post=1234&action=edit"
        // var urlParams = new URLSearchParams(window.location.search);
        // console.log(urlParams.has('post')); // true
        // console.log(urlParams.get('action')); // "edit"

            if (initialLink.url.includes('https://www.deeplinkdemo.com')){
                //app opened from Dynamic Link
                //retreive the SENDER_UID
                //Set the reward point and update values in database
            } else {
                //app not opened from Dynamic Link
                //No reward is granted
            }
        }
}
```
> `getInitialLink()` returns the Dynamic Link that the app has been launched from. If the app was not launched from a Dynamic Link the value will be null.

## Step 5. Grant reward
Now that we have retrieved the payload data from the Dynamic Link, we can specify the user who shared the link and grant the referral rewards to the referrer and the recipient whenever the criteria we want to require have been met.

## TODO
Test the code and check the blogs for punctuation errors