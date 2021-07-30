# ionic-demo-agent

This demo app demonstrates how `cordova-plugin-yellowinbox` can be integrated in a ionic app

`YMAgentSdk` can be found at [https://github.com/yellowmessenger/cordova-plugin-yellowinbox](https://github.com/yellowmessenger/cordova-plugin-yellowinbox)

## Steps to run

1. Clone this `YMAgentSdkDemo` app
2. clone the `YMAgentSdk` from [https://github.com/PurushYM/YMAgentSdk](https://github.com/PurushYM/YMAgentSdk)
3. keep both projects at same folder level

   ```
   exampleFolder
   |
   |- YMAgentSdk
   |- YmAgentSdkDemo

   ```

4. Open terminal and navigate to `YMAgentSdkDemo` folder
5. Run the following command to activate android platform
   ```
   ionic cordova platform add android
   ```
6. Run following command to install YMAgentSdk to demo project
   ```
   ionic cordova add ../YMAgentSdk
   ```
7. Run following command to run application on android
   ```
    ionic cordova run android
   ```

## Links

Documentation on YMAgentSdkIonic - https://docs.google.com/document/d/1OSyQvOIfyUtYk3KAD0R-noWovnBABhcwawFVF9Iy1dA/edit#
