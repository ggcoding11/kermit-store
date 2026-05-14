import React from "react";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <div className="container min-vh-100">
      <Header />

      <h1>Página não encontrada!</h1>

      <p>Não conseguimos achar o caminho que você deseja. Por favor tente outro endereço</p>
    </div>
  );
};

export default NotFound;
