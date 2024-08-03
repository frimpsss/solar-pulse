import { useFormik } from "formik";
import TextInput from "./components/InputField";
import CustomSelect from "./components/CotomSelect";
import { useState } from "react";
import Spinner from "./components/Spinner";
import axios, { isAxiosError } from "axios";
import * as Yup from "yup";
import { months } from "./utils";
import { toast } from "sonner";
import Modal from "./components/Modal";

function App() {
  const validationSchema = Yup.object().shape({
    latitude: Yup.number().required("Latitude is required"),
    longitude: Yup.number().required("Longitude is required"),
    altitude: Yup.number().required("Altitude is required"),
    humidity: Yup.number().required("Humidity is required"),
    ambient_temp: Yup.number().required("Ambient temperature is required"),
    pressure: Yup.number().required("Pressure is required"),
    cloud_ceiling: Yup.number().required("Cloud ceiling is required"),
    month: Yup.string().required("Month is required"),
    day: Yup.number().min(1).max(31).required("Day is required"),
    solar_rating: Yup.number().required("Solar rating is required"),
    wind_speed: Yup.number().required("Wind speed is required"),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, showModal] = useState<boolean>(false)
  const [res, setRes] = useState()
  const { ...form } = useFormik({
    initialValues: {
      latitude: "",
      longitude: "",
      altitude: "",
      humidity: "",
      ambient_temp: "",
      pressure: "",
      cloud_ceiling: "",
      month: "",
      day: "",
      solar_rating: "",
      wind_speed: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      Object.keys(form.values)?.map((e) => {
        form.setFieldTouched(e, true);
      });
      if (form.isValid && form?.dirty) {
        try {
          setIsLoading(true);
          const response = await axios({
            url: "https://solarpulse.onrender.com/predict",
            method: "post",
            data: {
              latitude: values.latitude,
              longitude: values.longitude,
              altitude: values.altitude,
              humidity: values.humidity,
              ambient_temp: values.ambient_temp,
              wind_speed: values.wind_speed,
              pressure: values.pressure,
              cloud_ceiling: values.cloud_ceiling,
              month: Number(months.indexOf(values.month)) + 1,
              day: values.day,
              solar_rating: values.solar_rating,
            },
          });

          if (response.data.status) {
            console.log(response.data.data);
            setRes(response.data.data)
            showModal(true)
          }
          else{
            toast.error('An error occurred')
          }
        } catch (error) {
          if(isAxiosError(error)){
            toast.error(error.response?.data.message)
          }
          else{
            toast.error('An error occurred')
          }
        } finally {
          form.resetForm()
          setIsLoading(false);
        }
      }
    },
  });

  return (
    <>
    <div className="fixed w-[100vw] h-[100vh] bg-black/50 z-[-5]"></div>
    <img className="fixed z-[-10] h-[100vh] left-0 right-0 w-[100vw]" src="https://images.unsplash.com/photo-1508790762848-8a3096277c8f?q=80&w=3288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      <div className="w-[550px] mx-auto mb-[4rem]">
        <div>
          <h4 className="text-[2.3rem] font-medium text-center text-white py-[2rem] ">
            Solar Pulse
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <TextInput
            id={"latitude"}
            type={"number"}
            placeholder={"eg. 234.34"}
            label={"Latitude"}
            boldenText
            {...form}
          />
          <TextInput
            id={"longitude"}
            type={"number"}
            placeholder={"eg. 234.34"}
            label={"Longitude"}
            boldenText
            {...form}
          />
          <TextInput
            id={"altitude"}
            type={"number"}
            placeholder={"eg. 234.34"}
            label={"Altitude"}
            boldenText
            {...form}
          />
          <TextInput
            id={"humidity"}
            type={"number"}
            placeholder={"eg. 234.34"}
            label={"Humidity"}
            boldenText
            {...form}
          />{" "}
          <TextInput
            id={"ambient_temp"}
            type={"number"}
            placeholder={"eg. 234.34"}
            label={"Ambient Temperature"}
            boldenText
            {...form}
          />
          <TextInput
            id={"pressure"}
            type={"number"}
            placeholder={"eg. 234.34"}
            label={"Pressure"}
            boldenText
            {...form}
          />
          <TextInput
            id={"wind_speed"}
            type={"number"}
            placeholder={"eg. 234.34"}
            label={"Wind Speed"}
            boldenText
            {...form}
          />
          <TextInput
            id={"cloud_ceiling"}
            type={"number"}
            placeholder={"eg. 234.34"}
            label={"Cloud Ceiling"}
            boldenText
            {...form}
          />
          {/* <CustomSelect
            options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
            }
            id={"day"}
            label={"Day"}
            {...form}
            boldText
          /> */}
          <TextInput
            id={"day"}
            type={"number"}
            placeholder={"eg. 1"}
            label={"Day"}
            boldenText
            {...form}
          />
          <CustomSelect
            options={months}
            id={"month"}
            label={"Month"}
            {...form}
            boldText
          />
          <div className="col-span-2">
            <TextInput
              id={"solar_rating"}
              type={"number"}
              placeholder={"eg. 234.34"}
              label={"Solar Rating"}
              boldenText
              {...form}
            />
          </div>
          <button
            onClick={() => {
              form.handleSubmit();
            }}
            type="submit"
            className="col-span-2 bg-mantis-950 focus:ring-2 ring-offset-2 ring-mantis-950 text-white py-2 rounded mt-6 grid place-content-center"
          >
            {isLoading ? <Spinner stroke="#fff" /> : "Predict"}
          </button>
        </div>
      </div>

      <Modal isOpen={modal} toogleIsOpen={()=>{
        showModal(false)
      }} >
        <div>
          <h4>Res {res}</h4>
        </div>
      </Modal>
    </>
  );
}

export default App;
