import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { CourseEditNextStep, CourseEditPrevStep } from "@/redux/features/admin/course/courseSlice";
import { Group } from "@mantine/core";
import { useDispatch } from "react-redux";

export default function InstructorsForm() {


    // const [editCategory, { isLoading }] = useEditSingleCourseCategoryMutation();
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(CourseEditNextStep());

    }



    return (
        <form className="space-y-4 md:space-y-6 py-10" action="#" onSubmit={handleSubmit}>

            <h2 className="text-2xl font-bold text-center">Coming Soon..</h2>

            

            <Group position="center" mt="xl">
                <PrimaryButton type={'a'} href={'#'} classNames="px-4 py-2 rounded-lg mx-2 my-6 w-40" onClick={() => dispatch(CourseEditPrevStep())}>
                    Back
                </PrimaryButton>
                <SecondaryButton classNames="flex items-center justify-center gap-2 w-40 text-white focus:outline-none font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none dark:focus:outline-none">
                    {
                        // isLoading && <Loader color="white" size="sm" variant="dots" />
                    }
                    <span>Next</span>
                </SecondaryButton>
            </Group>


        </form>
    )
}