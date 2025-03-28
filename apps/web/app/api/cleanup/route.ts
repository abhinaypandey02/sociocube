export const GET = () => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/delete-user`);
};
