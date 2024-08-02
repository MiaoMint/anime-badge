"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";

const BadgeModel = dynamic(
  () => import("../components/Model").then((mod) => mod.Model),
  { ssr: false }
);

export default function HomePage() {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="relative size-full bg-slate-950">
        <div className="absolute -z-0 inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />
        <Canvas className="size-full" shadows dpr={[1, 2]} camera={{ fov: 50 }}>
          <Suspense fallback={null}>
            <Stage preset="rembrandt" intensity={1} environment="city">
              <BadgeModel image={imageFile} />
            </Stage>
          </Suspense>
          <OrbitControls autoRotate={autoRotate} />
        </Canvas>
      </div>
      <div className="bg-slate-950 p-4  flex-col gap-4 flex-shrink-0 md:w-[300px] h-[300px] md:flex">
        <div className="flex flex-col gap-4 flex-1">
          <div className="grid w-full items-center gap-1.5">
            <Label>Model</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Anime badge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anime-badge">Anime badge</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImageFile(e.target.files?.[0]);
              }}
            />
          </div>
          <div className="flex items-center space-x-2 w-full">
            <Switch
              id="auto-rotate"
              checked={autoRotate}
              onCheckedChange={setAutoRotate}
            />
            <Label htmlFor="auto-rotate">Auto Rotate</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
