# Chestnut
* Simple spending tracker built in React Native
* Habit research shows that the best way to stay on a budget is to manually track each expense as it happens. The existing online spending trackers automatically connect with your accounts, so while it gives a good picture at the end of the month, it doesn't help influence your behavior. 

## Screen Shots
<p float="left">
    <img src="https://github.com/sampocs/chestnut/blob/main/assets/screen-shots/splash.png" width="200" height="430"/>
    <img src="https://github.com/sampocs/chestnut/blob/main/assets/screen-shots/main.jpeg" width="200" height="430"/>
    <img src="https://github.com/sampocs/chestnut/blob/main/assets/screen-shots/history.jpeg" width="200" height="430"/>
</p>
<p float="left">
    <img src="https://github.com/sampocs/chestnut/blob/main/assets/screen-shots/remove.jpeg" width="200" height="430"/>
    <img src="https://github.com/sampocs/chestnut/blob/main/assets/screen-shots/budget.jpeg" width="200" height="430"/>
</p>

## Development
* Open `chestnut.xcworkspace` and click the play button

## Building an Archive
* DISCLAIMER: You must have a membership with the Apple Developer Program in order to install this app
* Follow these [steps](https://developer.apple.com/documentation/xcode/distributing-your-app-to-registered-devices) to and follow instructions to create a certificate and sign 
* Open `chestnut.xcworkspace`
* Remove `libRNReactNativeHapticFeedback.a` from `Link Binary with Libraries` (under `Build Phases`)
    * For some reason, this was needed in to build the app but threw an error when trying to build an Archive
* Confirm build version on main screen
* Create an Archive 
    * Connect your device and select it from the target bar at the top 
    * Go to `Product` -> `Archive`

## Distributing via USB
* Click `Distribute App` and then `Ad Hoc`
* Use Apple Configurator 2 to upload the `.ipa` file to the device 

## Distributing via TestFlight
* Click `Distribute App` and then `App Store Connect`
* Click `Upload`
* It will take ~15 minutes for the new build to show up in `apple.developer.com`
    * When asked whether the app uses encryption, select "no"
