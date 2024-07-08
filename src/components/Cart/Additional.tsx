"use client";

import { useSelector, useDispatch } from "react-redux";
import { toggleOptionActive } from "@/redux/optionalSlice";
import { toggleModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";

import { dataItem, iOptional, ModalParams } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Modal from "./Modal";
import { additionalOptions } from "../_content/_content";
import { cn } from "@/lib/utils";



const Option = ({ name, price, active }: iOptional) => {
  const dispatch = useDispatch();

  const handleToggleOption = () => {
    dispatch(toggleOptionActive({ name }));
  };

  return (
<div className={cn("bg-gradient-to-r from-[#8C0023] to-[#1C1C20] rounded-full p-[1px]", active && "from-[#8C0023] to-[#F2003C]")} >
    <div className={cn("flex items-center justify-between bg-[#141416] rounded-full transition hover:bg-[#21212a] active:border-red-900")}>
      <Label htmlFor={name} className="p-5 basis-full cursor-pointer ">{name} ({price}$)</Label>
      <Checkbox
        id={name}
        checked={active}
        onCheckedChange={handleToggleOption}
        className={"hidden"}
      />

    </div>
    </div>


  );
};

export default function Offers() {
  const options = useSelector((state: RootState) => state.optionalPackets);

  const dispatch = useDispatch();

  const handleModal = ({ name, modalData }: ModalParams) =>
    dispatch(toggleModal({ name, modalData }));

  return (
    <Card  className="w-full mx-auto bg-none">
      <CardHeader>
        <h2 className=" text-5xl md:text-4xl text-center">Додаткові Опції</h2>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          {options.map((op) => (
            <Option key={op.name} {...op} />
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="mx-auto"
              size={"lg"}
              onClick={() =>
                handleModal({ name: "Додаткові Опції", modalData: additionalOptions })
              }
            >
              Переглянути деталі
            </Button>
          </DialogTrigger>
          <Modal />
        </Dialog>
      </CardFooter>
    </Card>
  );
}