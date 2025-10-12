import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import Webcam from "react-webcam";
import { RefreshCw } from "lucide-react";
import {
  RiArrowLeftSLine,
  RiArrowRightLine,
  RiCameraLine,
} from "react-icons/ri";

interface CustomWebcamProps {
  photo: string | null;
  setPhoto: (photo: string | null) => void;
  onSelect: () => void;
  goBack?: () => void;
}

export default function CapturePhoto({
  photo,
  setPhoto,
  onSelect,
  goBack,
}: CustomWebcamProps) {
  const webcamRef = useRef<Webcam>(null);

  // Capture photo from webcam
  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setPhoto(imageSrc);
  };

  const handleRetake = () => {
    setPhoto(null);
  };

  return (
    <motion.div
      key="step2"
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center gap-4 w-full"
    >
      {/* Back Button */}
      <div className="flex justify-between items-center w-full">
        <Button
          variant="ghost"
          className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-custom-light-bg text-custom-white-text rounded-full hover:bg-custom-light-bg/80 transition-all duration-300 ease-in-out"
          onClick={goBack}
        >
          <RiArrowLeftSLine className="w-4 h-4" />
          <p>Back</p>
        </Button>
      </div>

      {/* Header */}
      <div className="text-start">
        <h3 className="text-lg font-semibold">Upload or Capture Your ID</h3>
        <p className="text-sm text-muted-foreground">
          First, capture a live photo, then upload your ID document for
          verification.
        </p>
      </div>

      <div className="w-full">
        <h4 className="text-custom-orange font-medium mb-2">Note</h4>
        <ul className="list-disc pl-6 text-sm">
          <li> Don&apos;t take a picture of another picture</li>
          <li> Don&apos;t use filters of any kind</li>
        </ul>
      </div>

      {/* Webcam or Preview */}
      <div className="w-full flex flex-col items-center justify-center gap-3">
        {!photo ? (
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/png"
              videoConstraints={{ facingMode: "user" }}
              className="rounded-xl border w-full max-h-[300px] object-cover"
            />
            <Button
              onClick={capturePhoto}
              className="rounded-full px-6 py-3 cursor-pointer btn-primary"
            >
              <RiCameraLine className="w-4 h-4" />
              Capture Photo
            </Button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center gap-3">
            <img
              src={photo}
              alt="Captured"
              className="rounded-xl border w-full max-h-[300px] object-cover"
            />
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleRetake}
                className="rounded-full"
              >
                <RefreshCw className="w-4 h-4" />
                Retake Photo
              </Button>
              <Button
                variant="default"
                onClick={onSelect}
                className="btn-primary rounded-full"
              >
                Proceed
                <RiArrowRightLine className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
