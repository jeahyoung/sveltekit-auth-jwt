<script lang="ts">
    import { send } from "$lib/api";

    export let error: string;
    export let success: string;

    const login = async (event:SubmitEvent) => {
        const formEl = event.target as HTMLFormElement;

        const response = await send(formEl);

        if (response.error){
            error = response.error;
        }

        if(response.success){
            success = response.success;
        }

        formEl.reset();
    }
</script>

<form on:submit|preventDefault={login} method="post" autocomplete="off">
    <h2>Log in</h2>
    <label for="email">Email</label>
    <input type="text" name="email" required />
    <div class="email error"></div>
    <label for="password">Password</label>
    <input type="password" name="password" required>
    <div class="password error"></div>
    <button type="submit">Log in</button>
</form>