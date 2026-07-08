import { createServerFn } from "@tanstack/react-start";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME || "dbpdexty8";
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || process.env.VITE_CLOUDINARY_API_KEY || "162789314974497";
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET || process.env.VITE_CLOUDINARY_API_SECRET || "3p7oEsQMkx3boeEXme_i08LATQE";

const runCmd = (cmd: string): Promise<void> => {
  return new Promise((resolve) => {
    exec(cmd, { cwd: process.cwd() }, (error, stdout, stderr) => {
      if (error) {
        console.error(`[Git Connector Error] "${cmd}":`, stderr || error.message);
      } else {
        console.log(`[Git Connector Success] "${cmd}":`, stdout);
      }
      resolve();
    });
  });
};

export const syncAssetToServer = createServerFn({ method: "POST" })
  .validator((d: { slug: string; base64Image: string }) => d)
  .handler(async ({ data: { slug, base64Image } }) => {
    console.log(`Starting server-side sync for product slug: ${slug}`);

    try {
      // 1. Upload base64 image data directly to Cloudinary
      const timestamp = Math.round(new Date().getTime() / 1000);
      const paramsToSign = `timestamp=${timestamp}${API_SECRET}`;
      const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

      const formData = new FormData();
      // Ensure base64 string format is correct
      const fileData = base64Image.startsWith("data:") 
        ? base64Image 
        : `data:image/jpeg;base64,${base64Image}`;

      formData.append("file", fileData);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", API_KEY);
      formData.append("signature", signature);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      console.log("Uploading image to Cloudinary...");
      const cloudResponse = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!cloudResponse.ok) {
        const errText = await cloudResponse.text();
        throw new Error(`Cloudinary upload failed: ${errText}`);
      }

      const cloudData = (await cloudResponse.json()) as { secure_url: string };
      const secureUrl = cloudData.secure_url;
      console.log("Cloudinary Upload Successful. CDN URL:", secureUrl);

      // 2. Local State/File Persistence: Update src/lib/products.ts
      const productsFilePath = path.join(process.cwd(), "src", "lib", "products.ts");
      if (fs.existsSync(productsFilePath)) {
        console.log("Modifying src/lib/products.ts...");
        let content = fs.readFileSync(productsFilePath, "utf-8");
        
        const regex = new RegExp(`{ slug: "${slug}",([\\s\\S]*?)image: [^,\\n]+,`);
        if (regex.test(content)) {
          content = content.replace(regex, (match, p1) => {
            return `{ slug: "${slug}",${p1}image: "${secureUrl}",`;
          });
          fs.writeFileSync(productsFilePath, content, "utf-8");
          console.log(`Local file updated: replaced image for slug ${slug} with Cloudinary URL`);
        } else {
          console.warn(`Could not locate product with slug "${slug}" to update in products.ts`);
        }
      } else {
        console.warn("products.ts file not found at expected path:", productsFilePath);
      }

      // 3. Git Connector: Run git commands in the background
      console.log("Triggering git push connector...");
      // Trigger async git push commands
      (async () => {
        await runCmd("git add .");
        await runCmd('git commit -m "chore: auto-sync AI generated furniture asset from UI prompt"');
        await runCmd("git push");
      })();

      return {
        success: true,
        secureUrl,
      };
    } catch (err: any) {
      console.error("Error in syncAssetToServer handler:", err);
      return {
        success: false,
        error: err.message || "Unknown server error during sync",
      };
    }
  });
