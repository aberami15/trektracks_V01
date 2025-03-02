"main": "App.js"

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Preference"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Preference" component={PreferenceScreen} />
        <Stack.Screen name="BudgetPlanner" component={BudgetPlannerScreen} />
        <Stack.Screen name="BudgetOverview" component={BudgetOverviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return null; // Replace with your actual component
}