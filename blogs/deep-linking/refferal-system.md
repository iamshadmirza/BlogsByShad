# React Native Reward Referrals
!['cover'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/deep-linking/RNRR-cover.png)
This is the third article of series *React Native Deep Linking Simplified* and in the first two blogs, we learned how to add Deep Link in our app and how to handle it gracefully.  
In this article, we will set up a referral system and get the most out of this amazing feature. 
>Offering in-app rewards for successful referrals to both the referrer and the recipient is an effective way to encourage users to use your app. 

There are five simple steps that we will be going through. Let's get started.
##  Steps involved:
1. Setup Firebase Project and SDK
2. Create an invitation link
3. Send the invitation link
4. Retrieve the link
5. Grant reward

## Step 1. Setup Firebase Project and SDK
We have already covered this section in [Part 1](https://iamshadmirza.hashnode.dev/react-native-deep-linking-simplified-cjzj6qf8900003ss1zv178dm9) and [Part 2](https://iamshadmirza.hashnode.dev/handling-incoming-dynamic-links-cjzkouqgq002nzts1xvo1pz11) of this series. Please go through them first then continue from Step 2. 

## Step 2. Create invitation link
We already learned how to create Dynamic Link from Firebase Console. This time, we will be generating the *invitation link* at the sender's end and attach a `payload` along with it. This `payload` will specify the sender's user account ID at the receiving end. It will look something like this:
```https
https://www.deeplinkdemo.com?invitedby=SENDER_UID
```
I will be using a random SENDER_UID just for this article. You can call `getUid()` on Firebase user or generate the ID as you like.
```javascript
//import firebase
import firebase from 'react-native-firebase';
//Generate unique user ID here
const SENDER_UID = 'USER1234';
//build the link
const link = `https://www.deeplinkdemo.com?invitedBy=${SENDER_UID}`;
const dynamicLinkDomain = 'https://deeplinkblogdemo.page.link';
//call  DynamicLink constructor
const DynamicLink = new firebase.links.DynamicLink(link, dynamicLinkDomain);
//get the generatedLink
const generatedLink = await firebase.links().createDynamicLink(DynamicLink);
console.log('created link', generatedLink);
// console.log: https://deeplinkblogdemo.page.link?link=https%3A%2F%2Fwww.deeplinkdemo.com%3FinvitedBy%3DUSER1234
```

## Step 3. Send the invitation link
Now that we have created the link, we can include it in an invitation. This invitation can be an email, SMS message, or any other medium, depending on what is most appropriate for your app and audience. Example: 
```javascript
const INVITATION = 'Shad has invited you to try this app. Use this referral link: ' + link;
//send this String as you link
```
## Step 4. Retrieve the link
There are many use cases that can happen when the recipient opens the app with the invitation link:  
1. If the app isn't already installed, they will be directed to Play Store or App Store to install the app.
2. If the app is installed, they will open our app for the first time and we can retrieve the referral information included in the Dynamic Link.

Remember when we added `SENDER_UID` as a payload in our invitation link? We are going to retrieve that info to specify the user and grant reward. We want to check that the app has been launched from a Dynamic Link or not.
```javascript
    //add the code to the root file of your app
    async componentDidMount() {
        let url = await firebase.links().getInitialLink();
        console.log('incoming url', url); //incoming url https://www.deeplinkdemo.com?invitedby=USER1234
        if (url) {
        const ID = this.getParameterFromUrl(url, "invitedBy");
        console.log('ID', ID); //ID USER1234
        }
    }

    getParameterFromUrl(url, parm) {
        var re = new RegExp(".*[?&]" + parm + "=([^&]+)(&|$)");
        var match = url.match(re);
        return (match ? match[1] : "");
    }

```
> `getInitialLink()` returns the Dynamic Link that the app has been launched from. If the app was not launched from a Dynamic Link the value will be null.

## Step 5. Grant reward
Now that we have retrieved the payload data from the Dynamic Link, we can specify the user who shared the link and grant the referral rewards to the referrer and the recipient whenever the criteria we want to require have been met. And by this our *Reward Referral System* has been completed. Cheers!!  

!['cheers'](https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif)

I hope you had fun learning about the Dynamic Links, Handling them and the Reward Referral systems in these three blog post series. Find it helpful? Please do share.  
Shad