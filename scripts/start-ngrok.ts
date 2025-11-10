// scripts/start-ngrok.ts
import ngrok from "ngrok";
import dotenv from "dotenv";

dotenv.config();

async function startNgrok() {
  try {
    console.log("Starting ngrok tunnel...");
    
    // Força o encerramento de qualquer túnel existente
    try {
      await ngrok.kill();
    } catch (error) {
      console.log("Warning: Could not kill existing tunnels", error);
    }
    
    // Aguarda um momento para garantir que os processos anteriores foram encerrados
    await new Promise(resolve => setTimeout(resolve, 1000));

    const url = await ngrok.connect({
      addr: 3000,
      authtoken: process.env.NGROK_AUTHTOKEN,
      name: "fullstack-weekend-aparatus",
      proto: "http", // Especifica explicitamente o protocolo
    });

    console.log("-------------------------------------------------");
    console.log("Ngrok tunnel established!");
    console.log(`Forwarding -> ${url}`);
    console.log("-------------------------------------------------");
    console.log(
      "ACTION REQUIRED: Update the PUBLIC_URL in your .env file with this URL."
    );
    console.log(
      "AND update your Google Cloud Console credentials with this URL."
    );
    console.log("-------------------------------------------------");
  } catch (error) {
    console.error("Error starting ngrok tunnel:", error);
    process.exit(1);
  }
}

startNgrok();
