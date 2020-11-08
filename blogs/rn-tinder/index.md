# React Native Animation using Hooks: Tinder Cards

Hello everyone, We are back with some React Native Animation, and this time we are building Tinder Cards using Hooks. We will build a deck of cards featuring cute animals where you can swipe left or right. And finally, we will decouple the whole logic into a reusable hook. Let's start 🚀

## Concept

Let's understand an overview of how the animation will happen. We will have an array of cards to render from which we will render two cards at a time. The top will record gesture which will move left or right based on user's swipe. We will one card below which will pop upfront when the top card is swiped. There will be a threshold distance horizontally. If the swipe is below the threshold, the card will get back in its initial position. If not, the card will be thrown out of the screen.

Next, we will have three animation values: `animation`, `opacity`, and `scale`. `animation` will store the XY position of the card and will be updated as the user is swiping.  
Then there is `opacity`, this will be `1` initially and will turn to `0` once the card is out of view.  
At last, `scale` will contain the `scale` property for the second card. It will be `0.9` initially will be updated to `1` once it's on top. This will give us pop to front effect. 

I hope you are with me so far. We will follow these 6 steps:

1. Boilerplate
2. Render Cards with Absolute Positioning
3. Setup PanResponder to Record Gesture
4. Setup Transition to Next Card
5. Setup Animated Styles
6. Decouple into Reusable Hook

Let's start coding this in Expo 🤓.

## Step 1. Boilerplate

Let's start with importing the required stuff and a container view to place our cards at the center. We will also need to initialize state variables for deck array and animation values.

```js
import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    PanResponder,
    Text,
    Platform,
    Dimensions,
    Image,
} from 'react-native';

// decide a threshold after which card will be swiped
const { width } = Dimensions.get('screen');
const SWIPE_THRESHOLD = 0.25 * width;

// import images of cute animals
import Bobo from './bobo.jpg';
import Dolly from './dolly.jpg';
import Giraffe from './giraffe.jpg';
import Goat from './goat.jpg';

function App() {
  // initialize deck to render
  const [data, setData] = useState([
    {
      image: Bobo,
      id: 1,
      name: "Bobo",
      animal: 'Cat',
    },
    {
      image: Dolly,
      id: 2,
      name: "Dolly",
      animal: 'Dog',
    },
    {
      image: Giraffe,
      id: 3,
      name: "Milo",
      animal: 'Giraffe',
    },
    {
      image: Goat,
      id: 4,
      name: "Ollie",
      animal: 'Goat'
    },
  ]);

  // initialize animation values for position and opacity of top card
  // and scale of next cards
  const animation = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  return (
    <View style={styles.container}>
      // render cards here
    </View>
  );
}

const styles = StyleSheet.create({
  // add container styles and place the cards to center
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
```

## Step 2. Render Cards with Absolute Positioning

Now, let's render the cards on-screen and add some nice styles.

```js
function App () {
    return (
        <View style={styles.container}>
          {data
           .slice(0, 2)
           .reverse()
           .map((item, index, items) => {
             return (
               <Animated.View
                 {...panHandlers}
                 style={[styles.card]}
                 key={item.id}>
                 <View style ={styles.imageContainer}>
                   <Image resizeMode="cover" source={item.image} style={styles.image} />
                 </View>
                 <View style={styles.textContainer}>
                   <Text style={styles.nameText}>{item.name}</Text>
                   <Text style={styles.animalText}>{item.animal}</Text>
                 </View>
               </Animated.View>
             );
          })}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    width: '100%',
    height: 300,
    backgroundColor: '#f4f4f4',
    position: 'absolute',
    borderRadius: 10,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      web: {
        boxShadow: '0 3px 5px rgba(0,0,0,0.10), 1px 2px 5px rgba(0,0,0,0.10)',
      },
    }),
    borderWidth: 1,
    borderColor: '#FFF',
  },
  imageContainer: {
    flex: 1
  },
  image: {
    width: '100%',
    height: '100%'
  },
  textContainer: {
    padding: 10
  },
  nameText: {
    fontSize: 16,
  },
  animalText: {
    fontSize: 14,
    color: '#757575',
    paddingTop: 5
  }
});

export default App;
```

It's time for swiping gesture animation in the next section.

## Step 3. Setup PanResponder to Record Gesture

If you have been following the series, you might have an idea of how to setup PanResponder. I'll directly explain the logic. Feel free to follow this article if you have any confusion.

```js
const _panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animation.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (e, { dx, dy, vx, vy }) => {
        let velocity;
        if (vx >= 0) {
          velocity = clamp(vx, 4, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 4, 5) * -1;
        }
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.parallel([
            Animated.decay(animation, {
              velocity: { x: velocity, y: vy },
              deceleration: 0.99,
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              friction: 4,
              useNativeDriver: false,
            }),
          ]).start(transitionNext);
          if (velocity > 0) {
            handleRightDecay();
          } else {
            handleLeftDecay();
          }
        } else {
          Animated.spring(animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
```

As we talked about in the previous article, `onPanResponderMove` can be used to make difference in the horizontal or vertical direction and set it's value to position the card. `animation.setValue({ x: gesture.dx, y: gesture.dy })` will take `dx` and `dry` and set it to `x` and `y` of the card.

Now, what will happen once the user leaves the card. There can be two cases:

It's either the card is the past threshold or not. If the `dx` is greater than the threshold, we will take the swipe velocity `vx` and make the card go in the same direction with decay in speed. Thus card will keep moving out of the screen until the speed is decayed to 0 and will finally unmount. `clamp` module will see if the velocity is between 4 and 5 and apply floor function so that it always has needed speed to slide.

While the top card is sliding out of the screen, we will also animate the scale property to 1 giving the next card pop up to the front effect. These two animations will run in parallel.

If the `dx` is less than the threshold, we will apply a spring animation and bring the card back to its initial position.

Now, we will have to reset the animation value for the next transition.

## Step 4. Setup Transition to Next Card

You might have noticed that we are calling `transitionNext` function after the `Animation.parallel()` in the section above. Let's see what's happening there:

```js
const transitionNext = function () {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setData((data) => {
        return data.slice(1)
      });
    });
 };
```

Two things are happening in parallel here. One is changing the opacity of the top card to 0 so that it disappears at some point while sliding out of the screen. The other is scaling the next card back to 1 with a spring animation. This is what will give us that pop-up effect.

Finally, once this parallel animation is complete. We will slice the top card from the array. This will make the 2nd card top and 3rd one its next card. Our transition is complete but wait, what about those `animation`, `opacity`, and `scale` properties 🤔. Those 3 variables still contain the updated value. We need to reset them somehow.

We can use an `effect` hook add `data` as it's dependency. Every time the `data` will change, the hook will reset the value.

```js
useEffect(() => {
 scale.setValue(0.9);
 opacity.setValue(1);
 animation.setValue({ x: 0, y: 0 });
}, [data]);
```

Perfect, but we haven't applied the styles yet. Let's get it done next.

## Step 5. Setup Animated Styles

The top card and the next card will receive different styles. Also, the `PanResponder` will be set up on the top card only. We will check the cards and apply the respective styles.

`scale`, `opacity`, and `position` can be applied directly but what about the rotation? Our card has to rotate while we are swiping too. We can use interpolation on the `animation` property here.

```js
  return (
    <View style={styles.container}>
      {data
        .slice(0, 2)
        .reverse()
        .map((item, index, items) => {
          // check if it's top card
          const isLastItem = index === items.length - 1;
          // apply panHandlers if it's top card
          const panHandlers = isLastItem ? { ..._panResponder.panHandlers } : {};
          // check if it's next card
          const isSecondToLast = index === items.length - 2;
          // rotate from -30 degree to +30 degree for swipe distance of -200 to +200
          const rotate = animation.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-30deg', '0deg', '30deg'],
            extrapolate: 'clamp', // make sure the rotation doesn't go beyong 30 degrees.
          });

          // prepare card styles
          const animatedCardStyles = {
            transform: [{ rotate }, ...animation.getTranslateTransform()],
            opacity,
          };
          const cardStyle = isLastItem ? animatedCardStyles : undefined;
          const nextStyle = isSecondToLast
            ? { transform: [{ scale: scale }], borderRadius: 5 }
            : undefined;

          return (
            <Animated.View
              {...panHandlers}
              style={[styles.card, cardStyle, nextStyle]}  // apply styles
              key={item.id}>
              <View style ={styles.imageContainer}>
                <Image resizeMode="cover" source={item.image} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.animalText}>{item.animal}</Text>
              </View>
            </Animated.View>
          );
        })}
    </View>
  );
```

## Step 6. Decouple into Reusable Hook

Our animation depends on a bunch of things here. The data itself changes along with `animation`, `opacity`, and `scale` values. And these things are tightly coupled with `PanResponder`. So that's all these out in a hook.

```js
// Create `useTinderCard` hook
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Animated, PanResponder, Text, Platform, Dimensions, Image } from 'react-native';
import clamp from 'clamp';
const { width } = Dimensions.get('screen');

const SWIPE_THRESHOLD = 0.25 * width;

export default function useTinderCard (deck) {
  const [data, setData] = useState(deck);

  const animation = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  const transitionNext = function () {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setData((data) => {
        return data.slice(1)
      });
    });
  };

  useEffect(() => {
    scale.setValue(0.9);
    opacity.setValue(1);
    animation.setValue({ x: 0, y: 0 });
  }, [data])

  const _panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animation.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (e, { dx, dy, vx, vy }) => {
        let velocity;
        if (vx >= 0) {
          velocity = clamp(vx, 4, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 4, 5) * -1;
        }
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.parallel([
            Animated.decay(animation, {
              velocity: { x: velocity, y: vy },
              deceleration: 0.99,
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              friction: 4,
              useNativeDriver: false,
            }),
          ]).start(transitionNext);
          if (velocity > 0) {
            // handleRightDecay();
          } else {
            // handleLeftDecay();
          }
        } else {
          Animated.spring(animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
  return [data, _panResponder, animation, scale, opacity];
}
```

Nothing fancy here, just copy-paste. Now, import the hook and get the values.

```js
// other imports
import useTinderCard from './useTinderCard';

function App() {
  // passing deck array as initial data
  const [data, _panResponder, animation, scale, opacity] = useTinderCard([
    {
      image: Bobo,
      id: 1,
      name: "Bobo",
      animal: 'Cat',
    },
    {
      image: Dolly,
      id: 2,
      name: "Dolly",
      animal: 'Dog',
    },
    {
      image: Giraffe,
      id: 3,
      name: "Milo",
      animal: 'Giraffe',
    },
    {
      image: Goat,
      id: 4,
      name: "Ollie",
      animal: 'Goat'
    },
  ]);

  return (
    <View style={styles.container}>
      {data
        .slice(0, 2)
        .reverse()
        .map((item, index, items) => {
          const isLastItem = index === items.length - 1;
          const panHandlers = isLastItem ? { ..._panResponder.panHandlers } : {};
          const isSecondToLast = index === items.length - 2;
          const rotate = animation.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-30deg', '0deg', '30deg'],
            extrapolate: 'clamp',
          });

          const animatedCardStyles = {
            transform: [{ rotate }, ...animation.getTranslateTransform()],
            opacity,
          };

          const cardStyle = isLastItem ? animatedCardStyles : undefined;
          const nextStyle = isSecondToLast
            ? { transform: [{ scale: scale }], borderRadius: 5 }
            : undefined;

          return (
            <Animated.View
              {...panHandlers}
              style={[styles.card, cardStyle, nextStyle]}
              key={item.id}>
              <View style ={styles.imageContainer}>
                <Image resizeMode="cover" source={item.image} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.animalText}>{item.animal}</Text>
              </View>
            </Animated.View>
          );
        })}
    </View>
  );
}
```

Other things remain the same. You can also directly return styles and apply them. Both ways are just fine. 