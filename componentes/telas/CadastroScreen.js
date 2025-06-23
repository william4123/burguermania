import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import alert from "../../outros/Alert";
import Util from "../../outros/Util";

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function voltar() {
    navigation.goBack();
  }

  async function cadastrar() {
    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (Util.validarEmail(email) === false) {
      alert("E-mail inválido.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const db = await SQLite.openDatabaseAsync("burguermania.db");

    const consulta = await db.getFirstAsync(
      "SELECT * FROM usuarios WHERE email = ?",
      email
    );
    if (consulta) {
      alert("E-mail já cadastrado. Tente outro.");
      return;
    }

    const inserir = await db.prepareAsync(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)"
    );
    const resultado = await inserir.executeAsync([nome, email, senha]);

    if (resultado.changes > 0) {
      alert("Cadastro realizado com sucesso!");
      navigation.goBack();
    } else {
      alert("Algo deu errado. Tente novamente.");
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
      <Text
        style={{
          fontSize: 32,
          color: "#d32f2f",
          fontWeight: "bold",
          marginBottom: 32,
        }}
      >
        Criar conta
      </Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

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

      <TextInput
        placeholder="Repita a senha"
        secureTextEntry
        style={styles.input}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={voltar}>
        <Text style={styles.linkText}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
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
};
