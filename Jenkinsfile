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
        //

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

        stage('Publish APK to Nexus'){
            steps{
                sh '''
                    echo "Installing curl..."
                    #apt-get update 
                    apt-get install -y curl

                    mkdir -p only-apk-releases

                    find ./android/app/build/outputs/apk/ -name "*.apk" -exec cp {} ./only-apk-releases/ \\;

                    echo "Contents of apk-releases directory:"
                    ls -lh only-apk-releases/
                '''

                withCredentials([usernamePassword(credentialsId: 'nexus_apk_credentials', usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASS')]) {
                    sh 'for apk in only-apk-releases/*.apk; do curl -u $NEXUS_USER:$NEXUS_PASS --upload-file "$apk" "http://nexus.spreezy.in/repository/apk-release/$(basename "$apk")"; done'
                }


            }
        }
        
        // stage('Publish APK on Nexus Repo  '){
        //     steps{
        //         sh 'mkdir apk-releases'
        //         sh 'cp -r  ./android/app/build/outputs/apk/* ./apk-releases/'
        //         withCredentials([file(credentialsId: 'nexus_npm_credentials', variable: 'npm_nexus_credentials')]) {
        //          sh "npm publish --userconfig ${npm_nexus_credentials} --registry https://nexus.spreezy.in/repository/npm-hosted/ --loglevel verbose"                }

        //     }
        // }
        
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

