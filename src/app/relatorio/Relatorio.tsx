'use client'

import { useQueryState } from "nuqs"

export default function Relatorio() {

    const [nome, setNome] = useQueryState("nome");
    const [data, setData] = useQueryState("data");

    return (
        <div>Relatório
            <div>Nome: {nome}</div>
            <div>Data: {data}</div>
        </div>
    )
}