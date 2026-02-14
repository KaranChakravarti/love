import fs from 'fs/promises';
import path from 'path';

// Define the interface for a Memory object
export interface Memory {
  id: string;
  src: string;
  sentence: string;
  date: string;
  isUpload: boolean;
}

const MEMORIES_FILE = path.join(process.cwd(), 'src/data/memories.json');

export async function getUploadedMemories(): Promise<Memory[]> {
  try {
    const data = await fs.readFile(MEMORIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or error, return empty array
    // console.error("Error reading memories file:", error);
    return [];
  }
}

export async function saveMemory(memory: Memory) {
  const memories = await getUploadedMemories();
  memories.push(memory);
  await fs.writeFile(MEMORIES_FILE, JSON.stringify(memories, null, 2));
}

export async function deleteMemory(id: string) {
  const memories = await getUploadedMemories();
  const memoryToDelete = memories.find((m) => m.id === id);
  if (!memoryToDelete) return;

  // Filter out the deleted memory
  const updatedMemories = memories.filter((m) => m.id !== id);
  await fs.writeFile(MEMORIES_FILE, JSON.stringify(updatedMemories, null, 2));

  // Try to delete the file
  if (memoryToDelete.src.startsWith('/uploads/')) {
    try {
      const filePath = path.join(process.cwd(), 'public', memoryToDelete.src);
      await fs.unlink(filePath);
    } catch (e) {
      console.error("Failed to delete file:", e);
    }
  }
}
