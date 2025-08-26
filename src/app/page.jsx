"use client";

import { useState } from "react";
import axios from "axios";

export default function Page() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarUsuarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = response.data;
      setUsuarios(data);
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center font-bold mb-8">Usuários</h1>
        <div className="text-center mb-8">
          <div className="mb-6">
            <button
              onClick={buscarUsuarios}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Carregando..." : "Buscar Usuários"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuarios.map((usuario) => {
            return (
              <div key={usuario.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-bold text-lg text-gray-800">{usuario.name}</h3>
                <p className="text-gray-600">{usuario.email}</p>
                <p className="text-gray-600">{usuario.address.city}</p>
              </div>
            );
        })}
      </div>
    </div>
  );
}
