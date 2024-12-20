import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from './components/_layout/Layout';
import Home from './pages/Home';
import Map from './pages/Map';
import PathDetail from './pages/PathDetail';
import PathFinal from './pages/PathFinal';
import PathFinder from './pages/PathFinder';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" options={{ headerShown: false }}>
                {() => (
                    <Home />
                )}
            </Stack.Screen>
            <Stack.Screen name="Map" options={{ headerShown: false }}>
                {() => (
                    <Layout>
                        <Map />
                    </Layout>
                )}
            </Stack.Screen>
            <Stack.Screen name="PathFinder" options={{ headerShown: false }}>
                {() => (
                    <Layout>
                        <PathFinder />
                    </Layout>
                )}
            </Stack.Screen>
            <Stack.Screen name="PathDetail" options={{ headerShown: false }}>
                {(props) => (
                    <Layout>
                        <PathDetail {...props} />
                    </Layout>
                )}
            </Stack.Screen>
            <Stack.Screen name="PathFinal" options={{ headerShown: false }}>
                {() => (
                    <Layout>
                        <PathFinal />
                    </Layout>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default Router;
