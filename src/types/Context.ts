import React from "react";
import { InfoBox } from "./InfoBox";
import { preset } from "../components/constant/preset";



export interface Context {
  view: number;
  setView: React.Dispatch<React.SetStateAction<number>>;
  fpvScrollProgress: number;
  setFpvScrollProgress: React.Dispatch<React.SetStateAction<number>>;
  droneScrollProgress: number;
  setDroneScrollProgress: React.Dispatch<React.SetStateAction<number>>;
  gardenScrollProgress: number;
  setGardenScrollProgress: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  infoBoxes: InfoBox[];
  setInfoBoxes: React.Dispatch<React.SetStateAction<InfoBox[]>>;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
  sound: boolean;
  setSound: React.Dispatch<React.SetStateAction<boolean>>;
  preset: preset
  setPreset: React.Dispatch<React.SetStateAction<preset>>
}
