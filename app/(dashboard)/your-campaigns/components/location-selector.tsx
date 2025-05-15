import { Plus, X } from "@phosphor-icons/react";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import Modal from "@/components/modal";
import countries from "@/constants/countries";

interface FieldValues {
  country: number;
}

export default function LocationSelector() {
  const [locations, setLocations] = React.useState<FieldValues[]>([]);
  const [locationNames, setLocationNames] = React.useState<string[]>([]);
  const form = useForm<FieldValues>();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <div>
      <label className={"mb-2 block font-medium font-poppins"}>Locations</label>
      <div className={""}>
        {locationNames.map((name, index) => {
          return (
            <button
              type={"button"}
              onClick={() => {
                setLocations(locations.filter((_, i) => i !== index));
                setLocationNames(locationNames.filter((_, i) => i !== index));
              }}
              className={
                "inline-flex bg-gray-100 rounded-full px-2 py-1 mr-2 mb-2 gap-2 items-center"
              }
              key={index}
            >
              {name} <X />
            </button>
          );
        })}
      </div>
      <Button
        invert
        className={"mt-2 gap-2"}
        compact
        onClick={() => setIsModalOpen(true)}
      >
        Add
        <Plus />
      </Button>
      <Modal
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
        title={"Add Location"}
      >
        <Form
          className="space-y-3 mt-3"
          form={form}
          onSubmit={(values) => {
            const name = countries.find(
              (c) => c.value === values.country,
            )?.label;
            if (name) {
              setLocationNames([...locationNames, name]);
              setLocations([...locations, values]);
            }
            setIsModalOpen(false);
            form.reset();
          }}
        >
          <Input
            className="block"
            label="Country"
            name="country"
            options={countries || []}
            placeholder="Select your country"
            rules={{ required: true }}
          />
          <Button className="ml-auto" type="submit">
            Add
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
