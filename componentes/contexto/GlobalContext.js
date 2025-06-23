import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import alert from "../../outros/Alert";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [logado, setLogado] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [totalCarrinho, setTotalCarrinho] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("logado").then((v) => {
      if (v === "true") setLogado(true);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("carrinho").then((json) => {
      const dados = JSON.parse(json || "[]");
      setItensCarrinho(dados);
    });
  }, []);

  useEffect(() => {
    const totalCalculado = itensCarrinho.reduce(
      (acc, item) => acc + item.preco,
      0
    );
    setTotalCarrinho(totalCalculado);
  }, [itensCarrinho]);

  async function adicionarProduto(produto) {
    const existente = itensCarrinho.find((i) => i.id === produto.id);
    let atualizado;

    if (existente) {
      atualizado = itensCarrinho.map((i) =>
        i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
      );
    } else {
      atualizado = [...itensCarrinho, { ...produto, quantidade: 1 }];
    }

    setItensCarrinho(atualizado);
    await AsyncStorage.setItem("carrinho", JSON.stringify(atualizado));
    alert("Produto adicionado ao carrinho!");
  }

  return (
    <GlobalContext.Provider
      value={{
        logado,
        setLogado,
        itensCarrinho,
        adicionarProduto,
        totalCarrinho,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
