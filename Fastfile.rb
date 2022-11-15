version: 2
defaults: &defaults
  working_directory: ~/project

jobs:
  ios:
    <<: *defaults
    macos:
      xcode: '10.1.0'
    steps:
      - checkout
      - run:
          name: Install dependencies
          command: npm install --ignore-engines
      - run:
          name: Install bundle
          command: bundle install
      - run:
          name: Build app
          command: bundle exec fastlane ios ci
  android:
    <<: *defaults
    docker:
      - image: sarathc/circle-android-fastlane:api-25-0.0.1
    steps:
      - checkout
      - run:
          name: Install node
          command: sudo curl https://nodejs.org/dist/v10.0.0/node-v10.0.0-linux-x64.tar.gz | sudo tar xzvf - --exclude CHANGELOG.md --exclude LICENSE --exclude README.md --strip-components 1 -C /usr/local/
      - run:
          name: Upgrade NPM
          command: sudo npm install -g npm
      - run:
          name: Install dependencies
          command: npm ci --ignore-engines
      - run:
          name: Set gradle.properties
          command: |
            mkdir -p ~/.gradle
            echo "MYAPP_RELEASE_STORE_FILE=$MYAPP_RELEASE_STORE_FILE" >> ~/.gradle/gradle.properties
            echo "MYAPP_RELEASE_KEY_ALIAS=$MYAPP_RELEASE_KEY_ALIAS" >> ~/.gradle/gradle.properties
            echo "MYAPP_RELEASE_STORE_PASSWORD=$MYAPP_RELEASE_STORE_PASSWORD" >> ~/.gradle/gradle.properties
            echo "MYAPP_RELEASE_KEY_PASSWORD=$MYAPP_RELEASE_KEY_PASSWORD" >> ~/.gradle/gradle.properties
      - run:
          name: Put keystore
          command: echo "$KEYSTORE" | base64 -d > android/app/anysticker.keystore
      - run:
          name: Set supplyfile
          command: echo "$SUPPLYFILE" | base64 -d > android/supplyfile.json
      - run: yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses || echo "okay okay"
      - run:
          name: Bundle android
          command: npm run bundle-android
      - run:
          name: Install bundle
          command: bundle install
      - run:
          name: Build app
          command: bundle exec fastlane android ci
      - store_artifacts:
          path: android/app/build/outputs/apk/release/app-release.apk
workflows:
  version: 2
  build:
    jobs:
      - hold-ios:
          type: approval
      - hold-android:
          type: approval
      - ios:
          requires:
            - hold-ios
      - android:
          requires:
            - hold-android
