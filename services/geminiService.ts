import { GoogleGenAI, Type } from "@google/genai";
import { StrategyResponse, Medication } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to encode image file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

export const generateStrategies = async (userScenario: string): Promise<StrategyResponse> => {
  if (!apiKey) throw new Error("API Key is missing");

  const model = "gemini-2.5-flash";
  const prompt = `
    Você é um arquiteto de software sênior especializado em saúde digital.
    O usuário é um técnico de engenharia projetando o app "Saúde Fácil".
    
    Cenário do problema: "${userScenario}"
    
    Gere 3 estratégias distintas e detalhadas para garantir a adesão ao tratamento.
    As estratégias devem utilizar: Lembrete Inteligente, Escaneamento de Receita, Alerta de Reposição, Compartilhamento Familiar.
    
    Retorne a resposta estritamente em JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  features: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  technicalImplementation: { type: Type.STRING }
                },
                required: ["title", "description", "features", "technicalImplementation"]
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as StrategyResponse;

  } catch (error) {
    console.error("Strategy Generation Error:", error);
    throw error;
  }
};

export const analyzePrescription = async (base64Image: string, mimeType: string): Promise<Medication[]> => {
  if (!apiKey) throw new Error("API Key is missing");

  const model = "gemini-2.5-flash"; // Multimodal capable
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Analyze this prescription image. Extract a list of medications with their dosage and frequency. If specific details are missing, infer standard instructions or mark as 'Confirmar com médico'."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              dosage: { type: Type.STRING },
              frequency: { type: Type.STRING }
            },
            required: ["name", "dosage", "frequency"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as Medication[];

  } catch (error) {
    console.error("Prescription Analysis Error:", error);
    throw error;
  }
};
