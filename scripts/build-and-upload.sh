
#!/bin/bash

set -e

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
                        cd ..
        
                        echo "Ensuring APK build exists..."
                        APK_FILE="android/app/build/outputs/apk/debug/app-debug.apk"
                        if [ ! -f "$APK_FILE" ]; then
                            echo "APK not found, building..."
                            npm run apk-debug
                        fi
        
                        echo "Preparing output directories..."
                        mkdir -p only-apk-releases
                        mkdir -p only-aab-releases
        
                        echo "Renaming APK and AAB with version ${APP_VERSION}..."
                        cp android/app/build/outputs/apk/debug/app-debug.apk only-apk-releases/spreezy-${APP_VERSION}.apk
                        cp android/app/build/outputs/bundle/release/app-release.aab only-aab-releases/spreezy-${APP_VERSION}.aab
        
                        echo "Uploading APK to Nexus..."
                        curl -f -u $NEXUS_USER:$NEXUS_PASS \
                            --upload-file "only-apk-releases/spreezy-${APP_VERSION}.apk" \
                            "https://nexus.spreezy.in/repository/apk-release/spreezy-${APP_VERSION}/spreezy-${APP_VERSION}.apk"
        
                        echo "Uploading AAB to Nexus..."
                        curl -f -u $NEXUS_USER:$NEXUS_PASS \
                            --upload-file "only-aab-releases/spreezy-${APP_VERSION}.aab" \
                            "https://nexus.spreezy.in/repository/apk-release/spreezy-${APP_VERSION}/spreezy-${APP_VERSION}.aab"
        
                        echo "Both APK and AAB uploaded successfully to spreezy-${APP_VERSION}/"
