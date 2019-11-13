Step 1:
Render a container circle with grey background color
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
Render a half circle

Step 3:
Render another half circle on top of it

Step 4:
Render another half circle and place it at left side

Step 5:
Render a smaller inner circle with background color
