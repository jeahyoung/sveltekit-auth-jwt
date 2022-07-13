<script lang="ts">
    import { send } from "$lib/api";

    export let error: string;
    export let success: string;

    const signup = async (event:SubmitEvent) => {
        const formEl = event.target as HTMLFormElement;

        const response = await send(formEl);

        if (response.error){
            error = response.error;
        }

        if(response.success){
            success = response.success;
        }

        formEl.reset();
        // const responsef = await fetch(formEl.action,{
        //     method: formEl.method,
        //     body: new FormData(formEl),
        //     headers: {accept: 'application/json'},
        // });

        // const responsefd = await responsef.json(); 

        // if(responsefd.error){
        //     error = responsefd.error;
        // }

        // if (responsefd.success) {
        //     success = responsefd.success;
        // }

        // formEl.reset() 
    }
</script>

<form on:submit|preventDefault={signup} method="post" autocomplete="off">
    <h2>Sign up</h2>
    <label for="email">Email</label>
    <input type="text" name="email" required />
    <div class="email error"></div>
    <label for="password">Password</label>
    <input type="password" name="password" required>
    <div class="password error"></div>
    <button type="submit">Sign up</button>
</form>