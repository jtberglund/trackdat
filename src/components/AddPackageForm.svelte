<script lang="ts">
    import CarrierDropdown from './CarrierDropdown.svelte';
    import type { Carrier, Package } from 'common/types';
    import StatusType from '../types/StatusType';
    import StatusText from './StatusText.svelte';
    import preventDefault from '../utils/preventDefault';
    import { prevent_default } from 'svelte/internal';
    import pipe from 'ramda/es/pipe';

    let carrier: Carrier;
    let trackingNumber = '';

    let status = {
        text: '',
        type: StatusType.INFO,
    };

    export let onAdd: (newPackage: Package) => void = () => {};

    function resetForm() {
        trackingNumber = '';
        carrier = undefined;
        status = {
            text: 'Successfully added',
            type: StatusType.SUCCESS,
        };
    }

    function addTrackingInfo() {
        if (!carrier) {
            status = {
                text: 'Please select a carrier',
                type: StatusType.ERROR,
            };
            return;
        }
        if (!trackingNumber) {
            status = {
                text: 'Please enter a tracking number',
                type: StatusType.ERROR,
            };
            return;
        }

        const newPackage = {
            trackingNumber,
            carrier,
        };

        onAdd(newPackage as any);

        resetForm();
    }

    const handleAddPackage = pipe(preventDefault, addTrackingInfo);
</script>

<form on:submit|preventDefault={addTrackingInfo}>
    <CarrierDropdown bind:carrier />
    <input name="tracking-number" type="text" bind:value={trackingNumber} />

    <button on:click={handleAddPackage}>Add</button>

    {#if status.text}
        <StatusText statusType={status.type}>{status.text}</StatusText>
    {/if}
</form>
