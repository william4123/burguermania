import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import alert from "../../outros/Alert";
import { useGlobal } from "../contexto/GlobalContext";

export default function CarrinhoScreen() {
  const { itensCarrinho, totalCarrinho } = useGlobal();

  if (itensCarrinho.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: "#999" }}>Carrinho está vazio</Text>
      </View>
    );
  }

  function finalizar() {
    alert("Pedido finalizado com sucesso!");
  }

  function renderizar({ item }) {
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.nome}>{item.nome}</Text>
        </View>
        <Text style={styles.subtotal}>R$ {item.preco.toFixed(2)}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <FlatList
        data={itensCarrinho}
        renderItem={renderizar}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Total:</Text>
        <Text style={styles.totalValor}>R$ {totalCarrinho.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={finalizar}>
        <Text style={styles.botaoTexto}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  preco: {
    fontSize: 14,
    color: "#666",
  },
  subtotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 12,
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d32f2f",
  },
  botao: {
    backgroundColor: "#d32f2f",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
