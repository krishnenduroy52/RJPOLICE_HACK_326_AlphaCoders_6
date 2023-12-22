import React, { useEffect, useState } from "react";

import { userDetailsRoute } from "../../Utils/APIRoutes";
import axios from "axios";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Location data extraction library
import exifr from "exifr";

const DetailsForm = () => {
  const [progress, setProgress] = useState(1);
  const [form, setForm] = useState({
    user: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phoneno: "",
      address: {
        city: "",
        state: "",
        district: "",
        zip: "",
        country: "abcd",
      },
    },
    camera: {
      cameraModel: "",
      cameraQuality: "",
      cameraSerialNo: "",
      cameraMacAddress: "",
      cameraLatitude: "",
      cameraLongitude: "",
      cameraViewLeft: "",
      cameraViewRight: "",
    },
  });

  const handleSubmit = async () => {
    // Validate each field before proceeding
    console.log(form);
    // if (
    //   Object.values(form.user).some(value => value === "") ||
    //   Object.values(form.user.address).some(value => value === "") ||
    //   Object.values(form.camera).some(value => value === "")
    // ) {
    //   toast.error("Please fill in all fields.");
    //   return;
    // }

    // Hash the password using bcryptjs before sending it to the backend
    // const hashedPassword = await bcrypt.hash(form.user.password, 10);

    // Update the form with the hashed password
    // setForm((prevForm) => ({
    //   ...prevForm,
    //   user: {
    //     ...prevForm.user,
    //     password: hashedPassword,
    //   },
    // }));

    try {
      const res = await axios.post(userDetailsRoute, form);
      console.log(res);
      toast.success("User details successfully added.");
    } catch (error) {
      console.error("There is some error", error);
      toast.error("Internal Server Error");
    }
  };

  const handelUserChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, user: { ...form.user, [name]: value } });
  };
  const handelUserAddressChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      user: { ...form.user, address: { ...form.user.address, [name]: value } },
    });
  };

  const handelCameraChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, camera: { ...form.camera, [name]: value } });
  };

  // Location data extraction
  const [locationData, setLocationData] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const exifData = await exifr.parse(file);
        setLocationData(exifData);
        setForm({
          ...form,
          camera: {
            ...form.camera,
            cameraLatitude: exifData.latitude,
            cameraLongitude: exifData.longitude,
          },
        });
      } catch (error) {
        console.error("Error extracting EXIF data:", error);
      }
    }
  };

  // useEffect(() => {
  //   console.log(form);
  // }, [form]);

  return (
    <div className="mt-12">
      <div>
        <div className="px-[300px] sm:px-[150px]">
          <div className="flex justify-between items-center">
            <div
              className={`px-2 ${
                progress == 1 ? "bg-green-700" : "bg-blue-400"
              } rounded-full flex items-center justify-center block uppercase tracking-wide font-bold`}
              onClick={() => setProgress(1)}
            >
              1
            </div>
            <div className="bg-black w-full h-[1px]"></div>
            <div
              className={`px-2 ${
                progress == 2 ? "bg-green-700" : "bg-blue-400"
              } rounded-full flex items-center justify-center block uppercase tracking-wide font-bold`}
              onClick={() => setProgress(2)}
            >
              2
            </div>
            <div className="bg-black w-full h-[1px]"></div>
            <div
              className={`px-2 ${
                progress == 3 ? "bg-green-700" : "bg-blue-400"
              } rounded-full flex items-center justify-center block uppercase tracking-wide font-bold`}
              onClick={() => setProgress(3)}
            >
              3
            </div>
          </div>
        </div>
        <div className="px-20 h-screen flex justify-center mb-2">
          <div>
            <div className="mb-10 ">
              <h1 className="text-2xl text-center block uppercase tracking-wide font-bold">
                {progress == 1
                  ? "User Details"
                  : progress == 2
                  ? "Camera Details"
                  : progress == 3
                  ? "Image Sample"
                  : "Thank You"}
              </h1>
            </div>
            <div>
              {progress === 1 ? (
                <div>
                  <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-first-name"
                          type="text"
                          placeholder="Jane"
                          name="firstname"
                          onChange={(e) => handelUserChange(e)}
                          value={form.user.firstname}
                          required
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Doe"
                          name="lastname"
                          onChange={(e) => handelUserChange(e)}
                          value={form.user.lastname}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="gird-emailid"
                          type="email"
                          placeholder="jane@gmail.com"
                          name="email"
                          onChange={(e) => handelUserChange(e)}
                          value={form.user.email}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="password"
                          placeholder="******************"
                          name="password"
                          onChange={(e) => handelUserChange(e)}
                          value={form.user.password}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="number"
                          placeholder="9000770099"
                          name="phoneno"
                          onChange={(e) => handelUserChange(e)}
                          value={form.user.phoneno}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          type="text"
                          placeholder="Rajasthan"
                          name="city"
                          onChange={(e) => handelUserAddressChange(e)}
                          value={form.user.address.city}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-3">
                      <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-state"
                        >
                          State <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                            name="state"
                            onChange={(e) => handelUserAddressChange(e)}
                            value={form.user.address.state}
                          >
                            <option>New Mexico</option>
                            <option>Missouri</option>
                            <option>Texas</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-state"
                        >
                          DISTRICT <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                            name="district"
                            onChange={(e) => handelUserAddressChange(e)}
                            value={form.user.address.district}
                          >
                            <option>New Mexico</option>
                            <option>Missouri</option>
                            <option>Texas</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-zip"
                        >
                          Zip <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="number"
                          placeholder="90210"
                          name="zip"
                          onChange={(e) => handelUserAddressChange(e)}
                          value={form.user.address.zip}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setProgress(progress + 1)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : progress === 2 ? (
                <div>
                  <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          camera Model
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-camera-model"
                          type="text"
                          placeholder="fronttech"
                          name="cameraModel"
                          onChange={(e) => handelCameraChange(e)}
                          value={form.camera.cameraModel}
                        />
                        {/* <p className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p> */}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Camera Quality (MP)
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="4"
                          name="cameraQuality"
                          onChange={(e) => handelCameraChange(e)}
                          value={form.camera.cameraQuality}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Camera Serial No.
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="gird-emailid"
                          type="text"
                          placeholder="123412345231"
                          name="cameraSerialNo"
                          onChange={(e) => handelCameraChange(e)}
                          value={form.camera.cameraSerialNo}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-camera-mac-address"
                        >
                          Camera MAC Address
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-camera-mac-address"
                          type="text"
                          placeholder="MAC123123"
                          name="cameraMacAddress"
                          onChange={(e) => handelCameraChange(e)}
                          value={form.camera.cameraMacAddress}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label htmlFor="name">Sample Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Camera Location (Latitude)
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-camera-model"
                          type="number"
                          placeholder="19.100"
                          name="cameraLatitude"
                          onChange={(e) => handelCameraChange(e)}
                          value={form.camera.cameraLatitude}
                        />
                        {/* <p className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p> */}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Camera Location (Longitude)
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="12.100"
                          name="cameraLongitude"
                          onChange={(e) => handelCameraChange(e)}
                          value={form.camera.cameraLongitude}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          camera view left (Latitude & Longitude)
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-camera-left-view"
                          type="text"
                          placeholder="19.100, 18.001"
                          name="cameraViewLeft"
                          onChange={(e) => handelCameraChange(e)}
                          value={form.camera.cameraViewLeft}
                        />
                        {/* <p className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p> */}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-camera-right-view"
                        >
                          camera view right (Latitude & Longitude)
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="19.100, 18.001"
                          name="cameraViewRight"
                          onChange={(e) => handelCameraChange(e)}
                          value={form.camera.cameraViewRight}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setProgress(progress + 1)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : progress === 3 ? (
                <div>
                  <form>
                    <label htmlFor="name">Sample Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </form>
                  {locationData && (
                    <div>
                      <h3>Location Information:</h3>
                      <p>Latitude: {locationData?.latitude}</p>
                      <p>Longitude: {locationData?.longitude}</p>
                      {/* Add more location information as needed */}
                    </div>
                  )}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div>Thank You</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <>
    <ToastContainer position="bottom-right" theme="colored" />
    <DetailsForm />
  </>
);
