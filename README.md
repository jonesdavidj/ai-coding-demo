# Hello World CIO Demo

A minimal static site that proves a browser-only development workflow using GitHub Codespaces and Vercel.

## Run in GitHub Codespaces

1. Open this repository in GitHub.
2. Select **Code** > **Codespaces** > **Create codespace on current branch**.
3. In the Codespaces terminal, run:

   ```bash
   python3 -m http.server 3000
   ```

4. Open the forwarded port shown by Codespaces to view the Hello World site.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Sign in to Vercel.
3. Choose **Add New...** > **Project**.
4. Import this GitHub repository.
5. Keep the default settings. This is a static site with no build command required.
6. Select **Deploy**.

The result is a public Vercel URL showing the Hello World app.
