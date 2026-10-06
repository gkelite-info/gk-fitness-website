"use client";
import { useState, useRef, useEffect } from "react";
import { CloudArrowUp, CalendarBlank, CaretDown, Minus, Plus, CircleNotch } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { compressImage } from "@/app/(screens)/components/imageCompressor";
import { useSaveGymInventory } from "@/lib/hooks/inventory/useGymInventory";
import { useUser } from "@/app/context/UserContext";
import { createClient } from "@/app/api/supabase/client";
import { useRouter } from "next/navigation";

interface AddEquipmentFormProps {
  equipmentName: string;
  setEquipmentName: (name: string) => void;
  imagePreview?: string | null;
  setImagePreview: (url: string | null) => void;
  initialData?: any;
}

export default function AddEquipmentForm({ equipmentName, setEquipmentName, imagePreview, setImagePreview, initialData }: AddEquipmentFormProps) {
  const [quantity, setQuantity] = useState(initialData?.quantity || 1);
  const [purchaseDate, setPurchaseDate] = useState(initialData?.purchaseDate ? new Date(initialData.purchaseDate).toISOString().split('T')[0] : "");
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [isDragging, setIsDragging] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize data on mount if in edit mode
  useEffect(() => {
    if (initialData) {
      if (initialData.equipmentName) setEquipmentName(initialData.equipmentName);
      if (initialData.quantity) setQuantity(initialData.quantity);
      if (initialData.purchaseDate) setPurchaseDate(new Date(initialData.purchaseDate).toISOString().split('T')[0]);
      if (initialData.notes) setNotes(initialData.notes);
      if (initialData.image) setImagePreview(initialData.image);
    }
  }, [initialData, setEquipmentName, setImagePreview]);

  const { user, roleData } = useUser();
  const router = useRouter();
  const gymId = roleData?.[0]?.gymId || null;
  const saveMutation = useSaveGymInventory();

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleFile = async (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB.");
      return;
    }

    try {
      const compressedFile = await compressImage(file, {
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8
      });
      setImageFile(compressedFile);
      const imageUrl = URL.createObjectURL(compressedFile);
      setImagePreview(imageUrl);
      toast.success("Image compressed and loaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to process image.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!equipmentName.trim()) {
      toast.error("Equipment Name is required.");
      return;
    }
    if (!gymId || !user?.id) {
      toast.error("User or gym context missing.");
      return;
    }

    try {
      const supabase = createClient();
      let uploadedImageName = null;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('equipment')
          .upload(fileName, imageFile);
          
        if (uploadError) {
          throw uploadError;
        }
        uploadedImageName = uploadData.path;
      }

      await saveMutation.mutateAsync({
        gymInventoryId: initialData?.gymInventoryId,
        gymId,
        equipmentName,
        quantity,
        purchaseDate: purchaseDate || new Date().toISOString(),
        notes: notes.trim(),
        image: uploadedImageName || initialData?.image,
        createdBy: user.id,
      });

      toast.success("Equipment saved successfully!");
      router.push("/owner/inventory");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save equipment.");
    }
  };

  return (
    <div className="flex flex-col items-start p-5 sm:p-6 gap-5 w-full h-full flex-1 bg-[#151719] border border-[#22252B] rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] relative overflow-hidden">
      <div className="flex flex-col items-start gap-0.5 w-full z-10 shrink-0">
        <h2 className="font-sans font-semibold text-base leading-6 text-white">
          Equipment Details
        </h2>
        <p className="font-sans font-normal text-xs leading-4 text-[#8E929B]">
          Fill in the information below to add new equipment to your inventory.
        </p>
      </div>
      <div className="flex flex-col items-start gap-5 w-full z-10 mt-1">
        <div className="flex flex-col items-start gap-2 w-full shrink-0">
          <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
            Equipment Image
          </label>
          
          {imagePreview ? (
            <div className="flex flex-row items-center justify-between p-4 w-full h-[120px] bg-[rgba(17,18,21,0.5)] border border-[#292E38] rounded-2xl">
              <div className="flex flex-row items-center gap-4">
                <div 
                  className="w-[88px] h-[88px] rounded-xl border border-[#1F2937] bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url(${imagePreview})` }}
                />
                <div className="flex flex-col items-start gap-1">
                  <span className="font-sans font-semibold text-sm text-white">Image Uploaded</span>
                  <span className="font-sans font-normal text-xs text-[#4ADE80]">Ready for preview</span>
                </div>
              </div>
              <button 
                onClick={() => setImagePreview(null)}
                className="flex justify-center items-center px-4 py-2 bg-[#2A171A] border border-[#482025] rounded-xl hover:bg-[#3d191f] transition-colors cursor-pointer"
              >
                <span className="font-sans font-semibold text-xs text-[#F43F5E]">Remove</span>
              </button>
            </div>
          ) : (
            <div 
              className={`flex flex-col justify-center items-center py-6 px-4 w-full h-[120px] bg-[rgba(17,18,21,0.5)] border-2 border-dashed ${isDragging ? 'border-[#D4F400] bg-[rgba(212,244,0,0.05)]' : 'border-[#292E38] hover:border-[#3f4654]'} rounded-2xl transition-all cursor-pointer`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/jpeg, image/png, image/webp" 
                onChange={handleFileChange}
              />
              <div className="flex justify-center items-center w-10 h-10 rounded-full border border-[#D4F400] mb-2 shrink-0">
                <CloudArrowUp size={20} className="text-[#D4F400]" />
              </div>
              <span className="font-sans font-semibold text-xs leading-4 text-[#D4F400] tracking-[0.3px] mb-1">
                Upload Photo
              </span>
              <span className="font-sans font-normal text-[10px] leading-3 text-[#71717A] text-center">
                JPG, PNG up to 5MB
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
            Equipment Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            placeholder="Enter equipment name"
            value={equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
            className="flex flex-row items-center px-4 py-3 w-full bg-[#1D2024] border border-[#2B2F38] rounded-xl font-sans font-normal text-xs text-white placeholder-[#71717A] outline-none focus:border-[#D4F400] transition-colors"
          />
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
            Quantity (Total Units) <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-row flex-wrap items-center gap-4 w-full">
            <div className="flex flex-row justify-between items-center px-3 py-2 w-32 h-[42px] bg-[#1D2024] border border-[#2B2F38] rounded-xl shrink-0">
              <button 
                onClick={handleDecrease}
                className="flex justify-center items-center w-8 h-8 rounded shrink-0 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Minus size={16} weight="bold" className="text-[#A1A1AA]" />
              </button>
              <span className="font-sans font-semibold text-sm leading-5 text-white">
                {quantity}
              </span>
              <button 
                onClick={handleIncrease}
                className="flex justify-center items-center w-8 h-8 rounded shrink-0 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Plus size={16} weight="bold" className="text-[#D4F400]" />
              </button>
            </div>
            <span className="font-sans font-normal text-xs text-[#8E929B]">
              Total number of this equipment in your gym
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 w-full relative">
          <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
            Purchase Date <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <CalendarBlank size={16} className="text-[#F59E0B]" />
            </div>
            <input 
              type="date"
              value={purchaseDate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="flex flex-row items-center px-10 py-3 w-full bg-[#1D2024] border border-[#2B2F38] rounded-xl font-sans font-normal text-xs text-white outline-none focus:border-[#D4F400] transition-colors cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
            Notes <span className="text-[#64748B]">(Optional)</span>
          </label>
          <div className="relative w-full">
            <textarea 
              placeholder="Add any additional notes about this equipment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 200))}
              className="flex flex-row px-4 py-4 w-full h-[114px] bg-[#1D2024] border border-[#2B2F38] rounded-xl font-sans font-normal text-xs text-white placeholder-[#71717A] outline-none focus:border-[#D4F400] transition-colors resize-none scrollbar-themed"
            />
            <span className="absolute right-3.5 bottom-3 font-mono font-normal text-[11px] leading-4 text-[#71717A]">
              {notes.length}/200
            </span>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saveMutation.isPending}
          className="flex flex-row justify-center items-center px-4 py-3.5 w-full bg-[#D4F400] rounded-xl hover:bg-[#bbf000] disabled:bg-[#D4F400]/50 transition-colors cursor-pointer shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] mt-auto shrink-0"
        >
          {saveMutation.isPending ? (
            <CircleNotch size={16} className="text-black animate-spin" />
          ) : (
            <span className="font-sans font-bold text-xs leading-4 text-black uppercase tracking-[0.6px]">
              Save Equipment
            </span>
          )}
        </button>

      </div>
    </div>
  );
}
