# Spreezy Frontend

This module contains all the necessary logic for spreezy frontend application.

## Details

- Github - [Spreezy Frontend REPO](https://github.com/spreezy-tech/spreezy-frontend/tree/develop/)
- CI/CD - [Spreezy Build Pipeline]()

## Components Required

- **Angular Framework** : Angular 16 is used for app development. [[Angular Documentation]](https://angular.io/guide/developer-guide-overview)
- **Cypress Testing Framework** : for testing components and e2e tests.[[Cypress Documentation]](https://docs.cypress.io/guides/overview/why-cypress)
- **Tailwind CSS** : to easily style components.[[Tailwind Documentation]](https://v2.tailwindcss.com/docs)
- **Ripple UI** : UI component library used for Spreezy.[[RippleUI Documentation]](https://www.ripple-ui.com/docs/get-started/usage)
- **Ionic Capacitor** : for cross-platform app development. This converts the angular code into native android and ios binaries.[[Capacitor Documentation]](https://capacitorjs.com/docs)
- **Android Command Line Tools** : to create andorid builds / APKs and deploy applications to Play-store.[[Android CLI Documentation]](https://developer.android.com/tools)
- **XCode** : Yet to setup and test builds for iOS app.
- **Git** : to commit and push changes to Bitbucket.
- **Visual Studio Code** : for code development.
- **Spreezy Docs** : Required documentation to update or resolve any issues. [[Spreezy Documentation]]()

## How do I get set up?

### **Code Setup :-**

- Download Visual Studio Code from `https://code.visualstudio.com`. Download mentioned extensions for vscode.
  - GitLens - to view git related information.
  - Prettier - to format code. Configure it to format the code everytime you save it from the vscode configurations.
  - Tailwind CSS Intellisense - to view tailwind css utility classes.
  - ESLint - for code linting and modifications.
- Download and setup Angular (v16), NPM (latest), Node.js (v20).
- Clone this repository using <br/>`git clone -b develop https://github.com/spreezy-tech/spreezy-frontend.git`
- Run `npm install` in root directory of project, which will download required dependencies from package.json file present inside it.

### **Configuration :-**

- Configure below in your .npmrc file.
  - registry=`https://registry.npmjs.org/`
- Configure viewports in your browser(Chrome, Edge). Go to inspect -> Dimensions (on the top left) -> Edit -> Add custom emulated device :-
  - **User String** --> Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36
  - **Device pixel ratio** -->
  - **Viewports** -->
    - 360 \* 800
    - 393 \* 878
    - 360 \* 760
    - 385 \* 854
    - 393 \* 851
- Module based development structure as been used in the module. To create a new screen use below commands. Since we are using Tailwind (for CSS) & Cypress (for testing), we are not creating spec files and css files.
  <pre>ng generate module screens/<b>screen-name</b> --routing</pre>
  <pre><code>ng generate component screens/<b>screen-name</b> --module=screens/<b>screen-name</b>/<b>screen-name</b>.module.ts -s --skip-tests</code></pre>
- To enable a screen to be display - the module route first needs to be setup under app-routing.module.ts. Further the respective component path needs to be setup under respective routing module.
- Global CSS changes like font addition, theme update, etc should be done in tailwind.config.js.
- Everytime there are changes to tailwind.config.js, CSS has to be regenerated to reflect the changes when screens are rendered. Use the command
  - npx tailwindcss build src/styles.css

### **Debugging Configuration :-**

- Copy the launch.json file to your .vscode folder. Currently chrome configurations have been added.
- Add your configurations as per the browser you have installed.
- Run debug and test it out with a breakpoint.

### **How to run tests :-**

- For testing we are using testing framework called Cypress which will be used for component level as well as e2e tests.
- To execute test cases, from root directory use the below commands :-
  - **CMD Line** : npx cypress run
  - **Interative mode** : npx cypress open
  
### **Java Setup [Prerequisite]:-**

- We need Java JDK 17 for this project. Using the terminal do the following: <pre><code>sudo apt update</code></pre> and <pre><code>sudo apt install openjdk-17-jdk</code></pre>
- Update the config file so the default JDK is set to 17 (if any other Java versions present) <pre><code>sudo update-alternatives --config java</code></pre>
  - Reference:
![Screenshot from 2024-08-09 10-50-39](https://github.com/user-attachments/assets/3c0578c7-3e86-4a1c-b9bc-dbb042dd656b)
    
	- In this case we input **1** as selection number (since Java 17 is required)
	- Do the same for Java Compiler <pre><code>sudo update-alternatives --config javac</code></pre>
- It should now show ver.17 <pre><code>java --version</code></pre>
- In terminal, put <pre><code>nano ~/.bashrc</code></pre> 
	**At the end of the file**, put the below arguments to set the environment variables, Save and Exit:<br>
	<pre>export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64</pre>
	<pre>export PATH=$JAVA_HOME/bin:$PATH</pre>
- Do this in terminal to set the variables correctly <pre><code>source ~/.bashrc</code></pre>

### **Android SDK Setup [Prerequisite]:-**

- Download Latest **Command-line tools** from Android Studio Website **(usually listed at the bottom of the page)** - https://developer.android.com/studio#downloads

- ![Screenshot from 2024-08-11 19-18-48](https://github.com/user-attachments/assets/105e1d5b-8d88-489f-8436-ad9b62bb49f1)

- Go to the Downloads folder and rename the downloaded zip to 'cli.zip'
- Open terminal in the Downloads folder and run the following commands:
	<pre><code>mkdir -p ~/Android/cmdline-tools</code></pre>
	<pre><code>unzip cli.zip -d ~/Android/cmdline-tools</code></pre>
- Android CLI requires cmdline-tools to be renamed to 'latest' so we run the following command:
	<pre><code>mv ~/Android/cmdline-tools/cmdline-tools ~/Android/cmdline-tools/latest</code></pre>
- Open Bashrc at new terminal 
	<pre><code>nano ~/.bashrc</code></pre>
- Add the following lines at the end of the file, save and exit:
	<pre>export ANDROID_HOME=$HOME/Downloads/Android</pre>
	<pre>export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$PATH</pre>
	<pre>export PATH=$ANDROID_HOME/platform-tools:$PATH</pre>
- Reload the bashrc using terminal:
	<pre><code>source ~/.bashrc</code></pre>
- We need to install these tools through sdkmanager. Now in terminal, run the following commands:
	<pre><code>sdkmanager "build-tools;34.0.0" "emulator" "platform-tools" "platforms;android-35"</code></pre>
- After installing the above tools, do:
	<pre><code>sdkmanager --licenses</code></pre>
	and accept all the licenses.

### **Build & Deployment instructions :-**

- Update the below property in respective environment `environment.<env>.ts` file. 
```
  apiGateway: "http://<ip-of-your-machine>:8083"
``` 
- To build the application use : (production, development)<pre><code>ng build --configuration `<environment>`</code></pre>
- Check in your root folder if android and ios folders are present. If not present, use - <pre><code>npx cap add android && npx cap add ios</code></pre>
- **Only for Local Development** - To allow HTTP traffic on the Android app once it is installed and connect to docker containers on your machine, add below property in ``android/app/src/main/AndroidManifest.xml``
```
<application
        ....
        android:usesCleartextTraffic="true"
        ....
        >
```
- Create a a file under newly created android/local.properties. Add this <pre>java.home=/usr/lib/jvm/java-17-openjdk-amd64</pre> and the path to your android CLI SDK <pre>sdk.dir=`<path-to-your-android-cli-directory>`/Android</pre> (inside Android folder, all the tools like build-tools, platform-tools, cmdline-tools, emulator, should be present)<br><br>	
- Once the build is complete, need to sync the android and ios binaries using capacitor. use - <pre><code>npx cap sync</code></pre>
- After syncing the android binaries, from root directory execute mentioned cmd to create the APK - <pre><code>cd android && ./gradlew assembleDebug && cd ..</code></pre>
- The app should be present in the android/app/build/outputs/apk/debug/app-debug.apk

- To control Jenkins pipeline stages, update the .jenkins-config.json file in the root folder.
- Set values to **true** only at the time of **release**, otherwise keep them **false**:

- To enable the **Codecut** stage:
  ```json
  "codecutprofile": true

- To enable **Signed AAB build and upload** stage:
  ```json
  "runSignedAab": true

## Contribution guidelines

- **Writing code**
  - The code should always be formatted before committing.
  - Use appropriate variable name.
- **Writing tests**

  - Write clear and proper description for the tests.
  - Tests should be formatted as well.

- **Code review**

  - Code needs to be reviewed by atleast 2 team members.
  - Appropriate comments should be left where changes are required.
  - All tests should be executed before a PR has been raised.
  - Test report needs to be attached to the PR.

- Other guidelines
  - Any new changes need to be appropriately documented within the README.md file or in [Spreezy Documentation]()

## Who do I talk to?

- **Admin** - Sarthak Gophane
