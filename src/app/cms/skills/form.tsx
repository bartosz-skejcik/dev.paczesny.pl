import { Tables } from "@lib/database.types";
import { Heading } from "@ui/Heading";

type Props = {
    form: Tables<"skills">
}

function Form({form}: Props) {

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {}

  return (
    <form
            onSubmit={handleSubmit}
            className="mx-4 grid w-full grid-cols-2 gap-3 sm:mx-0 lg:max-w-4xl lg:gap-6"
        >
            <div className="col-span-2">
                <Heading className="mb-2">Add skill</Heading>
            </div>
        </form>
  )
}

export default Form