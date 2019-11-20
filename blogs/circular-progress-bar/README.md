## How does three circles work
Their working depends on the percentage we are passing. Let's see the two possible case: 

## If percent is less than 50.

### 1. First Circle
First circle is initialised with a 180 value and taking up right portion of the outer circle. It's background color is set to activeColor (purple).  
//image

### 2. Second Circle
Second circle is rendered on top of first circle with backgroundColor equal to outer circle making it invisible. As it is rendered on of first circle hence first circle is also not visible. When user clicks to animate, we are slowly rotating the outer circle which is reveiling First circle (voilet) from behind.
Note: First circle is not moving at all. We are rotating second circle to show the purple circle behind.  
//gif

### 3. Third Circle
Initially, it is taking the complete left portion of the outcircle having color similar to background.
Remember, second circle is moving clockwise and taking some of the left portion of the circle. Hence, third circle has higher elevation which is enabling it to overlap the extra second circle on left side.

//gif

## If percent is greater than 50.

### 1. First Circle
Both first and second circle are initialised with value 0 so ther e is nothing on right half initially. First cirle is taking left portion of circle and it will slowly rotate to cover the right part from 0 to 180 degrees. This covers the rotation for 50%. Now second circle takes over to complete the remaining rotation.

### 2. Second circle
Remember, second circle is also covering the left half of cirle having purple color same as First cirle. But it is hidden because the third circle is on top of it. I will add a yellow shade to third circle just to show you clearly. This image is at 50% completion of animation.

//image yellow left purple right  

Both First and Second circle rotate to cover the right half of the outer circle. First circle's job is to take upto 50% of progress and then the second circle will rotate some more to cover the remaining percentage.
I have made second circle semi-transparent to show you how it's actually working. (third circle is removed for simplicity)
//gif

So 50% area covered by first circle and 20% area covered by second circle adds up to complete the animation. But wait, what about third one? It is still on top of second one and we can't see the second circle which is hidden. Let's see what our third circle is doing.

## 3. Third circle.
We will rotate third circle along with second for same degree clockwise. It will leave space so that Second circle can become visible. To show clearly, third circle is yellow.
//gif
You see the problem here? As our third circle rotate clockwise, it takes some portion of the right half of outer circle and overlays the first circle (higher elevation, remember?).   
Solution is simple and you might have guessed it already. Toggle the elevation value so it goes inside the first circle.   
First circle is semi-transparent right now so you can see what's happening. After toggling elevation: 
//gif   

Let's correct the colors and see our final animation.  
//gif

## inner circle
Now, the last part is to add a inner circle on top of everything. Now our view starts lookinig a progress bar.

# Let's code

Step 1:
Render a container circle with a gray color background. It is our base, and it will contain the other three semicircles.
```javascript
<View
  style={[
    styles.outerCircle,
    {
      height: radius * 2,
      width: radius * 2,
      borderRadius: radius,
      backgroundColor: passiveColor,
    },
  ]}
/>
```

Step 2:
Render a semicircle, and it will take the right half of our base circle.
We are going to render three semicircles, so let's write a helper function to make our job easier.
```javascript
const renderHalf = (color, transforms = [], otherStyles = {}) => (
    <Animated.View
      style={[
        styles.half,
        { backgroundColor: color, borderColor: color },
        { width: radius, height: radius * 2, borderRadius: radius },
        {
          transform: [
            { translateX: radius / 2 },
            ...transforms,
            { translateX: -radius / 2 },
            { scale: 1.004 },
          ],
        },
        otherStyles,
      ]}
    >
    //children
    </Animated.View>
  );
```
It takes a color prop and a transform prop to rotate the circle clockwise. Let's not worry about the logic right now and call this function to render our first semicircle.
```js
{renderHalf(activeColor, [{ rotate: rotate1 }])}
```

rotation logic
```js
const rotate1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1deg'],
  });
```


Step 3:
Render another half circle on top of it. For clearity I am adding yellow color for now. 
```js
{renderHalf('yellow', [{ rotate: rotate2 }])}
```

Step 4:
Render another half circle and place it at left side

Step 5:
Render a smaller inner circle with background color
