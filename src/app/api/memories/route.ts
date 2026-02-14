import { NextResponse } from 'next/server';
import { saveMemory, deleteMemory } from '@/lib/memories';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File | null;
        const sentence = formData.get('sentence') as string | null;

        if (!file || !sentence) {
            return NextResponse.json(
                { error: 'Image and sentence are required' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Sanitize filename
        const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Directory likely exists
        }

        await writeFile(path.join(uploadDir, filename), buffer);

        const memory = {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            src: `/uploads/${filename}`,
            sentence: sentence,
            date: new Date().toISOString(),
            isUpload: true,
        };

        // Save metadata
        // @ts-ignore
        await saveMemory(memory);

        return NextResponse.json({ success: true, memory });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json(
            { error: 'Failed to upload memory' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        await deleteMemory(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Error:', error);
        return NextResponse.json(
            { error: 'Failed to delete memory' },
            { status: 500 }
        );
    }
}
