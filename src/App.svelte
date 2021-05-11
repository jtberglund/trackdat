<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import GoogleLoginButton from './components/GoogleLoginButton.svelte';
    import GoogleSignOutButton from './components/GoogleSignOutButton.svelte';
    import AddPackageForm from './components/AddPackageForm.svelte';
    import type { Package } from 'common/types';
    import TrackingList from './components/TrackingList.svelte';
    import packageStore from './stores/packages';

    function retrievePackages() {
        fetch('http://localhost:8080/api/packages')
            .then((res) => res.json())
            .then((t) => {
                const responseStr = JSON.stringify(t, null, 2);
                const { packages } = JSON.parse(responseStr);
                console.log({ packages });
                packageStore.set(packages);
            })
            .catch((err) => {
                // TODO error screen
                console.error(err);
            });
    }

    onMount(() => {
        retrievePackages();
    });

    function onPackageAdd(newPackage: Package) {
        fetch('http://localhost:8080/api/packages', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(newPackage),
        }).then(retrievePackages);
    }
</script>

<AddPackageForm onAdd={onPackageAdd} />

<TrackingList />

<GoogleLoginButton />
<GoogleSignOutButton />
