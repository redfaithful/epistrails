"use client"
import '../App.css';
import TopPanel from "./TopPanel";
import LeftPanel from "./LeftPanel";
import MainPanel from "./MainPanel";
import RightPanel from "./RightPanel";

export default function Home() {
  return (
    <div className="container">
      <TopPanel />
      <div className="mainLayout">
        <LeftPanel />
        <MainPanel />
        <RightPanel />
      </div>
    </div>
  )
}
