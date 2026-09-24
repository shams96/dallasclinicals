<?php
/**
 * Site-wide configuration. Edit the values below when deploying —
 * nothing else in this site needs to change.
 */

// Firebase Web SDK config (public by design — Firestore/Auth access is
// controlled by firestore.rules, not by hiding this object).
define('FIREBASE_CONFIG', [
    'projectId' => 'ai-studio-applet-webapp-840df',
    'appId' => '1:385055368829:web:04c527cbfa8791e68e7314',
    'apiKey' => 'AIzaSyBzc8kY_kJZCjIKwdI6MFbz0sm-H2u2sl8',
    'authDomain' => 'ai-studio-applet-webapp-840df.firebaseapp.com',
    'firestoreDatabaseId' => 'ai-studio-c10ea110-9d61-4161-900a-de47c0366a7e',
    'storageBucket' => 'ai-studio-applet-webapp-840df.firebasestorage.app',
    'messagingSenderId' => '385055368829',
]);

// Google Apps Script Web App /exec URL — see scripts/AppsScript_Code.gs.
// Replace with your deployed script's URL before going live.
define('NOTIFY_URL', 'MY_APPS_SCRIPT_EXEC_URL');

// Only this email can sign in to /admin.php and change the PI photo.
define('ADMIN_EMAIL', 'shams96@yahoo.com');
