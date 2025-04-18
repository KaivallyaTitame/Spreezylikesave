pipeline 
{ 
        agent {
        docker {
             image 'cypress/base:18.16.0'
            // args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }


    parameters
    { 
        gitParameter branchFilter: 'origin/(.*)', defaultValue: 'develop', name: 'branch_name', type: 'PT_BRANCH' ,description: 'Please Choose Branch Name to Build '
    }
    
    environment {
        GIT_URL = 'git@github.com:spreezy-tech/spreezy-frontend.git'
        GIT_BRANCH = "${params.branch_name}"
        CREDENTIALS_ID = 'spreezy_credentials'
        JAVA_HOME = '/usr/lib/jvm/openjdk-17'
        PATH = "${JAVA_HOME}/bin:${PATH}"
        EMAIL_FROM = 'jenkins@spreezy.in'
        EMAIL_TO = 'spreezyindia@gmail.com'
        EMAIL_SUBJECT = 'Spreezy Frontend Project  Build -  '
        EMAIL_BODY = 'Spreezy Frontend Project Build Number  '
        SONAR_HOST_URL='http://103.105.111.78:6842'
        SONAR_TOKEN=credentials('sonarqube')
         SONAR_HOME = tool 'sonar-scanner'  
    }
    
     stages{
         
        stage('Clone Git Repo'){
            steps{
             git branch: env.GIT_BRANCH, credentialsId: env.CREDENTIALS_ID, url: env.GIT_URL
            }
        }
        

        stage('Nexus Setup And Install All Dependencies'){
            steps{
                
                withCredentials([file(credentialsId: 'nexus_npm_credentials', variable: 'npm_nexus_credentials')]) {
                 sh '''
                    npm config set fetch-timeout 600000
                    npm config set fetch-retries 2
                    npm install --userconfig ${npm_nexus_credentials} --registry https://nexus.spreezy.in/repository/npm-group/ --loglevel verbose
                '''                
                }
            }
        }
        

        
        // stage('Run Tests'){
        //     steps {
        //     sh 'npm start &'

        //     // Wait for Angular application to start
        //     sh 'npx wait-on http://localhost:4200'

        //     // Run Cypress tests
        //     sh 'NO_COLOR=1 npm run test'
        //     sh 'npm run test:coverage'


        //     sh 'pkill -f "npm start"'

        //     }
        // }
        

        //  stage('sonarQube-analysis') {
        //     steps {
        //         withSonarQubeEnv('sonar-scanner') { // Ensure 'sonar-scanner' matches the name configured in Jenkins
        //             script {
        //                 sh """
        //                     /var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonar-scanner/bin/sonar-scanner \
        //                     -Dsonar.projectKey=frontend-project \
        //                     -Dsonar.projectName="Frontend Project" \
        //                     -Dsonar.sources=. \
        //                     -Dsonar.host.url=${SONAR_HOST_URL} \
        //                     -Dsonar.login=${SONAR_TOKEN} \
        //                     -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
        //                     -Dsonar.exclusions=node_modules/**,dist/**,**/*.spec.ts \
        //                     -Dsonar.sourceEncoding=UTF-8
        //                 """
        //             }
        //         }
        //     }
        // }

        stage('Build Project') {
            steps {
                sh 'npm run build-uat'
            }
        }
        
        stage('Generate APK'){
            steps{
              sh 'npx cap add android'
              sh 'echo "sdk.dir=/usr/local/android/sdk" > ./android/local.properties'
              sh 'npx cap sync'
              sh 'npm run apk-debug'
            }
        }

        // stage('Upload APK to Nexus') {
        //     steps {
        //         sh '''
        //             echo "Installing curl..."
        //             apt-get update && apt-get install -y curl

        //             echo "Preparing APK directory..."
        //             mkdir -p only-apk-releases
        //             find ./android/app/build/outputs/apk/ -name "*.apk" -exec cp {} ./only-apk-releases/ \\;

        //             echo "Contents of apk-releases directory:"
        //             ls -lh only-apk-releases/
        //         '''

        //         // Extract version from package.json
        //         script {
        //             def version = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()
        //             env.APP_VERSION = version
        //         }

        //         // Rename APK to spreezy-<version>.apk
        //         sh '''
        //             for apk in only-apk-releases/*.apk; do
        //                 mv "$apk" "only-apk-releases/spreezy-${APP_VERSION}.apk"
        //             done

        //             echo "Contents of apk-releases directory:"
        //             ls -lh only-apk-releases/
        //         '''

        //         // Upload to Nexus raw repo
        //         withCredentials([usernamePassword(credentialsId: 'nexus_apk_credentials', usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASS')]) {
        //             sh '''
        //                 for apk in only-apk-releases/*.apk; do
        //                     FILENAME=$(basename "$apk")
        //                     VERSION_DIR="spreezy-${APP_VERSION}"
        //                     echo "Uploading $FILENAME to Nexus under $VERSION_DIR..."
        //                     curl -f -u $NEXUS_USER:$NEXUS_PASS \
        //                         --upload-file "$apk" \
        //                         "https://nexus.spreezy.in/repository/apk-release/${VERSION_DIR}/${FILENAME}"
        //                 done
        //             '''
        //         }
        //     }
        // }


        
        // stage('Publish ZIP-APK on Nexus Repo  '){
        //     steps{
        //         sh 'mkdir apk-releases'
        //         sh 'cp -r  ./android/app/build/outputs/apk/* ./apk-releases/'
        //         withCredentials([file(credentialsId: 'nexus_npm_credentials', variable: 'npm_nexus_credentials')]) {
        //          sh "npm publish --userconfig ${npm_nexus_credentials} --registry https://nexus.spreezy.in/repository/npm-hosted/ --loglevel verbose"                }

        //     }
        // }

        // stage('Generate and Upload AAB to Nexus') {
        //     steps {
        //         script {
        //             def version = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()
        //             env.APP_VERSION = version
        //         }

        //         sh '''
        //             echo "Installing curl..."
        //             apt-get update && apt-get install -y curl

        //             echo "Setting up local.properties..."
        //             echo "sdk.dir=/usr/local/android/sdk" > ./android/local.properties

        //             echo "Building AAB..."
        //             cd android
        //             ./gradlew clean bundleRelease
        //             cd ..

        //             echo "Preparing AAB output directory..."
        //             mkdir -p only-aab-releases

        //             echo "Renaming and copying AAB..."
        //             cp android/app/build/outputs/bundle/release/app-release.aab "only-aab-releases/spreezy-${APP_VERSION}.aab"

        //             echo "Generated AAB: spreezy-${APP_VERSION}.aab"
        //             ls -lh only-aab-releases/
        //         '''

        //         withCredentials([usernamePassword(credentialsId: 'nexus_apk_credentials', usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASS')]) {
        //             sh '''
        //                 AAB_FILE="only-aab-releases/spreezy-${APP_VERSION}.aab"
        //                 VERSION_DIR="spreezy-${APP_VERSION}"

        //                 echo "Uploading $AAB_FILE to Nexus at path: $VERSION_DIR/$(basename $AAB_FILE)..."

        //                 curl -f -u $NEXUS_USER:$NEXUS_PASS \
        //                 --upload-file "$AAB_FILE" \
        //                 "https://nexus.spreezy.in/repository/apk-release/${VERSION_DIR}/$(basename $AAB_FILE)"
        //             '''
        //         }
        //     }
        // }

        // stage('Generate and Publish Signed AAB') {
        //     environment {
        //         ANDROID_KEY_ALIAS = 'spreezy-key-alias'
        //     }
        //     steps {
        //         script {
        //             def version = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()
        //             env.APP_VERSION = version
        //         }
        //         withCredentials([
        //         file(credentialsId: 'spreezy-keystore', variable: 'KEYSTORE_FILE'),
        //         string(credentialsId: 'spreezy-keystore-pass', variable: 'KEYSTORE_PASSWORD'),
        //         string(credentialsId: 'spreezy-key-pass', variable: 'KEY_PASSWORD'),
        //         usernamePassword(credentialsId: 'nexus_apk_credentials', usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASS')
        //         ]) {

        //         sh '''
        //             echo "Installing curl..."
        //             apt-get update && apt-get install -y curl
        //             echo "Setting up local.properties with SDK path..."
        //             echo "sdk.dir=/usr/local/android/sdk" > android/local.properties

        //             echo "Configuring signing config in gradle.properties..."
        //             echo "MYAPP_UPLOAD_STORE_FILE=${KEYSTORE_FILE}" > android/gradle.properties
        //             echo "MYAPP_UPLOAD_KEY_ALIAS=${ANDROID_KEY_ALIAS}" >> android/gradle.properties
        //             echo "MYAPP_UPLOAD_STORE_PASSWORD=${KEYSTORE_PASSWORD}" >> android/gradle.properties
        //             echo "MYAPP_UPLOAD_KEY_PASSWORD=${KEY_PASSWORD}" >> android/gradle.properties

        //             echo "android.useAndroidX=true" >> android/gradle.properties
        //             echo "android.enableJetifier=true" >> android/gradle.properties

        //             echo "Syncing Capacitor..."
        //             npx cap sync android

        //             echo "Building Signed AAB..."
        //             cd android && ./gradlew bundleRelease

        //             echo "Preparing AAB output directory..."
        //             mkdir -p only-aab-releases

        //             echo "Renaming and copying AAB..."
        //             cp app/build/outputs/bundle/release/app-release.aab "only-aab-releases/spreezy-${APP_VERSION}.aab"

        //             echo "Generated AAB: spreezy-${APP_VERSION}.aab"
        //             ls -lh only-aab-releases/

        //             AAB_FILE="only-aab-releases/spreezy-${APP_VERSION}.aab"
        //             VERSION_DIR="spreezy-${APP_VERSION}"

        //             echo "Uploading $AAB_FILE to Nexus at path: $VERSION_DIR/$(basename $AAB_FILE)..."

        //             curl -f -u $NEXUS_USER:$NEXUS_PASS \
        //             --upload-file "$AAB_FILE" \
        //             "https://nexus.spreezy.in/repository/apk-release/${VERSION_DIR}/$(basename $AAB_FILE)"
        //         '''
        //         }
        //     }
        //     }
        stage('Generate and Publish Signed AAB') {
            environment {
                ANDROID_KEY_ALIAS = 'spreezy-key-alias'
            }
            steps {
                script {
                    def version = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()
                    env.APP_VERSION = version
                }
                withCredentials([
                    file(credentialsId: 'spreezy-keystore', variable: 'KEYSTORE_FILE'),
                    string(credentialsId: 'spreezy-keystore-pass', variable: 'KEYSTORE_PASSWORD'),
                    string(credentialsId: 'spreezy-key-pass', variable: 'KEY_PASSWORD'),
                    usernamePassword(credentialsId: 'nexus_apk_credentials', usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASS')
                ]) {
                    sh '''
                        echo "Installing curl..."
                        apt-get update && apt-get install -y curl

                        echo "Setting up local.properties..."
                        echo "sdk.dir=/usr/local/android/sdk" > android/local.properties

                        echo "Configuring gradle.properties for signing..."
                        echo "MYAPP_UPLOAD_STORE_FILE=${KEYSTORE_FILE}" > android/gradle.properties
                        echo "MYAPP_UPLOAD_KEY_ALIAS=${ANDROID_KEY_ALIAS}" >> android/gradle.properties
                        echo "MYAPP_UPLOAD_STORE_PASSWORD=${KEYSTORE_PASSWORD}" >> android/gradle.properties
                        echo "MYAPP_UPLOAD_KEY_PASSWORD=${KEY_PASSWORD}" >> android/gradle.properties
                        echo "android.useAndroidX=true" >> android/gradle.properties
                        echo "android.enableJetifier=true" >> android/gradle.properties

                        echo "Injecting signing config into build.gradle..."
                        SIGNING_CONFIG_BLOCK="\\
        def MYAPP_UPLOAD_STORE_FILE = project.hasProperty('MYAPP_UPLOAD_STORE_FILE') ? file(project.MYAPP_UPLOAD_STORE_FILE) : null\\n\
        def MYAPP_UPLOAD_KEY_ALIAS = project.hasProperty('MYAPP_UPLOAD_KEY_ALIAS') ? project.MYAPP_UPLOAD_KEY_ALIAS : null\\n\
        def MYAPP_UPLOAD_STORE_PASSWORD = project.hasProperty('MYAPP_UPLOAD_STORE_PASSWORD') ? project.MYAPP_UPLOAD_STORE_PASSWORD : null\\n\
        def MYAPP_UPLOAD_KEY_PASSWORD = project.hasProperty('MYAPP_UPLOAD_KEY_PASSWORD') ? project.MYAPP_UPLOAD_KEY_PASSWORD : null\\n\
        "

                        sed -i "1s;^;$SIGNING_CONFIG_BLOCK\\n;" android/app/build.gradle

                        echo "Adding signingConfigs and assigning it to release..."
                        sed -i "/android {/a \\
            signingConfigs {\\n\
                release {\\n\
                    storeFile MYAPP_UPLOAD_STORE_FILE\\n\
                    storePassword MYAPP_UPLOAD_STORE_PASSWORD\\n\
                    keyAlias MYAPP_UPLOAD_KEY_ALIAS\\n\
                    keyPassword MYAPP_UPLOAD_KEY_PASSWORD\\n\
                }\\n\
            }" android/app/build.gradle

                        sed -i "/buildTypes {/a \\
                release {\\n\
                    signingConfig signingConfigs.release\\n\
                    minifyEnabled false\\n\
                    shrinkResources false\\n\
                    proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'\\n\
                }" android/app/build.gradle

                        echo "Syncing Capacitor..."
                        npx cap sync android

                        echo "Building Signed AAB..."
                        cd android && ./gradlew bundleRelease

                        echo "Preparing AAB output directory..."
                        mkdir -p only-aab-releases

                        echo "Copying signed AAB..."
                        cp app/build/outputs/bundle/release/app-release.aab "only-aab-releases/spreezy-${APP_VERSION}.aab"

                        echo "Generated AAB: spreezy-${APP_VERSION}.aab"
                        ls -lh only-aab-releases/

                        AAB_FILE="only-aab-releases/spreezy-${APP_VERSION}.aab"
                        VERSION_DIR="spreezy-${APP_VERSION}"

                        echo "Uploading $AAB_FILE to Nexus at path: $VERSION_DIR/$(basename $AAB_FILE)..."

                        curl -f -u $NEXUS_USER:$NEXUS_PASS \
                            --upload-file "$AAB_FILE" \
                            "https://nexus.spreezy.in/repository/apk-release/${VERSION_DIR}/$(basename $AAB_FILE)"
                    '''
                }
            }
        }



        
        // stage('Notify  Build Success '){
        //     steps{
        //         echo "Build completed successfully"
        //     }
        //     post {
        //         success {
        //             script {
        //                 def buildNumber = currentBuild.number
        //                 def buildStatus = currentBuild.result
        //                 def buildStatusLabel = buildStatus == 'SUCCESS' ? 'successful' : 'failed'
        //                 def globalUpdatedBody = "<b>${EMAIL_BODY} ${buildNumber} . <br><br> Build Status - ${buildStatusLabel} .<br><br>  Please find Console Log Output of Build Number ${buildNumber} in build.log File</b>"
        //                 def globalUpdatedSubject = "${EMAIL_SUBJECT} ${buildStatusLabel}"
                        
        //                 emailext attachLog: true, body: globalUpdatedBody, subject: globalUpdatedSubject, to: env.EMAIL_TO, from: env.EMAIL_FROM, mimeType: 'text/html'
        //             }
        //         }
        //     }
        // }

        


    }
     
  post{
        always{
            // publishHTML(target: [allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'coverage/lcov-report', reportFiles: 'index.html', reportName: 'Code Coverage Report'])

            // slackSend channel: 'devops-jenkins-updates', message: "Please find status of pipeline here Status - ${currentBuild.currentResult}  ${env.JOB_NAME}   Build Number ${env.BUILD_NUMBER}  URL ${env.BUILD_URL}"   
            //clean workspace after every build
            cleanWs()
        }
    }

}

