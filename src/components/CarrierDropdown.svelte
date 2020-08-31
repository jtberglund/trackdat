<script lang="ts">
    import { Carrier } from 'common/types';

    export let carrier: Carrier = undefined;
</script>

<select name="carrier" id="carrier-select" bind:value={carrier}>
    <option value={undefined} />
    {#each Object.values(Carrier) as c}
        <option value={c}>{c}</option>
    {/each}
</select>
