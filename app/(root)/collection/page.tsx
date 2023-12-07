import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { QuestionFilters} from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import {getSavedQuestions} from "@/lib/actions/user.action";
import {SearchParamsProps} from "@/types";
// import {auth} from "@clerk/nextjs";

export default async function Home({searchParams}: SearchParamsProps) {
    // const {userId} = auth()
    const userId = "123456789";
    if(!userId) return null
    const result = await getSavedQuestions({
        clerkId: userId,
        searchQuery: searchParams.q
    });

    return (
        <>
            <h1 className="h1-bold text-dark-100_light900">Saved Questions</h1>

            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchbar
                    route="/"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search for questions"
                    otherClasses="flex-1"
                />

                <Filter
                    filters={QuestionFilters}
                    otherClasses="min-h-[56px] sm:min-h-[170px]"
                    containerClasses="hidden max-md:flex"
                />
            </div>

            <div className="mt-10 flex flex-col w-full gap-6">
                {result.question.length > 0 ? (
                    result.question.map((questiona: any) => (
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
                        title="There's no saved question to show"
                        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                        link="/ask-question"
                        linkTitle="Ask a question"
                    />
                )}
            </div>
        </>
    );
}
