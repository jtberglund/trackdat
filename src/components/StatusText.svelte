<script lang="ts">
    import classnames from 'classnames';
    import StatusType from '../types/StatusType';

    export let statusType: StatusType = StatusType.SUCCESS;
</script>

<style type="text/scss">
    $error: #ff4444;
    $error-dark: #cc0000;
    $warning: #ffbb33;
    $warning-dark: #ff8800;
    $info: #33b5e5;
    $info-dark: #0099cc;
    $success: #00c851;
    $success-dark: #007e33;

    .container {
        color: white;
        border-radius: 4px;
        padding: 8px;
        border: 1px solid;
    }

    .error {
        background-color: $error;
        border-color: $error-dark;
    }
    .warning {
        background-color: $warning;
        border-color: $warning-dark;
    }
    .info {
        background-color: $info;
        border-color: $info-dark;
    }
    .success {
        background-color: $success;
        border-color: $success-dark;
    }
</style>

<!-- <script lang="ts" context="module">
    export enum StatusType {
        ERROR = 'error',
        WARNING = 'warning',
        INFO = 'info',
        SUCCESS = 'success',
    }
</script> -->
<div class={classnames('container', statusType)}>
    <p>
        <slot />
    </p>
</div>
