export default function UserNotFound({ username }: { username: string }) {
  return (
    <div
      className={
        "col-span-2 max-lg:hidden flex flex-col justify-center items-center"
      }
    >
      <h2 className="mb-4 text-7xl font-extrabold tracking-tight text-primary lg:text-9xl">
        404
      </h2>
      <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-lg leading-8 text-gray-600">
        No user found with the username{" "}
        <span className="font-medium">@{username}</span>
      </p>
    </div>
  );
}
