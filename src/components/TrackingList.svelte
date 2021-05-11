<script lang="ts">
    import TrackingItem from './TrackingItem.svelte';
    import packageStore from '../stores/packages';

    console.log({ packageStore });

    packageStore.subscribe((newPackages) => console.log(newPackages));
</script>

<ul>
    {#each $packageStore as packageInfo}
        <TrackingItem {packageInfo} />
    {/each}
</ul>
