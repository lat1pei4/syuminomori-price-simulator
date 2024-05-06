"use client";

import React, { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Slider } from "@/components/ui/slider";
import InlinePicker from "@/components/ui/inlinePicker";

export default function Home() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [toddlers, setToddlers] = useState(0);
  const [infants, setInfants] = useState(0);
  const [weekday, setWeekday] = useState(true);
  const [weekend, setWeekend] = useState(false);
  const [duration, setDuration] = useState(1.5);
  const [isKaraoke, setIsKaraoke] = useState(false);
  const [karaoke, setKaraoke] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [visitTime, setVisitTime] = useState(11);
  const [exitTime, setExitTime] = useState(12.5);
  const [isPackageApplied, setIsPackageApplied] = useState(false);
  const [discountedAmount, setDiscountedAmount] = useState(0);

  const calculateCost = () => {
    const baseRates = weekday
      ? {
          adults: 1800,
          children: 1300,
          toddlers: 900,
          infants: 300,
        }
      : {
          adults: 2000,
          children: 1400,
          toddlers: 1000,
          infants: 400,
        };

    const extensionRates = weekday
      ? {
          adults: 500,
          children: 400,
          toddlers: 300,
          infants: 100,
        }
      : {
          adults: 600,
          children: 500,
          toddlers: 400,
          infants: 100,
        };

    const packageRates = {
      weekday: {
        "3": { adults: 2800, children: 1900, toddlers: 1400, infants: 500 },
        "5": { adults: 3700, children: 2600, toddlers: 1900, infants: 700 },
      },
      weekend: {
        "3": { adults: 3000, children: 2000, toddlers: 1500, infants: 600 },
        "5": { adults: 3900, children: 2700, toddlers: 2000, infants: 800 },
      },
    };

    // rate per 30 minutes
    const karaokeRates = weekday
      ? {
          mori: 400,
          umi: 450,
          kaze: 450,
        }
      : {
          mori: 450,
          umi: 500,
          kaze: 500,
        };

    let cost = 0;
    let nonDiscountedCost = 0;
    const dayType = weekday ? "weekday" : "weekend";

    const baseCost =
      adults * baseRates.adults +
      children * baseRates.children +
      toddlers * baseRates.toddlers +
      infants * baseRates.infants;

    let appliedDuration = 1.5; // Default duration
    if (duration >= 5) {
      appliedDuration = 5;
    } else if (duration >= 3) {
      appliedDuration = 3;
    }

    const rates =
      appliedDuration > 1.5
        ? packageRates[dayType][String(appliedDuration)]
        : baseRates;

    // Calculate cost with potentially applied package
    cost =
      adults * rates.adults +
      children * rates.children +
      toddlers * rates.toddlers +
      infants * rates.infants;

    // Calculate non-discounted cost assuming no package
    nonDiscountedCost = Math.ceil(duration / 1.5) * baseCost;

    // Calculate additional cost if staying beyond the package duration
    if (duration > appliedDuration) {
      const additionalPeriods = Math.ceil((duration - appliedDuration) / 0.5);
      cost +=
        additionalPeriods *
        (adults * extensionRates.adults +
          children * extensionRates.children +
          toddlers * extensionRates.toddlers +
          infants * extensionRates.infants);
    }

    // Adding karaoke cost if selected
    if (
      isKaraoke &&
      (karaoke === "mori" || karaoke === "umi" || karaoke === "kaze")
    ) {
      const karaokeCostPer30Min = karaokeRates[karaoke];
      const karaokePeriods = Math.ceil(duration / 0.5);
      const karaokeCost = karaokeCostPer30Min * karaokePeriods;
      cost += karaokeCost;
      nonDiscountedCost += karaokeCost; // Include karaoke cost in the non-discounted cost
    }

    const discountedAmount = nonDiscountedCost - cost;
    setTotalCost(cost);
    setDiscountedAmount(discountedAmount);
    setIsPackageApplied(appliedDuration !== 1.5);
  };

  useEffect(() => {
    calculateCost();
  }, [
    adults,
    children,
    toddlers,
    infants,
    weekday,
    weekend,
    duration,
    calculateCost,
  ]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="p-5 w-[90vw] max-w-[600px] bg-slate-200 rounded-lg">
          {/* Person input section */}
          <InlinePicker
            setAdults={setAdults}
            setChildren={setChildren}
            setToddlers={setToddlers}
            setInfants={setInfants}
          />

          {/* Day toggle section */}
          <div className="flex flex-col gap-5">
            <p>利用日：</p>
            <div className="flex justify-center gap-10">
              <Toggle
                onClick={() => {
                  setWeekday(true);
                  setWeekend(false);
                }}
                pressed={weekday}
              >
                平日
              </Toggle>
              <Toggle
                onClick={() => {
                  setWeekday(false);
                  setWeekend(true);
                }}
                pressed={weekend}
              >
                土日祝
              </Toggle>
            </div>
            <p>個室利用（カラオケ）:</p>
            <div className="flex justify-center sm:gap-10 flex-wrap">
              <Toggle
                onClick={() => {
                  setKaraoke("");
                  setIsKaraoke(false);
                }}
                pressed={!isKaraoke}
              >
                なし
              </Toggle>
              <Toggle
                onClick={() => {
                  if (!karaoke) {
                    setKaraoke("mori");
                    setIsKaraoke(!isKaraoke);
                  } else if (karaoke === "mori") {
                    setKaraoke("");
                    setIsKaraoke(false);
                  } else {
                    setKaraoke("mori");
                  }
                }}
                pressed={isKaraoke && karaoke === "mori"}
              >
                <p>
                  森ルーム
                  <span className="text-xs block">（2~4名）</span>
                </p>
              </Toggle>
              <Toggle
                onClick={() => {
                  if (!karaoke) {
                    setKaraoke("umi");
                    setIsKaraoke(!isKaraoke);
                  } else if (karaoke === "umi") {
                    setKaraoke("");
                    setIsKaraoke(false);
                  } else {
                    setKaraoke("umi");
                  }
                }}
                pressed={isKaraoke && karaoke === "umi"}
              >
                <p>
                  海ルーム
                  <span className="text-xs block">（3~7名）</span>
                </p>
              </Toggle>
              <Toggle
                onClick={() => {
                  if (!karaoke) {
                    setKaraoke("kaze");
                    setIsKaraoke(!isKaraoke);
                  } else if (karaoke === "kaze") {
                    setKaraoke("");
                    setIsKaraoke(false);
                  } else {
                    setKaraoke("kaze");
                  }
                }}
                pressed={isKaraoke && karaoke === "kaze"}
              >
                <p>
                  風ルーム
                  <span className="text-xs block">（4~8名）</span>
                </p>
              </Toggle>
            </div>
            <p>滞在時間帯：</p>
            {/* Slider for time selection */}
            <Slider
              onValueChange={(value) => {
                setVisitTime(value[0]);
                setExitTime(value[1]);
                setDuration(value[1] - value[0]);
              }}
              value={[visitTime, exitTime]}
              min={11}
              max={20}
              step={0.5}
              minStepsBetweenThumbs={1}
              className="pt-10"
            />
          </div>
          {/* Cost display section */}
          <div className="text-center">
            <p>
              {visitTime}時から{exitTime}時まで計{duration}時間
            </p>
            <h2 className="text-2xl font-bold ">
              合計金額：¥{totalCost.toFixed(0)}
            </h2>
            {isPackageApplied && (
              <p className="text-accent-foreground">
                {duration >= 5 ? "5" : "3"}
                時間お得パック適用されました！
                <br />
                {discountedAmount}円お得！
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
