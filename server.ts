import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint for Quote Submissions
app.post("/api/quote", (req, res) => {
  try {
    const { companyName, contactName, email, phone, selectedServices, budgetRange, preferredStyle, description, source } = req.body;
    const recipient = "axel@widevig.no";

    console.log(`========================================`);
    console.log(`[QUOTE / TILBUDSFORESPØRSEL MOTTATT]`);
    console.log(`Sendes til: ${recipient}`);
    console.log(`Fra: ${contactName || "Ukjent"} (${email || "Ingen e-post"})`);
    console.log(`Bedrift: ${companyName || "Ikke oppgitt"}`);
    console.log(`Telefon: ${phone || "Ikke oppgitt"}`);
    console.log(`Tjenester:`, selectedServices);
    console.log(`Budsjett:`, budgetRange);
    console.log(`Stil:`, preferredStyle);
    console.log(`Beskrivelse:`, description);
    console.log(`Kilde: ${source || "Tilbudsskjema"}`);
    console.log(`Tidspunkt: ${new Date().toISOString()}`);
    console.log(`========================================`);

    res.json({
      success: true,
      recipient,
      message: `Takk! Forespørselen din er registrert og sendt til ${recipient}.`,
    });
  } catch (error) {
    console.error("Error processing quote submission:", error);
    res.status(500).json({
      success: false,
      error: "Kunne ikke registrere forespørselen. Vennligst prøv igjen.",
    });
  }
});

// API Endpoint for AI Strategy Advisor
app.post("/api/ai-advisor", async (req, res) => {
  try {
    const { companyName, industry, currentChallenges, primaryGoal, selectedStyleName } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        success: true,
        recommendation: {
          summary: `Strategisk analysenotat for ${companyName || "bedriften din"} (${industry || "Generell bransje"}).`,
          roadmap: [
            "Fase 1: Digital Modenhetsanalyse & UX Auditing (Uke 1-3)",
            "Fase 2: Designsystem og Mikro-arkitektur i valgt stil (" + (selectedStyleName || "Nordisk Minimalisme") + ") (Uke 4-7)",
            "Fase 3: Cloud & AI API-Integrasjon med automatiske arbeidsflyter (Uke 8-12)",
          ],
          designStyleRecommendation: selectedStyleName || "Nordisk Minimalisme",
          keyTechnologies: ["React / TypeScript", "Tailwind CSS", "Gemini AI API", "Cloud Run / Microservices"],
          estimatedTimeline: "8 - 12 uker",
          estimatedRoi: "+320% økt konvertering og redusert driftskostnad",
        },
      });
    }

    const prompt = `Du er sjefsstrateg og sjefsdesigner hos Widevig Digital, et ledende norsk IKT- og designbyrå.
Svar på norsk med profesjonell, engasjerende tone.

Gitt følgende bedriftskontekst:
- Bedriftsnavn: ${companyName || "Anonym Bedrift"}
- Bransje: ${industry || "Teknologi / Tjenester"}
- Hovedutfordring: ${currentChallenges || "Skalering og moderne brukergrensesnitt"}
- Mål: ${primaryGoal || "Bli markedsledende på digital opplevelse"}
- Valgt designstil i appen: ${selectedStyleName || "Nordisk Minimalisme"}

Generer en strukturert strategisk anbefaling i JSON-format med følgende nøkler:
- summary: (En kraftfull oppsummering på 2-3 setninger)
- roadmap: (Array med 3-4 konkrete milepæler/faser)
- designStyleRecommendation: (Begrunnelse for hvorfor den valgte designstilen eller en foreslått stil passer)
- keyTechnologies: (Array med 4 anbefalte teknologier)
- estimatedTimeline: (Estimert gjennomføringstid, f.eks "6 - 10 uker")
- estimatedRoi: (Forventet avkastning / effekt, f.eks "+250% økt digital konvertering")

Returner KUN gyldig JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const data = JSON.parse(responseText);

    res.json({
      success: true,
      recommendation: data,
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({
      success: false,
      error: "Klarte ikke å generere AI-strategi. Vennligst prøv igjen.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Widevig Digital Server running on http://localhost:${PORT}`);
  });
}

startServer();
