'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Posts from "@/types/Posts";
import ErrorMessage from "@/components/errorMessage";
import { use } from "react";

interface PostProps {
    params: Promise<{ id: string }>;
}

export default function PostByIdPage({ params }: PostProps) {
  const { id } = use(params);

  const {
    data: postsData,
    isLoading: postsIsLoading,
    isError: postsIsError,
    error: postsError,
    refetch: postsRefetch,
  } = useQuery({
    queryKey: ['listaPostsPorId', id],
    queryFn: async () => {
      if(process.env.NEXT_PUBLIC_SIMULAR_ERRO === 'true') {
        throw new Error('Erro simulado para testes')
      }
      if(process.env.NEXT_PUBLIC_SIMULAR_LOADING === 'true') {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      return fetchData<Posts>(`/posts/${id}`)
    }
  })

  return (
    <div>
        <h1>Listagem do Post Id: {id}</h1>

        {postsIsLoading && (<p className="border text-red-500 text-5xl p-2">Carregando...</p>)}
        {!postsIsLoading && !postsIsError && postsData ? (
          <>
          <ErrorMessage tipo="success" text="Post Encontrado com Sucesso!"><></></ErrorMessage>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Body</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={postsData.id}>
                <TableCell>{postsData.id}</TableCell>
                <TableCell>{postsData.title}</TableCell>
                <TableCell>{postsData.body}</TableCell>
              </TableRow>
              </TableBody>
            </Table>
          </>
        ): null }

        {!postsIsLoading && (postsError || !postsData) && (
          <ErrorMessage tipo="error" text="Erro ao buscar post por ID!" >
            <>
            </>
          </ErrorMessage>
        )}
    </div>
  );
}