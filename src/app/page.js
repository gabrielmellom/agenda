import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">AgendaFácil</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link 
          href="/admin"
          className="bg-blue-600 text-white py-3 px-4 rounded-lg font-medium text-center"
        >
          Acessar Painel Admin
        </Link>
        <p className="text-center text-gray-500">
          Esta é uma demonstração. Em produção, você compartilharia um link específico
          para cada cliente agendar.
        </p>
        <Link
          href="/agendar/exemplo"
          className="border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium text-center"
        >
          Ver Exemplo de Agendamento
        </Link>
      </div>
    </main>
  );
}