"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Slider } from "@/components/ui/slider";
import InlinePicker, { inlinePicker } from "@/components/ui/inlinePicker";

export default function Home() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [toddlers, setToddlers] = useState(0);
  const [infants, setInfants] = useState(0);
  const [weekday, setWeekday] = useState(true);
  const [weekend, setWeekend] = useState(false);
  const [duration, setDuration] = useState(1.5);
  const [totalCost, setTotalCost] = useState(0);
  const [visitTime, setVisitTime] = useState(11);
  const [exitTime, setExitTime] = useState(12.5);
  const [isPackageApplied, setIsPackageApplied] = useState(false);
  const [discountedAmount, setDiscountedAmount] = useState(0);

  const calculateCost = () => {
    const packageRates: Record<
      string,
      Record<
        string,
        { adults: number; children: number; toddlers: number; infants: number }
      >
    > = {
      weekday: {
        "3": { adults: 2800, children: 1900, toddlers: 1400, infants: 500 },
        "5": { adults: 3700, children: 2600, toddlers: 1900, infants: 700 },
      },
      weekend: {
        "3": { adults: 3000, children: 2000, toddlers: 1500, infants: 600 },
        "5": { adults: 3900, children: 2700, toddlers: 2000, infants: 800 },
      },
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
          toddlers: 300,
          infants: 100,
        };

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

    let cost = 0;
    let baseCost = 0;
    const dayType = weekday ? "weekday" : "weekend";

    let appliedDuration = 1.5; // start from the base duration
    if (duration >= 5) {
      appliedDuration = 5;
    } else if (duration >= 3) {
      appliedDuration = 3;
    }

    setIsPackageApplied(appliedDuration !== 1.5);

    const rates =
      appliedDuration > 1.5
        ? packageRates[dayType][appliedDuration]
        : baseRates;
    cost =
      adults * rates.adults +
      children * rates.children +
      toddlers * rates.toddlers +
      infants * rates.infants;

    baseCost =
      (adults * baseRates.adults +
        children * baseRates.children +
        toddlers * baseRates.toddlers +
        infants * baseRates.infants) *
      Math.ceil(duration / 1.5);

    if (duration > appliedDuration) {
      const additionalPeriods = Math.ceil((duration - appliedDuration) / 0.5);
      cost +=
        (adults * extensionRates.adults +
          children * extensionRates.children +
          toddlers * extensionRates.toddlers +
          infants * extensionRates.infants) *
        additionalPeriods;
    }

    const discountedAmount = baseCost - cost;
    setTotalCost(cost);
    setDiscountedAmount(discountedAmount);
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
          {/* <div className="flex flex-col gap-5">
            <p>人数を入力してください：</p>
            <div>
              <small>大人</small>
              <Input
                onChange={(e) => setAdults(+e.target.value)}
                type="number"
                min={0}
                max={10}
                placeholder="大人"
              />
            </div>
            <div>
              <small>子供（小学生以上）</small>
              <Input
                onChange={(e) => setChildren(+e.target.value)}
                type="number"
                min={0}
                max={10}
                placeholder="小学生以上"
              />
            </div>
            <div>
              <small>幼児（3歳以上）</small>
              <Input
                onChange={(e) => setToddlers(+e.target.value)}
                type="number"
                min={0}
                max={10}
                placeholder="3歳以上"
              />
            </div>
            <div>
              <small>乳幼児（1歳以上）</small>
              <Input
                onChange={(e) => setInfants(+e.target.value)}
                type="number"
                min={0}
                max={10}
                placeholder="1歳以上"
              />
            </div>
            <small>*0歳は無料です</small>
          </div> */}
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
            <p>
              滞在時間帯：
              <br />
              {visitTime}時から{exitTime}時まで計{duration}時間
            </p>
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
            <h2 className="text-2xl font-bold ">
              合計金額：¥{totalCost.toFixed(0)}
            </h2>
            {isPackageApplied && (
              <p className="text-accent-foreground">
                {duration >= 5 ? "5" : "3"}
                時間お得パック適用されました！{discountedAmount}円お得！
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
