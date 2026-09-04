import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
  params: Promise<{ slug: string[] }>
}

export default async function NotesPage({ searchParams, params }: NotesPageProps) {
  

  const sp = await searchParams;
  const resolvedParams = await params;

  const page = Number(sp.page) || 1;
  const search = sp.search ?? "";

  const queryClient = new QueryClient();
  const tag = resolvedParams.slug?.[0] ?? "all";
   const normalizedTag = tag && tag !== "all" ? tag : undefined;
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search,normalizedTag],
    queryFn: () => fetchNotes(page, search,normalizedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={normalizedTag} />
    </HydrationBoundary>
  );
}
