<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import GoogleLoginButton from './components/GoogleLoginButton.svelte';
    import GoogleSignOutButton from './components/GoogleSignOutButton.svelte';
    import AddPackageForm from './components/AddPackageForm.svelte';
    import type { Package } from 'common/types';
    import TrackingList from './components/TrackingList.svelte';
    import packageStore from './stores/packages';

    let packages: Package[] = [];

    function retrievePackages() {
        fetch('http://localhost:8080/api/packages')
            .then((res) => res.json())
            .then((t) => {
                const responseStr = JSON.stringify(t, null, 2);
                packages = JSON.parse(responseStr).packages;
                console.log({ packages });
                packageStore.set(packages);
            })
            .catch((err) => {
                // text = err.message || 'Error';
            });
    }

    onMount(() => {
        retrievePackages();
    });

    function onPackageAdd(newPackage: Package) {
        packages = [...packages, newPackage];
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
