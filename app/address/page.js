"use client";

import { useRouter } from "next/navigation";
import TextInput from "../components/TextInput";
import Mainlayout from "../layout/MainLayout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";
import useIsLoading from "../hooks/useIsLoading";
import useUserAddress from "../hooks/useUserAddress";
import { toast } from "react-toastify";
import useCreateAddress from "../hooks/useCreateAddress";
import ClientOnly from "../components/ClientOnly";

export default function Address() {
  const router = useRouter();
  const { user } = useUser();

  const [addressId, setAddressId] = useState(null);
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [error, setError] = useState({});

  const showError = (type) => {
    if (Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const getAddress = async () => {
    if (user?.id == null || user?.id == undefined) {
      useIsLoading(false);
      return;
    }
    const response = await useUserAddress();
    if (response) {
      setTheCurrentAddress(response);
      useIsLoading(false);
      return;
    }
    useIsLoading(false);
  };

  useEffect(() => {
    useIsLoading(true);
    getAddress();
  }, [user]);

  const setTheCurrentAddress = (result) => {
    setAddressId(result.id);
    setName(result.name);
    setaddress(result.address);
    setZipcode(result.zipcode);
    setCity(result.city);
    setCountry(result.country);
  };

  const validate = () => {
    setError({});
    let isError = false;

    if (!name) {
      setError({ type: "name", message: "A name is required" });
      isError = true;
    } else if (!address) {
      setError({ type: "address", message: "An Address is required" });
      isError = true;
    } else if (!zipcode) {
      setError({ type: "zipcode", message: "A Zipcode is required" });
      isError = true;
    } else if (!city) {
      setError({ type: "city", message: "A City is required" });
      isError = true;
    } else if (!country) {
      setError({ type: "country", message: "A Country is required" });
      isError = true;
    }
    return isError;
  };
  const submit = async (event) => {
    event.preventDefault();
    let isError = validate();

    if (isError) {
      toast.error(error.message, { autoClose: 3000 });
      return;
    }
    try {
      setIsUpdatingAddress(true);

      const response = await useCreateAddress({
        addressId,
        name,
        address,
        zipcode,
        city,
        country,
      });
      setTheCurrentAddress(response);
      setIsUpdatingAddress(false);

      toast.success("Address Updated", { autoClose: 3000 });
      router.push("/checkout");
    } catch (error) {
      setIsUpdatingAddress(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <Mainlayout>
        <div id="AddressPage" className="mt-4 max-w-[600px] mx-auto px-2">
          <div className="mx-auto bg-white rounded-lg p-3">
            <div className="text-xl font-bold mb-2">Address Details</div>
            <form onSubmit={submit}>
              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={name}
                    placeholder="Name"
                    onUpdate={setName}
                    error={showError("name")}
                  />
                </ClientOnly>
              </div>
              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={address}
                    placeholder="Address"
                    onUpdate={setaddress}
                    error={showError("address")}
                  />
                </ClientOnly>
              </div>
              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={zipcode}
                    placeholder="Zip Code"
                    onUpdate={setZipcode}
                    error={showError("zipcode")}
                  />
                </ClientOnly>
              </div>
              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={city}
                    placeholder="City"
                    onUpdate={setCity}
                    error={showError("city")}
                  />
                </ClientOnly>
              </div>
              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={country}
                    placeholder="Country"
                    onUpdate={setCountry}
                    error={showError("country")}
                  />
                </ClientOnly>
              </div>
              <button
                type="submit"
                disabled={isUpdatingAddress}
                className={`mt-6 w-full text-white text-lg font-semibold p-3 rounded 
                 ${isUpdatingAddress ? "bg-blue-800" : "bg-blue-600"}`}
              >
               {!isUpdatingAddress ? 
               <div>Update Adress</div> 
               : 
               <div className="flex items-center justify-center gap-2">
                <AiOutlineLoading3Quarters className="animate-spin"/>
                Please Wait...
                </div>}
              </button>
            </form>
          </div>
        </div>
      </Mainlayout>
    </>
  );
}
