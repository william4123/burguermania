import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { GlobalProvider, useGlobal } from "./componentes/contexto/GlobalContext";
import CadastroScreen from "./componentes/telas/CadastroScreen";
import CardapioScreen from "./componentes/telas/CardapioScreen";
import CarrinhoScreen from "./componentes/telas/CarrinhoScreen";
import LoginScreen from "./componentes/telas/LoginScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppInterno() {
  const { logado, setLogado } = useGlobal();

  async function criarBanco() {
    const db = await SQLite.openDatabaseAsync("burguermania.db");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
      );
    `);
  }

  useEffect(() => {
    criarBanco();
  }, []);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="🔒 Deslogar"
          onPress={async () => {
            await AsyncStorage.clear();
            setLogado(false);
          }}
          style={{ marginTop: "auto" }}
          labelStyle={{ color: "#d32f2f", fontWeight: "bold" }}
        />
      </DrawerContentScrollView>
    );
  }

  function MainDrawer() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="🥡 Cardápio" component={CardapioScreen} />
        <Drawer.Screen name="🛒 Carrinho" component={CarrinhoScreen} />
      </Drawer.Navigator>
    );
  }

  function AuthStack() {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Main" component={MainDrawer} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {logado ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GlobalProvider>
      <AppInterno />
    </GlobalProvider>
  );
}
