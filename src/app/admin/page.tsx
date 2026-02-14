import { AdminClient } from "./admin-client";
import { getUploadedMemories } from "@/lib/memories";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const uploadedMemories = await getUploadedMemories();

  return <AdminClient memories={uploadedMemories} />;
}
