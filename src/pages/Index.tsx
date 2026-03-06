import { useState } from "react";
import { Screen } from "@/components/game/types";
import { HomeScreen, NavBar } from "@/components/game/HomeScreen";
import { LevelsScreen } from "@/components/game/LevelsScreen";
import { AchievementsScreen } from "@/components/game/AchievementsScreen";
import { CharacterScreen } from "@/components/game/CharacterScreen";
import { MissionScreen } from "@/components/game/MissionScreen";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeMission, setActiveMission] = useState<number | null>(null);

  const handleStartMission = (levelId: number) => {
    setActiveMission(levelId);
  };

  const handleBackFromMission = () => {
    setActiveMission(null);
  };

  if (activeMission !== null) {
    return <MissionScreen levelId={activeMission} onBack={handleBackFromMission} />;
  }

  return (
    <div className="font-nunito">
      {screen === "home" && <HomeScreen setScreen={setScreen} />}
      {screen === "levels" && <LevelsScreen onStartMission={handleStartMission} />}
      {screen === "achievements" && <AchievementsScreen />}
      {screen === "character" && <CharacterScreen />}
      <NavBar screen={screen} setScreen={setScreen} />
    </div>
  );
}
