import { useEffect, useState } from "react";
import Picker from "react-mobile-picker";
import { useToast } from "@/components/ui/use-toast";

function renderOptions(options: string[], selectedColor?: string) {
  return options.map((option) => (
    <Picker.Item key={option} value={option}>
      {({ selected }) => (
        <div
          className={
            selected ? `font-semibold ${selectedColor} ` : "text-[#aaa]"
          }
        >
          {option}
        </div>
      )}
    </Picker.Item>
  ));
}

export default function InlinePicker({
  setAdults,
  setChildren,
  setToddlers,
  setInfants,
}: {
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  setToddlers: React.Dispatch<React.SetStateAction<number>>;
  setInfants: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [pickerValue, setPickerValue] = useState({
    adults: "0",
    children: "0",
    toddlers: "0",
    infants: "0",
  });

  const { toast } = useToast();

  useEffect(() => {
    // Convert values to numbers
    const adults = Number(pickerValue.adults);
    const children = Number(pickerValue.children);
    const toddlers = Number(pickerValue.toddlers);
    const infants = Number(pickerValue.infants);

    // Ensure at least 1 adult if there are children, toddlers, or infants
    if (adults === 0 && (children > 0 || toddlers > 0 || infants > 0)) {
      toast({
        description:
          "⚠当店をご利用の際は、お子様の安全のため、成人の保護者様とご同行いただきますようお願い申し上げます。",
      });
      setPickerValue((prev) => ({ ...prev, adults: "1" }));
    } else {
      setAdults(adults);
    }

    setChildren(children);
    setToddlers(toddlers);
    setInfants(infants);
  }, [pickerValue, setAdults, setChildren, setToddlers, setInfants, toast]);

  const selection = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <>
      <p className="pb-4 text-[#803C00] font-bold">
        人数を入力してください：
        <span className="block text-[10px] text-[#bf826d] font-normal">
          ※0歳児のお子さまは無料です
        </span>
      </p>

      <div className="flex justify-around items-center ">
        <p className="text-center flex-1">
          未就学児
          <span className="text-xs block">（1~3歳未満）</span>
        </p>
        <p className="text-center flex-1">
          未就学児
          <span className="text-xs block">（3歳以上）</span>
        </p>
        <p className="text-center flex-1">小学生</p>
        <p className="text-center flex-1">大人</p>
      </div>

      <Picker
        className="px-2 bg-gradient-to-b from-[#ffe] via-[#ffe] to-[#ffe]"
        value={pickerValue}
        onChange={setPickerValue}
        wheelMode="natural"
      >
        <Picker.Column name="infants">
          {renderOptions([...selection], "text-[#803C00]")}
        </Picker.Column>
        <Picker.Column name="toddlers">
          {renderOptions([...selection], "text-[#803C00]")}
        </Picker.Column>
        <Picker.Column name="children">
          {renderOptions([...selection], "text-[#803C00]")}
        </Picker.Column>
        <Picker.Column name="adults">
          {renderOptions([...selection], "text-[#803C00]")}
        </Picker.Column>
      </Picker>
    </>
  );
}
