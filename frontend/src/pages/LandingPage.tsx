import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center ml-10">
      <div className="flex flex-col gap-9">
        <h1 className="text-[64px] text-left">
          The most <span className="font-bold text-accent">complete</span> site
          for <br /> you to manage and monitor <br /> your business
        </h1>
        <p className="text-textsecondary text-[24px]">
          The workbench for store owners and employees to do all <br /> their task
          integrated in one website.
        </p>

        <div className="flex justify-start gap-8 mt-5">
          <button
            onClick={() => navigate("/login?type=admin")}
            className="bg-accent px-8 py-4 text-xl font-medium rounded-xl text-white cursor-pointer"
          >
            Registration for Admin
          </button>

          <button
            onClick={() => navigate("/login?type=user")}
            className="bg-secaccent px-8 py-4 text-xl font-medium rounded-xl text-accent cursor-pointer"
          >
            Registration for Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
