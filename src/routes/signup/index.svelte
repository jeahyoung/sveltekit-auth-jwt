<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit";

    export const load: Load = ({ session, props }) => {
        if (session.user) {
            return {
                status: 302,
                redirect: '/',
            }
        }
        return { props }
    }
</script>

<script lang="ts">
    import { send, sendJson } from "$lib/api";

    export let error: string;
    export let success: string;

    const signup = async (event:SubmitEvent) => {
        error = '';
        success = '';

        const formEl = event.target as HTMLFormElement;

        const response = await send(formEl);
      
        if (response.error){
            error = response.error;
        }

        if(response.success){
            
            success = response.success;
            console.log("response.data====>",response.data);
            if(response.data){
                location.assign('/login');
            }
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
    <label for="password">Password</label>
    <input type="password" name="password" required>
    
    {#if error}
    <div class="error">{error}</div>
    {/if}

    {#if success}
        <p>Thank you for signing up!</p>
        <p><a href="/login">You can log in.</a></p>
    {/if}
    <button type="submit">Sign up</button>
</form>