import type {ActionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {useActionData} from "@remix-run/react";
import {badRequest} from "~/utils/request.server";

function validateTeamName(name: string) {
    if (name.length < 3) {
        return `That Team's name is too short`;
    }
}

export const action = async ({request}: ActionArgs) => {
    const form = await request.formData();
    const name = form.get("name");

    if (
        typeof name !== "string"
    ) {
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: `Form not submitted correctly.`,
        });
    }

    const fieldErrors = {
        name: validateTeamName(name),
    };

    const fields = {name};

    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({
            fieldErrors,
            fields,
            formError: null,
        });
    }
    //const team = await db.joke.create({ data: fields });
    return redirect(`/teams/a-team-id`);
};

export default function NewTeamRoute() {
    const actionData = useActionData<typeof action>();

    return (
        <div>
            <p>Add your Team</p>
            <form method="post">
                <div>
                    <label>
                        Name:{" "}
                        <input
                            type="text"
                            defaultValue={actionData?.fields?.name}
                            name="name"
                            aria-invalid={
                                Boolean(actionData?.fieldErrors?.name) ||
                                undefined
                            }
                            aria-errormessage={
                                actionData?.fieldErrors?.name
                                    ? "name-error"
                                    : undefined
                            }
                        />
                    </label>
                    {actionData?.fieldErrors?.name ? (
                        <p>
                            {actionData.fieldErrors.name}
                        </p>
                    ) : null}
                </div>
                <div>
                    {actionData?.formError ? (
                        <p>
                            {actionData.formError}
                        </p>
                    ) : null}
                    <button type="submit">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
