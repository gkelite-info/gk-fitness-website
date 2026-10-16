"use client";

import { useState, ChangeEvent, DragEvent, forwardRef } from "react";
import { Folder } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import {
  SelectedVideoItem,
  validateVideoFile,
  createSelectedVideoItem,
} from "./videoUploadUtils";

interface VideoDropzoneProps {
  onVideosSelected: (items: SelectedVideoItem[]) => void;
  multiple?: boolean;
}

export const VideoDropzone = forwardRef<HTMLInputElement, VideoDropzoneProps>(
  function VideoDropzone({ onVideosSelected, multiple = true }, ref) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const processFiles = async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const validFiles = files.filter(validateVideoFile);

      if (validFiles.length === 0) {
        toast.error("Please select valid MP4 or MOV video files.");
        return;
      }

      const filesToProcess = multiple ? validFiles : [validFiles[0]];
      const processed: SelectedVideoItem[] = [];

      for (const f of filesToProcess) {
        const item = await createSelectedVideoItem(f);
        processed.push(item);
      }

      onVideosSelected(processed);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
        e.target.value = "";
      }
    };

    const triggerClick = () => {
      if (ref && "current" in ref && ref.current) {
        ref.current.click();
      }
    };

    return (
      <div className="w-full">
        <input
          ref={ref}
          type="file"
          multiple={multiple}
          accept="video/mp4,video/quicktime,video/mov,video/webm"
          className="hidden"
          onChange={handleChange}
        />

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerClick}
          className={`w-full min-h-[280px] sm:min-h-[340px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 sm:p-12 text-center cursor-pointer transition-all ${
            isDragOver
              ? "border-[#D4FF32] bg-[#D4FF32]/5 shadow-[0_0_30px_rgba(212,255,50,0.15)]"
              : "border-[#1E2638] bg-[#070A0F]/70 hover:border-[#D4FF32]/50 hover:bg-[#090C12]"
          }`}
        >
          <div className="w-16 h-20 mb-5 relative flex items-center justify-center">
            <svg
              viewBox="0 0 64 80"
              className="w-14 h-16 drop-shadow-[0_0_12px_rgba(212,255,50,0.4)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4H40L54 18V72C54 75.3137 51.3137 78 48 78H12C8.68629 78 6 75.3137 6 72V10C6 6.68629 8.68629 4 12 4Z"
                stroke="#D4FF32"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M40 4V18H54"
                stroke="#D4FF32"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M26 36L40 44L26 52V36Z" fill="#D4FF32" />
            </svg>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
            {multiple ? "Drag and drop videos here" : "Drag and drop video here"}
          </h3>

          <p className="text-xs sm:text-sm text-[#8E99AB] mb-6">
            Supported formats: MP4 / MOV / WEBM • Select multiple files
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerClick();
            }}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D4FF32] text-[#D4FF32] font-semibold text-xs sm:text-sm bg-transparent hover:bg-[#D4FF32]/10 active:scale-95 transition-all shadow-[0_0_12px_rgba(212,255,50,0.15)]"
          >
            <Folder size={18} weight="bold" />
            <span>{multiple ? "Browse Videos" : "Browse Video"}</span>
          </button>
        </div>
      </div>
    );
  }
);
