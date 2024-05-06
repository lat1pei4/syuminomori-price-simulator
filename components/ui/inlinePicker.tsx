import { useEffect, useState } from "react";
import Picker from "react-mobile-picker";

function renderOptions(options: string[], selectedColor?: string) {
  return options.map((option) => (
    <Picker.Item key={option} value={option}>
      {({ selected }) => (
        <div
          className={
            selected ? `font-semibold ${selectedColor} ` : "text-neutral-400"
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
    adults: "",
    children: "",
    toddlers: "",
    infants: "",
  });

  useEffect(() => {
    setAdults(Number(pickerValue.adults));
    setChildren(Number(pickerValue.children));
    setToddlers(Number(pickerValue.toddlers));
    setInfants(Number(pickerValue.infants));
  }, [pickerValue, setAdults, setChildren, setToddlers, setInfants]);

  const selection = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <>
      <p className="pb-4">
        人数を入力してください：
        <span className="block text-xs"> *0歳児のお子さまは無料</span>
      </p>

      <div className="flex justify-around items-center px-8">
        <p className="text-center">
          乳幼児
          <span className="text-xs block">（1歳以上）</span>
        </p>
        <p className="text-center">
          幼児
          <span className="text-xs block">（3歳以上）</span>
        </p>
        <p className="text-center">
          子供
          <span className="text-xs block">（小学生以上）</span>
        </p>
        <p className="text-center">大人</p>
      </div>

      <Picker
        className="px-4"
        value={pickerValue}
        onChange={setPickerValue}
        wheelMode="natural"
      >
        <Picker.Column name="infants">
          {renderOptions([...selection])}
        </Picker.Column>
        <Picker.Column name="toddlers">
          {renderOptions([...selection])}
        </Picker.Column>
        <Picker.Column name="children">
          {renderOptions([...selection])}
        </Picker.Column>
        <Picker.Column name="adults">
          {renderOptions([...selection])}
        </Picker.Column>
      </Picker>
    </>
  );
}
