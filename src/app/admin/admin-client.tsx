"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, Trash2, Plus } from "lucide-react";
import { Memory } from "@/lib/types";

// A simple, hardcoded password for now.
const ADMIN_PASSWORD = "password";

export function AdminClient({ memories }: { memories: Memory[] }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Upload State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sentence, setSentence] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !sentence) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("sentence", sentence);

    try {
      const response = await fetch("/api/memories", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsUploadOpen(false);
        setSelectedFile(null);
        setSentence("");
        router.refresh(); // Refresh server components to show new data
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this memory?")) return;

    try {
      const response = await fetch("/api/memories", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to delete memory");
      }
    } catch (error) {
      console.error("Error deleting memory:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 pt-24">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 pt-24">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 font-headline">
            Manage Memories
          </h1>
          
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Memory
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Memory</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sentence">Sentence</Label>
                  <Textarea
                    id="sentence"
                    placeholder="Write a heartfelt sentence..."
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload Memory"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {memories.map((memory) => (
            <div key={memory.id} className="relative group aspect-square rounded-lg overflow-hidden border bg-white shadow-sm">
              <Image
                src={memory.src}
                alt={memory.sentence || "Memory"}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                 <p className="text-white text-xs mb-2 line-clamp-3">
                   {memory.sentence}
                 </p>
                 {memory.isUpload && (
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleDelete(memory.id)}
                      title="Delete Memory"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
