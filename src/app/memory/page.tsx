import { MemoryClient } from "./memory-client";
import { getUploadedMemories } from "@/lib/memories";
import { shuffle } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function MemoryPage() {
  const uploadedMemories = await getUploadedMemories();
  
  // We shuffle the images to make the gallery feel different each time.
  const shuffledImages = shuffle(uploadedMemories);
  
  return <MemoryClient memories={shuffledImages} />;
}
