"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Component, FC, ReactNode, Suspense, useState } from "react";
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
import ImageCropper from "@/components/ImageCropper";
import { Model1 } from "@/components/models/Model1";
import { Model2 } from "@/components/models/Model2";

export default function HomePage() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [cropImageURL, setCropImageURL] = useState<string | undefined>(
    undefined
  );
  const [autoRotate, setAutoRotate] = useState(false);
  const [currentModel, setModel] = useState("Model1");

  const modelList = [
    {
      name: "Model1",
      component: Model1,
    },
    {
      name: "Model2",
      component: Model2,
    },
  ];
  const Model = modelList.find(
    (model) => model.name === currentModel
  )!.component;

  const handleCrop = (url: string) => {
    if (url != cropImageURL) {
      setCropImageURL(url);
    }
  };

  const handleDownloadImage = () => {
    html2canvas(document.querySelector("#viewer")!).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "badge.png";
      link.click();
    });
  };

  return (
    <div className="h-screen md:flex">
      <div className="relative size-full h-[400px] md:h-full" id="viewer">
        <div className="absolute -z-0 inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />
        <Canvas gl={{ preserveDrawingBuffer: true }} shadows>
          <Suspense fallback={null}>
            <Stage
              preset="rembrandt"
              intensity={1}
              environment="city"
              shadows
              adjustCamera
            >
              <Model imageUrl={cropImageURL} />
            </Stage>
          </Suspense>
          <OrbitControls autoRotate={autoRotate} />
        </Canvas>
      </div>
      <div className="bg-slate-950 p-4  flex-col gap-4 flex-shrink-0 w-full md:w-[300px] md:h-full flex overflow-auto">
        <div className="flex flex-col gap-4 flex-1">
          <div className="grid w-full items-center gap-1.5">
            <Label>Model</Label>
            <Select
              onValueChange={(value) => {
                setModel(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Model1" />
              </SelectTrigger>
              <SelectContent>
                {modelList.map((model, index) => (
                  <SelectItem key={index} value={model.name}>
                    {model.name}
                  </SelectItem>
                ))}
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
                setImageUrl(
                  URL.createObjectURL((e.target.files as FileList)[0])
                );
              }}
            />
            {imageUrl && (
              <ImageCropper imageUrl={imageUrl} onCrop={handleCrop} />
            )}
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
        <div className="flex gap-3">
          <Button className="w-full" onClick={handleDownloadImage}>
            Download Image
          </Button>
          {/* 打印 */}
          {/* <Button className="w-full" onClick={() => window.print()}>
            Print
          </Button> */}
        </div>
      </div>
    </div>
  );
}
