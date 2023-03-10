import React from "react";
import { FullScreenHandle } from "react-full-screen";

export interface ImageFullScreenProps {
    children: React.ReactNode
    onChange: (state: boolean, handle: FullScreenHandle) => void;
}