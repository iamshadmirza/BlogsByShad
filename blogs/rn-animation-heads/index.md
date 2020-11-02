# React Native Animation using Hooks: Floating Heads

Hello everyone 👋, we are back with some React Native Animation. We will build Facebook messenger's floating heads using Animated library and Hooks 🙌. It's going to be fun so hold tight.

## The Concept

Let's understand what's happening before jumping to code. As soon as we press on a chat head and drag, it starts moving. You might notice that it's not moving alone, the other three heads are following the first head giving it a trailing effect. **Here we understood that there are 4 heads that we have to animate.**

The top most head will receive gesture and move, then we will animate the other 3 heads one by one to the first head's new position. **There will be a slight delay in the 2nd, 3rd, and 4th heads so that we can get our trailing effect.** Let's jump to code now.

## What we are going to do

We will break the tutorial into small chunks so that you can easily understand. These are the four steps:

- Setup heads with animated value
- Render Heads and add styles
- Setup PanResponder
- Decouple the logic into Hook

Let's go through each of them one by one. 🚀

## Step 1: Setup heads with animated value

Let's start with adding boilerplate. We will simply import the stuff we need and create a container to hold the head. We will set container's `alignItems` and `justifyContent` to `center` so that head will stay at center when we load the app.

```js
import React, { useState, useRef } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Animated,
    Image,
    TouchableWithoutFeedback,
    PanResponder
} from 'react-native';
import Constants from 'expo-constants';
const imageUrl = 'YOUR_IMAGE_LINK';

export default function App() {
  return (
    <View style={styles.container}>
      // render heads
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

```

Note: We are using Expo and the live demo can be found at end of this article

As we talked in the concept part above, **we need 4 heads** and we have to animate each of them separately. Let's add an array of heads with imageUrl property to store image and animated property to store postion of head.

```js
// imports

export default function App() {
    const [heads, setHeads] = useState([
      {
        image: imageUrl, // image on head
        animation: new Animated.ValueXY(), // position of head
      },
      {
        image: imageUrl,
        animation: new Animated.ValueXY(),
      },
      {
        image: imageUrl,
        animation: new Animated.ValueXY(),
      },
      {
        image: imageUrl,
        animation: new Animated.ValueXY(),
      },
  ]);
  return (
    <View style={styles.container}>
      // render heads
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // container styles
  },
});
```

Now, let's move on to next step and render heads on the screen.

## Step 2: Render Heads and add styles

We need to render circular heads that appears like Avatar. Let's add some styling for that first.

```js
// imports

export default function App() {
  const [heads, setHeads] = useState([...]);
  return (
    <View style={styles.container}>
      // render heads
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   // container styles
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute' // 👈  Notice this
  },
});
```

Did you notice that we are positioning the heads as `absolute`? We are doing this because we want to make sure all the heads render on top of each other. User will see the top most head only and the bottom heads will slowly be revieled as the user starts dragging.

Finally, render the heads array.

```js
// imports

export default function App() {
  const [heads, setHeads] = useState([...]);
  return (
    <View style={styles.container}>
      {heads
        .slice(0)
        .reverse()
        .map((item, index, items) => {
          return (
            <Animated.Image
              key={index}
              style={[styles.head, {
                transform: item.animation.getTranslateTransform()
              }]}
              source={{ uri: item.image }}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // contsiner styles
  },
  head: {
    // head styles
  }
});
```

Let's us walk through what's happening here. We took the `heads` array, created shallow copy using slice and applied `Array.reverse()` on it. **Why `.reverse()`?**

The way React Native works is, it will render the first head it gets from array and then second one. This way, the fourth head will render on the top. We don't want that. We want to render the heads in *reverse order* so that first head comes on the top. The reverse function is just taking care of that.

After that, we are using map to loop through the array and return `Animated.Image` with `head` styles and a `transform` property. `Animated` will allow normal Image component to receive animated value so that we can apply animated positioning styles we are getting from `item.animation.getTranslateTransform()`.

> Note: Each `animation` property has different styles for the four heads respectively. They will let us move them separately.

Moving on to the third step 🙌

## Step 3: Setup PanResponder

If you have worked with React Native Animation before, you probably know what is a `PanResponder`. It helps us record gestures on any component and perform animation. I'll explain everything from basics so don't worry even if you are new to this 😄.

```js
// imports

export default function App() {
  const [heads, setHeads] = useState([...]);
  
  // FOCUS HERE 👇
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        // add code here
      },
      onPanResponderMove: (event, gestureState) => {
        // add code here
      }
    })
  ).current;
  
  return (
    <View style={styles.container}>
      {heads
        .slice(0)
        .reverse()
        .map((item, index, items) => {
          return (
            <Animated.Image
              key={index}
              style={[styles.head, {
                transform: item.animation.getTranslateTransform()
              }]} 
              source={{ uri: item.image }}
            /> 
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // container styles
  },
  head: {
    // head styles
  }
});
```

We have imported PanResponder from react-native and calling `create` to create a pan responder. This method gets invoked when the app loads. It provides us a bunch of callbacks. Let's undertand them.

First and Second callbacks are returning true. You can consider it like asking for permission to record gestures. By returning true, we are telling it to allow recording gestures on the component. 

**We are more concerned about third and fourth callback.**

The third callback gets invoked as soon as you touch the component. This is a perfect place to set some initial styles. We will soon know how.

The fourth callback gets invokes when you start dragging the component. This will give us the position difference in horizontal and vertical direction based on how much the head has moved. We can then use this difference to set position on heads.

### Set up onPanResponderGrant

Let's add some code to the third callback. We talked about that this is the perfect place to setup some initial styles. What does that mean?

Suppose we drag the head to a position and leave the finger. What will happen if we start dragging the head again? The head will again start from center (not the new position). To make sure our head start from new position, we have to extract the offset. This is where this callback comes handy.

```js
onPanResponderGrant: (event, gestureState) => {
  heads.map(({animation}) => {
    animation.extractOffset();
    animation.setValue({ x: 0, y: 0 });
  });
},
```

Above code will take care of dragging head for second and consecutive times. It will make sure that the heads starts from new position.

### Set up onPanResponderMove

This is the fun part. We will take the first head from the array using `heads[0]` and set it's position to the `dx` and `dy`. These two are position difference dragged in X and Y direction. It can be acquared from second parameter of the callback.

We just took care of dragging the first head and now it's time to create that trailing effect. We will take the remaining heads and use `Animated.sequence()`. It takes an array of animation that get's executed sequentially.

The first is to delay the animation for consecutive heads. The delay will be longer as the count of head increases, hence we multiply by index. After that, we will move the head to dragged position using nice string animation. The delay will make sure the last head gets springed at end, hence the trailing effect. Let's look at code to better understand this.

```js
      onPanResponderMove: (event, { dx, dy }) => {
        heads[0].animation.setValue({
          x: dx,
          y: dy
        });
        heads.slice(1).map(({animation}, index) => {
            Animated.sequence([
                Animated.delay(index * 10),
                Animated.spring(animation, {
                    toValue: { x: dx, y: dy}
                })
            ]).start();
        });
      }
```

The last step is to apply this `panhandlers` from `panResponder` to the component.

```js
  return (
    <View style={styles.container}>
      {heads
        .slice(0)
        .reverse()
        .map((item, index, items) => {
          const pan = index === items.length - 1 // Apply it to top most head only
                ? panResponder.panHandlers
                : {};
          return (
            <Animated.Image
              {...pan} // spread the handlers
              key={index}
              style={[styles.head, {
                transform: item.animation.getTranslateTransform()
              }]}
              source={{ uri: item.image }}
            />
          );
        })}
    </View>
  );
```

And we are done with our animation. Final step is to decouple the whole logic into a reusable hook. But before that, let's undertand why we used `useRef`.

`useRef` will make sure our `PanResponder` gets created once and the reference stays the same through out the lifecycle of the component. Since the occasional re-renders doesn't affect `useRef`, it's the perfect place to setup animation stuff.

## Step 4: Decouple the logic into Hook

This step will require us to ask ourselves a question. **What are the things that this animation depends on?** Once you answer this, the decoupling will be easy as cake.

In our case, this animation depends on **heads animation value** and **PanResponder**. We can take the code associated with these two and move them into a hook.

Create a file `usePanResponder` and move the code there:

```js
import React, { useState, useRef } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';

export default function usePanHandler(imageURL) {
  const [heads, setHeads] = useState([
    {
      image: imageURL,
      animation: new Animated.ValueXY(),
    },
    {
      image: imageURL,
      animation: new Animated.ValueXY(),
    },
    {
      image: imageURL,
      animation: new Animated.ValueXY(),
    },
    {
      image: imageURL,
      animation: new Animated.ValueXY(),
    },
  ]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        heads.map(({animation}) => {
          animation.extractOffset();
          animation.setValue({ x: 0, y: 0 });
        });
      },
      onPanResponderMove: (event, {dx, dy}) => {
        heads[0].animation.setValue({
          x: dx,
          y: dy
        });
        heads.slice(1).map(({animation}, index) => {
          Animated.sequence([
            Animated.delay(index * 10),
            Animated.spring(animation, {
              toValue: { x: dx, y: dy}
            })
          ]).start();
        })
      }
    })
  ).current;

  return [heads, panResponder];
}
```

Now, import this hooks and get the values exported by it.

```js
// other imports
import usePanResponder from './usePanResponder';

export default function App() {
  const [heads, panResponder] = usePanResponder(imageUrl);
  
  return (
    <View style={styles.container}>
      {heads
        .slice(0)
        .reverse()
        .map((item, index, items) => {
          const pan = index === items.length - 1
                ? panResponder.panHandlers
                : {};
          return (
            <Animated.Image
              {...pan}
              key={index}
              style={[styles.head, {
                transform: item.animation.getTranslateTransform()
              }]}
              source={{ uri: item.image }}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // container styles
  },
  head: {
    // head styles
  }
});
```

Well done 🥳  
We have successfully created Floating Heads animation using Hooks 👏.

That's all for this article. Let me know if this was helpful. You can also drop suggestions on what you would like me to write on. Thank you for your time and don't forget to share 🤓.  
Shad
