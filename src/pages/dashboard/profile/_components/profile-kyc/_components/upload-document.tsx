import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowLeft, UploadCloud, FileText } from "lucide-react";
import { useRef, useState } from "react";

interface UploadDocumentProps {
  onSelect: () => void;
  isLoading: boolean;
  goBack?: () => void;
}

export default function UploadDocument({
  onSelect,
  isLoading,
  goBack,
}: UploadDocumentProps) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      key="step3"
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
        <h3 className="text-lg font-semibold">Upload Your ID Document</h3>
        <p className="text-sm text-muted-foreground">
          Please upload a clear image or PDF of your ID card or passport.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed rounded-xl w-full h-48 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/60 transition"
        onClick={handleUploadClick}
      >
        <UploadCloud className="w-10 h-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Click to upload or drag & drop your file here
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* File Preview */}
      {file && (
        <div className="flex items-center justify-between w-full bg-muted p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm">{file.name}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFile(null)}
            className="text-xs"
          >
            Remove
          </Button>
        </div>
      )}

      {/* Submit Button */}
      <Button
        className="w-full mt-4 rounded-full py-6"
        disabled={!file || isLoading}
        onClick={onSelect}
      >
        Finish Verification
      </Button>
    </motion.div>
  );
}
