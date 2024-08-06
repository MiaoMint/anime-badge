import "cropperjs/dist/cropper.css";
import Cropper, { ReactCropperElement } from "react-cropper";
import React, { useRef } from "react";

interface ImageCropperProps {
  imageUrl: string;
  onCrop: (url: string) => void;
}

export default function ImageCropper(props: ImageCropperProps) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    props.onCrop(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <Cropper
      src={props.imageUrl}
      style={{ maxHeight: 300, width: "100%" }}
      initialAspectRatio={1}
      guides={true}
      cropend={onCrop}
      aspectRatio={1}
      viewMode={1}
      ref={cropperRef}
    />
  );
}
