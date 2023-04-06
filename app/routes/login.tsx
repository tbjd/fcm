import type {ActionArgs,} from "@remix-run/node";
import {useActionData, useSearchParams,} from "@remix-run/react";
import {badRequest} from "~/utils/request.server";
import {createUserSession, login} from "~/utils/session.server";
import {LockClosedIcon} from "@heroicons/react/20/solid";


function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

function validateUrl(url: string) {
  let urls = ["/teams", "/", "https://remix.run"];
  if (urls.includes(url)) {
    return url;
  }
  return "/teams";
}

export const action = async ({request}: ActionArgs) => {
  const form = await request.formData();
  const username = form.get("email");
  const password = form.get("password");
  const redirectTo = validateUrl(
      form.get("redirectTo")?.toString() || "/teams"
  );
  if (
      typeof username !== "string" ||
      typeof password !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = {
    username,
    password
  };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }


  const user = await login({
    username,
    password
  });
  console.log({user});
  if (!user) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: `Username/Password combination is incorrect`,
    });
  }
  return createUserSession(user.id, redirectTo);


};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  return (
      <>
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <div className="text-center">⚽️</div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" method="POST">
              <input type="hidden" name="redirectTo" value={searchParams.get("redirectTo") ?? undefined}/>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Email address"
                  />
                  {actionData?.fieldErrors?.username ? (
                      <p
                          className="form-validation-error"
                          role="alert"
                          id="username-error"
                      >
                        {actionData.fieldErrors.username}
                      </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Password"
                  />
                  {actionData?.fieldErrors?.password ? (
                      <p
                          className="form-validation-error"
                          role="alert"
                          id="password-error"
                      >
                        {actionData.fieldErrors.password}
                      </p>
                  ) : null}
                </div>
              </div>
              <div>
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
  )
}
