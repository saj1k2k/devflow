import React from "react";
import { URLProps } from "@/types";
import { getUsersInfo } from "@/lib/actions/user.action";
import Image from "next/image";

const Page = async ({ params, searchParams }: URLProps) => {
  const userInfo = await getUsersInfo({ userId: params.id });
  return (
    <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <Image
          src={userInfo?.user.picture}
          alt="profile picture"
          width={140}
          height={140}
          className='rounded-full object-cover'
        />

          <div className="mt-3">
              <h2>{userInfo.user.name}</h2>
              <p>@{userInfo.user.username}</p>
              
              <div className="mt-5 flex flex-wrap justify-start items-center gap-5">

                  {userInfo.user.location}
              </div>
          </div>
      </div>
    </div>
  );
};

export default Page;