import React from "react";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { IQuestion } from "@/database/question.model";
import { URLProps } from "@/types";

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark-100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex flex-col w-full gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((questiona: IQuestion) => (
            <QuestionCard
              key={questiona._id}
              _id={questiona._id}
              title={questiona.title}
              tags={questiona.tags}
              author={questiona.author}
              upvotes={questiona.upvotes}
              views={questiona.views}
              answers={questiona.answers}
              createdAt={questiona.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no tag question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </div>
    </>
  );
};

export default Page;
