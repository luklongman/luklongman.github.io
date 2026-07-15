## Overview

By the end, you will have a self-updating online digital garden powered by Obsidian and Git. When you edit notes in Obsidian and save them, they will automatically build and publish to the web.

#Quartz #Github/Pages #GitSyncMD

## Objectives

1. Build a local Quartz 5 static site with your Obsidian vault symlinked (comment: does github handle symlink well tho?) inside `/content`.
2. Host your static site on GitHub Pages for free.
3. Personalize your garden's look, feel, and navigation.
4. Establish robust cross-device synchronization between desktop and iOS using GitSync.md.
    
## Prerequisites & Requirements

- **Setup Time:** 6 to 8 hours (including debugging, layout design, and initial sync setup).
    
- **Skill Level:** Basic understanding of Git and GitHub (repositories, commits, pushes).
    
- **Software Needed:** Obsidian, Visual Studio Code (VS Code), and Node.js.
    

### The Financial Math: Free Tier vs. Paid Alternatives

While the setup requires some sweat equity up front, the long-term running cost is zero.

| **Route**                   | **Setup Friction** | Cost          | **Personalization Limits**            |
| --------------------------- | ------------------ | ------------- | ------------------------------------- |
| **Obsidian Sync**           | Minimal            | USD 4 / month | N/A (Sync only)                       |
| **Obsidian Publish**        | None               | USD 8 / month | High (Requires custom CSS/JS uploads) |
| **Quartz 5 + GitHub Pages** | Moderate           | Free          | None (100% full code access)          |

## Understanding Quartz 5

Quartz is a Static Site Generator (SSG). It compiles your Obsidian Markdown files directly into static HTML, CSS, and client-side JavaScript.

### Quartz 5 vs. Obsidian Publish

#### When is Quartz 5 preferred?

- **Total Autonomy:** You want complete aesthetic and structural control over your site layout, fonts, margins, and custom components. (Be critical, Do I not have these options in Obsidian Publish at all?)
    
- **No Monthly Fees:** You prefer a lifetime $0 cost structure by leveraging free hosting.
    
- **Code Mastery:** You want to level up your web skills by managing your own Git repository and build pipeline.
    
#### When to use Obsidian Publish?

- **Zero Technical Friction:** You want a 1-click publishing pipeline from inside Obsidian without touching terminal lines, Git conflicts, or Node environments.
    
- **Zero Build Wait Times:** You want your changes to go live instantly without waiting for a GitHub Actions runner to compile your vault.
    
- **No Maintenance:** You are happy to pay USD 8 per month to let Obsidian handle security patches, infrastructure scaling, and system updates automatically.
    
### GitHub Pages' Role

GitHub Pages acts as your global Content Delivery Network (CDN). It serves the compiled static folder output of Quartz 5 instantly to your visitors' browsers. Because it is completely static, it easily handles massive spikes in traffic without server fatigue or unexpected bandwidth bills.

(To add: Cloudflare and Vercel are good alternatives, but Github Pages has least friction since "the repo will build itself <- use more accurate description".)

More on [[Git for Artists]]

## Local Setup: Initializing Quartz 5

Follow this sequence to build, link, and test your local Quartz digital garden:

**1.Clone the Repository:**Establish your local code foundation.

Open your terminal or command prompt, navigate to your development directory, and clone the official Quartz repository:

Bash

```
git clone https://github.com/jackychang/quartz.git
cd quartz
```

**2.Install Dependencies:**Load Node packages.

Ensure you have Node.js (version 20 or higher) installed. Then run the package installer:

Bash

```
npm i
```

**3.Initialize the Quartz Project:**Link your Obsidian vault.

Run the configuration command. When prompted, select **Symlink** to link your actual Obsidian vault directory directly to the `/content` folder of your Quartz directory:

Bash

```
npx quartz create
```

_Tip:_ Symlinking ensures that any changes you make inside your primary Obsidian vault are instantly reflected in Quartz without having to copy and paste files.

**4.Preview Your Garden:**Start local development server.

Launch the local development server to see your garden on your machine:

Bash

```
npx quartz build --serve
```

Open your browser and navigate to `http://localhost:8080` to interact with your local digital garden.

## Cross-Device Synchronization with GitSync.md

To publish directly from your phone while away from your computer, you need a way to commit and push changes directly from iOS to your GitHub repository.

### What is GitSync.md?

[GitSync.md (App Store link)](https://apps.apple.com/us/app/gitsync-md/id6758960270) is a dedicated iOS-native Git client (HKD 88) that acts as a secure middleman between your device's filesystem and GitHub.

### Why is a middleman necessary on iOS?

Apple's sandboxed filesystem prevents third-party apps like Obsidian from running local binary scripts or full, standard Git processes in the background.

The community-made **Obsidian Git** plugin technically runs on mobile, but it relies on **isomorphic-git** (a pure JavaScript implementation of Git). On iOS devices, this JS implementation is highly inefficient and unstable, frequently running out of memory or crashing the Obsidian app when handling medium-to-large vaults.

**GitSync.md** solves this by running compiled, native **libgit2** C-libraries. It provides an actual, stable folder structure within the iOS Files App that both Obsidian and native Git can safely access without memory leaks.

### Step-by-Step Mobile Sync Setup

Follow this step-by-step pipeline to connect Obsidian Mobile to your GitHub repository using GitSync.md:

1. **Clone Your Repository in GitSync.md:**
    
    - Open GitSync.md on your iPhone.
        
    - Enter your GitHub credentials or set up your SSH keys.
        
    - Clone your digital garden repository into the local iOS file storage directory managed by GitSync.md.
        
2. **Mount the Vault in Obsidian:**
    
    - Open the Obsidian mobile app.
        
    - Select **Open folder as vault**.
        
    - Navigate into the Files App, open the **GitSync.md** local directory, and choose your cloned repository folder.
        
3. **Generate a GitHub Personal Access Token (PAT):**
    
    - On your computer, go to `[github.com/settings/tokens](https://github.com/settings/tokens)` and generate a classic or fine-grained token.
        
    - Ensure the token has complete `repo` scope permissions.
        
    - _Security Warning:_ Treat this token like a password; never commit it to a public folder or share it with anyone.
        
4. **Configure Obsidian Git on iOS:**
    
    - Inside your mobile Obsidian vault, install and enable the **Obsidian Git** community plugin.
        
    - In the plugin configuration, input your:
        
        - **Git Username**
            
        - **Author Email**
            
        - **Personal Access Token (PAT)**
            
5. **Test the Connection:**
    
    - Edit a file in Obsidian on your phone.
        
    - Swipe down, open the Command Palette, and run `Obsidian Git: Commit all changes` followed by `Obsidian Git: Push`.
        
    - Check your GitHub Pages repository—your Actions pipeline will automatically trigger, build the site, and push your edits live!
        

## Peer Technical Comments

- **Symlinking Choice:** I emphasized **symlinking** over direct copy methods during `npx quartz create`. When compiling locally, copying files creates a messy duplicate environment. Symlinking ensures your Obsidian vault remains the single source of truth.
    
- **The libgit2 Advantage:** I explained the structural difference between `isomorphic-git` (which runs slowly inside Obsidian's JavaScript sandbox) and `libgit2` (which runs compiled C-logic natively via GitSync.md). This gives you a deeper architectural understanding of why the HKD 88 App Store investment is worth the stability.
    
- **Security Best Practices:** I highlighted the risks associated with Personal Access Tokens (PATs) and emphasized keeping them out of public repositories. This ensures your code remains clean, private, and secure.