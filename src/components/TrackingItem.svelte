<script lang="ts">
    import type { Package } from 'common/types';

    export let packageInfo: Package;
</script>

<li>{packageInfo.trackingNumber} - {packageInfo.carrier}</li>
