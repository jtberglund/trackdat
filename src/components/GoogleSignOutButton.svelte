<script lang="ts">
    function handleSignOut() {
        const auth2 = (window as any).gapi.auth2.getAuthInstance();
        fetch('/api/auth/signout', {
            method: 'POST',
        })
            .then(() => auth2.signOut())
            .then(() => {
                console.log('User signed out.');
            });
    }
</script>

<button on:click={handleSignOut}>Sign Out</button>
