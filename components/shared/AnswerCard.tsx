import React from "react";
import Link from "next/link";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Metric from "@/components/shared/Metric";
import EditDeleteAction from "@/components/shared/EditDeleteAction";
import {SignedIn} from "@clerk/nextjs";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question?._id}/#${_id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>

        <SignedIn>
          {showActionButtons && (
              <EditDeleteAction
                  type='Answer'
                  itemId={JSON.stringify(_id)}
              />
          )}
        </SignedIn>

      </div>

      <div className="mt-6 w-full flex-wrap gap-3 flex-between">
        <Metric
          alt="user avatar"
          title={` ● asked ${getTimestamp(createdAt)}`}
          imgUrl={author.picture}
          value={author.name}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />

        <div className="gap-3 flex-center">
          <Metric
            alt="like icon"
            title=" Votes"
            imgUrl="/assets/icons/live.svg"
            value={formatAndDivideNumber(upvotes)}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;