import React, { useState } from "react";
import {useParams} from 'react-router-dom'
import EditVehicle1 from "../../componants/user/EditVehicle";

import BounceLoader from "react-spinners/BounceLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function EditVehicle() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#36d7b7");
  let { vehicleId } = useParams();

  return (
    <div>
      {loading ? (
        <div className=" fixed left-0 top-0 flex h-full w-full items-center justify-center">
          <BounceLoader
            color="#36d7b7"
            loading={true}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className=" rounded-2xl border bg-gray-100 pb-10 shadow-2xl sm:mx-20 sm:mb-20 sm:mt-10 md:mx-40 lg:mx-80">
          <EditVehicle1 setLoading={setLoading} vehicleId={vehicleId} />
        </div>
      )}
    </div>
  );
}

export default EditVehicle;


