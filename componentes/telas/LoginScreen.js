import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import alert from "../../outros/Alert";
import Util from "../../outros/Util";
import { useGlobal } from "../contexto/GlobalContext";

export default function LoginScreen({ navigation }) {
  const { setLogado } = useGlobal();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function entrarCadastro() {
    navigation.navigate("Cadastro");
  }

  async function login() {
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (Util.validarEmail(email) === false) {
      alert("E-mail inválido.");
      return;
    }

    const db = await SQLite.openDatabaseAsync("burguermania.db");

    const resultado = await db.getFirstAsync(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (resultado) {
      await AsyncStorage.setItem("logado", "true");
      navigation.replace("Main");
      setLogado(true);
    } else {
      alert("E-mail ou senha incorretos.");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("../../assets/burguermania.png")}
        style={{
          width: 110,
          height: 110,
          marginBottom: 24,
          resizeMode: "contain",
        }}
      />

      <Text
        style={{
          fontSize: 32,
          color: "#d32f2f",
          fontWeight: "bold",
          marginBottom: 32,
        }}
      >
        BurguerMania
      </Text>

      <TextInput
        placeholder="E-mail"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={entrarCadastro}>
        <Text style={styles.linkText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#d32f2f",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    color: "#d32f2f",
    textAlign: "center",
    marginTop: 8,
  },
});
