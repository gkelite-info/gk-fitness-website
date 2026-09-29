"use client";
import { useState } from "react";
import { CheckCircle, Gear, Prohibit, ArrowsCounterClockwise, Minus, Plus, Cube } from "@phosphor-icons/react";
import { toast } from "react-hot-toast";

type ActionType = 'add' | 'maintenance' | 'outofservice' | 'restore';

export default function UpdateStockPanel() {
  const [selectedAction, setSelectedAction] = useState<ActionType>('add');
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleUpdate = () => {
    toast.success("Stock updated successfully!");
  };

  const actions = [
    {
      id: 'add' as ActionType,
      title: 'Add New Units',
      desc: 'Increase the total number of units',
      icon: <CheckCircle size={20} className="text-[#C6FF00]" />,
      bg: 'bg-[#1A2319]',
      border: 'border-[#2B3D1C]',
      activeBorder: 'border-[#C6FF00]',
      activeBg: 'bg-[#141B22]'
    },
    {
      id: 'maintenance' as ActionType,
      title: 'Move to Maintenance',
      desc: 'Move units to under maintenance',
      icon: <Gear size={16} weight="fill" className="text-[#F97316]" />,
      bg: 'bg-[#241C18]',
      border: 'border-[#3E271A]',
      activeBorder: 'border-[#C6FF00]',
      activeBg: 'bg-[rgba(20,24,31,0.7)]'
    },
    {
      id: 'outofservice' as ActionType,
      title: 'Mark Out of Service',
      desc: 'Mark units as out of service',
      icon: <Prohibit size={20} className="text-[#EF4444]" />,
      bg: 'bg-[#25191A]',
      border: 'border-[#3F2122]',
      activeBorder: 'border-[#C6FF00]',
      activeBg: 'bg-[rgba(20,24,31,0.7)]'
    },
    {
      id: 'restore' as ActionType,
      title: 'Restore to Available',
      desc: 'Move units back to available',
      icon: <ArrowsCounterClockwise size={20} className="text-[#38BDF8]" />,
      bg: 'bg-[#14232C]',
      border: 'border-[#1C3848]',
      activeBorder: 'border-[#C6FF00]',
      activeBg: 'bg-[rgba(20,24,31,0.7)]'
    }
  ];

  return (
    <div className="flex flex-col items-start p-6 gap-6 w-full h-full flex-1 bg-[#12171E] border border-[#1D2633] shadow-sm rounded-2xl">
      <div className="flex flex-col items-start gap-1 w-full">
        <h2 className="font-sans font-bold text-xl leading-7 tracking-[-0.5px] text-white">
          Update Stock
        </h2>
        <p className="font-sans font-normal text-xs leading-4 text-[#7E8B9B]">
          Update the stock status for this equipment
        </p>
      </div>
      <div className="flex flex-col items-start gap-3 w-full">
        <label className="font-sans font-semibold text-xs leading-4 text-white">
          Select Action
        </label>
        
        <div className="flex flex-col gap-3 w-full">
          {actions.map((act) => (
            <div 
              key={act.id}
              onClick={() => setSelectedAction(act.id)}
              className={`flex flex-row justify-between items-center p-3.5 gap-4 w-full border rounded-xl cursor-pointer transition-colors ${selectedAction === act.id ? `${act.activeBorder} ${act.activeBg}` : 'border-[#1D2633] bg-[rgba(20,24,31,0.7)] hover:border-[#2b394d]'}`}
            >
              <div className="flex flex-row items-center gap-3.5 flex-1">
                <div className={`flex justify-center items-center w-9 h-9 rounded-lg ${act.bg} ${act.border} border shrink-0`}>
                  {act.icon}
                </div>
                <div className="flex flex-col items-start gap-1 flex-1">
                  <h4 className="font-sans font-semibold text-sm leading-5 text-white break-words w-full">
                    {act.title}
                  </h4>
                  <p className="font-sans font-normal text-[11px] leading-4 text-[#7E8B9B] break-words w-full">
                    {act.desc}
                  </p>
                </div>
              </div>
              <div className={`flex justify-center items-center w-5 h-5 rounded-full border-2 transition-colors shrink-0 ${selectedAction === act.id ? 'border-[#C6FF00]' : 'border-[#334155]'}`}>
                {selectedAction === act.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C6FF00] shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <label className="font-sans font-semibold text-xs leading-4 text-white">
          Quantity
        </label>
        <div className="flex flex-row flex-wrap items-center gap-4 w-full">
          <div className="flex flex-row justify-between items-center px-2 py-1 w-[130px] h-[46px] bg-[#151C24] border border-[#222D3B] rounded-xl shrink-0">
            <button 
              onClick={handleDecrease}
              className="flex justify-center items-center w-9 h-9 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Minus size={16} weight="bold" className="text-white" />
            </button>
            <span className="font-sans font-bold text-base leading-6 text-white text-center flex-1">
              {quantity}
            </span>
            <button 
              onClick={handleIncrease}
              className="flex justify-center items-center w-9 h-9 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Plus size={16} weight="bold" className="text-white" />
            </button>
          </div>
          <span className="font-sans font-normal text-xs text-[#7E8B9B] max-w-[185px]">
            Enter the number of units you want to update.
          </span>
        </div>
      </div>
      <button 
        onClick={handleUpdate}
        className="flex flex-row justify-center items-center px-4 py-3.5 gap-2 w-full bg-[#C6FF00] rounded-xl hover:bg-[#b5e600] transition-colors cursor-pointer shadow-sm mt-auto shrink-0"
      >
        <Cube size={20} weight="bold" className="text-black" />
        <span className="font-sans font-bold text-sm leading-5 text-black">
          Update Stock
        </span>
      </button>

    </div>
  );
}
