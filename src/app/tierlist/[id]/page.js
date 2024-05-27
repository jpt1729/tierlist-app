"use client";
import React, { useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";

const TierItem = ({index, item, parentRef, tierListData, tier, setTierListData }) => {
  const controls = useDragControls();

  const [coords, setCoords] = useState({ x: 0, y: 0 }); //TODO: Get init coords!

  const updateTier = (dTier) => {
    // Checks to ensure no processing power is wasted!
    // Checks to make sure change actually happened
    if (dTier === 0){
      return;
    }
    // Checks to ensure changes are within the list's limits
    if (!(0 <= (tier + dTier) <= tierListData.length)){
      return;
    }
    let updatedTierListData = [...tierListData];
    console.log(tier + dTier)
    updatedTierListData[tier].items.pop(index)
    updatedTierListData[tier + dTier].items.push(item)
    setTierListData(updatedTierListData)
    console.log(tierListData)
  }
  return (
    <motion.div
      className="flex aspect-square h-tier justify-center items-center bg-slate-800 z-50"
      dragConstraints={parentRef}
      drag
      dragControls={controls}
      dragTransition={{
        timeConstant: 50,
        // Snap calculated target to nearest 50 pixels
        modifyTarget: (target) => {
          return Math.round(target / 64) * 64;
        },
      }}
      onDragStart={(event, info) => {
        setCoords({ x: info.point.x, y: info.point.y });
      }}
      onDragEnd={(event, info) => {
        const endingCoords = { x: info.point.x, y: info.point.y };
        const dx = Math.round((endingCoords.x - coords.x) / 64) * 64;
        const dy = Math.round((endingCoords.y - coords.y) / 64) * 64;

        updateTier(Math.floor(dy / 64))
      }}
      dragElastic={0}
      dragMomentum={false}
    >
      <span className="">{item}</span>
    </motion.div>
  );
};

const Tier = ({ index, letter, items, parentRef, tierListData, setTierListData }) => {
  return (
    <div className="flex w-full min-h-tier outline">
      <div className="flex aspect-square h-tier bg-red-500 justify-center items-center">
        <span>{letter}</span>
      </div>
      <div className="flex flex-wrap w-full min-h-tier bg-slate-800 text-white">
        {items &&
          items.map((item, _i) => {
            return (
              <TierItem
                key={_i}
                index={_i}
                item={item}
                parentRef={parentRef}
                tier={index}
                tierListData={tierListData}
                setTierListData={setTierListData}
              />
            );
          })}
      </div>
    </div>
  );
};

export default function Page({ params }) {
  const tierListBox = useRef();
  const [tierListData, setTierListData] = useState([
    { tier: "A", items: ["dog1", "cat1", "bat1"] },
    { tier: "B", items: ["dog2", "cat2", "bat2"] },
    { tier: "C", items: ["dog3", "cat3", "bat3"] },
    { tier: "D", items: ["dog4", "cat4", "bat4"] },
  ]);

  //TODO update Tier so it follows this data structure {title: string, color: #191910, id: 1920123} and item follow {name:string, image:string, id:192031}
  return (
    <main>
      <motion.div
        ref={tierListBox}
        className="max-w-screen-md m-auto flex flex-col"
      >
        {tierListData &&
          tierListData.map((tier, _i) => {
            return (
              <Tier
                key={_i}
                index={_i}
                letter={tier.tier}
                items={tier.items}
                parentRef={tierListBox}
                tierListData={tierListData}
                setTierListData={setTierListData}
              />
            );
          })}
      </motion.div>
    </main>
  );
}
