import { useEffect, useState } from "react";
import Picker from "react-mobile-picker";
import { text } from "stream/consumers";

function renderOptions(options: string[], selectedColor: string) {
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
}) {
  const [pickerValue, setPickerValue] = useState({
    adults: 0,
    children: 0,
    toddlers: 0,
    infants: 0,
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
      <p className="pb-4">人数を入力してください：</p>
      <div className="flex justify-around items-center px-8">
        <p className="text-center">
          乳幼児
          <span className="text-xs">（1歳以上）</span>
        </p>
        <p className="text-center">
          幼児
          <span className="text-xs">（3歳以上）</span>
        </p>
        <p className="text-center">
          子供
          <span className="text-xs">（小学生以上）</span>
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
