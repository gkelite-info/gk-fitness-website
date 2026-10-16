export interface SelectedVideoItem {
  id: string;
  file: File;
  previewUrl: string;
  duration: string;
  selected: boolean;
}

export function validateVideoFile(file: File): boolean {
  const validTypes = ["video/mp4", "video/quicktime", "video/mov", "video/webm"];
  return validTypes.includes(file.type) || Boolean(file.name.match(/\.(mp4|mov|webm)$/i));
}

export function formatFileSize(bytes?: number): string {
  if (!bytes) return "0 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export function getVideoDuration(file: File): Promise<string> {
  return new Promise((resolve) => {
    try {
      const tempUrl = URL.createObjectURL(file);
      const tempVideo = document.createElement("video");
      tempVideo.preload = "metadata";
      tempVideo.src = tempUrl;

      const cleanup = () => {
        try {
          URL.revokeObjectURL(tempUrl);
        } catch {
          // ignore
        }
      };

      tempVideo.onloadedmetadata = () => {
        const sec = tempVideo.duration;
        cleanup();
        if (isNaN(sec) || sec <= 0) {
          resolve("00:30");
          return;
        }
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        resolve(`${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`);
      };

      tempVideo.onerror = () => {
        cleanup();
        resolve("00:30");
      };
    } catch {
      resolve("00:30");
    }
  });
}

export async function createSelectedVideoItem(file: File): Promise<SelectedVideoItem> {
  const duration = await getVideoDuration(file);
  const previewUrl = URL.createObjectURL(file);
  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    file,
    previewUrl,
    duration,
    selected: true,
  };
}
