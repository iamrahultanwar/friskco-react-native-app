import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeView from "../views/HomeView";
import DownloadsView from "../views/DownloadsView";
import SettingsView from "../views/SettingsView";

const Tab = createBottomTabNavigator();

export default function MainPage() {
  const icons = {
    home: ["home", "home-outline"],
    downloads: ["cloud-download", "cloud-download-outline"],
    settings: ["cog", "cog-outline"],
  };

  const CustomFooter = (props) => <Footer {...props} icons={icons} />;

  return (
    <>
      <Header />
      <Tab.Navigator tabBar={CustomFooter}>
        <Tab.Screen
          name="Home"
          component={HomeView}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Downloads"
          component={DownloadsView}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsView}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
}
