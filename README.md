## Start sveltekit-auth-jwt

```
Step1) `npm install` (or `pnpm install` or `yarn`)
Step2) rename .env-example to .env and fill set the jwt secret
Step3) prisma-db-push (NPM SCRIPTS) only if the dev.db file is not there.
Step4) prisma-studio (NPM SCRIPTS) Create a user

```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

## Credits

```
ErrorHandle came from: https://github.com/moatra/sveltekit-redirect-error-handler
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
