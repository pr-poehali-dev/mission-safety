import { useState } from "react";
import { Screen } from "@/components/game/types";
import { HomeScreen, NavBar } from "@/components/game/HomeScreen";
import { LevelsScreen } from "@/components/game/LevelsScreen";
import { AchievementsScreen } from "@/components/game/AchievementsScreen";
import { CharacterScreen } from "@/components/game/CharacterScreen";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <div className="font-nunito">
      {screen === "home" && <HomeScreen setScreen={setScreen} />}
      {screen === "levels" && <LevelsScreen />}
      {screen === "achievements" && <AchievementsScreen />}
      {screen === "character" && <CharacterScreen />}
      <NavBar screen={screen} setScreen={setScreen} />
    </div>
  );
}
