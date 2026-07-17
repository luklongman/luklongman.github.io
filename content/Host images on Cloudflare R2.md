---
publish: "true"
created: 2026-07-16T14:50
updated: 2026-07-16T15:09
---
- Crucial **zero egress (bandwidth) fees**: You're not charged large bandwidth.
- community plugin: S3 image sync by JongChoiYip
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
10. Configure community plugin: S3 image sync by JongChoiYip
11. connection check.
12. Done.

Remove any image in git
Last edited: 14:54. Jul 16, 2026 (Thu)