import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import Loading from "../../Components/Common/Loading";
import Error from "../Error/Error";
import { MdLocationPin } from "react-icons/md";
import Swal from "sweetalert2";
import UseAuth from "../../Hook/useAuth";
import Review from "../Review/Review";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user } = UseAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["ScholarshipsDetails", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_localhost_api}/all-scholarships/${id}`,
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  //   applied scholarship send to database

  const handleAppliedScholarship = async () => {
    const appliedScholarship = {
      scholarshipId: data._id,
      scholarshipName: data.scholarship_name,
      universityName: data.university_name,
      subjectCategory: data.subject_category,
      userEmail: user?.email,
      appliedDate: new Date(),
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_localhost_api}/applied_scholarship`,
        appliedScholarship,
      );

      Swal.fire({
        title: "Hurrey, Applied!!",
        text: "Scholarship Applied Successfully",
        icon: "success",
      });
    } catch (err) {
      Swal.fire({
        title: "Hurrey,Success!!",
        text: `${err.response.data.message}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 🔵 Top Banner */}
      <div className="bg-[#012131] py-12">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl font-bold">{data?.scholarship_name}</h1>
          <p className="mt-2 text-gray-200">
            Study opportunity at {data?.university_name}
          </p>
        </div>
      </div>

      {/* 🔵 Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* University Image */}
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-center">
            <img
              src={
                data?.university_logo ||
                "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              }
              alt={data?.university_name}
              className="rounded-lg object-cover"
            />
          </div>

          {/* Scholarship Info */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#012131] mb-4">
              {data?.university_name}
            </h2>

            <p className="flex items-center gap-2 text-gray-500 mb-4">
              <MdLocationPin className="text-[#F39C12]" />
              {data?.university_city}, {data?.university_country}
            </p>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-4 text-gray-600">
              <p>
                <b>Scholarship Category :</b> {data?.scholarship_category}
              </p>

              <p>
                <b>Subject Category :</b> {data?.subject_category}
              </p>

              <p>
                <b>Application Deadline :</b>{" "}
                {new Date(data?.application_deadline).toLocaleDateString()}
              </p>

              <p>
                <b>Post Date :</b>{" "}
                {new Date(data?.scholarship_post_date).toLocaleDateString()}
              </p>

              <p>
                <b>Application Fee :</b>{" "}
                <span className="font-bold text-yellow-600">
                  ${data?.application_fees}
                </span>
              </p>

              <p>
                <b>Service Charge :</b>{" "}
                <span className="font-bold text-green-600">
                  ${data?.service_charge}
                </span>
              </p>
            </div>

            {/* Apply Button */}
            <div className="mt-6">
              <button
                onClick={handleAppliedScholarship}
                className="btn rounded-xl border-2 border-[#012131] bg-white text-[#012131] hover:bg-[#012131] hover:text-white px-6"
              >
                Apply Scholarship
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:max-w-7xl my-3 lg:mx-auto mx-4 ">
        <Review scholarshipId={data._id} user={user} />
      </div>
    </div>
  );
};

export default ScholarshipDetails;
