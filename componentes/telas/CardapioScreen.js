import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useGlobal } from "../contexto/GlobalContext";

const produtos = [
  {
    id: "1",
    nome: "Pizza calabresa",
    preco: 35.9,
    imagem: {
      uri: "https://swiftbr.vteximg.com.br/arquivos/ids/202872-768-768/618283-pizza-artesanal-de-calabresa_1.jpg?v=638679052014630000",
    },
  },
  {
    id: "2",
    nome: "Hambúrguer artesanal",
    preco: 24.5,
    imagem: {
      uri: "https://cloudfront-us-east-1.images.arcpublishing.com/estadao/77XTHHCCLBEXLC2Y5RK4PN37CE.jpg",
    },
  },
  {
    id: "3",
    nome: "Refrigerante 2L",
    preco: 8.0,
    imagem: {
      uri: "https://cdn.awsli.com.br/2610/2610989/produto/233534206/guarana-antarctica-pet-original-2l-5kvelyywk8.png",
    },
  },
  {
    id: "4",
    nome: "Mentos",
    preco: 3.0,
    imagem: {
      uri: "https://io.convertiez.com.br/m/farmaponte/shop/products/images/20139/large/bala-mastigavel-mentos-mint-com-16-unidades-de-38g-cada_13839.jpg",
    },
  },
  {
    id: "5",
    nome: "Doritos",
    preco: 10.0,
    imagem: {
      uri: "https://ibassets.com.br/ib.item.image.large/l-9e5518d6d1274a86beb20270affb9fe9.jpeg",
    },
  },
  {
    id: "6",
    nome: "Coxinha",
    preco: 8.0,
    imagem: {
      uri: "https://panattos.com.br/uploads/produtos/2017/03/coxinha-de-frango-com-requeijao-mini-congelada.jpg",
    },
  },
];

export default function CardapioScreen() {
  const { adicionarProduto } = useGlobal();

  function renderizar({ item }) {
    return (
      <View style={styles.card}>
        <Image source={item.imagem} style={styles.imagem} />
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => adicionarProduto(item)}
        >
          <Text style={styles.botaoTexto}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 8 }}>
      <FlatList
        data={produtos}
        renderItem={renderizar}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
}

const styles = {
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
    flex: 1,
    marginHorizontal: 8,
  },
  imagem: {
    width: 150,
    height: 125,
    marginBottom: 12,
    borderRadius: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  preco: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  botao: {
    backgroundColor: "#d32f2f",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
};
