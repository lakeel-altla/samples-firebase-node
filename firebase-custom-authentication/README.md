# Firebase Custom Authentication

## Discription
This is a custom authentication server for Andorid applications to access two different Firebase projects.

## Required  

1. Ceate Firebase projects  
First, must create two Firebase projects.
Please refer to [here](https://github.com/lakeel-altla/samples-firebase-android/tree/master/firebase-custom-authentication#required).  

1. Create service accounts  
This server needs to access two different Firebase. So, must create the service accounts for accessing both Firebase. 
Create service accounts as described in Adding Firebase to your Server and drop the file in this directory.  
Please refer to the following link.  
[Add Firebase to your app](https://firebase.google.com/docs/admin/setup)  
After create the service accounts, drop the files in ```/certs``` directory.  

## Getting Started  

### Change values in ```auth.js```  

- ```<Your app name>```  
Set your app name.  
You can see the app name on the Firebase project settings screen.  

- ```<Your primary service account name>```  
Set service account path of the primary Firebase project.  

- ```<Your secondary service account name>```  
Set service account path of the secondary Firebase project.  

### Install node modules  
Run ```npm install```.

### Run app  
Run ```node app.js``` to run the Node.js app locally.
