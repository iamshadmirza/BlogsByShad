# React Native Animation using Hooks: Loading Screen

![cover](./cover.png)

Hey there, I guess you decided to read this blog to learn a few things about React Native Animation and Hooks. You're in the right place.

We are going to make a basic rotation animation using the React Native Animated library. This will contain a "Twitter" logo at the center which will rotate to create a loading effect. We will incorporate the whole logic inside a hook. Let's start.

## Step 1: Create a Loading Screen

We first need a loading screen to animate. 

- Add a View with `flex: 1`, it will cover the whole screen.
- Add **Twitter logo** (or any image you like) with a **Loading...** text.
- Place them at the center of the screen.

```js
// App.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Logo from './twitter.png';

export default function App() {

    return (
        <View style={styles.container}>
            <Image
                style={[styles.image]}
                source={Logo}
                resizeMode="contain"
            />
            <Text style={styles.textMargin}>Loading tweets...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    textMargin: {
        marginTop: 30,
        fontSize: 18,
    },
});

```

You may have noticed that Image style is an array. This is because we are going to add styles to rotate the image in a while.

## Step 2: Create `useRotation` Hook

Create a file `useRotation.js` and follow along. This will contain 4 steps:

### 1) Create Animated value

What's an Animated value 🤔?

This will be the initial value created via the `Animated` library. We will update this value with `Animated` API and hook up the changes with styles of the Image to create a fluid animation.

```js
import { Animated } from 'react-native';
import { useRef } from 'react';

export default function useRotation() {
    const animation = useRef(new Animated.Value(0)).current;
    return null;
}
```

> We are using `useRef` hook as this ref object's current property is initialized as the given argument (Animated value) and persists throughout the component lifecycle. Using `useState` is not recommended here.

### 2) Animate the value using `Animated` API.

Animated API gives us a bunch of methods to mutate the animated value without much trouble. Some of the methods are `timing`, `spring`, `decay`, etc. You can read more on the [Official Documentation](https://reactnative.dev/docs/animated).

We will use `Animated.timing()` to change the value in a particular duration and then `Animated.delay()` to give a pause before starting to rotate again. Then we will use `Animated.sequence()` to add these two animations in aa array to create a sequence.

```js
import { Animated } from 'react-native';
import { useRef } from 'react';

export default function useRotation() {
    const animation = useRef(new Animated.Value(0)).current;

    function startAnimation() {
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true,
          }),
          Animated.delay(300),
          ],
          { useNativeDriver: true })
          .start(() => {
            animation.setValue(0);
            startAnimation();
        });
    }
    return null;
}
```

`Animated.sequence` takes an array of animated to execute one after another.

`Animated.timing` takes the animated value as the first argument and animate to `toValue` provided inside an object in the second argument with a specified `duration`.

`Animated.delay` takes a number of milliseconds which will delay the next animation.

After adding all these, we will start the animation by calling `.start()`

This start function takes a callback that will run after the animation is complete. We are using this to reset the animated value to 0 in order to start the animation again by calling `startAnimation()`.

> We are using `useNativeDriver: true` to send animation logic to the native side. This will ensure that our animation is not blocking JS thread and it runs smoothly.

### 3) Interpolate on the changes

Now, What's Interpolate?

`interpolate()` function takes an `inputRange` and maps it to the `outputRange` specified. We will map the values **0, 1** with **0 degrees, 360 degree**. As the value changes from 0 to 1, it will calculate relative values in degrees based on the change.

This means that 0 will give 0 degrees, 1 will give 360 degrees, and 0.5 will give 180 degrees as this is the half of both range. All other values in between are automatically calculated by this logic.

We will use this to interpolate our animated value and find a relative degree of rotation. Then we will return this degree from the hook.

```js
import { Animated } from 'react-native';
import { useRef } from 'react';

export default function useRotation() {
    const animation = useRef(new Animated.Value(0)).current;

    function startAnimation() {
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true,
          }),
          Animated.delay(300),
          ],
          { useNativeDriver: true })
          .start(() => {
            animation.setValue(0);
            startAnimation();
        });
    }

    //interpolate
    const rotateInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return rotateInterpolation;
}
```

### 4) Start the animation ✌️

We want this animation to run as soon as the screen is mounted. We can use `useEffect` hook for this purpose.

```js
useEffect(() => {
    startAnimation();
});
```

We are done with our animation logic. Now we just need to import this hook and use it inside `App.js`

## Step 3: Import `useRotation` Hook

Go to App.js and import the hook we just created. We will use the degrees returned by the hook to style the Twitter logo.

```js
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Logo from './twitter.png';
import useRotation from './useRotation'; //import hook

export default function App() {

    const rotate = useRotation(); // get degrees from hook
    const animatedStyle = { transform: [ { rotate } ] }; // transform image to rotate

    return (
        <View style={styles.container}>
            <Animated.Image
                style={[styles.image, animatedStyle]}
                source={Logo}
                resizeMode="contain"
            />
            <Text style={styles.textMargin}>Loading tweets...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    textMargin: {
        marginTop: 30,
        fontSize: 18,
    },
});
```

We have successfully added the `useRotation` hook to our loading screen. The result looks like this 👇🏼.

![Demo](./demo.gif)

You can check out the [Live Demo](https://snack.expo.io/@iamshadmirza/rotation-example) here in expo snack.

## TLDR

- We created a loading screen with an image and loading text at the center.
- We created `useRotation` hook to animate value and provide and provide a relative degree of rotation
- We imported that hook and used to rotate our logo.

If you liked reading this article. You might like my other article on react native animation. Do check [Learn React Native Animation by building Circular Progress Bar](https://iamshadmirza.com/learn-react-native-animation-by-building-circular-progress-bar-ck9grnp2h06ytcss1p2wrn1m2).

That's it for now. Take care and stay safe.  
[Shad](https://www.twitter.com/iamshadmirza)