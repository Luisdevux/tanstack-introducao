'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Posts from "@/types/Posts";
import ErrorMessage from "@/components/errorMessage";

export default function PostsPage() {

  const {
    data: postsData,
    isLoading: postsIsLoading,
    isError: postsIsError,
    error: postsError,
    refetch: postsRefetch,
  } = useQuery({
    queryKey: ['listaPostsPaginaInicial'],
    queryFn: async () => {
      if(process.env.NEXT_PUBLIC_SIMULAR_ERRO === 'true') {
        throw new Error('Erro simulado para testes')
      }
      if(process.env.NEXT_PUBLIC_SIMULAR_LOADING === 'true') {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      return fetchData<Posts[]>('/posts')
    }
  })

  return (
    <div>
        <h1>Listagem de posts</h1>

        {postsIsLoading && (<p className="border text-red-500 text-5xl p-2">Carregando...</p>)}
        {!postsIsLoading && !postsIsError && postsData && postsData?.length > 0 ? (
          <>
          <ErrorMessage tipo="success" text="Posts encontrados:">{postsData.length}</ErrorMessage>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {postsData?.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ):(
          <ErrorMessage tipo="error" text="Erro ao buscar posts">Nenhum post encontrado.</ErrorMessage>
        )}
    </div>
  );
}