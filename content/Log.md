---
publish: "true"
---
Jul 16, 2026 (Thu)
- About quartz 5 for hosting Obsidian vault. Does it recommend a monorepo approach to linking the markdown files? 
- While I want easy access to publish, I also want my repo to be private enough
- What would be the best way to link images. Having them all uploaded to my repo?
- How to enable html embed? I want to start by trying embeding a soundcloud audio [[Embedding Soundcloud]]
	- Successful
- Is Obsidian markdown format different from the markdownlint by David Anson? When I edit the markdown files in Vs code, it tried to correct me and makes my screen very messy
- Bothered by Markdown Lint while editing in VS Code:
	- Obsidian Flavored Markdown is optimized for smooth personal writing with elements like Wikilinks `[[notename]]`, Block references and embedded files.
	- Markdownlint (by David Anson) in VS Code is a strict checker for technical documentation
	- Problem: 
	- Solution: Disable markdownlint in the vaul
		1. Create `.markdownlintignore` in the root of the vault.
		2. Ignore all .md files in this folder (including subfolders)
			```plaintext
			**/*.md
			``` 
		3. Save and Restart VS code. Done!
- Hosting images on Cloudflare R2
	- Crucial **zero egress (bandwidth) fees**: You're not charged for going viral.
	- R2 Storage 10 GB/month
	- Basically free but require payment method such as Apple Pay, Paypal or credit card)
	1. Register via https://www.cloudflare.com/products/r2/
	2. Search for *R2 Object Storage*
	3. Add R2 subscription to my account
	4. Process Payment method ($0)
	5. Proceed to R2
	6. Create bucket
		1. give it a name (eg. obsidian)
		2. Location: Automatic
		3. Default Storage Class: Standard
	7. Go the bucket's setting tab
	8. Find CORS policy (Cross-Origin Resource Sharing)
	9. Replace with this block
		```json
		[
	  {
	    "AllowedOrigins": ["app://*"],
	    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
	    "AllowedHeaders": ["*"],
	    "ExposeHeaders": ["ETag", "Content-Length", "Content-Type"],
	    "MaxAgeSeconds": 3600
	  }
	]
		```
		1. Go back to the main **R2** dashboard page and click **Manage R2 API Tokens** in the sidebar. 
		2. Create Account API Tokens
		3. Save your Access Key ID, Secret Access Key, and the S3 Endpoint URL (looks like https://<account_id>.r2.cloudflarestorage.com).
	10. 
- Is Cloudflare trustworthy?
Jul 15, 2026 (Wed)
- The Garden goes [online](https://luklongman.github.io/) 

Roadmap:
- [ ] Basic configurations: Title, Homepage, display and hide

Remember to manually sync before edit: `git pull`
Temporary save current uncommitted changes: `git stash`
Merge vs Rebase: `git config pull.rebase false`


Questions:
1. Can Quartz 5 handle tier membership in any form?

