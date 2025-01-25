"use client"
import '../App.css';
import TopPanel from "../components/TopPanel";
import LeftPanel from "../components/LeftPanel";
import MainPanel from "../components/MainPanel";
import RightPanel from "../components/RightPanel";

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
