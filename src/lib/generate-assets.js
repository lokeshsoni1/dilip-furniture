import fs from "fs";
import path from "path";
import crypto from "crypto";

// Custom .env file parser to eliminate npm dependency issues
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return {};
  
  const content = fs.readFileSync(envPath, "utf-8");
  const env = {};
  
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    
    const index = trimmed.indexOf("=");
    if (index === -1) return;
    
    const key = trimmed.substring(0, index).trim();
    let val = trimmed.substring(index + 1).trim();
    
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  });
  return env;
}

const env = loadEnv();
const GEMINI_API_KEY = env.VITE_GEMINI_API_KEY;
const CLOUDINARY_CLOUD_NAME = env.VITE_CLOUDINARY_CLOUD_NAME || "dbpdexty8";
const CLOUDINARY_API_KEY = env.VITE_CLOUDINARY_API_KEY || "162789314974497";
const CLOUDINARY_API_SECRET = env.VITE_CLOUDINARY_API_SECRET || "3p7oEsQMkx3boeEXme_i08LATQE";

const prompts = [
  // Geometry of Rest
  {
    key: "geometry-of-rest-cover",
    prompt: "A premium royal walnut canopy bed frame, master craftsmanship, warm architectural lighting, high-end bedroom design, 8k resolution, photorealistic",
    placeholder: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504425/Master_suite_lounge_with_chairs_202607081522_myy2a5.jpg"
  },
  {
    key: "geometry-of-rest-inline-1",
    prompt: "Bespoke solid wood bed joinery showing detailed mortise and tenon joint, carpentry workshop context, warm lighting, macro shot, photorealistic",
    placeholder: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Luxury_living_room_interior_warm__202607081522_mah2su.jpg"
  },
  {
    key: "geometry-of-rest-inline-2",
    prompt: "A clean modern bedroom with a royal platform bed, minimal styling, architectural digest styling, soft evening lighting, photorealistic",
    placeholder: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504422/Lounge_area_with_couches_and_202607081522_w0ux6v.jpg"
  },
  // Living Spaces in 2026
  {
    key: "living-spaces-2026-cover",
    prompt: "A luxury modernist living room with camel leather sofas, ivory concrete walls, warm afternoon sun, high-end styling, architectural digest style, photorealistic",
    placeholder: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Luxury_living_room_interior_warm__202607081522_mah2su.jpg"
  },
  {
    key: "living-spaces-2026-inline-1",
    prompt: "Close-up of camel leather upholstery stitching on a modern lounge chair, soft studio lighting, macro details, photorealistic",
    placeholder: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Lounge_area_with_couches_and_202607081521_yhkceu.jpg"
  },
  {
    key: "living-spaces-2026-inline-2",
    prompt: "Cozy minimalist lounge area at golden hour sunset with camel boucle couches and teak details, architectural interior, photorealistic",
    placeholder: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504425/Master_suite_lounge_with_chairs_202607081522_myy2a5.jpg"
  },
  // Logging to Polish (Teak Wood Lifecycle)
  {
    key: "logging-to-polish-cover",
    prompt: "Stack of seasoned raw teak lumber logs in Jodhpur yard, beautiful wood grain patterns, warm sun, architectural style, photorealistic",
    placeholder: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Dining_room_with_wood_theme_202607081523_dcjga6.jpg"
  },
  {
    key: "logging-to-polish-inline-1",
    prompt: "A master craftsman hand-rubbing natural oil polish into a solid teak dining table surface, carpentry shop context, warm lighting, photorealistic",
    placeholder: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Dining_room_with_wood_theme_202607081523_dcjga6.jpg"
  },
  {
    key: "logging-to-polish-inline-2",
    prompt: "Detailed view of hand-finished teak wood dining table showing tight golden-brown grain patterns, modern design showroom, photorealistic",
    placeholder: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Luxury_living_room_interior_warm__202607081522_mah2su.jpg"
  }
];

async function generateImage(promptText) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: promptText }],
      parameters: {
        sampleCount: 1,
        outputMimeType: "image/jpeg",
        aspectRatio: "16:9"
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini generation failed: ${errText}`);
  }

  const data = await response.ok ? await response.json() : null;
  const base64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!base64) throw new Error("No image base64 bytes returned from Gemini.");
  return `data:image/jpeg;base64,${base64}`;
}

async function uploadToCloudinary(base64Image) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign = `timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

  const formData = new FormData();
  formData.append("file", base64Image);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", CLOUDINARY_API_KEY);
  formData.append("signature", signature);

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const response = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Cloudinary upload failed: ${errText}`);
  }

  const data = await response.json();
  return data.secure_url;
}

async function run() {
  if (!GEMINI_API_KEY) {
    console.error("VITE_GEMINI_API_KEY is not defined in environment variables. Aborting.");
    process.exit(1);
  }

  const articlesFilePath = path.join(process.cwd(), "src", "routes", "articles.tsx");
  if (!fs.existsSync(articlesFilePath)) {
    console.error(`Articles route file not found at ${articlesFilePath}. Aborting.`);
    process.exit(1);
  }

  let articlesContent = fs.readFileSync(articlesFilePath, "utf-8");

  console.log("Starting unique asset generation process...");

  for (let i = 0; i < prompts.length; i++) {
    const item = prompts[i];
    console.log(`[${i + 1}/${prompts.length}] Generating image for: "${item.key}"`);
    try {
      const base64 = await generateImage(item.prompt);
      console.log(`Uploading asset to Cloudinary...`);
      const secureUrl = await uploadToCloudinary(base64);
      console.log(`Uploaded! Cloudinary URL: ${secureUrl}`);

      articlesContent = articlesContent.replace(item.placeholder, secureUrl);
      console.log(`Replaced placeholder in articles.tsx with secure URL.`);
    } catch (err) {
      console.error(`Failed to generate/upload asset for ${item.key}:`, err.message);
    }
  }

  fs.writeFileSync(articlesFilePath, articlesContent, "utf-8");
  console.log("All unique assets successfully synchronized and written to articles.tsx!");
}

run().catch((err) => {
  console.error("Fatal error in automation runner:", err);
  process.exit(1);
});
