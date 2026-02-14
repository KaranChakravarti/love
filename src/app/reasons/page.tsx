import { generateLoveReasons } from "@/ai/flows/generate-love-reasons-flow";
import { ReasonsClient } from "./reasons-client";
import { staticReasons } from "./static-reasons";
import { shuffle } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function ReasonsPage() {
  let allReasons = [...staticReasons];
  try {
    const aiResult = await generateLoveReasons({ numReasons: 20 });
    if (aiResult?.reasons) {
        allReasons = shuffle([...staticReasons, ...aiResult.reasons]);
    } else {
        allReasons = shuffle(staticReasons);
    }
  } catch (error) {
    console.error("Failed to generate AI reasons:", error);
    allReasons = shuffle(staticReasons);
  }
  
  return <ReasonsClient reasons={allReasons} />;
}
