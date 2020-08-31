<script lang="ts">
    // import { google } from 'googleapis';
    // import gapi2 from 'google-auth-library';
    // import config from '../config';

    // google.auth.cli

    // const oauthClient = new google.auth.OAuth2(
    //     config.auth.google.clientId,
    //     config.auth.google.clientSecret,
    //     config.auth.google.redirectUri
    // );
    // let signInButton: Element;
    // declare const gapi;
    // function attachSignIn(element: Element) {
    //     console.log('attached');
    //     (window as any).auth2.attachClickHandler(
    //         element,
    //         {},
    //         function (googleUser) {
    //             document.getElementById('name').innerText =
    //                 'Signed in: ' + googleUser.getBasicProfile().getName();
    //         },
    //         function (error) {
    //             alert(JSON.stringify(error, undefined, 2));
    //         }
    //     );
    // }
    // function setupGoogleAuth() {
    //     console.log('test');
    //     gapi.load('auth2', () => {
    //         console.log('test 2');
    //         (window as any).auth2 = gapi.auth2.init({
    //             client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    //             cookiepolicy: 'single_host_origin',
    //         });
    //         attachSignIn(signInButton);
    //     });
    // }

    // (window as any).loadGoogleAPI = setupGoogleAuth;

    // (window as any).onSignIn = () => {
    //     console.log('Successful sign in');
    // };

    (window as any).onGoogleSignIn = (user) => {
        const jwt = user.getAuthResponse().id_token;
        console.log({ jwt });
        // save JWT as cookie
        fetch('/api/auth/signin/google', {
            method: 'POST',
        })
            .then((res) => console.log({ res }))
            .catch((err) => console.log({ err }));
    };
</script>

<!-- <svelte:window on:load={setupGoogleAuth} /> -->

<div
    class="g-signin2"
    data-onsuccess="onGoogleSignIn"
    data-cookiepolicy="single_host_origin"
/>
