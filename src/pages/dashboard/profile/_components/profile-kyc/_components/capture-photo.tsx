import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import Webcam from "react-webcam";
import { ArrowLeft, Camera, RefreshCw } from "lucide-react";

interface CustomWebcamProps {
  onSelect: () => void;
  goBack?: () => void;
}

export default function CapturePhoto({ onSelect, goBack }: CustomWebcamProps) {
  const [photo, setPhoto] = useState<string | null>(null);
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
      className="flex flex-col items-center justify-center gap-6 w-full"
    >
      {/* Back Button */}
      <div className="flex justify-between items-center w-full">
        <Button
          variant="ghost"
          className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-custom-light-bg text-custom-white-text rounded-full hover:bg-custom-light-bg/80 transition-all duration-300 ease-in-out"
          onClick={goBack}
        >
          <ArrowLeft className="w-4 h-4" />
          <p>Back</p>
        </Button>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Upload or Capture Your ID</h3>
        <p className="text-sm text-muted-foreground">
          First, capture a live photo, then upload your ID document for
          verification.
        </p>
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
            <Button onClick={capturePhoto} className="rounded-full px-6 py-3">
              <Camera className="mr-2 w-4 h-4" />
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
            <Button variant="outline" onClick={handleRetake}>
              <RefreshCw className="mr-2 w-4 h-4" />
              Retake Photo
            </Button>
            <Button variant="outline" onClick={onSelect}>
              <RefreshCw className="mr-2 w-4 h-4" />
              Retake Photo
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
