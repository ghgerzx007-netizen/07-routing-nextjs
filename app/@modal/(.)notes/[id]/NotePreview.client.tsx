"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

interface Props {
  id: string;
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (!data) return null;

  return (
    <Modal onClose={() => router.back()}>
      <article>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <p>{data.tag}</p>
      </article>
    </Modal>
  );
}