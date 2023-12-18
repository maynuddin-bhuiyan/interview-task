// react import
import { useState } from "react";
// react hook  form import
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// react icon import
import { BiHide, BiLockAlt, BiShow } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState(true);

  const onSubmit = (data) => {
    fetch("https://test.directaff.com/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((loginData) => {
        if (loginData?.error === "Unauthorized") {
          toast.error("User Unauthorized");
        } else {
          console.log(loginData?.token, "token");
          localStorage.setItem("logInToken", loginData?.token);
          navigate("/");
          toast("User Login Successfully", {
            icon: "👏 ",
          });
        }
        // console.log(loginData);
      })
      .catch((err) => console.log("error", err));
    // console.log(data);
  };

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-center lg:my-20 my-10">
          <div
            className="bg-[#FFF] lg:w-[444px] border border-gray-150 rounded-lg lg:p-[50px] p-5"
            style={{
              boxShadow:
                "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-3xl font-bold text-[#101828] mb-8">
                Sign In
              </h3>
              <div className="flex justify-start gap-1 items-center border border-gray-400 rounded-md py-2 px-3 mt-4">
                <HiOutlineMail size="22px" color="#b6b9be" />
                <input
                  type="email"
                  placeholder="Email"
                  required={true}
                  {...register("email", {
                    required: "email",
                  })}
                  className="w-full focus:outline-none rounded-md text-[#b6b9be]"
                />
              </div>
              <div className="flex justify-start gap-1 items-center border border-gray-400 rounded-md py-2 px-3 mt-4 relative">
                <BiLockAlt size="22px" color="#b6b9be" />
                <input
                  type={password ? "password" : "text"}
                  required={true}
                  placeholder="Password"
                  {...register("password", {
                    required: "password",
                  })}
                  className="w-full focus:outline-none rounded-md text-[#b6b9be] "
                />
                {password ? (
                  <div className="absolute right-1 top-2">
                    <BiHide
                      onClick={() => setPassword(!password)}
                      size="22px"
                      color="#b6b9be"
                      className="cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="absolute right-1 top-2">
                    <BiShow
                      onClick={() => setPassword(!password)}
                      size="22px"
                      color="#b6b9be"
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <input className="btn w-full mt-5" value="Sign In" type="submit" />
              <div className="mt-5 flex items-center justify-center">
                <div className="border-b border-gray-400 w-full"></div>
                <div className="w-full text-center text-xl font-medium text-[#676767]">
                  Or
                </div>
                <div className="border-b border-gray-400 w-full"></div>
              </div>
              <p className="w-full text-center text-lg font-medium text-[#676767] mt-3 mb-5">
                Log In with
              </p>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="cursor-pointer w-[150px] border border-gray-400 rounded-md py-2 flex items-center justify-center hover:bg-[#1877F2] smooth">
                  <FcGoogle size="24px" />
                </div>
                <div className="cursor-pointer w-[150px] border border-gray-400 rounded-md py-2 flex items-center justify-center text-[#1877F2] hover:text-white hover:bg-[#1877F2] smooth">
                  <FaFacebook size="24px" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
