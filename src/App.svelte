<script lang="ts">
    import type TrackingInfo from './types/TrackingInfo';
    import Carrier from './types/Carrier';
    import StatusText from './components/StatusText.svelte';
    import { onMount } from 'svelte';
    import StatusType from './types/StatusType';

    let myTrackingInfo: TrackingInfo[] = [];
    let trackingNumber = '';
    let carrier: Carrier = undefined;
    let status = {
        text: '',
        type: StatusType.INFO,
    };

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

        myTrackingInfo.push({
            trackingNumber,
            carrier,
        });
        trackingNumber = '';
        carrier = undefined;
        status = {
            text: 'Successfully added',
            type: StatusType.SUCCESS,
        };
    }

    let text = '';

    onMount(() => {
        fetch('http://localhost:8080')
            .then((res) => res.text())
            .then((t) => {
                text = t;
            });
    });
</script>

<select name="carrier" id="carrier-select" bind:value={carrier}>
    <option value={undefined} />
    {#each Object.values(Carrier) as c}
        <option value={c}>{c}</option>
    {/each}
</select>
<input name="tracking-number" type="text" bind:value={trackingNumber} />

<button on:click={addTrackingInfo}>Add</button>

{#if status.text}
    <StatusText statusType={status.type}>{status.text}</StatusText>
{/if}

<p>Text: {text}</p>
